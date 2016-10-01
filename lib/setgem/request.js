/*!
 * setgem - request
 * Copyright(c) 2016 ogom
 * MIT Licensed
 */
'use strict';

var SerialPort = require('serialport');

var crlfgt = new RegExp(/\r\n>$/);
var crlfwaiting = new RegExp(/\r\nWaiting/);
var output = new RegExp(/^R|^W|^L/);

/**
 * SerialPort Request
 * @param {String} port    SerialPort portname.
 * @param {Object} options SerialPort options.
 */
function Request(port, options) {
  this.port = port;
  this.options = options;
}

/**
 * SerialPort request
 * @param  {String}   command SerialPort request command.
 * @param  {String}   data    SerialPort request data.
 * @param  {Function} cb      Callback.
 */
Request.prototype.send = function(command, data, cb) {
  var self = this;
  var buffer = [];
  var writing = true;
  var port = new SerialPort(this.port, this.options)

  port.on('data', function(chunk) {
    buffer.push(chunk);
    var raw = buffer.join('');

    if (crlfgt.test(raw)) {
      port.close();
      cb(null, raw);
    }

    if (crlfwaiting.test(raw) && writing) {
      writing = false;
      port.write(data);
    }

    if (output.test(command)) {
      process.stdout.write(chunk.toString());
    }
  });

  port.on('error', function(err) {
    cb(new Error('SerialPort: ' + err.message));
  });

  port.on('open', function(err) {
    port.write(command + '\n');
  });
};

module.exports = Request;
