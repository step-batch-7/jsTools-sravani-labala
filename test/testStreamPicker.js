'use strict';

const assert = require('chai').assert;
const StreamPicker = require('../src/streamPicker');

describe('StreamPicker', function() {
  describe('pick', function() {
    const stdin = {};
    const createReadStream = function(something) {
      return something;
    };
    const stream = new StreamPicker(stdin, createReadStream);
    it('should give stdin stream if fileName is absent', function() {
      assert.deepStrictEqual(stream.pick(), {});
    });
    it('should give create read stream if fileName is present', function() {
      assert.strictEqual(stream.pick('abc'), 'abc');
    });
  });
});
