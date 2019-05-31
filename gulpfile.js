var gulp = require('gulp');
var imagemin = require('gulp-imagemin');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var cleanCSS = require('gulp-clean-css');
var browserSync = require('browser-sync').create();
var useref = require('gulp-useref');
var gulpIf = require('gulp-if');

var paths = {
  html: {
    src: 'src/*.html',
    dest: 'dist'
  },
  styles: {
    src: 'src/css/*.css',
    dest: 'dist/css/'
  },
  scripts: {
    src: 'src/js/*.js',
    dest: 'dist/js/'
  },
  img: {
    src: 'src/img/*',
    dest: 'dist/img'
  }
};

// DEFINIGN TASKS //
// * Most tasks will apply methods - minify code, Copy to Dist Folder

//Applying Methods to JS

function scripts() { 
  return gulp.src(paths.scripts.src)
    .pipe(concat('main.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest(paths.scripts.dest));
}

//Applying Methods to css
function styles() {
  return gulp.src(paths.styles.src)
    .pipe(cleanCSS())
    .pipe(concat('main.min.css'))
    .pipe(gulp.dest(paths.styles.dest));
}

// Optimize Images
function imageMin() {
  return gulp.src(paths.img.src)
    .pipe(imagemin())
    .pipe(gulp.dest(paths.img.dest));
}

// Copy All HTML files & point css/scripts to miinified V
function copyHtml() {
  return gulp.src(paths.html.src)
    .pipe(useref())
    .pipe(gulpIf('*.js', uglify()))
    .pipe(gulpIf('*.css', cleanCSS()))
    .pipe(gulp.dest('dist'));
}

//  Borowser Sync on File Change // 
var reload = browserSync.reload;

function watch() {
  browserSync.init({
    server: {
      baseDir: './dist/'
    },
    notify: false,
  });
  gulp.watch(paths.scripts.src, scripts).on('change', reload);
  gulp.watch(paths.styles.src, styles).on('change', reload);
  gulp.watch(paths.img.src, imageMin).on('change', reload);
  browserSync.watch( 'src/css/*.css', reload );
  gulp.watch(paths.html.src, copyHtml).on('change', reload);
}

var build = gulp.series(watch, gulp.parallel(scripts, styles, imageMin, copyHtml));

// Declare individual tasks (eg `gulp.copyHtml`)
exports.styles = styles;
exports.scripts = scripts;
exports.imageMin = imageMin;
exports.copyHtml = copyHtml;
exports.build = build;

//* Define default task that can be called by just running `gulp` from cli /
exports.default = build;