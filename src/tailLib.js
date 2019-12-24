const generateErrorMessage = function(fileNames) {
  return `tail: ${fileNames[0]}: no such file or directory`;
};

const getRequiredLines = function(linesAndContent) {
  const lines = linesAndContent[0];
  let content = linesAndContent[1][0].split("\n");
  return content.slice(-lines).join("\n");
};

const loadLinesFromFile = function(parsedUserInputs, helperFunctions) {
  const { isFileExist, reader, encoding } = helperFunctions;
  let linesAndContent = [parsedUserInputs.lines];
  const fileName = parsedUserInputs.fileNames[0];
  if (!isFileExist(fileName)) {
    return generateErrorMessage([fileName]);
  }
  const content = reader(fileName, encoding);
  linesAndContent.push([content]);
  return getRequiredLines(linesAndContent);
};

const handleSubOperations = function(
  valid,
  parsedUserInputs,
  helperFunctions,
  error
) {
  if (valid == false) return { error: error };
  if (parsedUserInputs.fileNames.length == 0)
    return "waiting for standard input";
  const message = loadLinesFromFile(parsedUserInputs, helperFunctions);
  return { message: message };
};

const parseUserArguments = function(commandLineArgs) {
  let parsedUserInputs = { lines: 10 };
  let userArgs = commandLineArgs.slice(2);
  if (userArgs[0] == "-n" && Number.isNaN(+userArgs[1])) {
    let error = `tail: illegal offset -- ${userArgs[1]}`;
    return { valid: false, inputError: error };
  }
  if (userArgs[0] == "-n" && Math.abs(+userArgs[1]) >= 0) {
    parsedUserInputs.lines = Math.abs(+userArgs[1]);
    userArgs = userArgs.slice(2);
  }
  parsedUserInputs["fileNames"] = userArgs;
  return { parsedUserInputs, valid: true };
};

module.exports = {
  parseUserArguments,
  loadLinesFromFile,
  getRequiredLines,
  generateErrorMessage,
  handleSubOperations
};
