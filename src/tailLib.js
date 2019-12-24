const generateErrorMessage = function(fileNames) {
  return `tail: ${fileNames[0]}: no such file or directory`;
};

const getRequiredLines = function(linesAndContent) {
  const lines = linesAndContent[0];
  let content = linesAndContent[1][0].split("\n");
  return content.slice(-lines).join("\n");
};

const loadLinesFromFile = function(parsedUserInputs, fsTools) {
  const { isFileExist, reader, encoding } = fsTools;
  let linesAndContent = [parsedUserInputs.lines];
  const fileName = parsedUserInputs.fileNames[0];
  if (!isFileExist(fileName)) {
    return { error: generateErrorMessage([fileName]) };
  }
  const content = reader(fileName, encoding);
  linesAndContent.push([content]);
  return { message: getRequiredLines(linesAndContent) };
};

const handleSubOperations = function(valid, parsedUserInputs, fsTools, error) {
  if (valid == false) return { error: error };
  if (parsedUserInputs.fileNames.length == 0)
    return "waiting for standard input";
  return loadLinesFromFile(parsedUserInputs, fsTools);
};

const parseArguments = function(commandLineArgs) {
  let parsedUserInputs = { lines: 10 };
  let optionOrFiles = commandLineArgs.slice(2);
  if (optionOrFiles[0] == "-n" && !Number.isInteger(+optionOrFiles[1])) {
    const error = `tail: illegal offset -- ${optionOrFiles[1]}`;
    return { valid: false, inputError: error };
  }
  if (optionOrFiles[0] == "-n") {
    parsedUserInputs.lines = Math.abs(+optionOrFiles[1]);
    optionOrFiles = optionOrFiles.slice(2);
  }
  parsedUserInputs["fileNames"] = optionOrFiles;
  return { parsedUserInputs, valid: true };
};

module.exports = {
  parseArguments,
  loadLinesFromFile,
  getRequiredLines,
  generateErrorMessage,
  handleSubOperations
};
