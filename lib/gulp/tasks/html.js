"use strict";

var gulp        = require('gulp'),
    jade        = require('gulp-jade'),
    jadeInherit = require('gulp-jade-inheritance'),
    gulpif      = require('gulp-if'),
    changed     = require('gulp-changed'),
    filter      = require('gulp-filter'),
    notifier    = require('../helpers/notifier'),
    config      = require('../config').html;

gulp.task('html', function(cb) {

  gulp.src(config.src + '*.jade')
      .pipe(gulpif(devBuild, changed(config.dest)))
      .pipe(jadeInherit({basedir: config.src}))
      .pipe(filter(function(file) {
        return !/\/_/.test(file.path) || !/^_/.test(file.relative);
      }))
      .pipe(jade(config.params))
      .pipe(gulp.dest(config.dest))
      .on('end', function() {
        notifier('html');
        cb();
      });

});
