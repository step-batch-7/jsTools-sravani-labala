'use strict';

const { parseOptions, loadContent } = require('./tailLib.js');

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
