"use strict";

var gulp     = require('gulp'),
    jshint   = require('gulp-jshint'),
    map      = require('map-stream'),
    notifier = require('../helpers/notifier'),
    finder   = require('../helpers/finder'),
    config   = require('../config').scripts.lint;

gulp.task('lint', function() {

  var failReporter = map(function(file, cb) {
    if (!file.jshint.success) notifier(file.relative, true, 'Ooooooops!');
    cb(null, file);
  });

  return (
      gulp.src(finder(config.dir, 'js'))
          .pipe(jshint(config.options))
          .pipe(jshint.reporter())
          .pipe(failReporter)
  );

});
