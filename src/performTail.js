'use strict';

const {streamAction} = require('./tailLib.js');
const {parseOptions} = require('./parseOptions');

const tail = function(commandLineArgs, stream, display) {
  const {inputError, parsedArgs} = parseOptions(commandLineArgs);
  if (inputError) {
    return display('', inputError);
  }
  const selectStream = stream.pick(parsedArgs.fileName);
  streamAction(parsedArgs, selectStream, display);
};

exports.tail = tail;
