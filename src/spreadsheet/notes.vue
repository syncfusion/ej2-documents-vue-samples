<template>
    <div class="control-section">
        <div id="spreadsheet">
            <ejs-spreadsheet ref="spreadsheet" :openUrl="openUrl" :saveUrl="saveUrl" :created="created">
                <e-sheets>
                    <e-sheet name="Cart">
                        <e-ranges>
                            <e-range :dataSource="dataSource" startCell="B3"></e-range>
                        </e-ranges>
                        <e-rows>
                            <e-row :cells="cells0"></e-row>
                            <e-row :index="2" :cells="cells1"></e-row>
                            <e-row :cells="cells2"></e-row>
                            <e-row :cells="cells3"></e-row>
                            <e-row :cells="cells4"></e-row>
                            <e-row :cells="cells5"></e-row>
                            <e-row :cells="cells6"></e-row>
                            <e-row :cells="cells7"></e-row>
                            <e-row :cells="cells8"></e-row>
                            <e-row :cells="cells9"></e-row>
                            <e-row :cells="cells10"></e-row>
                            <e-row :cells="cells11"></e-row>
                        </e-rows>
                        <e-columns>
                            <e-column :width="88"></e-column>
                            <e-column :width="120"></e-column>
                            <e-column :width="100"></e-column>
                            <e-column :width="100"></e-column>
                            <e-column :width="100"></e-column>
                            <e-column :width="110"></e-column>
                        </e-columns>
                    </e-sheet>
                </e-sheets>
            </ejs-spreadsheet>
        </div>
        <!-- custom code start -->
        <div id="action-description">
            <p>
                This sample demonstrates the <b>Notes</b> feature using the shopping cart scenario as an example.
            </p>
        </div>
        <div id="description">
            <p>
                The <b>Notes</b> feature lets you add annotations to cells while reviewing a worksheet. When a cell contains a
                note, a red indicator appears in the corner. Hover over the indicator to view the note. You can enable or disable notes
                using the <a target="_blank"
                    href="https://ej2.syncfusion.com/vue/documentation/api/spreadsheet/index-default#enablenotes"><code>enableNotes</code>
                    </a>
                property; by default, it's enabled.
            </p>
            <p>
                Notes can be added directly to cells using the context menu, the ribbon, or programmatically using the <a target="_blank"
                    href="https://ej2.syncfusion.com/vue/documentation/api/spreadsheet/index-default#updatecell"><code>updateCell</code>
                    </a>
                method. You can perform the following actions:
            </p>
            <ul>
                <li><b>Add Note</b> - Create a new note for a cell to provide feedback or context.</li>
                <li><b>Edit Note</b> - Update the text of an existing note to keep information accurate.</li>
                <li><b>Delete Note</b> - Remove a note when it's no longer needed.</li>
                <li><b>Show/Hide Note</b> - Toggle the visibility of the note on the selected cell.</li>
                <li><b>Previous Note</b> - Navigate to the previous note in the workbook.</li>
                <li><b>Next Note</b> - Navigate to the next note in the workbook.</li>
                <li><b>Show All Notes</b> - Display all notes in the worksheet for a comprehensive view.</li>
            </ul>
            <p>The following keyboard shortcuts apply to the <b>Notes</b> feature:</p>
            <ul>
                <li><kbd>Shift</kbd> + <kbd>F2</kbd> - Add a note to the current cell.</li>
                <li><kbd>Esc</kbd> - Save and close the note only if the <code>isVisible</code> property is set to <code>false</code>.</li>
            </ul>
            <p>
                More information about the Notes feature can be found in this <a target="_blank"
                    href="https://help.syncfusion.com/document-processing/excel/spreadsheet/vue/notes">
                    documentation</a>
                section.
            </p>
        </div>
        <!-- custom code end -->
    </div>
