'use strict';

const assert = require('chai').assert;
const sinon = require('sinon');
const tail = require('../src/performTail').tail;

describe('tail', function() {
  it('should give tail lines of file if the file name is given', function() {
    const display = sinon.stub();
    const readFile = function(path, encoding, callback) {
      assert.strictEqual(path, 'goodFile');
      assert.strictEqual(encoding, 'utf8');
      callback(null, '1\n2\n3\n4\n5\n6\n7\n8\n9\n10\n11\n12\n13\n14\n15');
    };
    tail(['goodFile'], { readFile }, display);
    assert.isTrue(
      display.calledWithExactly('6\n7\n8\n9\n10\n11\n12\n13\n14\n15', '')
    );
    assert.isTrue(display.calledOnce);
  });

  it('should give error if the options are not valid', function() {
    const display = sinon.stub();
    tail(['-n', 'goodFile'], {}, display);
    assert.isTrue(
      display.calledWithExactly('', 'tail: illegal offset -- goodFile')
    );
    assert.isTrue(display.calledOnce);
  });

  it('should give error if the file does not exist', function() {
    const display = sinon.stub();
    const readFile = function(path, encoding, callback) {
      assert.strictEqual(path, 'wrongFile');
      assert.strictEqual(encoding, 'utf8');
      callback('error', undefined);
    };
    tail(['wrongFile'], { readFile }, display);
    assert.isTrue(
      display.calledWithExactly(
        '',
        'tail: wrongFile: no such file or directory'
      )
    );
    assert.isTrue(display.calledOnce);
  });

  it('should valid if the number of lines is zero', function() {
    const display = sinon.stub();
    const readFile = function(path, encoding, callback) {
      assert.strictEqual(path, 'goodFile');
      assert.strictEqual(encoding, 'utf8');
      callback(null, '1\n2\n3\n4\n5\n6\n7\n8\n9\n10');
    };
    tail(['-n', '0', 'goodFile'], { readFile }, display);
    assert.isTrue(display.calledWithExactly('', ''));
    assert.isTrue(display.calledOnce);
  });

  it('should give tail lines for standard input', function(done) {
    const stdin = { setEncoding: sinon.fake(), on: sinon.fake() };
    const write = (output, error) => {
      assert.strictEqual(output, 'abc');
      assert.strictEqual(error, '');
      done();
    };
    tail([], { stdin }, write);
    assert(stdin.setEncoding.calledWith('utf8'));
    const verifyStdin = () => {
      const firstIndex = 0;
      const count = 2;
      assert.strictEqual(stdin.on.firstCall.args[firstIndex], 'data');
      assert.strictEqual(stdin.on.secondCall.args[firstIndex], 'end');
      assert.strictEqual(stdin.on.callCount, count);
    };
    verifyStdin();
    const secondIndex = 1;
    stdin.on.firstCall.args[secondIndex]('abc');
    stdin.on.secondCall.args[secondIndex]();
  });
});
