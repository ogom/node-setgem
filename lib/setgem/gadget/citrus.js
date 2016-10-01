/*!
 * setgem - citrus
 * Copyright(c) 2016 ogom
 * MIT Licensed
 */
'use strict';

var request = require('../request');

/**
 * Gadget CITRUS
 * @param {Object} options Gadget options.
 */
function Gadget(options) {
  this.options = options;
  this.request = new request(this.options.serialport.port, this.options.serialport.options);
}

/**
 * Gadget info
 * @param  {Function} cb Callback.
 */
Gadget.prototype.info = function(cb) {
  this.request.send('H', null, function(err, res) {
    if (err) {
      cb(err);
    } else {
      var versions = res.match(/WAKAYAMA\.RB Board Ver.CITRUS-([^,]+), mruby([^(]+)/)
      cb(null, {
        citrus: versions[1],
        mruby: versions[2].trim()
      });
    }
  });
};

/**
 * Gadget write
 * @param  {Function} cb Callback.
 */
Gadget.prototype.write = function(name, data, cb) {
  if (!name) return cb(new Error('object name is not defined'));

  this.request.send(['W', name + '.mrb', data.length].join(' '), data, function(err, res) {
    if (err) {
      cb(err);
    } else {
      cb(null, res)
    }
  });
};

/**
 * Gadget run
 * @param  {Function} cb Callback.
 */
Gadget.prototype.run = function(name, cb) {
  if (!name) return cb(new Error('object name is not defined'));

  this.request.send(['R', name].join(' '), null, function(err, res) {
    if (err) {
      cb(err);
    } else {
      cb(null, res)
    }
  });
};

/**
 * Gadget list
 * @param  {Function} cb Callback.
 */
Gadget.prototype.list = function(cb) {
  this.request.send('L', null, function(err, res) {
    if (err) {
      cb(err);
    } else {
      cb(null, res)
    }
  });
};

module.exports = Gadget;
