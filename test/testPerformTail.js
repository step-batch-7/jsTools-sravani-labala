'use strict';

const assert = require('chai').assert;
const sinon = require('sinon');
const tail = require('../src/performTail').tail;

describe('tail', function() {
  it('should get the tail lines from the existing file', function() {
    const createReadStream = {setEncoding: sinon.fake(), on: sinon.fake()};
    const stream = {
      pick: function() {
        return createReadStream;
      }
    };
    const display = sinon.stub();
    tail(['-n', '5', 'goodFile'], stream, display);
    assert(createReadStream.setEncoding.calledWith('utf8'));
    const verifyCreateReadStream = () => {
      const firstIndex = 0;
      const count = 3;
      assert.strictEqual(
        createReadStream.on.firstCall.args[firstIndex],
        'data'
      );
      assert.strictEqual(
        createReadStream.on.secondCall.args[firstIndex],
        'end'
      );
      assert.strictEqual(createReadStream.on.callCount, count);
    };
    verifyCreateReadStream();
    const secondIndex = 1;
    createReadStream.on.firstCall.args[secondIndex]('1\n2\n3\n4\n5');
    createReadStream.on.secondCall.args[secondIndex]();
    assert.isTrue(display.calledWithExactly('1\n2\n3\n4\n5', ''));
    assert.isTrue(display.calledOnce);
  });
  it('should get the error for the non existing file', function() {
    const createReadStream = {setEncoding: sinon.fake(), on: sinon.fake()};
    const stream = {
      pick: function() {
        return createReadStream;
      }
    };
    const display = sinon.stub();
    tail(['-n', '5', 'goodFile'], stream, display);
    assert(createReadStream.setEncoding.calledWith('utf8'));
    const verifyCreateReadStream = () => {
      const firstIndex = 0;
      const count = 3;
      assert.strictEqual(
        createReadStream.on.firstCall.args[firstIndex],
        'data'
      );
      assert.strictEqual(
        createReadStream.on.secondCall.args[firstIndex],
        'end'
      );
      assert.strictEqual(createReadStream.on.callCount, count);
    };
    verifyCreateReadStream();
    const secondIndex = 1;
    createReadStream.on.firstCall.args[secondIndex]('');
    createReadStream.on.secondCall.args[secondIndex]('');
    assert.isTrue(display.calledWithExactly('', ''));
    assert.isTrue(display.calledOnce);
  });
  it('should valid for standard input condition', function() {
    const stdin = {setEncoding: sinon.fake(), on: sinon.fake()};
    const stream = {
      pick: function() {
        return stdin;
      }
    };
    const display = sinon.stub();
    tail(['-n', '5', 'goodFile'], stream, display);
    assert(stdin.setEncoding.calledWith('utf8'));
    const verifyCreateReadStream = () => {
      const firstIndex = 0;
      const count = 3;
      assert.strictEqual(stdin.on.firstCall.args[firstIndex], 'data');
      assert.strictEqual(stdin.on.secondCall.args[firstIndex], 'end');
      assert.strictEqual(stdin.on.callCount, count);
    };
    verifyCreateReadStream();
    const secondIndex = 1;
    stdin.on.firstCall.args[secondIndex]('1\n2\n3\n4\n5');
    stdin.on.secondCall.args[secondIndex]();
    assert.isTrue(display.calledWithExactly('1\n2\n3\n4\n5', ''));
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
});
