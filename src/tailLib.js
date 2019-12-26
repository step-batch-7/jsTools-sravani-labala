"use strict";

const extractLines = function(numberOfLines, content) {
  const splitContent = content.split("\n");
  return splitContent.slice(-numberOfLines).join("\n");
};

const loadContent = function(fileName, fs, encoding) {
  const error = `tail: ${fileName}: no such file or directory`;
  if (!fs.existsSync(fileName)) return { error, content: "" };
  return { error: "", content: fs.readFileSync(fileName, encoding) };
};

const parseOptions = function(commandLineArgs) {
  let parsedArgs = { lines: 10, fileName: commandLineArgs[0] };
  const inputError = `tail: illegal offset -- ${commandLineArgs[1]}`;
  if (commandLineArgs[0] == "-n") {
    if (!Number.isInteger(+commandLineArgs[1])) return { inputError };
    parsedArgs.lines = Math.abs(+commandLineArgs[1]);
    parsedArgs.fileName = commandLineArgs[2];
  }
  return { parsedArgs, inputError: "" };
};

const performTail = function(commandLineArgs, fs, encoding) {
  const { inputError, parsedArgs } = parseOptions(commandLineArgs);
  if (inputError) return { error: inputError, message: "" };
  if (parsedArgs.lines == 0) return { error: "", message: "" };
  const fileName = parsedArgs.fileName;
  const { error, content } = loadContent(fileName, fs, encoding);
  if (error) return { error, message: "" };
  return { message: extractLines(parsedArgs.lines, content), error: "" };
};

module.exports = {
  parseOptions,
  loadContent,
  extractLines,
  performTail
};
