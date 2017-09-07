'use strict';

var gulp = require('gulp');
var server = require('browser-sync').create();
var del = require('del');
var run = require('run-sequence');
var ghPages = require('gulp-gh-pages');

gulp.task('serve', function () {
  server.init({
    server: 'build/',
    notify: false
  });

  gulp.watch('js/*.js', ['js:update']);
});

gulp.task('copy', function () {
  return gulp.src([
    'fonts/**/*.{woff, woff2}',
    'img/**',
    'photos/**',
    'js/**',
    'css/**',
    '*.html'
  ], {
    base: '.'
  })
    .pipe(gulp.dest('build'));
});

gulp.task('js:copy', function () {
  return gulp.src('js/**.js')
    .pipe(gulp.dest('build/js'));
});

gulp.task('js:update', ['js:copy'], function (done) {
  server.reload();
  done();
});

gulp.task('clean', function () {
  return del('build');
});

gulp.task('deploy', function() {
  return gulp.src('build/**/*')
    .pipe(ghPages());
});

gulp.task('build', function (callback) {
  run(
      'clean',
      'copy',
      callback
  );
});
