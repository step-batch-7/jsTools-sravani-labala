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

const loadContent = function(fileName, fs) {
  const error = `tail: ${fileName}: no such file or directory`;
  if (!fs.existsSync(fileName)) {
    return { error, content: '' };
  }
  return { error: '', content: fs.readFileSync(fileName, 'utf8') };
};

const isOptionGiven = function(option) {
  const from = 0;
  const to = 2;
  return option.slice(from, to) === '-n' || Number.isInteger(+option);
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
