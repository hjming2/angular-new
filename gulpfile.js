var gulp = require('gulp'),
    connect = require('gulp-connect'),
    concat = require('gulp-concat'),
    sass = require('gulp-sass'),
    autoprefixer = require('gulp-autoprefixer');

gulp.task('connect', function() {
    connect.server({
        // root: '/source/circleproject/circle/doc/html/',
        port: 1234,
        livereload: true
    });
});

gulp.task('html', function() {
    return gulp.src('www/**/*.html')
        .pipe(gulp.dest('dist/'));
});

gulp.task('allJs', function() {
    return gulp.src(['www/js/*.js', 'www/views/**/*.js'])
        .pipe(concat("all.js"))
        .pipe(gulp.dest("dist/"));
});

gulp.task('sass', function() {
    return gulp.src('www/scss/*.scss')
        .pipe(sass().on('error', sass.logError))
        //.pipe(autoprefixer())
        .pipe(gulp.dest("dist/css/"));
});

gulp.task('reload', ['html', 'allJs', 'sass'], function() {
    return gulp.src(['www/'])
        .pipe(connect.reload());
});

gulp.task('watch', function() {
    gulp.watch(['www/scss/*.scss', 'www/**/*.html', 'www/js/*.js', 'www/views/*/*'], ['reload']);
});

gulp.task('default', ['connect', 'watch']);