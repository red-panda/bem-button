var autoprefixer = require('autoprefixer');
var gulp = require('gulp');
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var postcss = require('gulp-postcss');
var rev = require('gulp-rev');
var pug = require('gulp-pug');

gulp.task('css', function(){
    return gulp.src('src/app/assets/stylesheets/*.scss')
        .pipe(sourcemaps.init())
        .pipe(sass(({outputStyle: 'compressed'})).on('error', sass.logError))
        .pipe(postcss([
            autoprefixer()
        ]))
        .pipe(sourcemaps.write())
        // .pipe(rev())
        .pipe(gulp.dest('build/css/'))
});

gulp.task('views', function() {
    return gulp.src('src/app/views/*.pug')
        .pipe(pug({
            "pretty": true
        }))
        .pipe(gulp.dest('build/'));
});

gulp.task('watch', function () {
    gulp.watch('src/app/assets/stylesheets/**/*.scss', gulp.series('css'));
    gulp.watch('src/app/views/*.pug', gulp.series('views'));
});

gulp.task('default', gulp.series('css', 'views'));