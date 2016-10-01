'use strict';

var fs = require('fs'),
    path = require('path'),
    request = require('../../lib/setgem/request');

var fn = {};
fn.fixture = function(name) {
  var file = path.join('../fixtures', name + '.txt')
  return fs.readFileSync(path.join(__dirname, file), 'utf-8');
};

request.prototype.send = function(command, data, cb) {
  cb(null, fn.fixture(command));
};