</template>
<!-- custom code start -->
<style>
.key-class {
    display: inline-block;
    width: 130px;
}
</style>
<!-- custom code end -->
<script>
import { SpreadsheetComponent, SheetDirective, RowsDirective, RowDirective, SheetsDirective, ColumnsDirective, ColumnDirective, RangesDirective, RangeDirective } from '@syncfusion/ej2-vue-spreadsheet';
import dataSource from "./notes-data.json";

export default {
    components: {
        'ejs-spreadsheet': SpreadsheetComponent,
        'e-sheet': SheetDirective,
        'e-sheets': SheetsDirective,
        'e-row': RowDirective,
        'e-rows': RowsDirective,
        'e-column': ColumnDirective,
        'e-columns': ColumnsDirective,
        'e-range': RangeDirective,
        'e-ranges': RangesDirective
    },
    data: () => {
        return {
            dataSource: dataSource.notesData,
            openUrl: 'https://document.syncfusion.com/web-services/spreadsheet-editor/api/spreadsheet/open',
            saveUrl: 'https://document.syncfusion.com/web-services/spreadsheet-editor/api/spreadsheet/save',
            cells0: [{
                value: 'Shopping Cart', rowSpan: 2, colSpan: 6, style: {
                    fontSize: '20pt', fontWeight: 'bold',
                    textAlign: 'center', backgroundColor: '#279377', verticalAlign: 'middle', color: '#ffffff'
                }
            }],

            cells1: [{ value: 'Product ID', style: { fontWeight: 'bold', textAlign: 'center' } },
            { style: { fontWeight: 'bold', textAlign: 'center' } },
            { style: { fontWeight: 'bold', textAlign: 'center' } },
            { style: { fontWeight: 'bold', textAlign: 'center' } },
            { style: { fontWeight: 'bold', textAlign: 'center' } },
            {
                style: { fontWeight: 'bold', textAlign: 'center' } ,
                notes: { text: 'This column represents the total revenue of all products.', isVisible: true }

            }
            ],

            cells2: [{ value: '101', style: { textAlign: 'left' } },
            { index: 1, notes: { text: 'This product has been the most profitable this month.' } }
            ],

            cells3: [{ value: '102', style: { textAlign: 'left' } },
            { index: 1, notes: { text: 'This product has had the lowest sales in terms of quantity this month.' } }
            ],

            cells4: [{ value: '103', style: { textAlign: 'left' } },
            { index: 1, notes: { text: 'This product has been the least profitable this month.' } }
            ],

            cells5: [{ value: '104', style: { textAlign: 'left' } }],

            cells6: [{ value: '105', style: { textAlign: 'left' } },
            { index: 1, notes: { text: 'This product has had the highest sales in terms of quantity this month.' } }
            ],

            cells7: [{ value: '106', style: { textAlign: 'left' } }],

            cells8: [{ value: '107', style: { textAlign: 'left' } }],

            cells9: [{ value: '108', style: { textAlign: 'left' } }],

            cells10: [{ value: '109', style: { textAlign: 'left' } }],

            cells11: [{
                index: 4, value: 'Total Amount', style: {
                    border: '1px solid #A6A6A6', fontWeight: 'bold',
                    textAlign: 'center', verticalAlign: 'middle'
                }
            },
            {
                index: 5, formula: '=Sum(F4:F12)', format: '$#,##0.00', style: {
                    border: '1px solid #A6A6A6',
                    textAlign: 'right', verticalAlign: 'middle', fontWeight: 'bold'
                }
            }],
        }
    },
    methods: {
        created: function () {
            var spreadsheet = this.$refs.spreadsheet;
            spreadsheet.hideRibbonTabs(['Home', 'Insert', 'Formulas', 'Data', 'View'], true);
            spreadsheet.numberFormat('$#,##0.00', 'F4:F12');
            spreadsheet.numberFormat('$###', 'E4:E12');
            spreadsheet.freezePanes(3, 0);
        }
    }
}
</script>
