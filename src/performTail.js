"use strict";

const {
  parseOptions,
  loadContent,
  extractLines,
  getContent
} = require("./tailLib.js");

const tail = function(commandLineArgs, fs, display, stdin) {
  const { inputError, parsedArgs } = parseOptions(commandLineArgs);
  if (inputError) return display("", inputError);
  if (parsedArgs.fileName != "") {
    const { error, content } = loadContent(parsedArgs.fileName, fs);
    if (error) return display("", error);
    return display(extractLines(parsedArgs.lines, content), "");
  } else getContent(parsedArgs.lines, stdin, display);
};

exports.tail = tail;
