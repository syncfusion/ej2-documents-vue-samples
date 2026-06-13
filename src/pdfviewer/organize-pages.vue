<template>
    <div>
        <div class="control-section">
            
            <ejs-pdfviewer 
                id="pdfviewer" 
                ref="pdfviewer" 
                :documentPath="documentPath"
                :documentLoad="documentLoad"
                :resourceUrl="resourceUrl"
                :pageOrganizerSettings="pageOrganizerSettings">
            </ejs-pdfviewer>
        </div>
       <div id="action-description">
        <p>This sample showcases the page organization features of the PDF Viewer component, allowing users to effortlessly insert, delete, rearrange, copy, import, undo, redo, and rotate pages. Additionally, users can select all pages for collective adjustments and save changes instantly or download the edited document.</p>
       </div>
 
       <div id="description">
        <p>
            Explore the comprehensive page organization capabilities of the PDF Viewer component through this sample. Users can seamlessly manage the PDF documents with the following functionalities:
        </p>
        <ul>
            <li>Add new pages to the document to integrate additional content seamlessly.</li>
            <li>Remove unnecessary pages with ease, streamlining document management.</li>
            <li>Resolve orientation issues by rotating pages clockwise <code>right</code>  or counterclockwise <code>left</code> as required.</li>
            <li>Conveniently select all pages for uniform adjustments and modifications.</li>
            <li>Rearrange pages by dragging and dropping selected pages to the desired position.</li>
            <li>Copy pages by selecting the thumbnails and using the copy option; duplicates are added next to the selected pages.</li>
            <li>Click the "Import Documents" icon in the toolbar to import a document. If any thumbnail is selected, the new document will be imported next to it; otherwise, it will be imported as the first thumbnail.</li>
            <li>Undo and redo actions are available at the organize pages dialog.</li>
            <li>Enjoy real-time updates as any changes made to the page organization are instantly reflected within the PDF Viewer, when you click on the <code>Save</code> button.</li>
            <li>Utilize the <code>Save As</code> feature to preserve edits, enabling users to download the modified version of the PDF document for future reference.</li>
            <li>Zoom in or out of page images using the slider opened through the page zoom icon available in the toolbar or using keyboard accessibility.</li>
            <li>Use the Extract Pages option in the toolbar to split the pages into separate files or combine them into a single document.</li>
        </ul>      
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
import { PdfViewerComponent, Toolbar, Magnification, Navigation, LinkAnnotation, BookmarkView, ThumbnailView, Print, TextSelection, TextSearch, Annotation, FormFields, FormDesigner,PageOrganizer} from "@syncfusion/ej2-vue-pdfviewer";
var isInitialLoading = false;
export default {
    components: {
        'ejs-pdfviewer': PdfViewerComponent
    },
    data: function() {
        return {
			documentPath:'https://cdn.syncfusion.com/content/pdf/pdf-succinctly.pdf',
            resourceUrl: 'https://cdn.syncfusion.com/ej2/23.2.6/dist/ej2-pdfviewer-lib',
            pageOrganizerSettings: { showImageZoomingSlider: true },
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
            if(isInitialLoading)
            {
                this.$refs.pdfviewer.ej2Instances.isPageOrganizerOpen = true;
                isInitialLoading = false;
            }
            else{
                this.$refs.pdfviewer.ej2Instances.isPageOrganizerOpen = false;
            }
        },

    }
};
</script>