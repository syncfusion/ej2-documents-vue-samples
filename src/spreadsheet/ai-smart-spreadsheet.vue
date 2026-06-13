<template>
    <div>
        <ejs-spreadsheet ref="spreadsheet" id="spreadsheet" :height="'708px'" :created="onCreated" :dataBound="onDataBound">
            <e-sheets>
                <e-sheet :name="'Gross Pay'" :ranges="ranges" :rows="rows" :columns="columns"></e-sheet>
            </e-sheets>
        </ejs-spreadsheet>
        <ejs-sidebar ref="sidebar" id="defaultSidebar" class="default-sidebar" :width="'500px'" :target="'#spreadsheet-maincontent'" :position="'Right'" :closeOnDocumentClick="false" :showBackdrop="false" :created="onSidebarCreated">
            <div id="defaultAIAssistView" :style="{ border: 'none' }">
            <ejs-button id="close" class="e-btn close-btn" :style="{ float: 'right', fontSize: '24px', border: 'none', background: 'none' }" @click="closeSidebar">&times;</ejs-button>
            </div>
        </ejs-sidebar>
    </div>
</template>

<script>
import { defineComponent } from 'vue';
import { SpreadsheetComponent, SheetsDirective, SheetDirective, RangesDirective, RangeDirective, RowsDirective, RowDirective, CellsDirective, CellDirective, ColumnsDirective, ColumnDirective, getCell } from '@syncfusion/ej2-vue-spreadsheet';
import { SidebarComponent } from '@syncfusion/ej2-vue-navigations';
import { ButtonComponent } from '@syncfusion/ej2-vue-buttons';
import { AIAssistView } from '@syncfusion/ej2-interactive-chat';
import { createSpinner, showSpinner, hideSpinner } from '@syncfusion/ej2-popups';
import { serverAIRequest } from '../common/ai-service';
import { grossPay } from './data-source';
import { isNullOrUndefined } from '@syncfusion/ej2-base';

