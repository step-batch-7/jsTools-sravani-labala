'use strict';

const assert = require('chai').assert;
const sinon = require('sinon');
const { loadContent, extractLines } = require('../src/tailLib.js');

describe('loadContent', function() {
  it('should give the error message if the file does not exist', function() {
    const display = sinon.stub();
    assert.isUndefined(
      loadContent(
        { err: true, data: undefined },
        { fileName: 'wrongFile' },
        display
      )
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
    assert.isUndefined(
      loadContent(
        {
          err: null,
          data: '1\n2\n3\n4\n5\n6\n7\n8\n9\n10\n11\n12\n13\n14\n15'
        },
        { fileName: 'goodFile', lines: '10' },
        display
      )
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
  it('should extractLines if lines are given with + sign', function() {
    const content = '1\n2\n3\n4\n5\n6\n7\n8\n9\n10\n11\n12\n13\n14\n15';
    const numberOfLines = '+5';
    assert.strictEqual(
      extractLines(numberOfLines, content),
      '5\n6\n7\n8\n9\n10\n11\n12\n13\n14\n15'
    );
  });
});
