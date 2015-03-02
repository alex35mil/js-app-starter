"use strict";

var requireDir = require('require-dir');

global.devBuild = process.env.NODE_ENV !== 'production';

requireDir('./lib/gulp/tasks', { recurse: true });