"use strict";

const { readFileSync, existsSync } = require("fs");
const { stderr, stdout } = process;
const performTail = require("./src/performTail.js").performTail;

const main = function() {
  const commandLineArgs = process.argv.slice(2);
  const { error, content } = performTail(commandLineArgs, {
    readFileSync,
    existsSync
  });
  stderr.write(error);
  stdout.write(content);
};

main();
