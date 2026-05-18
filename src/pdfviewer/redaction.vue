<template>
    <div>
        <div class="control-section">
            <ejs-pdfviewer 
                id="pdfviewer" 
                ref="pdfviewer" 
                :documentPath="documentPath"
                :resourceUrl="resourceUrl"
                :toolbarSettings="toolbarSettings"
                :documentLoad="documentLoad">
            </ejs-pdfviewer>
        </div>
       <div id="action-description">
            <p> The `PDF Viewer` includes support for redaction annotations, enabling users to permanently remove sensitive or confidential information from PDF files. This feature offers a straightforward and effective redaction process, allowing secure content management directly within the viewer interface. </p>
        </div>

        <div id="description">
            <p> This example illustrates how to `perform redaction` using the PDF Viewer. Users can select areas on one or `multiple pages` and customize redaction properties as needed. By clicking the 'Redact' button, the marked content is permanently removed, and the updated document is reloaded into the viewer. The redacted file can then be saved or reopened for further use.
            </p>
            <p>
                More information on adding annotation programmatically can be found in this
                <a target="_blank" href="https://help.syncfusion.com/document-processing/pdf/pdf-viewer/vue/getting-started">
                    documentation section</a>.
            </p>
        </div>
    </div>
</template>
<style scoped>
	#pdfviewer {
		height: 640px;
	}

.flex-container {
    display: flex;
    justify-content: flex-end;
    align-items: center;
}

.render-mode-info {
    background: none;
    border: none;
    padding-left: 0px;
}

.render-mode-info .render-mode-info-icon {
    height: 16px;
    width: 16px;
}

.switchLabel {
    font-family: "Segoe UI", "GeezaPro", "DejaVu Serif", sans-serif;        
    font-weight: 400;
    line-height: 20px;
    letter-spacing: 0.24px;
    text-align: right;
    font-size: 14px;
    margin-bottom: 3px;
}

.render-mode-info .render-mode-info-icon::before {
    line-height: normal;
}

.buttonSwitch {
    Width: 40px;
    Height: 24px;
}

</style>
<script>
import { PdfViewerComponent, Toolbar, Magnification, Navigation, LinkAnnotation, BookmarkView, ThumbnailView, Print, TextSelection, TextSearch, Annotation, FormFields, FormDesigner,PageOrganizer } from "@syncfusion/ej2-vue-pdfviewer";

export default {
    components: {
        'ejs-pdfviewer': PdfViewerComponent,
    },
    data: function() {
        return {
            documentPath: 'https://cdn.syncfusion.com/content/pdf/pdf-succinctly.pdf',
            resourceUrl: 'https://cdn.syncfusion.com/ej2/23.2.6/dist/ej2-pdfviewer-lib',
            toolbarSettings: {
                showTooltip: true,
                toolbarItems: ['OpenOption', 'UndoRedoTool', 'PageNavigationTool', 'MagnificationTool', 'PanTool', 'SelectionTool', 'CommentTool', 'SubmitForm', 'AnnotationEditTool', 'RedactionEditTool', 'FormDesignerEditTool', 'SearchOption', 'PrintOption', 'DownloadOption']
            }
        };
    },

	provide: {
      PdfViewer: [Toolbar, Magnification, Navigation, LinkAnnotation, BookmarkView, ThumbnailView, Print, TextSelection, TextSearch, Annotation, FormFields, FormDesigner,PageOrganizer]
    },
    methods: {
        documentLoad: function (args) {
            var viewer = this.$refs.pdfviewer.ej2Instances;
            viewer.toolbar.showRedactionToolbar(true);
            viewer.dataBind();
        },
    }
};
</script>