export default defineComponent({
    name: 'App',
    components: {
        'ejs-spreadsheet': SpreadsheetComponent,
        'e-sheets': SheetsDirective,
        'e-sheet': SheetDirective,
        'e-ranges': RangesDirective,
        'e-range': RangeDirective,
        'e-rows': RowsDirective,
        'e-row': RowDirective,
        'e-cells': CellsDirective,
        'e-cell': CellDirective,
        'e-columns': ColumnsDirective,
        'e-column': ColumnDirective,
        'ejs-sidebar': SidebarComponent,
        'ejs-button': ButtonComponent
    },
    data() {
        return {
            prompts: [{ prompt: '', response: '' }],
            currentAIFeature: '',
            /* custom code start */
            isAiTabCreated: false,
            /* custom code end */
            aiinstance: null,
            ranges: [{ dataSource: grossPay, startCell: 'A3' }],
            rows: [
                { cells: [{ value: 'Gross Pay Calculation', style: { fontSize: '20pt', fontWeight: 'bold', textAlign: 'center', backgroundColor: '#B3FFB3', verticalAlign: 'middle' } }] },
                { index: 3, cells: [{ index: 9, formula: '=B4+6', style: { border: '1px solid #A6A6A6', textAlign: 'center', verticalAlign: 'middle', fontWeight: 'bold' } }] },
                { index: 4, cells: [{ index: 9, formula: '=B5+6', style: { border: '1px solid #A6A6A6', textAlign: 'center', verticalAlign: 'middle', fontWeight: 'bold' } }] },
                { index: 5, cells: [{ index: 9, formula: '=B6+6', style: { border: '1px solid #A6A6A6', textAlign: 'center', verticalAlign: 'middle', fontWeight: 'bold' } }] },
                { index: 6, cells: [{ index: 9, formula: '=B7+6', style: { border: '1px solid #A6A6A6', textAlign: 'center', verticalAlign: 'middle', fontWeight: 'bold' } }] },
                { index: 7, cells: [{ index: 9, formula: '=B8+6', style: { border: '1px solid #A6A6A6', textAlign: 'center', verticalAlign: 'middle', fontWeight: 'bold' } }] },
                { index: 8, cells: [{ index: 9, formula: '=B9+6', style: { border: '1px solid #A6A6A6', textAlign: 'center', verticalAlign: 'middle', fontWeight: 'bold' } }] },
                { index: 9, cells: [{ index: 9, formula: '=B10+6', style: { border: '1px solid #A6A6A6', textAlign: 'center', verticalAlign: 'middle', fontWeight: 'bold' } }] },
                { index: 10, cells: [{ index: 9, formula: '=B11+6', style: { border: '1px solid #A6A6A6', textAlign: 'center', verticalAlign: 'middle', fontWeight: 'bold' } }] },
                { index: 11, cells: [{ index: 9, formula: '=B12+6', style: { border: '1px solid #A6A6A6', textAlign: 'center', verticalAlign: 'middle', fontWeight: 'bold' } }] },
                { index: 12, cells: [{ index: 9, formula: '=B13+6', style: { border: '1px solid #A6A6A6', textAlign: 'center', verticalAlign: 'middle', fontWeight: 'bold' } }] },
                { index: 13, cells: [{ index: 7, value: 'Total Gross', style: { border: '1px solid #A6A6A6', textAlign: 'center', verticalAlign: 'middle', fontWeight: 'bold' } }, { index: 8, formula: '=Sum(I4:I13)', format: '$#,##0.00', style: { border: '1px solid #A6A6A6', textAlign: 'center', verticalAlign: 'middle', fontWeight: 'bold' } }, { index: 9, formula: '=Sum(J4:J13)', style: { border: '1px solid #A6A6A6', textAlign: 'center', verticalAlign: 'middle', fontWeight: 'bold' } }] }
            ],
            columns: [{ width: 88 }, { width: 120 }, { width: 106 }, { width: 98 }, { width: 110 }, { width: 110 }, { width: 110 }, { width: 98 }, { width: 130 }]
        };
    },
    mounted() {
        const spinEle = document.getElementById('spreadsheet');
        createSpinner({ target: spinEle, cssClass: 'e-spin-large', width: '150px' });
    },
    methods: {
        /* custom code start */
        onDataBound() {
            const spreadhseetInstance = this.$refs.spreadsheet.ej2Instances;
            if (this.isAiTabCreated && spreadhseetInstance.ribbonModule && spreadhseetInstance.ribbonModule.ribbon && spreadhseetInstance.ribbonModule.ribbon.items && 
                spreadhseetInstance.ribbonModule.ribbon.items[spreadhseetInstance.ribbonModule.ribbon.items.length - 1].header.text !== 'AI Assistant') {
                spreadhseetInstance.addRibbonTabs([{
                    header: { text: 'AI Assistant' },
                    content: [{
                        text: 'Full Sheet Analysis',
                        tooltipText: 'Full Sheet Analysis',
                        click: () => { this.fullSheetAnalysis(); }
                    }, {
                        text: 'Validate',
                        tooltipText: 'Validate formulae',
                        click: () => { this.formulaValidate(); }
                    }, {
                        text: 'Generate Formula',
                        tooltipText: 'Generate Formula',
                        click: () => { this.generateFormula(); }
                    }]
                }]);
            }
        },
        /* custom code end */
        onCreated() {
            const spreadsheet = this.$refs.spreadsheet.ej2Instances;
            spreadsheet.merge('A1:I2');
            spreadsheet.setBorder({ border: '1px solid #A6A6A6' }, 'A1:I13');
            spreadsheet.cellFormat({ textAlign: 'center', verticalAlign: 'middle' }, 'A3:I13');
            spreadsheet.cellFormat({ backgroundColor: '#B3FFB3', fontWeight: 'bold' }, 'A3:I3');
            spreadsheet.numberFormat('$#,##0.00', 'H4:I13');
            spreadsheet.wrap('H3:I3');
            spreadsheet.addRibbonTabs([{
                header: { text: 'AI Assistant' },
                content: [{
                    text: 'Full Sheet Analysis',
                    tooltipText: 'Full Sheet Analysis',
                    click: () => { this.fullSheetAnalysis(); }
                }, {
                    text: 'Validate',
                    tooltipText: 'Validate formulae',
                    click: () => { this.formulaValidate(); }
                }, {
                    text: 'Generate Formula',
                    tooltipText: 'Generate Formula',
                    click: () => { this.generateFormula(); }
                }]
            }]);
            /* custom code start */
            this.isAiTabCreated = true;
            /* custom code end */
            spreadsheet.addDataValidation({ type: 'Time', operator: 'LessThan', value1: '9:00:00 AM', ignoreBlank: false }, 'E4:E13');
            spreadsheet.addDataValidation({ type: 'Time', operator: 'LessThan', value1: '6:00:00 PM', ignoreBlank: false }, 'F4:F13');
            spreadsheet.addDataValidation({ type: 'WholeNumber', operator: 'LessThan', value1: '10', ignoreBlank: false }, 'G4:G13');
            spreadsheet.addDataValidation({ type: 'WholeNumber', operator: 'LessThan', value1: '250', ignoreBlank: false }, 'H4:H13');
            spreadsheet.addDataValidation({ type: 'WholeNumber', operator: 'LessThan', value1: '300', ignoreBlank: false }, 'I4:I13');
        },
        onSidebarCreated() {
            this.$refs.sidebar.toggle();
        },
        closeSidebar() {
            this.$refs.sidebar.hide();
        },
        fullSheetAnalysis() {
            if (this.currentAIFeature === 'formula' && !isNullOrUndefined(this.aiinstance)) {
                this.aiinstance.destroy();
                this.aiinstance = null;
            }
            this.currentAIFeature = 'analysis';
            const spreadsheet = this.$refs.spreadsheet.ej2Instances;
            const spinEle = document.getElementById('spreadsheet');
            spreadsheet.saveAsJson().then((data) => {
                try {
                    showSpinner(spinEle);
                    const processedString = this.processDataSource(data);
                    let query = 'Analyze the full data in this data. ' + processedString;
                    let aiOutput = serverAIRequest({ messages: [{ role: 'user', content: query }] });
                    aiOutput.then((result) => {
                        if (result) {
                            result = this.markdownToPlainText(result);
                            this.renderAssistView(result);
                            this.$refs.sidebar.show();
                        } else {
                            console.log('No result data from AI Service');
                        }
                        hideSpinner(spinEle);
                    }).catch((error) => {
                        console.error('AI Analysis Error:', error);
                        hideSpinner(spinEle);
                    });
                } catch(error) {
                    console.error('Data processing error:', error);
                    hideSpinner(spinEle);
                }
            }).catch((error) => {
                console.error('Failed to save spreadsheet as JSON:', error);
                hideSpinner(spinEle);
            });
        },
        formulaValidate() {
            const spreadsheet = this.$refs.spreadsheet.ej2Instances;
            const selectedCell = spreadsheet.sheets[spreadsheet.activeSheetIndex].selectedRange;
            let isFormulaAvailable = false;
            if (!isNullOrUndefined(selectedCell)) {
                const spinEle = document.getElementById('spreadsheet');
                showSpinner(spinEle);
                spreadsheet.getData(selectedCell).then((data) => {
                    try {
                        const currentCells = Array.from(data.keys());
                        let query = 'Validate the below formulae and provide me the problem in it. Strictly provide the data for each validated response in a flat JSON with fields `cell` to hold the spreadsheet cell value and `response` to hold the problem and solution.';
                        for (let a = 0; a < currentCells.length; a++) {
                            const cellFormula = data.get(currentCells[a]).formula;
                            if (!isNullOrUndefined(cellFormula)) {
                                isFormulaAvailable = true;
                                query += 'Spreadsheet cell - ' + currentCells[a] + ' - Formula - ' + cellFormula + ' - ' + this.processString(cellFormula);
                            }
                        }
                        if (isFormulaAvailable) {
                            let aiOutput = serverAIRequest({ messages: [{ role: 'user', content: query }] });
                            aiOutput.then((result) => {
                                if (result) {
                                    let cleanedResponseText = result.split('```json')[1].trim();
                                    cleanedResponseText = cleanedResponseText.split('```')[0].trim();
                                    const responseJson = JSON.parse(cleanedResponseText);
                                    for (let a = 0; a < responseJson.length; a++) {
                                        spreadsheet.updateCell({ notes: { text: responseJson[a].response } }, responseJson[a].cell);
                                    }
                                } else {
                                    console.error('No response from AI service. AI Parse error');
                                }
                                hideSpinner(spinEle);
                            }).catch((error) => {
                                console.error('AI Analysis Error:', error);
                                hideSpinner(spinEle);
                            });
                        } else {
                            hideSpinner(spinEle);
                            console.log('No formulas found in the selected cells. Please select cells containing formulas to validate.');
                        }
                    } catch (error) {
                        console.error('Formula validation error:', error);
                        hideSpinner(spinEle);
                    }
                }).catch(function (error) {
                    console.error('Failed to get spreadsheet data:', error);
                    hideSpinner(spinEle);
                });
            }
        },
        generateFormula() {
            if (this.currentAIFeature === 'analysis' && !isNullOrUndefined(this.aiinstance)) {
                this.aiinstance.destroy();
                this.aiinstance = null;
            }
            this.currentAIFeature = 'formula';
            this.renderAssistViewForFormula(this.prompts);
            this.$refs.sidebar.show();
        },
        renderAssistViewForFormula(response) {
            if (isNullOrUndefined(this.aiinstance)) {
                this.aiinstance = new AIAssistView({
                    promptPlaceholder: "Type your prompt for assistance...",
                    prompts: this.prompts,
                    promptRequest: this.promptHandler
                });
                this.aiinstance.appendTo('#defaultAIAssistView');
            }
        },
        promptHandler(args) {
            let prompt = args.prompt;
            const spreadsheet = this.$refs.spreadsheet.ej2Instances;
            spreadsheet.saveAsJson().then((data) => {
                const processedString = this.processDataSource(data);
                let query = prompt + '. Strictly provide the excel formula for the Excel sheet data which is provided as JSON below. /n' + processedString;
                let aiOutput = serverAIRequest({ messages: [{ role: 'user', content: query }] });
                aiOutput.then((result) => {
                    if (result) {
                        let cleanedResponseText = result.split('```excel')[1].trim();
                        cleanedResponseText = cleanedResponseText.split('```')[0].trim();
                        this.aiinstance.addPromptResponse(cleanedResponseText);
                    } else {
                        console.error('No response from AI service. AI Parse error');
                    }
                }).catch((error) => {
                    console.error('AI Analysis Error:', error);
                    this.aiinstance.addPromptResponse('Error processing the AI response. Please try again.');
                });
            });
        },
        removeKeys(array, keysToRemove, cellsKeys) {
            array.forEach(obj => {
                keysToRemove.forEach((key) => {
                    if (key === 'cells') {
                        if (obj && obj.cells && obj.cells.length > 0) {
                            this.removeKeys(obj.cells, cellsKeys);
                        }
                    } else {
                        if (obj && obj[key]) {
                            delete obj[key];
                        }
                    }
                });
            });
            return array;
        },
        processDataSource(data) {
            const spreadsheet = this.$refs.spreadsheet.ej2Instances;
            const dataSource = this.removeKeys(data.jsonObject.Workbook.sheets[spreadsheet.activeSheetIndex].rows, ['height', 'cells'], ['style', 'wrap', 'validation', 'colSpan', 'rowSpan']);
            const processedString = JSON.stringify(dataSource);
            return processedString.replaceAll('{}', null);
        },
        renderAssistView(response) {
            if (isNullOrUndefined(this.aiinstance)) {
                this.aiinstance = new AIAssistView({
                    promptPlaceholder: "Type your prompt for assistance...",
                    prompts: [{ prompt: '', response: response }]
                });
                this.aiinstance.appendTo('#defaultAIAssistView');
            } else {
                this.aiinstance.addPromptResponse(response);
            }
        },
        processString(forumlaString) {
            let processedString = '';
            const regex = /\(([^)]+)\)/g;
            let matches = [];
            let match;
            while ((match = regex.exec(forumlaString)) !== null) {
                let text = match[1];
                matches = text.split(/[:+\-*=/]/).map(s => s.trim()).filter(s => s !== '');
            }
            if (isNullOrUndefined(matches) || matches.length <= 0) {
                matches = forumlaString.split(/[:+\-*=/]/).map(s => s.trim()).filter(s => s !== '');
            }
            if (matches.length > 0) {
                for (let i = 0; i < matches.length; i++) {
                    let { rowIndex, columnIndex } = this.cellAddressToIndexes(matches[i]);
                    if (rowIndex != null && columnIndex != null) {
                        const spreadsheet = this.$refs.spreadsheet.ej2Instances;
                        processedString += 'Value of the cell ' + matches[i] + ' is ' + getCell(rowIndex, columnIndex, spreadsheet.sheets[spreadsheet.activeSheetIndex]).value + '/n';
                    }
                }
            }
            return processedString;
        },
        cellAddressToIndexes(cellAddress) {
            const match = cellAddress.match(/^([A-Z]+)(\d+)$/);
            if (!match) {
                return { rowIndex: null, columnIndex: null };
            }
            const columnLetters = match[1];
            const rowNumber = parseInt(match[2], 10);
            let columnIndex = 0;
            for (let i = 0; i < columnLetters.length; i++) {
                columnIndex = columnIndex * 26 + (columnLetters.charCodeAt(i) - 'A'.charCodeAt(0));
            }
            const rowIndex = rowNumber - 1;
            return { rowIndex, columnIndex };
        },
        markdownToPlainText(markdown) {
            markdown = markdown.replace(/^###### (.+)$/gm, '<h6>$1</h6>');
            markdown = markdown.replace(/^##### (.+)$/gm, '<h5>$1</h5>');
            markdown = markdown.replace(/^#### (.+)$/gm, '<h4>$1</h4>');
            markdown = markdown.replace(/^### (.+)$/gm, '<h3>$1</h3>');
            markdown = markdown.replace(/^## (.+)$/gm, '<h2>$1</h2>');
            markdown = markdown.replace(/^# (.+)$/gm, '<h1>$1</h1>');
            markdown = markdown.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
            markdown = markdown.replace(/\*(.+?)\*/g, '<em>$1</em>');
            markdown = markdown.replace(/^\* (.+)$/gm, '<ul><li>$1</li></ul>');
            markdown = markdown.replace(/^\d+\. (.+)$/gm, '<ol><li>$1</li></ol>');
            markdown = markdown.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>');
            markdown = markdown.replace(/\n/g, '<br>');
            markdown = '<p>' + markdown + '</p>';
            return markdown;
        }
    }
});
</script>
<!-- custom code start -->
<style>
.default-sidebar { border: none; }
.close-btn { float: right; font-size: 24px; border: none; background: none; cursor: pointer; }
.title-header #close:before { content: "\e109"; }
.title-header { font-size: 18px; padding-bottom: 15px; }
.sub-title { font-size: 16px; }
.e-sidebar .title-header #close { cursor: pointer; line-height: 25px; font-size: 14px; float: right; }
@font-face {
    font-family: 'e-icons';
    src: url(data:application/x-font-ttf;charset=utf-8;base64,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) format('truetype');
    font-weight: normal;
    font-style: normal;
}
</style>
<!-- custom code end -->