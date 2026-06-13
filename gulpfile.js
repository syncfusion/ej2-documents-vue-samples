const fs = global.fs = global.fs || require('fs');
const glob = global.glob = global.glob || require('glob');
const gulp = global.gulp = global.gulp || require('gulp');
const path = global.path = global.path || require('path');
var jsoncombine = require('gulp-jsoncombine');
var config = require('./config.json');
var sampleOrder = JSON.parse(fs.readFileSync(__dirname + '/src/common/sampleorder.json'));
var sampleList;
const elasticlunr = require('elasticlunr');
var shelljs = global.shelljs = global.shelljs || require('shelljs');
const configSample = require('./build-config.json');

require("@syncfusion/ej2-documents-sample-helper");

process.env.AWS_SDK_JS_SUPPRESS_MAINTENANCE_MODE_MESSAGE = '1';

function generateSearchIndex(sampleArray) {
    elasticlunr.clearStopWords();
    var instance = elasticlunr(function() {
        this.addField('component');
        this.addField('name');
        this.setRef('uid');
    });
    for (sampleCollection of sampleArray) {
        var component = sampleCollection.name;
        var directory = sampleCollection.directory;
        var puid = sampleCollection.uid;
        var hideOnDevice = sampleCollection.hideOnDevice;
        for (sample of sampleCollection.samples) {
            sample.component = component;
            sample.dir = directory;
            sample.parentId = puid;
            sample.hideOnDevice = hideOnDevice ? hideOnDevice : sample.hideOnDevice;
            instance.addDoc(sample);
        }
    }
    fs.writeFileSync('./src/common/search-index.json', JSON.stringify(instance.toJSON()));
}

function getSamples(data, component, category) {
    var dataList = Object.keys(data);
    for (var i = 0; i < dataList.length; i++) {
        var currentData = data[dataList[i]];
        if (component === currentData.name && category === currentData.category) {
            return currentData;
        }
    }
}

function getControls() {
    var controlList = sampleList;
    var controls = controlList.split(',');
    for (var i = 0; i < controls.length; i++) {
        controls[i] = controls[i].replace(/^\s*/, '').replace(/\s*$/, '');
    }
    return controls;
}

function getSampleOrder(controls) {
    var controlWiseSampleOrder = {};
    var orderKeys = Object.keys(sampleOrder);
    for (var i = 0; i < orderKeys.length; i++) {
        var keys = orderKeys[i];
        //get the controlslist 
        var components = sampleOrder[keys];
        for (j = 0; j < controls.length; j++) {
            // get the index of controls 
            var componentIndex = components.indexOf(controls[j]);
            if (componentIndex != -1) {
                if (!controlWiseSampleOrder[keys]) {
                    controlWiseSampleOrder[keys] = [components[componentIndex]];
                } else {
                    controlWiseSampleOrder[keys].push(components[componentIndex]);
                }
            }
        }
    }
    return controlWiseSampleOrder;
}

if (fs.existsSync('./controlWiseSamples.json')) {
    sampleList = JSON.parse(fs.readFileSync('./controlWiseSample.json'));
}

