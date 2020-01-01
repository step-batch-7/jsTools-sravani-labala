'use strict';

const { loadContent, getContent } = require('./tailLib.js');
const { parseOptions } = require('./parseOptions');

const tail = function(commandLineArgs, { readFile, stdin }, display) {
  const { inputError, parsedArgs } = parseOptions(commandLineArgs);
  if (inputError) {
    return display('', inputError);
  }
  if (parsedArgs.fileName === undefined) {
    getContent(parsedArgs.lines, stdin, display);
    return;
  }
  readFile(parsedArgs.fileName, 'utf8', (err, data) =>
    loadContent({ err, data }, parsedArgs, display)
  );
};

exports.tail = tail;
