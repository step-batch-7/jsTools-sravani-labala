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

const streamAction = function(parsedArgs, stdin, display) {
  const error = `tail: ${parsedArgs.fileName}: no such file or directory`;
  let content = [];
  stdin.setEncoding('utf8');
  stdin.on('data', data => {
    content += data;
  });
  stdin.on('end', () => {
    display(extractLines(parsedArgs.lines, content), '');
  });
  stdin.on('error', () => {
    display('', error);
  });
};

module.exports = {
  streamAction,
  extractLines
};
