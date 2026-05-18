<template>
    <div>
        <div class="control-section">
        
        <ejs-pdfviewer 
            id="pdfviewer" 
            ref="pdfviewer" 
            :documentPath="documentPath"
            :resourceUrl="resourceUrl"
            :created="created"
            :toolbarSettings="toolbarSettings"
            :annotationSettings="annotationSettings"
            :enableAnnotationToolbar="false"
            :enablePageOrganizer="false"
            :enableDownload="false"
            >
        </ejs-pdfviewer>
        </div>
       <div id="action-description">
       <p>The sample showcases the PDF viewer operating in a read-only mode, which restricts the ability to make changes to annotations and form fields.</p>
       </div> 
       <div id="description">
       <p>
       More information on the PDF Viewer instantiation can be found in this
       <a target="_blank"
       href="https://help.syncfusion.com/document-processing/pdf/pdf-viewer/vue/getting-started">
       documentation section</a>.
       </p>
        </div>
    </div>
</template>
<style scoped>
	#pdfviewer {
		height: 640px;
	}


</style>
<script>
import { PdfViewerComponent, Toolbar, Magnification, Navigation, LinkAnnotation, BookmarkView, ThumbnailView, Print, TextSelection, TextSearch, Annotation, FormFields, FormDesigner } from "@syncfusion/ej2-vue-pdfviewer";
import { SwitchComponent } from "@syncfusion/ej2-vue-buttons";

export default {
    components: {
        'ejs-pdfviewer': PdfViewerComponent,
        'ejs-switch': SwitchComponent 
    },
    data: function() {
        return {
			documentPath:'https://cdn.syncfusion.com/content/pdf/restricted-formfield.pdf',
            resourceUrl: 'https://cdn.syncfusion.com/ej2/23.2.6/dist/ej2-pdfviewer-lib',
            toolbarSettings:{ showTooltip : true, toolbarItems: ['OpenOption', 'PageNavigationTool', 'MagnificationTool', 'PanTool', 'PrintOption']},
            enableStickyNotesAnnotation:false,
            annotationSettings:{isLock:true},
        }
           
    },
	provide: {
      PdfViewer: [Toolbar, Magnification, Navigation, LinkAnnotation, BookmarkView, ThumbnailView, Print, TextSelection, TextSearch, Annotation, FormFields, FormDesigner]
    },
    methods: {
        // Initialize switchObj within the mounted hook

        created: function (args) { 
            var viewer = document.getElementById('pdfviewer').ej2_instances[0];
            
            viewer.textFieldSettings = {
                isReadOnly: true,
            };
            viewer.passwordFieldSettings = {
                isReadOnly: true,
            };
            viewer.checkBoxFieldSettings = {
                isReadOnly: true,
            };
            viewer.radioButtonFieldSettings = {
                isReadOnly: true,
            };
            viewer.listBoxFieldSettings = {
                isReadOnly: true,
            };
            viewer.DropdownFieldSettings = {
                isReadOnly: true,
            };
            viewer.signatureFieldSettings = {
                isReadOnly: true,
            };
            viewer.initialFieldSettings = {
                isReadOnly: true,
            };

            viewer.contextMenuOption="None";
            viewer.dataBind();
        },
    }
};
</script>