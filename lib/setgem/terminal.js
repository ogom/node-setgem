/*!
 * setgem - terminal
 * Copyright(c) 2016 ogom
 * MIT Licensed
 */
'use strict';

var SerialPort = require('serialport'),
    readline = require('readline'),
    path = require('path'),
    utils = require('../utils');;

var reWaiting = new RegExp(/\r\nWaiting/);
var reSaving = new RegExp(/Saving..../);

/**
 * SerialPort Terminal
 * @param {String} port    SerialPort portname.
 * @param {Object} options SerialPort options.
 */
function Terminal(port, options) {
  this.port = port;
  this.options = options;
}

/**
 * SerialPort trem
 */
Terminal.prototype.connect = function(file) {
  var self = this;
  self.buffer = [];
  self.writing = false;
  self.data = undefined;
  self.mrb = path.basename(file, path.extname(file)) + '.mrb';

  var port = new SerialPort(this.port, this.options)

  readline.emitKeypressEvents(process.stdin);
  process.stdin.resume();
  process.stdin.setRawMode(true);

  process.stdin.on('keypress', function(str, key) {
    if (file && key && key.ctrl && !key.meta && !key.shift && key.name === 'x') {
      self.buffer = [];
      self.writing = true
      utils.readmrb(file, true, function(err, data) {
        self.data = data;
        var command = ['X', self.mrb, data.length].join(' ');
        port.write(command + '\n');
      });
    }
  })

  process.stdin.on('data', function(str) {
    if (str[0] === 0x03) {
      port.close();
      process.exit(0);
    }

    if (!self.writing) {
      port.write(str);
    }
  });

  port.on('data', function(chunk) {
    process.stdout.write(chunk.toString());

    self.buffer.push(chunk);
    var raw = self.buffer.join('');

    if (reWaiting.test(raw) && self.writing) {
      self.buffer = [];
      port.write(self.data);
    }

    if (reSaving.test(raw)) {
      self.buffer = [];
      self.writing = false;
    }
  });

  port.on('error', function(err) {
    console.log(new Error('SerialPort: ' + err.message));
    process.exit(1);
  });

  port.on('open', function(err) {
    port.write('H\n');
  });
};

module.exports = Terminal;
