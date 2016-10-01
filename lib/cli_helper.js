/*!
 * setgem - cli helper
 * Copyright(c) 2016 ogom
 * MIT Licensed
 */
'use strict';

var program = require('commander'),
    configure = require('./configure'),
    setgem = require('..');

/**
 * CLI Helper
 */
function Helper() {}

Helper.prototype.program = program;
Helper.prototype.configure = configure;
Helper.prototype.config = configure.read();

/**
 * Create client
 * @return {Client} setgem client.
 */
Helper.prototype.client = function() {
  // this.config.debug = this.program.debug;

  var options = {
    serialport: {
      port: this.config.serialport_port,
      options: {
        baudRate: Number(this.config.serialport_baud_rate),
        dataBits: Number(this.config.serialport_data_bits),
        parity: this.config.serialport_parity,
        stopBits: Number(this.config.serialport_stop_bits)
      }
    }
  }

  return setgem.createClient(options);
};

/**
 * Error output
 * @param  {Object} err Error message.
 */
Helper.prototype.error = function(err) {
  console.error('ERROR: ' + err.message);
};

/**
 * Sub command
 * @param  {Object} commands Commands.
 * @param  {String} name     Command name.
 * @return {Command}         Program command.
 */
Helper.prototype.subcommand = function(commands, name) {
  for (var i = 0, n = commands.length; i < n; i++) {
    if (commands[i]._name === name) break;
  }
  return commands[i];
};

/**
 * Output
 * @param  {Object} err Error message.
 * @param  {Object} res SerialPort response.
 */
Helper.prototype.output = function(err, res) {
  if (err) {
    console.log(err.message);
    process.exit(1);
  } else {
    Object.keys(res).forEach(function(key){
      console.log(key + ': ' + res[key]);
    });
  }
};

module.exports = new Helper;
