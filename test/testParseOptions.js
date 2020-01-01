'use strict';

const assert = require('chai').assert;
const { parseOptions } = require('../src/parseOptions');

describe('parseOptions', function() {
  it('should parse fileName and the default lines as 10', function() {
    assert.deepStrictEqual(parseOptions(['goodFile']), {
      parsedArgs: {
        fileName: 'goodFile',
        lines: 10
      },
      inputError: ''
    });
  });
  it('should parse fileName and number of lines given by user', function() {
    assert.deepStrictEqual(parseOptions(['-n', '5', 'goodFile']), {
      parsedArgs: {
        fileName: 'goodFile',
        lines: 5
      },
      inputError: ''
    });
  });
  it('should give error message when only option is mentioned', function() {
    assert.deepStrictEqual(parseOptions(['-n', 'goodFile']), {
      inputError: 'tail: illegal offset -- goodFile'
    });
  });
});
