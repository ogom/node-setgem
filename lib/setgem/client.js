/*!
 * setgem - client
 * Copyright(c) 2016 ogom
 * MIT Licensed
 */
'use strict';

var citrus = require('./gadget/citrus');

/**
 * setgem Client
 * @param {Object} options Client options.
 */
function Client(options) {
  this.citrus = new citrus(options);
}

/**
 * Create client
 * @param {Object} options Client options.
 * @return {Client}        setgem Client.
 */
exports.createClient = function(options) {
  return new Client(options);
};
