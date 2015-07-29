var gulp = require('gulp');
var ngAnnotate = require('gulp-ng-annotate');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var clean = require('gulp-clean');
var cssmin = require('gulp-cssmin');
var rename = require('gulp-rename');
var jshint = require('gulp-jshint');
var csslint = require('gulp-csslint');
var cache = require('gulp-cache');
//var livereload = require('gulp-livereload');
var imagemin = require('gulp-imagemin');
var _ = require('underscore');


var templateCache = require('gulp-angular-templatecache');

var application_root = __dirname;
var path = require("path");
var dirPath = path.join(application_root, "/public");

var sources = require('./config/assets.json');
var assetsCss = _.map(sources.core.css, function(file) {
    return dirPath + '/' + file
});

var assetsJs = _.map(sources.core.js, function(file) {
    return dirPath + '/' + file
});


var core = sources.core;
var main = sources.main;


var jsPath = main.js.src;
var cssPath = main.css.src;
var htmlPath = dirPath + "/views/partials/";
var imgPath = dirPath + "/images/";

gulp.task('clean', function() {
    gulp.src([core.css.dest, core.js.dest, main.css.dest, main.js.dest, dirPath + '/templates.js', imgPath + '/dist/'], {
            read: false
        })
        .pipe(clean({
            force: true
        }));
});

gulp.task('cssLint', function() {
    gulp.src(cssPath)
        .pipe(csslint({
            'shorthand': false
        }));
});



gulp.task('jsHint', function() {
    return gulp.src(main.js.src)
        .pipe(jshint());
});


gulp.task('imagesmin', function() {
    gulp.src(imgPath + '/**/*')
        .pipe(imagemin({
            optimizationLevel: 3,
            progressive: true,
            interlaced: true
        }))
        .pipe(gulp.dest(imgPath + '/dist/'));
});


gulp.task('cssmin', function() {
    gulp.src(main.css.src)
        .pipe(concat('app.css'))
        .pipe(cssmin())
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(gulp.dest(main.css.dest));
});
 gulp.task('themes', function() {
    gulp.src(dirPath + "/css/themes/*.css")
        .pipe(concat('theme.css'))
        .pipe(cssmin())
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(gulp.dest(main.css.dest));
});

gulp.task('jsmin', function() {
    gulp.src(main.js.src)
        .pipe(ngAnnotate())
        .pipe(uglify())
        .pipe(concat('app.js'))
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(gulp.dest(main.js.dest));
});


gulp.task('assetsCssMin', function() {
    gulp.src(core.css.src)
        .pipe(concat('dest.css'))
        .pipe(cssmin())
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(gulp.dest(core.css.dest));
});

gulp.task('assetsJsMin', function() {
    gulp.src(core.js.src)
        .pipe(ngAnnotate())
        .pipe(uglify())
        .pipe(concat('dest.js'))
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(gulp.dest(core.js.dest));
});

gulp.task('templates', function() {
    gulp.src(htmlPath + '/*.html')
        .pipe(templateCache({
            root: 'partials',
            module: 'workboardApp'
        }))
        .pipe(gulp.dest(dirPath));
});


gulp.task('watch', function() {
    gulp.watch('public/css/*.css', ['cssmin']);
    gulp.watch('public/views/**/*.html', ['templates']);
    gulp.watch(['public/**/*.js', '!public/templates.js', '!public/js/lib/*.js'], ['jsmin']);
});

//Default task(s).
if (process.env.NODE_ENV === 'production') {
    gulp.task('default', ['clean', 'assetsCssMin', 'assetsJsMin', 'cssmin', 'themes','jsmin', 'templates']);
} else {
    gulp.task('default', ['clean', 'cssLint', 'jsHint']);
       //gulp.task('default', ['clean', 'assetsCssMin', 'assetsJsMin', 'cssmin', 'themes','jsmin', 'templates']);

}
