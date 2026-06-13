<template>
  <div>
    <div class="col-lg-12 control-section pdfviewer dialog-components-sample">
      <!-- Render Button to open the Dialog -->
      <div class="control-section">
        <div id="Grid">
          <table class="table table-hover table-borderless align-middle">
            <thead>
              <tr>
                <th scope="col">File Name</th>
                <th scope="col">Author</th>
                <th scope="col" class="e-pv-table-actions-header">Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(row, idx) in gridData" :key="idx">
                <td>
                  <div>
                    <svg
                      width="24"
                      height="30"
                      viewBox="0 0 24 30"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M0 3C0 1.34315 1.34315 0 3 0H13.7574C14.553 0 15.3161 0.316071 15.8787 0.87868L23.1213 8.12132C23.6839 8.68393 24 9.44699 24 10.2426V27C24 28.6569 22.6569 30 21 30H3C1.34315 30 0 28.6569 0 27V3Z"
                        fill="#F54848"
                      />
                      <path
                        d="M14.5 11H22V10.5042C22 9.76949 21.7304 9.0603 21.2422 8.51114L16.9463 3.67818C15.9974 2.61074 14.6374 2 13.2092 2H13V9.5C13 10.3284 13.6716 11 14.5 11Z"
                        fill="#FFB7B7"
                      />
                      <path
                        d="M16.3787 22V14.7273H21.3432V16.1549H18.1365V17.6463H21.0271V19.0774H18.1365V22H16.3787Z"
                        fill="white"
                      />
                      <path
                        d="M11.7622 22H9.07397V14.7273H11.7586C12.4996 14.7273 13.1377 14.8729 13.6727 15.1641C14.2101 15.4529 14.6244 15.8696 14.9156 16.4141C15.2068 16.9562 15.3524 17.6049 15.3524 18.3601C15.3524 19.1177 15.2068 19.7687 14.9156 20.3132C14.6268 20.8577 14.2137 21.2756 13.6762 21.5668C13.1388 21.8556 12.5008 22 11.7622 22ZM10.8318 20.5014H11.6947C12.1019 20.5014 12.4464 20.4328 12.7281 20.2955C13.0122 20.1558 13.2264 19.9297 13.3709 19.6172C13.5176 19.3023 13.591 18.8833 13.591 18.3601C13.591 17.8369 13.5176 17.4202 13.3709 17.1101C13.2241 16.7976 13.0074 16.5727 12.721 16.4354C12.4369 16.2957 12.0865 16.2259 11.6699 16.2259H10.8318V20.5014Z"
                        fill="white"
                      />
                      <path
                        d="M2.55054 22V14.7273H5.5548C6.09931 14.7273 6.56924 14.8338 6.9646 15.0469C7.36233 15.2576 7.66891 15.5523 7.88434 15.9311C8.09978 16.3076 8.2075 16.7455 8.2075 17.2451C8.2075 17.7469 8.09741 18.1861 7.87724 18.5625C7.65944 18.9366 7.34812 19.2266 6.94329 19.4326C6.53846 19.6385 6.05788 19.7415 5.50153 19.7415H3.64784V18.3566H5.17483C5.43998 18.3566 5.66133 18.3104 5.83889 18.2181C6.01881 18.1257 6.15494 17.9967 6.24727 17.831C6.3396 17.6629 6.38576 17.4676 6.38576 17.2451C6.38576 17.0201 6.3396 16.826 6.24727 16.6627C6.15494 16.4969 6.01881 16.3691 5.83889 16.2791C5.65897 16.1892 5.43761 16.1442 5.17483 16.1442H4.30835V22H2.55054Z"
                        fill="white"
                      />
                    </svg>
                    <span style="vertical-align: super; margin-left: 5px" :title="row.FileName">{{ row.FileName }}</span>
                  </div>
                  </td>
                <td class="e-pv-table-author-cell">{{ row.Author }}</td>
                <td class="e-pv-table-actions-cell">
                  <button
                    type="button"
                    class="btn btn-sm btn-link text-secondary p-2 e-pv-view-btn"
                    title="View"
                    aria-label="View {{ row.FileName }}"
                    @click="openViewer('View', row)"
                  >
                  <span class="e-icons e-eye e-flat e-pv-view-icon" aria-hidden="true"></span>
                  </button>
                  <button
                    type="button"
                    class="btn btn-sm btn-link text-secondary p-2 e-pv-edit-btn"
                    title="Edit"
                    aria-label="Edit {{ row.FileName }}"
                    @click="openViewer('Edit', row)"
                  >
                    <span class="e-icons e-edit e-flat e-pv-edit-icon" aria-hidden="true"></span>
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <ejs-dialog
          id="componentsDialog pdfviewer"
          v-if="showDialog"
          ref="dialogObj"
          :header="header"
          :content="contenttemplateVue"
          showCloseIcon="true"
          width="90%"
          height="90%"
          :open="dialogOpen"
          :close="dialogClose"
        >
        </ejs-dialog>
      </div>
    </div>
  </div>
    <div id="action-description">
       <p>This demonstration showcases the process of presenting a list of PDF documents in a grid layout and accessing the document for viewing or editing through the PDF Viewer within a dialog box.</p>
    </div>
    <div id="description">
      <p>
       More information on the PDF Viewer instantiation can be found in this
       <a target="_blank"
       href="https://help.syncfusion.com/document-processing/pdf/pdf-viewer/vue/getting-started">
       documentation section</a>.
      </p>
  </div>
