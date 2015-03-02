"use strict";

var gulp   = require('gulp'),
    finder = require('../helpers/finder'),
    config = require('../config');

gulp.task('watching', function() {
  global.isWatching = true;
});

gulp.task('watch', ['watching', 'build'], function() {
  gulp.watch(finder(config.css.src),  ['css']);
  gulp.watch(finder(config.images.src), ['images']);
  gulp.watch(finder(config.html.src), ['html']);
});
