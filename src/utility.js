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

const loadLines = function(parsedUserInputs, helperFunctions) {
  const { isFileExist, reader, encoding } = helperFunctions;
  let fileContent = [parsedUserInputs.lines];
  const fileName = parsedUserInputs.fileNames[0];
  if (!isFileExist(fileName)) {
    return generateErrorMessage([fileName], helperFunctions.error);
  }
  let content = reader(fileName, encoding);
  fileContent.push([content]);
  return generateRequiredLines(fileContent, helperFunctions.output);
};

const handleOperation = function(parsedUserInputs, helperFunctions) {
  if (parsedUserInputs.fileNames.length == 0)
    return "waiting for standard input";
  return loadLines(parsedUserInputs, helperFunctions);
};

const parseUserArguments = function(commandLineArgs, error) {
  let parsedUserInputs = { lines: 10 };
  let userArgs = commandLineArgs.slice(2);
  let optionOrFile = userArgs[0].split("");
  if (optionOrFile.includes("-")) {
    if (optionOrFile[1] != "n" && +optionOrFile[1] > 0) {
      parsedUserInputs.lines = +optionOrFile[1];
      userArgs = userArgs.slice(1);
    }
    if (optionOrFile[1] == "n" && optionOrFile.length == 3) {
      parsedUserInputs.lines = +optionOrFile[2];
      userArgs = userArgs.slice(1);
    }
    if (userArgs[1] != undefined && Number.isNaN(+userArgs[1])) {
      return error(`tail: illegal offset -- ${userArgs[1]}`);
    }
    if (+userArgs[1] >= 0) {
      parsedUserInputs.lines = +userArgs[1];
      userArgs = userArgs.slice(2);
    }
  }
  parsedUserInputs["fileNames"] = userArgs;
  return parsedUserInputs;
};

module.exports = {
  parseUserArguments,
  loadLines,
  generateRequiredLines,
  generateErrorMessage,
  handleOperation
};
