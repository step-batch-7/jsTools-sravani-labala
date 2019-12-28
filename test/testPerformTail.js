'use strict';

const assert = require('chai').assert;
const { stub } = require('sinon');
const tail = require('../src/performTail').tail;

describe('tail', function() {
  const existsSync = stub();
  existsSync.withArgs('goodFile').returns(true);
  existsSync.withArgs('wrongFile').returns(false);
  const readFileSync = stub();
  readFileSync
    .withArgs('goodFile', 'utf8')
    .returns('1\n2\n3\n4\n5\n6\n7\n8\n9\n10\n11\n12\n13\n14\n15');
  it('should give tail lines of file if the file name is given', function() {
    const display = function(content, error) {
      assert.strictEqual(error, '');
      assert.strictEqual(content, '6\n7\n8\n9\n10\n11\n12\n13\n14\n15');
    };
    assert.isUndefined(
      tail(['goodFile'], { existsSync, readFileSync }, display)
    );
  });

  it('should give error if the options are not valid', function() {
    const display = function(content, error) {
      assert.strictEqual(error, 'tail: illegal offset -- goodFile');
      assert.strictEqual(content, '');
    };
    assert.isUndefined(tail(['-n', 'goodFile'], {}, display));
  });

  it('should give error if the file does not exist', function() {
    const display = function(content, error) {
      assert.strictEqual(error, 'tail: wrongFile: no such file or directory');
      assert.strictEqual(content, '');
    };
    assert.isUndefined(
      tail(['wrongFile'], { existsSync, readFileSync }, display)
    );
  });

  it('should give nothing if the number of lines is zero', function() {
    const display = function(content, error) {
      assert.strictEqual(error, '');
      assert.strictEqual(content, '');
    };
    assert.isUndefined(
      tail(['-n', '0', 'goodFile'], { existsSync, readFileSync }, display)
    );
  });
});
