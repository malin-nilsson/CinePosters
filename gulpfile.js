var gulp = require('gulp');
var sass = require('gulp-sass')(require('sass'));

gulp.task('compile', function() {
    return gulp.src('scss/*.scss').pipe(sass()).pipe(gulp.dest('css'))
});

gulp.task('watch-scss', function() {
    gulp.watch("scss/*.scss", gulp.series('compile'));
});

gulp.task('default', gulp.series('compile','watch-scss'), function(){});