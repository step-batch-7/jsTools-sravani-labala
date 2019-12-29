'use strict';

const assert = require('chai').assert;
const sinon = require('sinon');
const tail = require('../src/performTail').tail;

describe('tail', function() {
  const display = sinon.stub();
  it('should give tail lines of file if the file name is given', function() {
    const readFile = function(path, encoding, callback) {
      assert.strictEqual(path, 'goodFile');
      assert.strictEqual(encoding, 'utf8');
      callback(null, '1\n2\n3\n4\n5\n6\n7\n8\n9\n10\n11\n12\n13\n14\n15');
    };
    assert.isUndefined(tail(['goodFile'], readFile, display));
    assert.isTrue(
      display.calledWithExactly('6\n7\n8\n9\n10\n11\n12\n13\n14\n15', '')
    );
  });

  it('should give error if the options are not valid', function() {
    assert.isUndefined(tail(['-n', 'goodFile'], {}, display));
    assert.isTrue(
      display.calledWithExactly('', 'tail: illegal offset -- goodFile')
    );
  });

  it('should give error if the file does not exist', function() {
    const readFile = function(path, encoding, callback) {
      assert.strictEqual(path, 'wrongFile');
      assert.strictEqual(encoding, 'utf8');
      callback('error', undefined);
    };
    assert.isUndefined(tail(['wrongFile'], readFile, display));
    assert.isTrue(
      display.calledWithExactly(
        '',
        'tail: wrongFile: no such file or directory'
      )
    );
  });

  it('should give nothing if the number of lines is zero', function() {
    const readFile = function(path, encoding, callback) {
      assert.strictEqual(path, 'goodFile');
      assert.strictEqual(encoding, 'utf8');
      callback(null, '1\n2\n3\n4\n5\n6\n7\n8\n9\n10');
    };
    assert.isUndefined(tail(['-n', '0', 'goodFile'], readFile, display));
    assert.isTrue(display.calledWithExactly('', ''));
  });
});
