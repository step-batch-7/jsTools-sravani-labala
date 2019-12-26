const extractLines = function(numberOfLines, content) {
  const splitContent = content.split("\n");
  return splitContent.slice(-numberOfLines).join("\n");
};

const parseOptions = function(commandLineArgs) {
  let parsedArgs = { lines: 10, fileName: commandLineArgs[0] };
  const isCountValid = Number.isInteger(+commandLineArgs[1]);
  const isOptionValid = commandLineArgs[0] == "-n";
  const inputError = `tail: illegal offset -- ${commandLineArgs[1]}`;
  if (isOptionValid && !isCountValid) return { inputError };
  if (isOptionValid) {
    parsedArgs.lines = Math.abs(+commandLineArgs[1]);
    parsedArgs.fileName = commandLineArgs[2];
  }
  return { parsedArgs, inputError: "" };
};

const loadContent = function(fileName, fs, encoding) {
  const { existsSync, readFileSync } = fs;
  const error = `tail: ${fileName}: no such file or directory`;
  if (!existsSync(fileName)) return { error, content: "" };
  return { error: "", content: readFileSync(fileName, encoding) };
};

const tail = function(commandLineArgs, fs, encoding) {
  const { inputError, parsedArgs } = parseOptions(commandLineArgs);
  if (inputError) return { error: inputError, message: "" };
  const fileName = parsedArgs.fileName;
  const { error, content } = loadContent(fileName, fs, encoding);
  if (error) return { error, message: "" };
  return { message: extractLines(parsedArgs.lines, content), error: "" };
};

module.exports = {
  parseOptions,
  loadContent,
  extractLines,
  tail
};
