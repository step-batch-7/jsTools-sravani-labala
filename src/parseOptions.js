'use strict';

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

module.exports = { parseOptions };
