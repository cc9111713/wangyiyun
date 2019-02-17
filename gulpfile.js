var gulp = require('gulp');
var sass=require('gulp-sass');
var autoprefixer=require('gulp-autoprefixer');
var concat=require('gulp-concat');
var clean=require('gulp-clean-css');
var server=require('gulp-webserver');
var url=require('url');
var fs=require('fs');
var path=require('path');
var uglify=require('gulp-uglify');
var babel=require('gulp-babel');

// sass编译
gulp.task('minSass',function(){
    return gulp.src('./src/scss/*.scss')
    .pipe(sass())
    .pipe(gulp.dest('./src/css/'))
})
// 监听sass
gulp.task('watch',function(){
    gulp.watch('./src/scss/*.scss',gulp.series('minSass'))
})

// 压缩js
gulp.task('uglify',function(){
    return gulp.src('./src/js/*.js')
    .pipe(babel({
        presets:'es2015'
    }))
    .pipe(uglify())
    .pipe(gulp.dest('./src/dist/js/'))
})
gulp.task('concat', function() {
    return gulp.src('./src/dist/js/*.js')
      .pipe(concat('all.js'))
      .pipe(gulp.dest('./src/dist/js/'));
});
gulp.task('server',function(){
    return gulp.src('./src/')
    .pipe(server({
        port:2000,
        open:true,
        livereload:true
    }))
})
gulp.task('default',gulp.series('minSass','server','watch'))
gulp.task('build',gulp.parallel('uglify','concat'))