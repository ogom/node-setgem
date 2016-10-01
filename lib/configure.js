/*!
 * setgem - configure
 * Copyright(c) 2016 ogom
 * MIT Licensed
 */
'use strict';

var fs = require('fs'),
    path = require('path'),
    inquirer = require('inquirer'),
    SerialPort = require('serialport');

var crlf = new RegExp(/\n|\r|\r\n/),
    div = new RegExp(/\s+=\s+/);

/**
 * Configure
 */
function Configure() {
  this.filename = path.join(__dirname, '../.setgem');
  if (!fs.existsSync(this.filename)) {
    this.filename = path.join(process.env.HOME, '.setgem');
  }
}

/**
 * config read
 * @return {Object} Read config.
 */
Configure.prototype.read = function() {
  var config = {};

  if (fs.existsSync(this.filename)) {
    var rows = fs.readFileSync(this.filename, 'utf-8').toString().split(crlf);
    rows.forEach(function(row) {
      var col = row.split(div);
      if (col[1]) config[col[0]] = col[1];
    });
  }

  return config;
};

/**
 * config write
 * @param  {Object} config Write object.
 */
Configure.prototype.write = function(config) {
  var rows = ['[default]'];

  for (var key in config) {
    rows.push(key + ' = ' + config[key]);
  }

  fs.writeFileSync(this.filename, rows.join('\n'));
};

/**
 * config init
 * @param  {Function} cb Callback.
 */
Configure.prototype.init = function(cb) {
  var self = this;
  var config = this.read();
  var serialport_baud_rate = config.serialport_baud_rate || 9600;
  var serialport_data_bits = config.serialport_data_bits || 8;
  var serialport_parity = config.serialport_parity || 'none';
  var serialport_stop_bits = config.serialport_stop_bits || 1;

  SerialPort.list(function(err, ports) {
    var default_port = undefined;
    ports.forEach(function(port) {
      if (port.manufacturer === 'RENESAS') {
        default_port = port.comName;
      }
    });

    var questions = [
      {
        type: 'list',
        name: 'serialport_port',
        message: 'Serial Port?',
        choices: ports.map(function(port) {
          return port.comName;
        }),
        default: function () {
          return default_port;
        }
      },
      {
        type: 'input',
        name: 'serialport_baud_rate',
        message: 'Baud Rate?',
        default: function () {
          return serialport_baud_rate;
        }
      },
      {
        type: 'input',
        name: 'serialport_data_bits',
        message: 'Data Bits?',
        default: function () {
          return serialport_data_bits;
        }
      },
      {
        type: 'input',
        name: 'serialport_parity',
        message: 'Parity?',
        default: function () {
          return serialport_parity;
        }
      },
      {
        type: 'input',
        name: 'serialport_stop_bits',
        message: 'Stop Bits?',
        default: function () {
          return serialport_stop_bits;
        }
      }
    ];

    inquirer.prompt(questions).then(function(answers) {
      self.write(answers);
      cb();
    });
  })
};

module.exports = new Configure;
