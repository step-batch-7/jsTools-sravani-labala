const generateErrorMessage = function(fileNames) {
  return `tail: ${fileNames[0]}: no such file or directory`;
};

const getRequiredLines = function(linesAndContent) {
  const lines = linesAndContent[0];
  let content = linesAndContent[1][0].split("\n");
  return content.slice(-lines).join("\n");
};

const loadLinesFromFile = function(parsedUserInputs, fsTools) {
  const { existsSync, readFileSync, encoding } = fsTools;
  let linesAndContent = [parsedUserInputs.lines];
  const fileName = parsedUserInputs.fileNames[0];
  if (!existsSync(fileName)) {
    return { error: generateErrorMessage([fileName]), message: "" };
  }
  const content = readFileSync(fileName, encoding);
  linesAndContent.push([content]);
  return { message: getRequiredLines(linesAndContent), error: "" };
};

const handleSubOperations = function(
  isInputsValid,
  parsedUserInputs,
  fsTools,
  error
) {
  if (isInputsValid == false) return { error: error, message: "" };
  if (parsedUserInputs.fileNames.length == 0)
    return "waiting for standard input";
  return loadLinesFromFile(parsedUserInputs, fsTools);
};

const parseArguments = function(commandLineArgs) {
  let parsedUserInputs = { lines: 10 };
  let optionOrFiles = commandLineArgs.slice(2);
  if (optionOrFiles[0] == "-n" && !Number.isInteger(+optionOrFiles[1])) {
    const error = `tail: illegal offset -- ${optionOrFiles[1]}`;
    return { isInputsValid: false, inputError: error };
  }
  if (optionOrFiles[0] == "-n") {
    parsedUserInputs.lines = Math.abs(+optionOrFiles[1]);
    optionOrFiles = optionOrFiles.slice(2);
  }
  parsedUserInputs["fileNames"] = optionOrFiles;
  return { parsedUserInputs, isInputsValid: true };
};

module.exports = {
  parseArguments,
  loadLinesFromFile,
  getRequiredLines,
  generateErrorMessage,
  handleSubOperations
};
