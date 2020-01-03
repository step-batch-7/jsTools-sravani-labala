'use strict';

const assert = require('chai').assert;
const {parseOptions} = require('../src/parseOptions.js');

describe('parseOptions', function() {
  it('should parse fileName and the default lines as 10', function() {
    assert.deepStrictEqual(parseOptions(['goodFile']), {
      parsedArgs: {
        fileName: 'goodFile',
        lines: '10'
      },
      inputError: ''
    });
  });
  it('should parse fileName and number of lines given by user', function() {
    assert.deepStrictEqual(parseOptions(['-n', '+5', 'goodFile']), {
      parsedArgs: {
        fileName: 'goodFile',
        lines: '+5'
      },
      inputError: ''
    });
  });
  it('should give error message when offset is invalid', function() {
    assert.deepStrictEqual(parseOptions(['-n', 'goodFile']), {
      inputError: 'tail: illegal offset -- goodFile'
    });
  });
  it('should give error message if option is invalid', function() {
    assert.deepStrictEqual(parseOptions(['-k', 'goodFile']), {
      inputError: 'tail: illegal option -- -k\nusage: tail [-n #] [file]'
    });
  });
  it('should parse the when standard input is given', function() {
    assert.deepStrictEqual(parseOptions([]), {
      parsedArgs: {lines: '10', fileName: undefined},
      inputError: ''
    });
  });
  it('should parse the when standard input is given with lines', function() {
    assert.deepStrictEqual(parseOptions(['5']), {
      parsedArgs: {lines: '5', fileName: undefined},
      inputError: ''
    });
  });
});
