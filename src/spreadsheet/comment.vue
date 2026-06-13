<template>
 <div class="control-section">
    <div id="spreadsheet-comment">
        <ejs-spreadsheet ref="spreadsheet" :showCommentsPane="true" :openUrl="openUrl" :saveUrl="saveUrl"
            :created="created">
            <e-sheets>
                <e-sheet name="Shipment Details">
                    <e-ranges>
                        <e-range :dataSource="dataSource"></e-range>
                    </e-ranges>
                    <e-columns>
                        <e-column :width="80"></e-column>
                        <e-column :width="130"></e-column>
                        <e-column :width="150"></e-column>
                        <e-column :width="100"></e-column>
                        <e-column :width="100"></e-column>
                    </e-columns>
                    <e-rows>
                        <e-row :index="1">
                            <e-cells>
                                <e-cell :index="4" :comment="comment1"></e-cell>
                            </e-cells>
                        </e-row>
                        <e-row :index="3">
                            <e-cells>
                                <e-cell :index="4" :comment="comment2"></e-cell>
                            </e-cells>
                        </e-row>
                        <e-row :index="6">
                            <e-cells>
                                <e-cell :index="4" :comment="comment3"></e-cell>
                            </e-cells>
                        </e-row>
                        <e-row :index="7">
                            <e-cells>
                                <e-cell :index="4" :comment="comment4"></e-cell>
                            </e-cells>
                        </e-row>
                        <e-row :index="9">
                            <e-cells>
                                <e-cell :index="4" :comment="comment5"></e-cell>
                            </e-cells>
                        </e-row>
                        <e-row :index="10">
                            <e-cells>
                                <e-cell :index="4" :comment="comment6"></e-cell>
                            </e-cells>
                        </e-row>
                        <e-row :index="11">
                            <e-cells>
                                <e-cell :index="4" :comment="comment7"></e-cell>
                            </e-cells>
                        </e-row>
                    </e-rows>
                </e-sheet>
            </e-sheets>
        </ejs-spreadsheet>
    </div>
    <!-- custom code start -->
    <div id="action-description">
        <p>
            This sample showcases <b>threaded comments</b> using shipment data. Add remarks and replies to cells,
            preview comments on hover, and manage threads from an optional review pane.
        </p>
    </div>
    <div id="description">
        <p>
            The <b>Comments</b> feature lets you add remarks and threaded replies to cells. When a cell contains a
            comment, a small indicator appears in its corner. Hover over the indicator to view the comment.
            You can show or hide the comments review pane using the <code>showCommentsPane</code> property:
        </p>
        <ul>
            <li><code>false</code> (default) - Hides the review pane.</li>
            <li><code>true</code> - Displays the review pane.</li>
        </ul>
        <p>
            Comments can be added directly to cells via the context menu, the ribbon, the comments review pane, or 
            programmatically using the <code>updateCell</code> method. You can perform the following actions:
        </p>
        <ul>
            <li><b>Add Comment</b> - Create a new comment to provide feedback or context.</li>
            <li><b>Edit Comment</b> - Update the text of a comment or reply to keep information accurate.</li>
            <li><b>Delete Comment</b> - Remove a single comment, a reply, or the entire thread when it's no longer
                needed.</li>
            <li><b>Reply</b> - Add one or more replies to an existing comment thread to provide
                additional details or answers.</li>
            <li><b>Resolve</b> - Mark a comment thread as resolved when the issue has been addressed.</li>
            <li><b>Reopen</b> - Restore a resolved thread if further discussion or clarification is
                required.</li>
        </ul>
        <p>
            More information about the Comment feature can be found in this <a target="_blank"
                href="https://help.syncfusion.com/document-processing/excel/spreadsheet/vue/comment">documentation</a>
            section.
        </p>
    </div>
    <!-- custom code end -->
 </div>
</template>
<!-- custom code start -->
<style>

    #spreadsheet-comment {
        height: 550px;
    }

    #sb-content .e-spreadsheet .e-tab .e-tab-text {
        display: inherit;
    }

    .e-spreadsheet .e-main-panel .e-main-content {
        margin-left: 0 !important;
    }
</style>
<!-- custom code end -->
<script>
import { SpreadsheetComponent, SheetDirective, RowsDirective, RowDirective, CellsDirective, CellDirective, SheetsDirective, ColumnsDirective, ColumnDirective, RangesDirective, RangeDirective } from '@syncfusion/ej2-vue-spreadsheet';
import dataSource from "./comment-data.json";

