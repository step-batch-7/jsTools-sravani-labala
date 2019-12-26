"use strict";

const fs = require("fs");
const { stderr, stdout } = process;
const { performTail } = require("./src/tailLib.js");

const main = function() {
  const commandLineArgs = process.argv.slice(2);
  const encoding = "utf8";
  const { error, message } = performTail(commandLineArgs, fs, encoding);
  stderr.write(error);
  stdout.write(message);
};

main();
