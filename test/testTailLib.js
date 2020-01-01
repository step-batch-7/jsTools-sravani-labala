'use strict';

const assert = require('chai').assert;
const sinon = require('sinon');
const { getContent, loadContent, extractLines } = require('../src/tailLib.js');

describe('loadContent', function() {
  it('should give the error message if the file does not exist', function() {
    const display = sinon.stub();
    loadContent(
      { err: true, data: undefined },
      { fileName: 'wrongFile' },
      display
    );
    assert.isTrue(
      display.calledWithExactly(
        '',
        'tail: wrongFile: no such file or directory'
      )
    );
    assert.isTrue(display.calledOnce);
  });
  it('should load the content of the file if file exists', function() {
    const display = sinon.stub();
    loadContent(
      {
        err: null,
        data: '1\n2\n3\n4\n5\n6\n7\n8\n9\n10\n11\n12\n13\n14\n15'
      },
      { fileName: 'goodFile', lines: '10' },
      display
    );
    assert.isTrue(
      display.calledWithExactly('6\n7\n8\n9\n10\n11\n12\n13\n14\n15', '')
    );
    assert.isTrue(display.calledOnce);
  });
});

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

describe('getContent', function() {
  it('should valid standard input', function(done) {
    const stdin = { setEncoding: sinon.fake(), on: sinon.fake() };
    const write = (output, error) => {
      assert.strictEqual(output, 'abc');
      assert.strictEqual(error, '');
      done();
    };
    getContent('10', stdin, write);
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
