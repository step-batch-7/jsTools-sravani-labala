const getRequiredLastLines = function(numberOfLines, content) {
  const splittedContent = content[0].split("\n");
  return splittedContent.slice(-numberOfLines).join("\n");
};

const loadLinesFromFile = function(parsedUserInputs, fs, encoding) {
  const { existsSync, readFileSync } = fs;
  const numberOfLines = parsedUserInputs.lines;
  const fileName = parsedUserInputs.fileNames[0];
  if (!existsSync(fileName)) {
    return {
      error: `tail: ${fileName}: no such file or directory`,
      message: ""
    };
  }
  const fileContent = readFileSync(fileName, encoding);
  let content = [fileContent];
  return {
    message: getRequiredLastLines(numberOfLines, content),
    error: ""
  };
};

const parseArguments = function(commandLineArgs) {
  let parsedUserInputs = { lines: 10 };
  let optionOrFiles = commandLineArgs.slice(2);
  const isCountValid = Number.isInteger(+optionOrFiles[1]);
  const isOptionValid = optionOrFiles[0] == "-n";
  if (isOptionValid && !isCountValid) {
    const error = `tail: illegal offset -- ${optionOrFiles[1]}`;
    return { error: error };
  }
  if (isOptionValid) {
    parsedUserInputs.lines = Math.abs(+optionOrFiles[1]);
    optionOrFiles = optionOrFiles.slice(2);
  }
  parsedUserInputs["fileNames"] = optionOrFiles;
  return { parsedUserInputs, error: "" };
};

const handleSubOperations = function(commandLineArgs, fs, encoding) {
  const { error, parsedUserInputs } = parseArguments(commandLineArgs);
  if (error) return { error: error, message: "" };
  return loadLinesFromFile(parsedUserInputs, fs, encoding);
};

module.exports = {
  parseArguments,
  loadLinesFromFile,
  getRequiredLastLines,
  handleSubOperations
};
