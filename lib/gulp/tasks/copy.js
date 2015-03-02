"use strict";

var gulp   = require('gulp'),
    config = require('../config').copy;

gulp.task('copy', function() {

  return(
      gulp.src(config.from, { base: config.base })
          .pipe(gulp.dest(config.to))
  );

});
