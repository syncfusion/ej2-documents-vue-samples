<template>
    <div>
        <div class="control-section">
            
            <ejs-pdfviewer 
                id="pdfviewer" 
                ref="pdfviewer" 
                :documentPath="documentPath"
                :resourceUrl="resourceUrl">
            </ejs-pdfviewer>
        </div>
       <div id="action-description">
            <p>This sample demonstrate the core features of PDF Viewer such as PDF viewing, printing, navigation, text search and selection, zooming, panning etc. with its built-in toolbar.</p>
       </div>
 
       <div id="description">
            <p>
                The PDF Viewer component enables you to view and print the PDF files. This sample demonstrate the following key features of PDF Viewer,
            </p>
            <ul>
            <li>View the PDF document</li>
            <li>Core interactions - Scrolling, Zooming, panning and page navigation</li>
            <li>Built-in toolbar</li>
            <li>Select and copy text from PDF file</li>
            <li>Search a text easily across the PDF document</li>
            <li>Easy navigation with the help of Bookmarks, thumbnails, hyperlinks and table of contents</li>
            <li>View modes - fit to page and fit to width</li>
            <li>Print the entire document or a specific page directly from the browser.</li>
            </ul>
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

export default {
    components: {
        'ejs-pdfviewer': PdfViewerComponent
    },
    data: function() {
        return {
			documentPath:'https://cdn.syncfusion.com/content/pdf/pdf-succinctly.pdf',
            resourceUrl: 'https://cdn.syncfusion.com/ej2/23.2.6/dist/ej2-pdfviewer-lib'}
    },
	provide: {
      PdfViewer: [Toolbar, Magnification, Navigation, LinkAnnotation, BookmarkView, ThumbnailView, Print, TextSelection, TextSearch, Annotation, FormFields, FormDesigner,PageOrganizer]
    },
    methods: {
    }
};
</script>