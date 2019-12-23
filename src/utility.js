const generateErrorMessage = function(fileNames, error) {
  error(`tail: ${fileNames[0]}: no such file or directory`);
};

const generateRequiredLines = function(fileContent, output) {
  let lines = fileContent[0];
  let content = fileContent[1][0].split("\n");
  content = content.reverse();
  content = content.slice(0, lines);
  output(content.reverse().join("\n"));
};

const loadLines = function(
  parsedUserInputs,
  isFileExist,
  reader,
  encoding,
  error,
  output
) {
  let fileContent = [parsedUserInputs.lines];
  const fileName = parsedUserInputs.fileNames[0];
  if (!isFileExist(fileName)) {
    return generateErrorMessage([fileName], error);
  }
  let content = reader(fileName, encoding);
  fileContent.push([content]);
  return generateRequiredLines(fileContent, output);
};

const handleOperation = function(
  parsedUserInputs,
  isFileExist,
  reader,
  encoding,
  error,
  output
) {
  if (parsedUserInputs.fileNames.length == 0)
    return "waiting for standard input";
  return loadLines(
    parsedUserInputs,
    isFileExist,
    reader,
    encoding,
    error,
    output
  );
};

const parseUserOptions = function(commandLineArgs) {
  let parsedUserInputs = { lines: 10 };
  let userArgs = commandLineArgs.slice(2);
  if (userArgs.includes("-n")) {
    parsedUserInputs.lines = userArgs[userArgs.indexOf("-n") + 1];
    userArgs = userArgs.slice(2);
  }
  parsedUserInputs["fileNames"] = userArgs;
  return parsedUserInputs;
};

module.exports = {
  parseUserOptions,
  loadLines,
  generateRequiredLines,
  generateErrorMessage,
  handleOperation
};
