"use strict";

var gulp       = require('gulp'),
    browserify = require('browserify'),
    watchify   = require('watchify'),
    uglify     = require('gulp-uglify'),
    sourcemaps = require('gulp-sourcemaps'),
    derequire  = require('gulp-derequire'),
    source     = require('vinyl-source-stream'),
    buffer     = require('vinyl-buffer'),
    rename     = require('gulp-rename'),
    header     = require('gulp-header'),
    gulpif     = require('gulp-if'),
    notifier   = require('../helpers/notifier'),
    config     = require('../config').scripts;


gulp.task('scripts', function(cb) {

  var queue = config.bundles.length;

  var buildThis = function(bundle) {

    var pack = browserify({
      cache: {}, packageCache: {}, fullPaths: devBuild,
      entries: bundle.src,
      standalone: bundle.global,
      extensions: config.extensions,
      debug: devBuild
    });

    var build = function() {

      return (
          pack.bundle()
              .pipe(source(bundle.destFile))
              .pipe(derequire())
              .pipe(gulpif(devBuild, gulp.dest(bundle.destPublicDir)))
              .pipe(gulpif(bundle.saveToDist, gulp.dest(bundle.destDistDir)))
              .pipe(gulpif(bundle.compress, buffer()))
              .pipe(gulpif(bundle.compress && devBuild, sourcemaps.init({loadMaps: true})))
              .pipe(gulpif(bundle.compress, uglify()))
              .pipe(gulpif(bundle.compress, rename({suffix: '.min'})))
              .pipe(gulpif(!devBuild, header(config.banner)))
              .pipe(gulpif(bundle.compress && devBuild, sourcemaps.write('./')))
              .pipe(gulpif(bundle.saveToDist, gulp.dest(bundle.destDistDir)))
              .pipe(gulp.dest(bundle.destPublicDir))
              .on('end', handleQueue)
      );

    };

    if (global.isWatching) {
      pack = watchify(pack);
      pack.on('update', build);
    }

    var handleQueue = function() {
      notifier(bundle.destFile);
      if (queue) {
        queue--;
        if (queue === 0) cb();
      }
    };

    return build();
  };

  config.bundles.forEach(buildThis);

});
