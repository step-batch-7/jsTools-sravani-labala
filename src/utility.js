const fs = require("fs");

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

const loadLines = function(parsedUserInputs) {
  let fileContent = [parsedUserInputs.lines];
  const fileName = parsedUserInputs.fileNames[0];
  if (!fs.existsSync(fileName)) {
    // return [fileName];
    return generateErrorMessage([fileName]);
  }
  let content = fs.readFileSync(fileName, "utf8");
  fileContent.push([content]);
  // return fileContent;
  return joinRequiredLines(fileContent);
};

const parseUserOptions = function(commandLineArgs) {
  let parsedUserInputs = { lines: 10 };
  const userArgs = commandLineArgs.slice(2);
  parsedUserInputs["fileNames"] = userArgs;
  return parsedUserInputs;
};

module.exports = {
  parseUserOptions,
  loadLines,
  joinRequiredLines,
  generateErrorMessage
};
