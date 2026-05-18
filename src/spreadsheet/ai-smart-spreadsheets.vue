<template>
    <div class="control-pane">
        <div class="control-section">
            <div id="spreadsheet-maincontent">
                <ai-smart-spreadsheet></ai-smart-spreadsheet>
            </div>
        </div>
        <div id="action-description">
            <p>This sample demonstrates the integration of AI to automatically analyze content, generate formulas, and
                validate
                them in the Spreadsheet.</p>
            <p>To explore this and more Syncfusion Vue Smart AI integrations locally, check out our <a target='_blank'
                    href= 'https://github.com/syncfusion/smart-ai-samples/tree/master/vue' aria-label="Navigate to explore the syncfusion Vue AI Demos repository">GitHub
                    repository</a>.</p>
        </div>

        <div id="description">
            <p>In this sample, a tab labeled <code>AI Assistant</code> provides access to AI-powered features. Users can
                utilize
                the following capabilities:</p>
            <ul>
                <li><strong>Full Sheet Analysis:</strong> Analyzes the data in the sheet and provides a summary of the
                    details.
                </li>
                <li><strong>Validate:</strong> Validates the formulas in the current selection and updates the details
                    as notes
                    in the corresponding cells.</li>
                <li><strong>Generate Formula:</strong> Generates formulas based on user requirements using the AI
                    AssistView.
                </li>
            </ul>
        </div>
    </div>
</template>
<script>
import AiSmartSpreadsheet from './ai-smart-spreadsheet';
export default {
  name: 'SmartSpreadsheet',
  components: {
    'ai-smart-spreadsheet': AiSmartSpreadsheet
  },
  data() {
    return {
      plnkr: null,
      toolbarSplitter: null,
      openNew: null,
      hideElements: null
    }
  },
  mounted() {
    this.plnkr = document.querySelector('.sb-content-tab-header .sb-plnr-section');
    this.toolbarSplitter = document.querySelectorAll('.sb-content-tab-header .sb-toolbar-splitter');
    this.openNew = document.querySelector('.sb-content-tab-header .sb-open-new-wrapper');
    this.hideElements = [this.plnkr, ...this.toolbarSplitter, this.openNew];
    this.hideElements.forEach((element) => {
        if (element) {
          element.style.display = 'none';
        }
    });
  },
  beforeUnmount() {
    this.hideElements.forEach((element) => {
        if (element) {
          element.style.display = '';
        }
    });
  }
}
</script>