</template>

<style scoped>
.control-section.pdfviewer {
  left: 0px !important;
  top: 0% !important;
}

.dlgbtn {
  margin-right: 10px;
}

.dialog-components-sample {
  overflow-y: auto;
}

#componentsDialog.pdfviewer {
  left: 23%;
  top: 2% !important;
  width: 452px !important;
}

.file-name-container {
  display: flex;
  justify-content: left;
}

.file-name-content {
  display: flex;
  align-items: center;
}

.icon-and-text {
  display: flex;
  align-items: left;
}

.file-name-text {
  text-align: center;
  margin-left: 8px;
  margin-top: 5px;
}


@font-face {
  font-family: 'Custom_icons';
  src: url(data:application/x-font-ttf;charset=utf-8;base64,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)
    format('truetype');
  font-weight: normal;
  font-style: normal;
}

[class^='sf-icon-'],
[class*=' sf-icon-'] {
  font-family: 'Font' !important;
  font-size: 15px;
  font-style: normal;
  font-weight: normal;
  font-variant: normal;
  text-transform: none;
  line-height: 1;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.sf-icon-edit:before {
  font-family: 'Custom_icons' !important;
  content: '\\e200';
}

.sf-icon-eye:before {
  font-family: 'Custom_icons' !important;
  content: '\\e201';
}
/* Table styling */
#Grid table {
    border: 1px solid #d7d7d7;
    table-layout: fixed;
    width: 100%;
}
#Grid table th,
#Grid table td {
    border: 1px solid #d7d7d7;
    padding: 12px 8px;
    overflow: hidden;
    white-space: nowrap;
}
#Grid table th {
    width: 33.33%;
    font-weight: 600;
    text-align: left;
}
#Grid table th.e-pv-table-actions-header {
    text-align: center;
}
#Grid table td {
    width: 33.33%;
}
#Grid table td.e-pv-table-actions-cell {
    text-align: center;
}
#Grid table td.e-pv-table-author-cell {
    padding-top: 20px;
}
/* Hide center column (Author) borders */
#Grid table th:nth-child(1),
#Grid table td:nth-child(1) {
    border-right: none;
}
#Grid table td:nth-child(1) {
  overflow: hidden;
  white-space: nowrap;
}
#Grid table th:nth-child(2),
#Grid table td:nth-child(2) {
    border-left: none;
    border-right: none;
}
#Grid table th:nth-child(3),
#Grid table td:nth-child(3) {
    border-left: none;
}
#Grid table tbody tr:hover {
    background-color: #f9f9f9;
}
/* Icon styling with e-pv prefix */
.e-pv-view-btn,
.e-pv-edit-btn {
    background-color: transparent;
    border: 1px solid transparent;
    border-radius: 4px;
    padding: 4px 6px !important;
    margin: 0 4px;
    cursor: pointer;
    transition: all 0.3s ease;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    min-width: 28px;
    min-height: 28px;
    text-decoration: none;
    outline: none;
    box-sizing: border-box;
}
.e-pv-view-btn:hover,
.e-pv-edit-btn:hover {
    background-color: #f5f5f5;
    border-color: #ccc;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12);
    text-decoration: none;
    outline: none;
}
.e-pv-view-btn:focus,
.e-pv-edit-btn:focus {
    outline: none;
    text-decoration: none;
}
.e-pv-view-btn:active,
.e-pv-edit-btn:active {
    background-color: #efefef;
    border-color: #999;
    outline: none;
}
.e-pv-view-icon,
.e-pv-edit-icon {
    font-size: 16px;
    color: #7a8a99;
    display: inline-block;
    text-decoration: none;
    font-weight: 600;
    line-height: 1;
}
.e-pv-view-btn:hover .e-pv-view-icon,
.e-pv-edit-btn:hover .e-pv-edit-icon {
    color: #5a6a7a;
    text-decoration: none;
    font-weight: 600;
}
.e-pv-view-btn:active .e-pv-view-icon,
.e-pv-edit-btn:active .e-pv-edit-icon {
    color: #333;
    text-decoration: none;
    font-weight: 600;
}
#Grid table tbody tr:hover {
    background-color: var(--pv-row-hover, rgba(0, 0, 0, 0.04));
}
 
