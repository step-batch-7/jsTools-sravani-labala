"use strict";

const { parseOptions, loadContent, extractLines } = require("./tailLib.js");

const tail = function(commandLineArgs, fs, display) {
  const { inputError, parsedArgs } = parseOptions(commandLineArgs);
  if (inputError) return display("", inputError);
  const { error, content } = loadContent(parsedArgs.fileName, fs);
  if (error) return display("", error);
  return display(extractLines(parsedArgs.lines, content), "");
};

exports.tail = tail;
