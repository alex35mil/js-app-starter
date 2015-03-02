"use strict";

var gutil    = require('gulp-util'),
    notifier = require('node-notifier');

module.exports = function(file, isFail, msg) {

  var say   = msg || 'Bundled!',
      color = isFail ? 'red' : 'green',
      icon  = isFail ? '/System/Library/CoreServices/CoreTypes.bundle/Contents/Resources/AlertStopIcon.icns' : false;

  if (global.doBeep) {
    notifier.notify({
      title   : file,
      message : say,
      icon    : icon,
      sound   : true
    });
  }

  gutil.log(say, gutil.colors[color](file));

};
