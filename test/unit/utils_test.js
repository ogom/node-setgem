'use strict';

var utils = require('../../lib/utils');

describe('utils', function() {
  describe('#format_time', function() {

    it('Should slice string.', function() {
      var str = utils.pad(1, -2, '0');
      str.should.equal('01');
    });
  });
});
