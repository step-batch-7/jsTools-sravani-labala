'use strict';

const { loadContent } = require('./tailLib.js');
const { parseOptions } = require('./parseOptions');

const tail = function(commandLineArgs, reader, display) {
  const { inputError, parsedArgs } = parseOptions(commandLineArgs);
  if (inputError) {
    return display('', inputError);
  }
  reader(parsedArgs.fileName, 'utf8', (err, data) =>
    loadContent({ err, data }, parsedArgs, display)
  );
};

exports.tail = tail;