export default {
    components: {
        'ejs-spreadsheet': SpreadsheetComponent,
        'e-sheet': SheetDirective,
        'e-sheets': SheetsDirective,
        'e-row': RowDirective,
        'e-rows': RowsDirective,
        'e-cell': CellDirective,
        'e-cells': CellsDirective,
        'e-column': ColumnDirective,
        'e-columns': ColumnsDirective,
        'e-range': RangeDirective,
        'e-ranges': RangesDirective
    },
    data: () => {
        return {
            dataSource: dataSource.shipmentDetails,
            openUrl: 'https://document.syncfusion.com/web-services/spreadsheet-editor/api/spreadsheet/open',
            saveUrl: 'https://document.syncfusion.com/web-services/spreadsheet-editor/api/spreadsheet/save',
            comment1: {
                author: 'Julius Gorner', text: 'Confirm delivery status for Order 10248.', createdTime: 'November 18, 2025 at 3:00 PM',
                isResolved: true, replies: [{ author: 'Cristi Espinos', text: 'Status verified as delivered.', createdTime: 'November 18, 2025 at 3:30 PM' },
                { author: 'Julius Gorner', text: 'Acknowledged, thank you.', createdTime: 'November 18, 2025 at 3:45 PM' }]
            },
            comment2: {
                author: 'Julius Gorner', text: 'Order 10250 is marked as Shipped, any update on current status?', createdTime: 'November 16, 2025 at 9:00 PM',
                isResolved: false, replies: [{ author: 'Cristi Espinos', text: 'Shipment is in transit.', createdTime: 'November 17, 2025 at 3:30 PM' },
                { author: 'Julius Gorner', text: 'Thanks for the update.', createdTime: 'November 17, 2025 at 3:45 PM' }]
            },
            comment3: {
                author: 'Julius Gorner', text: 'Reason for cancellation of Order 10253?', createdTime: 'November 18, 2025 at 1:00 PM',
                isResolved: false, replies: [{ author: 'Cristi Espinos', text: 'Customer requested cancellation.', createdTime: 'November 18, 2025 at 1:30 PM' },
                { author: 'Julius Gorner', text: 'Understood, thanks.', createdTime: 'November 18, 2025 at 3:15 PM' }]
            },
            comment4: {
                author: 'Julius Gorner', text: 'Pending status for Order 10254 - any progress?', createdTime: 'November 19, 2025 at 3:00 PM',
                isResolved: false, replies: [{ author: 'Cristi Espinos', text: 'Awaiting customs clearance.', createdTime: 'November 19, 2025 at 3:30 PM' },
                { author: 'Julius Gorner', text: 'Please keep me posted,', createdTime: 'November 19, 2025 at 3:45 PM' }]
            },
            comment5: {
                author: 'Julius Gorner', text: 'Order 10256 shipped, tracking details shared?', createdTime: 'November 18, 2025 at 3:00 AM',
                isResolved: false, replies: [{ author: 'Cristi Espinos', text: 'Tracking sent via email,', createdTime: 'November 18, 2025 at 3:30 AM' },
                { author: 'Julius Gorner', text: 'Received, thank you,', createdTime: 'November 18, 2025 at 3:45 AM' }]
            },
            comment6: {
                author: 'Julius Gorner', text: 'Delivered order 10257, confirm recipient name.', createdTime: 'November 18, 2025 at 2:00 PM',
                isResolved: true, replies: [{ author: 'Cristi Espinos', text: 'Recipient verified as Michael Holz.', createdTime: 'November 18, 2025 at 2:30 PM' },
                { author: 'Julius Gorner', text: 'Great, noted.', createdTime: 'November 18, 2025 at 2:45 PM' }]
            },
            comment7: {
                author: 'Julius Gorner', text: 'Order 10258 cancelled, reason documented?', createdTime: 'November 18, 2025 at 12:00 PM',
                isResolved: false, replies: [{ author: 'Cristi Espinos', text: 'Customer changed requirements', createdTime: 'November 18, 2025 at 12:30 PM' },
                { author: 'Julius Gorner', text: 'Understood, thanks.', createdTime: 'November 18, 2025 at 12:45 PM' }]
            }
        }
    },
    methods: {
        created: function () {
            var spreadsheet = this.$refs.spreadsheet;
            spreadsheet.cellFormat({ fontWeight: 'bold', textAlign: 'center' }, 'Shipment Details!A1:F1');
            spreadsheet.hideRibbonTabs(['Home', 'Insert', 'Formulas', 'Data', 'View'], true);
            // Added comments using the updateCell method.
            spreadsheet.updateCell({
                comment: {
                    author: 'Cristi Espinos', text: 'Validate customer name for Order 10249.', createdTime: 'November 18, 2025 at 4:00 PM',
                    isResolved: false, replies: [{ author: 'Julius Gorner', text: 'Confirmed as Karin Josephs', createdTime: 'November 18, 2025 at 4:30 PM' },
                    { author: 'Cristi Espinos', text: 'Perfect, noted.', createdTime: 'November 18, 2025 at 5:30 PM' }]
                }
            }, 'Shipment Details!B3');
            spreadsheet.updateCell({
                comment: {
                    author: 'Cristi Espinos', text: 'Verify address details for delivery.', createdTime: 'November 18, 2025 at 4:00 PM',
                    isResolved: true, replies: [{ author: 'Julius Gorner', text: 'Address confirmed as Boulevard Tirou, 255.', createdTime: 'November 18, 2025 at 4:30 PM' }]
                }
            }, 'Shipment Details!C6');
            spreadsheet.updateCell({
                comment: {
                    author: 'Cristi Espinos', text: 'Confirm country for Order 10255 delivery.', createdTime: 'November 18, 2025 at 4:00 PM',
                    isResolved: false, replies: [{ author: 'Julius Gorner', text: 'Country verified as Switzerland.', createdTime: 'November 18, 2025 at 4:30 PM' },
                    { author: 'Cristi Espinos', text: 'Acknowledged.', createdTime: 'November 18, 2025 at 5:30 PM' }]
                }
            }, 'Shipment Details!D9');
        }
    }
}
</script>