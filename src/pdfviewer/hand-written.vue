<template>
    <div>
        <div class="control-section">
            <ejs-pdfviewer
            id="pdfviewer" 
            ref="pdfviewer" 
            :documentPath="documentPath" 
            :documentLoad="documentLoad"
            :resourceUrl="resourceUrl">
            </ejs-pdfviewer>
        </div>
        <div id="action-description">
            <p>This sample demonstrates the Handwritten signature and initial support of the PDF Viewer. The signature or
                initial support reduces the paperwork of reviewing the contents and it is verified digitally.</p>
        </div>

        <div id="description">
            <p>
                In the PDF Viewer component, we can explicitly open the Handwritten signature dialog or initial dialog using
                the method setAnnotationMode.
            </p>
            <p>
                More information on the PDF Viewer instantiation can be found in this
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


</style>

<script>
import { PdfViewerComponent, Toolbar, Magnification, Navigation, LinkAnnotation, BookmarkView, ThumbnailView, Print, TextSelection, TextSearch, Annotation, FormFields, FormDesigner,PageOrganizer } from "@syncfusion/ej2-vue-pdfviewer";
var isInitialLoading = false;
export default {
    components: {
        'ejs-pdfviewer': PdfViewerComponent
    },
    data: function () {
        return {
            documentPath: 'https://cdn.syncfusion.com/content/pdf/handwritten-signature.pdf',
            resourceUrl: 'https://cdn.syncfusion.com/ej2/23.2.6/dist/ej2-pdfviewer-lib',
            isInitialLoading: true
        }
    },
    mounted() {
        isInitialLoading = true;
    },
    provide: {
        PdfViewer: [Toolbar, Magnification, Navigation, LinkAnnotation, BookmarkView, ThumbnailView, Print, TextSelection, TextSearch, Annotation, FormFields, FormDesigner,PageOrganizer]
    },
    methods: {
        documentLoad: function (args) {
            if(isInitialLoading){
                this.$refs.pdfviewer.ej2Instances.annotationModule.setAnnotationMode('HandWrittenSignature');
                isInitialLoading = false;
            }
        },
    }
};
</script>