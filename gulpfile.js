const imagemin = require('gulp-imagemin');
const ttf2woff2 = require('gulp-ttf2woff2');
const gulpWebpCss = require('gulp-webp-css');
const { pipe } = require('rxjs');

let project_folder = require('path').basename(__dirname);
let source_folder = "#src";

let path = {
    build: {
        html: project_folder + "/",
        css: project_folder + "/css/",
        js: project_folder + "/js/",
        img:project_folder + "/img/",
        fonts: project_folder + "/fonts/",
        icons: project_folder + "/icons/"
    },

    src: {
        html: [source_folder + "/*.html", "!" + source_folder + "/_*.html"],
        css: source_folder +"/sass/*.scss",
        js: source_folder + "/js/*.js",
        fonts: source_folder + "/fonts/",
        img: source_folder + "/img/**/*.{jpg,png,svg,gif,ico,webp}",
        icons: source_folder + "/icons/**/*.{jpg,png,svg,gif,ico,webp}"
    },

    watch: {
        html: source_folder + "/**/*.html",
        css: source_folder + "/sass/**/*.scss",
        js: source_folder + "/js/*.js",
        fonts: source_folder + "/fonts/",
        img: source_folder + "/img/**/*.{jpg,png,svg,gif,ico,webp}",
        icons: source_folder + "/icons/**/*.{jpg,png,svg,gif,ico,webp}"
    }

}

let {src , dest} = require('gulp'),
    gulp = require('gulp'),
    browsersync = require('browser-sync').create(),
    fileInclude = require('gulp-file-include'),
    sass = require('gulp-sass')(require('sass')),
    gulpAutoprefixer = require('gulp-autoprefixer'),
    group_media = require('gulp-group-css-media-queries'),
    rename = require('gulp-rename'),
    clean_css = require('gulp-clean-css'),
    uglify = require('gulp-uglify-es').default,
    webp = require('gulp-webp'),
    webpHTML = require('gulp-webp-html'),
    ttf2woff = require('gulp-ttf2woff'),
    gulpFonter = require('gulp-fonter');
    //ttf2woff2 = require('gulp-ttf2woff2');
    

    // webpCSS = require('gulp-webpcss');
    //webpcss = require('gulp-webp-css');
    //imagemin = require ('gulp-imagemin');
    
    

function browserSync (params){
    browsersync.init({
        server:{
            baseDir: "./" + project_folder + "/"
        },
        port: 3000,
        notify: false
    })
}    

function html (){
    return src(path.src.html)
        .pipe(webpHTML())
        .pipe(fileInclude())
        .pipe(dest(path.build.html))
        .pipe(browsersync.stream())
}

function js() {
    return src(path.src.js)
    .pipe(fileInclude())
    .pipe(dest(path.build.js))
    .pipe(
        uglify()
    )
    .pipe(
        rename({
            extname: ".min.js"
        })
    )
    .pipe(dest(path.build.js))
    .pipe(browsersync.stream())

}

function css (){
    return src(path.src.css)
        .pipe(
            sass({
                outputStyle: 'compressed'
            })
        )
        .pipe(group_media())
        .pipe(
            gulpAutoprefixer({
                overrideBrowserList: ["last 5 version"],
                cascade: true
            })
        )
        
        .pipe(dest(path.build.css))
        .pipe(clean_css())
        .pipe(
            rename({
                extname: ".min.css"
            })
        )
        .pipe(dest(path.build.css))
        .pipe(browsersync.stream())

}

function images (){
    return src (path.src.img)
        .pipe(
            webp({
                quality: 70
            })
        )
        .pipe(dest(path.build.img))
        .pipe(src(path.src.img))
        .pipe(
            imagemin({
                progressive: true,
                svgPlugins:[{removeViewBox: false}],
                optimizationLevel: 5 // 0 to 7
            })
        )
        .pipe(dest(path.build.img))
        .pipe(browsersync.stream())
}


function fonts (){
      src(path.src.fonts)
      .pipe(dest(path.build.fonts))
      .pipe(browsersync.stream())
        .pipe(
            ttf2woff()
        )
        .pipe(dest(path.build.fonts))
        return src(path.src.fonts) 
         .pipe(
            ttf2woff2()
        )
        .pipe(dest(path.build.fonts))   
}

// gulp.task('otftottf' , function (){
//     return src([source_folder + "/fonts/*.otf"])
//         .pipe(fonter({
//             formats: ['ttf']
//         }))
//         .pipe(dest(source_folder + '/fonts/'));
// })

function icons (){
    return src(path.src.icons)
        .pipe(dest(path.build.icons))
        .pipe(browsersync.stream())
}


function watchFiles(){
    gulp.watch([path.watch.html], html);
    gulp.watch([path.watch.css], css);
    gulp.watch([path.watch.js], js);
    gulp.watch([path.watch.img], images);
    gulp.watch([path.src.icons], icons);
    
}






let build = gulp.series(gulp.parallel(js,css, html,images,fonts, icons));
let watch = gulp.parallel(build,browserSync, watchFiles,icons);


exports.icons = icons;
exports.fonts = fonts;
exports.images = images;
exports.js = js
exports.css = css;
exports.build = build;
exports.html = html;
exports.watch = watch;
exports.default = watch;