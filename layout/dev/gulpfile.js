const gulp = require('gulp');
const nunjucksRender = require('gulp-nunjucks-render');
const less = require('gulp-less');
const LessAutoprefix = require('less-plugin-autoprefix');
const autoprefix = new LessAutoprefix({ browsers: ['last 2 versions']});
const sourcemaps = require('gulp-sourcemaps');
const uglify = require('gulp-uglifyjs');
const concat = require('gulp-concat');
const gulpCache = require('gulp-cache');

gulp.task('clear', function (done) {
    gulpCache.clearAll(done);
    console.log("Cache cleared");
});

gulp.task('html', function () {
    return gulp.src('pages/**/*.html')
        .pipe(nunjucksRender({
            path: ['blocks/']
        }))
        .pipe(gulp.dest('../dist'));
});

gulp.task('less', function () {
    return gulp.src('less/init.less')
        .pipe(sourcemaps.init())
        .pipe(less({
            plugins: [autoprefix]
        }))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('../dist/css'));
});

gulp.task('uglify', function () {
    return gulp.src('js/*.js')
        .pipe(uglify())
        .pipe(concat('bundle.js'))
        .pipe(gulp.dest('../dist/js'))
});

gulp.task('watch', function () {
    gulp.watch(['blocks/**/*.html', "pages/**/*.html"], ['html', 'clear']);
    gulp.watch('less/*.less', ['less', 'clear']);
    gulp.watch('js/*.js', ['uglify', 'clear']);
});

gulp.task('default', ['html', 'less', 'uglify', 'clear', 'watch']);