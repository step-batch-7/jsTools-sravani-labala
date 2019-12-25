const generateErrorMessage = function(fileNames) {
  return `tail: ${fileNames[0]}: no such file or directory`;
};

const getRequiredLines = function(linesAndContent) {
  const lines = linesAndContent[0];
  const content = linesAndContent[1][0].split("\n");
  return content.slice(-lines).join("\n");
};

const loadLinesFromFile = function(parsedUserInputs, fs, encoding) {
  const { existsSync, readFileSync } = fs;
  let linesAndContent = [parsedUserInputs.lines];
  const fileName = parsedUserInputs.fileNames[0];
  if (!existsSync(fileName)) {
    return { error: generateErrorMessage([fileName]), message: "" };
  }
  const content = readFileSync(fileName, encoding);
  linesAndContent.push([content]);
  return { message: getRequiredLines(linesAndContent), error: "" };
};

const handleSubOperations = function(commandLineArgs, fs, encoding) {
  const { error, parsedUserInputs } = parseArguments(commandLineArgs);
  if (error) return { error: error, message: "" };
  if (parsedUserInputs.fileNames.length == 0)
    return "waiting for standard input";
  return loadLinesFromFile(parsedUserInputs, fs, encoding);
};

const parseArguments = function(commandLineArgs) {
  let parsedUserInputs = { lines: 10 };
  let optionOrFiles = commandLineArgs.slice(2);
  if (optionOrFiles[0] == "-n" && !Number.isInteger(+optionOrFiles[1])) {
    const error = `tail: illegal offset -- ${optionOrFiles[1]}`;
    return { error: error };
  }
  if (optionOrFiles[0] == "-n") {
    parsedUserInputs.lines = Math.abs(+optionOrFiles[1]);
    optionOrFiles = optionOrFiles.slice(2);
  }
  parsedUserInputs["fileNames"] = optionOrFiles;
  return { parsedUserInputs, error: "" };
};

module.exports = {
  parseArguments,
  loadLinesFromFile,
  getRequiredLines,
  generateErrorMessage,
  handleSubOperations
};
