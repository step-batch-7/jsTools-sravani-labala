'use strict';

const { readFile } = require('fs');
const { stderr, stdout, stdin } = process;
const tail = require('./src/performTail.js').tail;

const main = function() {
  const startOfOptions = 2;
  const commandLineArgs = process.argv.slice(startOfOptions);
  const display = function(content, error) {
    stderr.write(error);
    stdout.write(content);
  };
  tail(commandLineArgs, { readFile, stdin }, display);
};

main();
