// Initialize Modules
const { series, parallel, src, task, dest, watch } = require('gulp');
const pug = require('gulp-pug');
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');
const concat = require('gulp-concat');
const postcss = require('gulp-postcss');
const scss = require('gulp-sass');
const sourcemaps = require('gulp-sourcemaps');
const uglify = require('gulp-uglify');


// File Path Variables
const files = {
    pugPath: './src/layouts/**/*.pug',
    scssPath: './src/scss/**/*.scss',
    jsPath: './src/js/**/*.js',
    dev: './builds/development',
    imgPath: './src/img/**/*'
};

// Pug Task
task('pug', function() {
    return src('src/layouts/index.pug')
        .pipe(pug({
            pretty: true
        }))
        .pipe(dest('builds/development'))
});

// Sass Task
task('scss', function() {
    return src(files.scssPath)
        .pipe(sourcemaps.init())
        .pipe(scss())
        .pipe(postcss([ autoprefixer(), cssnano]))
        .pipe(sourcemaps.write('.'))
        .pipe(dest(files.dev + '/css'))
});

// img Task
task('img', function() {
    return src(files.imgPath)
        .pipe(dest(files.dev + '/img'))
});

// JS Task
task('js', function() {
    return src(files.jsPath)
        .pipe(concat('all.js'))
        .pipe(uglify())
        .pipe(dest(files.dev + '/js'))
});




// Watch Task
task('watch', function() {
    watch(files.pugPath, series('pug'));
    watch(files.scssPath, series('scss'));
    watch(files.jsPath, series('js'));
    watch(files.imgPath, series('img'));
});

// Default Task
task('default', parallel(['pug', 'scss', 'js', 'img', 'watch']));
