"use strict";

var gulp = require('gulp');

gulp.task('bundle', ['scripts', 'css', 'images', 'html', 'copy'], function() {
  if (devBuild) global.doBeep = true;
});

gulp.task('build', ['clean', 'lint', 'sprite'], function() {
  gulp.start('bundle');
});
