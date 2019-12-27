"use strict";

const { parseOptions, loadContent, extractLines } = require("./tailLib.js");

const performTail = function(commandLineArgs, fs) {
  const { inputError, parsedArgs } = parseOptions(commandLineArgs);
  if (inputError) return { error: inputError, content: "" };
  const { error, content } = loadContent(parsedArgs.fileName, fs);
  if (error) return { error, content: "" };
  return { content: extractLines(parsedArgs.lines, content), error: "" };
};

exports.performTail = performTail;
