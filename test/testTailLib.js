'use strict';

const assert = require('chai').assert;
const sinon = require('sinon');
const {extractLines, streamAction} = require('../src/tailLib.js');

describe('extractLines', function() {
  it('should extractLines if file does not have empty line at end', function() {
    const numberOfLines = '10';
    const content = '1\n2\n3\n4\n5\n6\n7\n8\n9\n10\n11\n12\n13\n14\n15';
    assert.strictEqual(
      extractLines(numberOfLines, content),
      '6\n7\n8\n9\n10\n11\n12\n13\n14\n15'
    );
  });
  it('should extractLines if file has empty line at end', function() {
    const content = '1\n2\n3\n4\n5\n6\n7\n8\n9\n10\n11\n12\n13\n14\n15\n';
    const numberOfLines = '10';
    assert.strictEqual(
      extractLines(numberOfLines, content),
      '6\n7\n8\n9\n10\n11\n12\n13\n14\n15'
    );
  });
  it('should extractLines when the count is mentioned with + sign', function() {
    const content = '1\n2\n3\n4\n5\n6\n7\n8\n9\n10\n11\n12\n13\n14\n15';
    const numberOfLines = '+5';
    assert.strictEqual(
      extractLines(numberOfLines, content),
      '5\n6\n7\n8\n9\n10\n11\n12\n13\n14\n15'
    );
  });
});

describe('streamAction', function() {
  it('should valid for standard input', function(done) {
    const stdin = {setEncoding: sinon.fake(), on: sinon.fake()};
    const write = (output, error) => {
      assert.strictEqual(output, 'abc');
      assert.strictEqual(error, '');
      done();
    };
    streamAction({lines: '10', fileName: ''}, stdin, write);
    assert(stdin.setEncoding.calledWith('utf8'));
    const verifyStdin = () => {
      const firstIndex = 0;
      const count = 3;
      assert.strictEqual(stdin.on.firstCall.args[firstIndex], 'data');
      assert.strictEqual(stdin.on.secondCall.args[firstIndex], 'end');
      assert.strictEqual(stdin.on.callCount, count);
    };
    verifyStdin();
    const secondIndex = 1;
    stdin.on.firstCall.args[secondIndex]('abc');
    stdin.on.secondCall.args[secondIndex]();
  });
  it('should valid for reading file which exists', function(done) {
    const createReadStream = {setEncoding: sinon.fake(), on: sinon.fake()};
    const write = (output, error) => {
      assert.strictEqual(output, 'abc');
      assert.strictEqual(error, '');
      done();
    };
    streamAction(
      {lines: '10', fileName: 'something'},
      createReadStream,
      write
    );
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
    createReadStream.on.firstCall.args[secondIndex]('abc');
    createReadStream.on.secondCall.args[secondIndex]();
  });
  it('should valid for reading file which does not exist', function(done) {
    const createReadStream = {setEncoding: sinon.fake(), on: sinon.fake()};
    const write = (output, error) => {
      assert.strictEqual(output, '');
      assert.strictEqual(error, '');
      done();
    };
    streamAction(
      {lines: '10', fileName: 'something'},
      createReadStream,
      write
    );
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
      assert.strictEqual(
        createReadStream.on.thirdCall.args[firstIndex],
        'error'
      );
      assert.strictEqual(createReadStream.on.callCount, count);
    };
    verifyCreateReadStream();
    const secondIndex = 1;
    createReadStream.on.firstCall.args[secondIndex]('');
    createReadStream.on.secondCall.args[secondIndex]('');
    createReadStream.on.thirdCall.args[secondIndex]('');
  });
});