/* Dark theme override (scoped to this page via body classes) */
body.e-dark-mode #Grid table tbody tr:hover,
body[class*='-dark'] #Grid table tbody tr:hover {
    background-color: var(--pv-row-hover-dark, rgba(255, 255, 255, 0.07));
}
</style>

<script>
import { createApp } from 'vue';
import { DialogComponent } from '@syncfusion/ej2-vue-popups';
import { ButtonComponent } from '@syncfusion/ej2-vue-buttons';
import PDFViewerTemplateVue from './read-only-and-edit-viewer.vue';
import { gridData } from './data';
import { ref } from 'vue';
import { PdfViewerComponent } from "@syncfusion/ej2-vue-pdfviewer";

var viewerExternalTemplate = createApp().component(
  'tab-viewemplate-vue',
  PDFViewerTemplateVue
);

export default {
  components: {
    'ejs-dialog': DialogComponent,
    'ejs-button': ButtonComponent,
    'ejs-pdfviewer': PdfViewerComponent
  },
  data: function () {
    return {
      target: '.control-section',
      gridData: gridData,
      showGrid: true,
      showDialog: false,
      filePath: '',
      isStandalone: true,
      isReadOnlyMode: true,
      pdfViewerInstance: ref(null)
    };
  },
  provide: {
  },

  methods: {
    contenttemplateVue: function () {
      return {
        template: viewerExternalTemplate,
        data: {
          filePath: this.filePath,
          isStandalone: this.isStandalone,
          isReadOnlyMode: this.isReadOnlyMode,
        },
      };
    },
    openViewer: function (mode, row) {
      if (mode == 'View') {
        this.filePath = row.Document;
        this.showDialog = true;
        this.header = row.FileName;
        this.isReadOnlyMode = true;
      }
      if (mode == 'Edit') {
        this.filePath = row.Document;
        this.showDialog = true;
        this.header = row.FileName;
        this.isReadOnlyMode = false;
      }
    },

    dialogClose: function () {
      this.showDialog = false;
      this.showGrid = true;
       if (this.pdfViewerInstance) {
        this.pdfViewerInstance.destroy();
      }
    },

    dialogOpen: function () {
      this.showDialog = true;
      this.showGrid = false;
       this.pdfViewerInstance = document.getElementById('pdfviewer').ej2_instances[0];
    },

  },
};
</script>