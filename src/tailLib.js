'use strict';

const extractLines = function(numberOfLines, content) {
  const nil = 0;
  if (numberOfLines === nil) {
    return '';
  }
  const splitContent = content.split('\n');
  const lastIndexFinder = 1;
  if (splitContent[splitContent.length - lastIndexFinder] === '') {
    splitContent.pop();
  }
  return splitContent.slice(-numberOfLines).join('\n');
};

const loadContent = function({ err, data }, parsedArgs, display) {
  const error = `tail: ${parsedArgs.fileName}: no such file or directory`;
  if (err) {
    return display('', error);
  }
  display(extractLines(parsedArgs.lines, data), '');
};

const isOptionGiven = function(option) {
  return option.includes('-n') || Number.isInteger(+option);
};

const parseOptions = function(userArgs) {
  const [firstOption, secondOption] = userArgs;
  const lastIndex = -1;
  const lines = +firstOption.slice(lastIndex) || +secondOption;
  const parsedArgs = { lines: 10, fileName: firstOption };
  if (isOptionGiven(firstOption)) {
    if (!Number.isInteger(lines)) {
      return { inputError: `tail: illegal offset -- ${secondOption}` };
    }
    parsedArgs.lines = lines;
    parsedArgs.fileName = userArgs.pop();
  }
  return { parsedArgs, inputError: '' };
};

module.exports = {
  parseOptions,
  loadContent,
  extractLines
};
