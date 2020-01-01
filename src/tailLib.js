'use strict';

const extractLines = function(numberOfLines, content) {
  const subtract = 1;
  const splitContent = content.split('\n');
  if (numberOfLines.startsWith('+')) {
    return splitContent.slice(numberOfLines - subtract).join('\n');
  }
  if (splitContent[splitContent.length - subtract] === '') {
    splitContent.pop();
  }
  const from = 0;
  const extractedContent = splitContent
    .reverse()
    .slice(from, Math.abs(numberOfLines));
  return extractedContent.reverse().join('\n');
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