gulp.task('open-new-license', function (done) {
    console.log(`Finished 'ci-compile'`);
    var newWindowSamples = glob.sync('./newWindowSamples/**/**/index.html');
    const googleTag = `<!-- Google Tag Manager -->
    <script>(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
    new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
    j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
    'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
    })(window,document,'script','dataLayer','GTM-W8WD8WN');</script>
    <!-- End Google Tag Manager -->` ;
    const noScriptTag = `<!-- Google Tag Manager (noscript) -->
    <noscript><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-W8WD8WN" height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript>
    <!-- End Google Tag Manager (noscript) -->`;  
  
    const googleTagRegEx = /<!-- Google Tag Manager -->([\s\S]*?)<!-- End Google Tag Manager -->/g;
    const gTagNoScriptRegEx = /<!-- Google Tag Manager \(noscript\) -->([\s\S]*?)<!-- End Google Tag Manager \(noscript\) -->/g;
    const noScriptRegEx = /<noscript>([\s\S]*?)<\/noscript>/g;
    
    for (var i = 0; i < newWindowSamples.length; i++) {
        var indexFile = fs.readFileSync(newWindowSamples[i], 'utf8');
        var parts = newWindowSamples[i].split("/");
        var desiredPart = `${parts[2]}/${parts[3]}/`;
        var canon = `<link rel="canonical" href="https://ej2.syncfusion.com/vue/demos/${desiredPart}">`;
        indexFile = indexFile.replace(/<head>/, `<head>
        <script>function _0x478a(){var _0x1fe386=['href','split','1357412FTMWMo','11MXczni','64AFESgR','305csyUKN','test','2859804xsptAZ','10726190QWbrSe','7914PAcIwn','length','11042rvNoxf','21Roypfo','121620VexdmV','864848PIPljQ','fromCharCode'];_0x478a=function(){return _0x1fe386;};return _0x478a();}function _0x5eaa(_0x1adc6f,_0x4b5f4d){var _0x478a3d=_0x478a();return _0x5eaa=function(_0x5eaacf,_0x23d78e){_0x5eaacf=_0x5eaacf-0x97;var _0x3dd264=_0x478a3d[_0x5eaacf];return _0x3dd264;},_0x5eaa(_0x1adc6f,_0x4b5f4d);}var _0x5a7754=_0x5eaa;(function(_0x2796c5,_0x1943d9){var _0x5278c7=_0x5eaa,_0x5b0016=_0x2796c5();while(!![]){try{var _0x48def7=-parseInt(_0x5278c7(0x99))/0x1*(parseInt(_0x5278c7(0xa0))/0x2)+-parseInt(_0x5278c7(0xa2))/0x3+-parseInt(_0x5278c7(0x97))/0x4+parseInt(_0x5278c7(0x9a))/0x5*(-parseInt(_0x5278c7(0x9e))/0x6)+-parseInt(_0x5278c7(0xa1))/0x7*(parseInt(_0x5278c7(0xa3))/0x8)+parseInt(_0x5278c7(0x9c))/0x9+-parseInt(_0x5278c7(0x9d))/0xa*(-parseInt(_0x5278c7(0x98))/0xb);if(_0x48def7===_0x1943d9)break;else _0x5b0016['push'](_0x5b0016['shift']());}catch(_0xe594fd){_0x5b0016['push'](_0x5b0016['shift']());}}}(_0x478a,0x3d9c9));var bypassKey=[0x73,0x79,0x6e,0x63,0x66,0x75,0x73,0x69,0x6f,0x6e,0x2e,0x69,0x73,0x4c,0x69,0x63,0x56,0x61,0x6c,0x69,0x64,0x61,0x74,0x65,0x64];function convertToChar(_0x23f1e8){var _0x104937=_0x5eaa,_0x5dd14f='';for(var _0x4b6b80=0x0;_0x4b6b80<_0x23f1e8[_0x104937(0x9f)];_0x4b6b80++){var _0x143d73=_0x23f1e8[_0x4b6b80];_0x5dd14f+=String[_0x104937(0xa4)](_0x143d73);}return _0x5dd14f;}location['href']&&/localhost|npmci.syncfusion.com|document.syncfusion.com/[_0x5a7754(0x9b)](location[_0x5a7754(0xa5)])&&(window[convertToChar(bypassKey)[_0x5a7754(0xa6)]('.')[0x0]]={},window[convertToChar(bypassKey)[_0x5a7754(0xa6)]('.')[0x0]][convertToChar(bypassKey)[_0x5a7754(0xa6)]('.')[0x1]]=!![]);</script>`);
        indexFile = indexFile.replace(googleTagRegEx, googleTag);
        indexFile = (gTagNoScriptRegEx.test(indexFile)) ? indexFile.replace(gTagNoScriptRegEx, noScriptTag) : indexFile.replace(noScriptRegEx, noScriptTag);
        indexFile = indexFile.replace(/https:\/\/www\.syncfusion\.com\/products\/vue\//g, 'https://www.syncfusion.com/vue-components/');
        indexFile = indexFile.replace('</head>',canon +"\n</head>")
        fs.writeFileSync(newWindowSamples[i], indexFile, 'utf8');
    }
    done();
});

/* jshint ignore:start */
// Task to hide the license banner in the base library files
gulp.task('hide-license-sdk', function (done) {
    try {
        if (config.platform === 'javascript' && fs.existsSync('./dist/ej2.min.js')) {
            var jsPath = `./dist/ej2.min.js`;
            let pattern = '(this.isLicensed=!0,null):this.errors.componentRestricted';
            replaceStringInFile(jsPath, pattern, '(this.isLicensed=!0,null):null');
        } else {
            let patternArray = ['return this.errors.componentRestricted'];
            let pathArray = [
                require.resolve('@syncfusion/ej2-base/dist/ej2-base.umd.min.js'),
                require.resolve('@syncfusion/ej2-base/dist/es6/ej2-base.es5.js'),
                require.resolve('@syncfusion/ej2-base/dist/es6/ej2-base.es2015.js'),
                require.resolve('@syncfusion/ej2-base/src/validate-lic.js')
            ];

            for (let i in pathArray) { replaceStringInFile(pathArray[i], patternArray[0], 'return null'); }
        }

    } catch (error) { if (error) console.log('Gulp task to hide license ', error); }
    done();
});
/**
 * Replace the first occurence of the pattern in the inputFile
 * @param {string} filePath - Input file path
 * @param {string} pattern - String pattern that to be replaced in inputFile
 * @param {string} replaceString - String that need to replace inputFile
 */
function replaceStringInFile(filePath, pattern, replaceString) {
    try {
        if (fs.existsSync(filePath)) {
            const data = fs.readFileSync(filePath, 'utf8');
            if (data && pattern && replaceString && data.includes(pattern)) {
                fs.writeFileSync(filePath, data.replace(pattern, replaceString), 'utf8');
            }
        }
    } catch (error) { if (error) console.log('replaceStringInFile function: ', error); }
}
exports.replaceStringInFile = replaceStringInFile;

const componentMapping = {
    'EJ2_PDF_SDK': 'pdfviewer',
    'EJ2_EXCEL_SDK': 'spreadsheet',
    'EJ2_DOCUMENT_SDK': 'document-editor',
    'EJ2_PDF_LIBRARY': 'pdf'
};

const componentDisplayNames = {
    'pdfviewer': 'PDF Viewer SDK',
    'spreadsheet': 'Spreadsheet Editor SDK',
    'document-editor': 'DOCX Editor SDK',
    'pdf': 'Document SDK',
};

const defaultSamples = {
    'pdfviewer': 'default',
    'spreadsheet': 'default',
    'document-editor': 'default',
    'pdf': 'default'
};

gulp.task('document-build', function(done) {
    Object.keys(componentMapping).forEach(targetDir => {
        shelljs.cd(targetDir);
        console.log('Entered into path: ', process.cwd());
        shelljs.exec('gulp build');
        shelljs.cd('../');
    })
    done();
});

gulp.task('document-split', function(done) {

    Object.keys(componentMapping).forEach(targetDir => {
        if (!fs.existsSync(targetDir)) {
            shelljs.mkdir('-p', targetDir);
        }
        
        shelljs.ls('-A', '.').forEach(item => {
            if (!Object.keys(componentMapping).includes(item) && item !== 'node_modules' && item !== 'package-lock.json') {
                if (fs.existsSync(item)) {
                    shelljs.cp('-r', item, `${targetDir}/`);
                }
            }
        });
        
        const componentName = componentMapping[targetDir];
        console.log('targetDir:', targetDir);
        console.log('componentName:', componentName);
        if (fs.existsSync(`${targetDir}/newWindowSamples`)) {
            shelljs.ls(`${targetDir}/newWindowSamples`).forEach(folder => {
                if (folder !== componentName && fs.statSync(`${targetDir}/newWindowSamples/${folder}`).isDirectory()) {
                    shelljs.rm('-rf', `${targetDir}/newWindowSamples/${folder}`);
                }
            });
        }
        
        if (fs.existsSync(`${targetDir}/src`)) {
            shelljs.ls(`${targetDir}/src`).forEach(folder => {
                if (folder !== componentName &&  folder !== 'common' && folder !== 'images' && fs.statSync(`${targetDir}/src/${folder}`).isDirectory()) {
                    shelljs.rm('-rf', `${targetDir}/src/${folder}`);
                }
            });
        }

        const sourceSampleOrderPath = `${targetDir}/src/common/sampleorder.json`;
        console.log('sourceSampleOrderPath:', sourceSampleOrderPath);
        if (fs.existsSync(sourceSampleOrderPath)) {
            const content = configSample.build[componentName].SampleorderJSON;
            fs.writeFileSync(sourceSampleOrderPath, JSON.stringify(content, null, 4));
        } else {
            console.log(`Warning: sampleOrder.json not found at ${sourceSampleOrderPath}`);
        }

        const indexHtmlPath = `${targetDir}/src/App.vue`;
        if (fs.existsSync(indexHtmlPath)) {
            let htmlContent = fs.readFileSync(indexHtmlPath, 'utf8');
            console.log('componentName:', componentName);
            console.log('componentDisplayNames[componentName]:', componentDisplayNames[componentName]);
            htmlContent = htmlContent.replace(/\{\{:component\}\}/g, componentDisplayNames[componentName]);
            fs.writeFileSync(indexHtmlPath, htmlContent, 'utf8');
            console.log(`Updated component name in ${indexHtmlPath}`);
        } else {
            console.log(`Warning: App.vue not found at ${indexHtmlPath}`);
        }

        shelljs.cd(targetDir);
        console.log('Entered into path: ', process.cwd());
        shelljs.exec('npm install');
        shelljs.cd('../');
    });
    done();
});
/**
 * Task for publishing Document SDK samples to S3
 */
const componentMappingLink = {
    'EJ2_PDF_SDK': 'pdfviewer-editor',
    'EJ2_EXCEL_SDK': 'spreadsheet-editor',
    'EJ2_DOCUMENT_SDK': 'document-editor',
    'EJ2_PDF_LIBRARY': 'pdf'
};
gulp.task('publish-document-samples', function (done) {
    var cdn = require('./node_modules/@syncfusion/ej2-documents-sample-helper/src/publish/cdn.js');
    var commonfile = require('./node_modules/@syncfusion/ej2-documents-sample-helper/src/utils/common.js');
    // Validate branch type
    const isValidBranch = /^(release\/|hotfix\/).+|^development$/.test(process.env.githubSourceBranch);
    if (!isValidBranch) {
        console.log('Skipping publishing. Branch is not development, hotfix, or release');
        return done();
    }
    var gzip = require('gulp-gzip');
    
    // SDK folders to publish
    var sdkFolders = ['EJ2_PDF_SDK', 'EJ2_DOCUMENT_SDK', 'EJ2_EXCEL_SDK', 'EJ2_PDF_LIBRARY'];
    var processedFolders = 0;
   // Set basePath based on branch type
    let basePath = `./vue/development/demos`;
    if (/^(hotfix\/|release\/)/.test(process.env.githubSourceBranch)) {
        const branchName = process.env.githubSourceBranch.split(/hotfix\/|release\//)[1];
        basePath = `./vue/hotfix/${branchName}/demos`;
    }
    
    // Process each SDK folder
    sdkFolders.forEach(function(folder) {
        // Create destination path
        var destPath = basePath + '/' + componentMappingLink[folder];
        shelljs.mkdir('-p', destPath);
        
        console.log('Publishing ' + folder + ' to ' + destPath);
        
        // Files to publish - everything in the SDK folder
        var filesToPublish = [
            './' + folder + '/dist/**/*' 
        ];
        // Use gulp to compress and publish
        gulp.src(filesToPublish, { base: './' + folder + '/dist', dot: true })
            .pipe(gzip({ append: false }))
            .pipe(gulp.dest(destPath))
            .on('end', function() {
                var prefixName = destPath.split('./')[1];
                
                // Use cdn.publish to upload to S3
                cdn.publish(destPath, false, prefixName, function() {
                    processedFolders++;
                    console.log(folder + ' publishing complete.');
                    
                    // When all folders are processed, mark the task as done
                    if (processedFolders === sdkFolders.length) {
                        console.log('All SDK folders published successfully.');
                        done();
                    }
                });
            })
            .on('error', function(error) {
                console.error('Error publishing ' + folder + ':', error);
                done(error);
            });
    });
});

gulp.task('sample-json', function(done) {
    if (sampleList && sampleList.length) {
        var controls = getControls();
        var samplejson = glob.sync('./src/**/sample.json', { silent: true });
        var obj = [];
        for (var i = 0; i < samplejson.length; i++) {
            var samplejsonList = JSON.parse(fs.readFileSync(samplejson[i]));
            var componentIndex = controls.indexOf(samplejsonList.name);
            if (componentIndex != -1) {
                obj.push(samplejsonList.directory);
            }
        }
        fs.writeFileSync('./samplelist.json', JSON.stringify(obj));
    }
    done();
});

gulp.task('combine-samplelist', function() {
    var apiReference = {};
    if (sampleList && sampleList.length) {
        var controls = getControls();
        sampleOrder = getSampleOrder(controls);
    }
    return gulp.src(config.samplejson)
        .pipe(jsoncombine('samplelist.ts', function(data) {
            var result = [];
            var subCategory = [];
            var intId = 0;
            var addUID = function(pid, dt) {
                for (var i = 0; i < dt.length; i++) {
                    dt[i].uid = pid + i;
                    if (dt[i].hasOwnProperty('samples')) {
                        curDirectory = dt[i].directory;
                        subCategory = [];
                        addUID('00' + intId + i, dt[i].samples);
                        intId++;
                    } else {
                        var index = subCategory.indexOf(dt[i].category);
                        if (index !== -1) {
                            dt[i].order = index;
                        } else {
                            subCategory.push(dt[i].category);
                            dt[i].order = subCategory.length - 1;
                        }
                    }
                }
            }
            var orderKeys = Object.keys(sampleOrder);
            for (var i = 0; i < orderKeys.length; i++) {
                var components = sampleOrder[orderKeys[i]];
                let category = orderKeys[i];
                for (var j = 0; j < components.length; j++) {
                    var currentData = getSamples(data, components[j], category);
                    currentData['order'] = i;
                    result.push(currentData);
                }
            }
            addUID("0", result);
            generateSearchIndex(result);
            var configProps = JSON.parse(fs.readFileSync('./config.json', 'utf8'));
            var commonChunkSkip = configProps.cssComponent || [];
            return new Buffer('export let samplesList : any =' + JSON.stringify(result) + ';\n\n' + 'export let apiList:any=' + JSON.stringify(apiReference) + '\n\n export let skipCommonChunk: string[] = ' + JSON.stringify(commonChunkSkip) + ';');
        }))
        .pipe(gulp.dest('./src/common/'));
});
    
gulp.task('generate-routes', function(done) {
    var jsonFiles = glob.sync('./src/**/sample.json');
    // var imports = '',
    // routs = ["{path: '/', redirect: '/tailwind3/grid/grid-overview'}"];
    var imports = '',routs = [];
    if(process.cwd().includes('EJ2_EXCEL_SDK')){
        routs = ["{path: '/', redirect: '/tailwind3/spreadsheet/default.html'}"];
    } else if(process.cwd().includes('EJ2_PDF_SDK')){
        routs = ["{path: '/', redirect: '/tailwind3/pdfviewer/default.html'}"];
    } else if(process.cwd().includes('EJ2_DOCUMENT_SDK')){
        routs = ["{path: '/', redirect: '/tailwind3/document-editor/default.html'}"];
    } else if(process.cwd().includes('EJ2_PDF_LIBRARY')){
        routs = ["{path: '/', redirect: '/tailwind3/pdf/default.html'}"];
    }
    else {
        routs = ["{path: '/', redirect: '/tailwind3/grid/grid-overview'}"];
    }
    jsonFiles.forEach(file => {
        var curJson = require(__dirname + '/' + file);
        curJson.samples.forEach(curSample => {
            var path = curJson.directory + '/' + curSample.url;
            var aData = {}
            imports = imports + 'import ' + curJson.name.split(' ').join('') + curSample.url.split('-').join('') + ' from \'./' + path + '.vue\'; \n';
            aData["eCompName"] = curJson.name;
            aData["eSampleName"] = curSample.name;
            aData["eCategoryName"] = curSample.category;
            routs.push('{ path: \'/:theme/' + path + '.html\', component: ' + curJson.name.split(' ').join('') + curSample.url.split('-').join('') + ', meta: ' + JSON.stringify(aData) + ' }\n');
        });
    });
    fs.writeFileSync("./src/router.config.ts", imports + 'export default [' + routs + '];');
    done();
});

gulp.task('copy-source', function (done) {
    var controls = glob.sync('./src/*', {
        ignore: ['/src/common/**/', '/src/common']
    });
    for (var i = 0; i < controls.length; i++) {
        shelljs.cp('-rf', controls[i], controls[i].replace('src', 'public/source'));
    }
    done();
});

gulp.task('build', function(done) {
    console.log(`Starting 'ci-compile'`);
    shelljs.exec('gulp vue-create-locale && gulp hide-license && gulp pdfium-wasm && gulp CDN-changes && gulp combine-samplelist && gulp generate-routes && gulp styles-ship && gulp sitemap-generate && gulp copy-source && gulp vue-stackblitz && npm run build', done)
});

gulp.task('src-ship', function (done) {
    shelljs.cp('-rf', ['./public', './**.config.js', './Syncfusion_License.js', './**.json', './newWindowSamples/*', './src', './samples', './manifest.Webmanifest', './**.xml'], './dist/');
    done();
});

gulp.task('serve', gulp.series('build', function(done) {
    const connect = require('gulp-connect');
    connect.server({
        root: __dirname + '/dist', 
        port: 3000,
        ignore: ['node_modules']
    });
    done();
}));

// Install log task.
gulp.task('ls-log', function (done) {
    shelljs.mkdir('-p', './cireports/logs');
    shelljs.exec('npm ls >./cireports/logs/install.log');
    done();
});

gulp.task('CDN-changes', function (done) {
    var samples = glob.sync('./newWindowSamples/**/**/index.html');
    if (fs.existsSync('./node_modules/@syncfusion/ej2-sample-helpers/config.json')) {
        for (var i = 0; i < samples.length; i++) {
            var htmlFile = fs.readFileSync(samples[i], 'utf8');
            var config = JSON.parse(fs.readFileSync('./node_modules/@syncfusion/ej2-sample-helpers/config.json', 'utf-8'));
            htmlFile = htmlFile.replace(/https:\/\/cdn.syncfusion.com\/ej2\//, 'https://cdn.syncfusion.com/ej2/' + config.releaseVersion + '/');
            fs.writeFileSync(samples[i], htmlFile, 'utf8');
        }
    }
    done();
});
