"use strict";

var gulp   = require('gulp'),
    sprite = require('gulp.spritesmith'),
    finder = require('../helpers/finder'),
    config = require('../config').sprite;

gulp.task('sprite', function() {
  var spriteData = gulp.src(finder(config.src, 'png')).pipe(sprite(config.params));
  spriteData.img.pipe(gulp.dest(config.destImg));
  spriteData.css.pipe(gulp.dest(config.destCss));
});
