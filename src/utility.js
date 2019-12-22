const generateErrorMessage = function(fileNames) {
  return `tail: ${fileNames[0]}: no such file or directory`;
};

const joinRequiredLines = function(fileContent) {
  let lines = fileContent[0];
  let content = fileContent[1][0].split("\n");
  content = content.reverse();
  content = content.slice(0, lines);
  return content.reverse().join("\n");
};

const loadLines = function(parsedUserInputs, isFileExist, reader, encoding) {
  let fileContent = [parsedUserInputs.lines];
  const fileName = parsedUserInputs.fileNames[0];
  if (!isFileExist(fileName)) {
    return generateErrorMessage([fileName]);
  }
  let content = reader(fileName, encoding);
  fileContent.push([content]);
  return joinRequiredLines(fileContent);
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
  joinRequiredLines,
  generateErrorMessage
};
