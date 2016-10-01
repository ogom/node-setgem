'use strict';

require('../mock/request');
var setgem = require('../../');
var client = setgem.createClient({
  serialport: {
    port: '/dev/cu.usbmodem1_1',
    options: {
      baudRate: 9600,
      dataBits: 8,
      parity: 'none',
      stopBits: 1
    }
  }
});

describe('client', function() {
  describe('#citrus', function() {
    describe('#info', function() {
      it ('should have citrus versions.', function(done) {
        client.citrus.info(function (err, res) {
          res.citrus.should.equal('2.08(2016/9/22)f3(256KB)')
          res.mruby.should.equal('1.2.0')
          done();
        });
      });
    });
  });
});
