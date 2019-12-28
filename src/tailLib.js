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
  if (userArgs.length == 0)
    return { parsedArgs: { lines: 10, fileName: "" }, inputError: "" };
  const [firstOption, secondOption] = userArgs;
  const lines = +firstOption.slice(-1) || +secondOption;
  let parsedArgs = { lines: 10, fileName: userArgs[0] };
  if (firstOption.slice(0, 2) == "-n" || Number.isInteger(+firstOption)) {
    if (!Number.isInteger(lines))
      return { inputError: `tail: illegal offset -- ${secondOption}` };
    parsedArgs.lines = lines;
    parsedArgs.fileName = userArgs.pop();
  }
  if (Number.isInteger(+parsedArgs.fileName)) {
    parsedArgs.fileName = "";
  }
  return { parsedArgs, inputError: "" };
};

const getContent = function(lines, stdin, display) {
  let content = [];
  stdin.setEncoding("utf8");
  stdin.on("data", data => {
    content.push(data.trim());
  });
  stdin.on("end", () => display(extractLines(lines, content.join("\n")), ""));
};

module.exports = {
  parseOptions,
  loadContent,
  extractLines,
  getContent
};
