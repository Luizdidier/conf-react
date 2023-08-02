var gulp = require('gulp');
var babel = require('gulp-babel');

gulp.task('build', ['babel', 'css']);

gulp.task('babel', function() {
  return gulp.src(['src/**/*.js', '!src/**/*test.js'])
  .pipe(babel({
    presets: ['es2015', 'react'],
    "plugins": ["transform-class-properties"]

  }))
  .pipe(gulp.dest('./dist'));
});

gulp.task('css', function() {
  return gulp.src('src/**/*.css')
  .pipe(gulp.dest('./dist'));
});

gulp.task('watch', function () {
  return gulp.watch('src/**/*.js', ['build']);
});
