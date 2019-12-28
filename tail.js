"use strict";

const { readFileSync, existsSync } = require("fs");
const { stderr, stdout, stdin } = process;
const tail = require("./src/performTail.js").tail;

const main = function() {
  const commandLineArgs = process.argv.slice(2);
  const display = function(content, error) {
    stderr.write(error);
    stdout.write(content);
  };
  tail(commandLineArgs, { readFileSync, existsSync }, display, stdin);
};

main();
