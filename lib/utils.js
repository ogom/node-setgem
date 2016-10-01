/*!
 * setgem - utils
 * Copyright(c) 2016 ogom
 * MIT Licensed
 */
'use strict';

var fs = require('fs'),
    path = require('path'),
    spawn = require('child_process').spawn;

/**
 * SerialPort request
 * @param  {String}   file  File path.
 * @param  {Boolean}  build mruby compile.
 * @param  {Function} cb    Callback.
 */
exports.readmrb = function(file, build, cb) {
  var mrb = path.join(path.dirname(file), path.basename(file, path.extname(file)) + '.mrb');

  if (build) {
    var ps = spawn('mrbc', ['-g', path.resolve(file)])
    ps.stdout.on('data', function (data) {
      console.log(data.toString());
    })

    ps.stderr.on('data', function (data) {
      cb(data.toString());
    })

    ps.on('exit', function (code) {
      cb(null, fs.readFileSync(mrb));
    })
  } else {
    cb(null, fs.readFileSync(mrb));
  }
}

/**
 * Object to values
 * @param  {Object} object Key and Values.
 * @return {Array}         Values.
 */
exports.object_values = function(object) {
  var array = [];

  Object.keys(object).forEach(function(key){
    array.push(object[key])
  });

  return array;
}

/**
 * Depth object keys order.
 * @param  {Object} object Depth object.
 * @param  {String} keys   Depth keys, div is '.'.
 * @return {Object}        Order object.
 */
exports.object_depth = function(object, keys) {
  keys = keys.split('.');

  keys.forEach(function(key) {
    object = object[key];
  });

  return object;
}

/**
 * format time
 * @param  {String} raw Date time string.
 * @return {String}     Formatted date time.
 */
exports.format_time = function(raw) {
  var datetime = new Date(raw);

  var date = [
    datetime.getUTCFullYear(),
    this.pad(datetime.getUTCMonth() + 1, -2, '0'),
    this.pad(datetime.getUTCDate(), -2, '0')
  ].join('-');

  var time = [
    this.pad(datetime.getUTCHours(), -2, '0'),
    this.pad(datetime.getUTCMinutes(), -2, '0'),
  ].join(':');

  return date + ' ' + time;
};

/**
 * padding
 * @param  {String} string Padding string.
 * @param  {Number} length Padding length.
 * @param  {String} char   Padding char.
 * @return {String}        Formatted string.
 */
exports.pad = function(string, length, char) {
  var padding = (Array(Math.abs(length)+1)).join(char);

  if (length > 0) {
    padding = (string + padding).slice(0, length);
  } else {
    padding = (padding + string).slice(length);
  }

  return padding;
};
