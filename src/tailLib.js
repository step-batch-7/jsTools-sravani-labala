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

module.exports = {
  loadContent,
  extractLines
};
