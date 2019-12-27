"use strict";

const extractLines = function(numberOfLines, content) {
  if (numberOfLines == 0) return "";
  const splitContent = content.split("\n");
  if (splitContent[splitContent.length - 1] == "") splitContent.pop();
  return splitContent.slice(-numberOfLines).join("\n");
};

const loadContent = function(fileName, fs) {
  const error = `tail: ${fileName}: no such file or directory`;
  if (!fs.existsSync(fileName)) return { error, content: "" };
  return { error: "", content: fs.readFileSync(fileName, "utf8") };
};

const parseOptions = function(userArgs) {
  const [firstOption, secondOption] = userArgs;
  const lines = +firstOption.slice(-1) || +secondOption;
  let parsedArgs = { lines: 10, fileName: userArgs[0] };
  if (firstOption.slice(0, 2) == "-n" || Number.isInteger(+firstOption)) {
    if (!Number.isInteger(lines))
      return { inputError: `tail: illegal offset -- ${secondOption}` };
    parsedArgs.lines = lines;
    parsedArgs.fileName = userArgs[userArgs.length - 1];
  }
  return { parsedArgs, inputError: "" };
};

module.exports = {
  parseOptions,
  loadContent,
  extractLines
};
