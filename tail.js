'use strict';

const {createReadStream} = require('fs');
const {stderr, stdout, stdin} = process;
const tail = require('./src/performTail.js').tail;
const StreamPicker = require('./src/streamPicker');

const main = function() {
  const startOfOptions = 2;
  const commandLineArgs = process.argv.slice(startOfOptions);
  const display = function(content, error) {
    stderr.write(error);
    stdout.write(content);
  };
  const stream = new StreamPicker(stdin, createReadStream);
  tail(commandLineArgs, stream, display);
};

main();
