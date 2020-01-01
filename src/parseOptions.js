'use strict';

const isOption = function(option) {
  return option.includes('-n') || Number.isInteger(+option);
};

const isOptionInvalid = function(option) {
  return option.startsWith('-') && !isOption(option);
};

const isFileName = function(file) {
  return !(Number.isInteger(+file) || file.startsWith('-'));
};

const getFileName = function(contents) {
  const firstIndex = 0;
  const fileName = contents.filter(isFileName);
  return fileName[firstIndex];
};

const getUsage = function(option) {
  let err = `tail: illegal option -- ${option}`;
  err = err + '\nusage: tail [-n #] [file]';
  return err;
};

const hasPlusSign = function(option1, option2) {
  const isSign = option2 !== undefined && option2.startsWith('+');
  return option1.startsWith('+') || isSign;
};

const getCountValue = function(option1, option2) {
  if (hasPlusSign(option1, option2)) {
    return '+' + (+option1 || +option2);
  }
  const till = 1;
  return +option1.slice(-till) || +option2;
};

const getNumberOfLines = function(firstOption, secondOption) {
  const lines = getCountValue(firstOption, secondOption);
  if (isOption(firstOption)) {
    if (!Number.isInteger(+lines)) {
      return { inputError: `tail: illegal offset -- ${secondOption}` };
    }
    return { lines: `${lines}`, inputError: '' };
  }
  return { lines: '10', inputError: '' };
};

const parseOptions = function(userArgs) {
  const [firstOption, secondOption] = userArgs;
  if (isOptionInvalid(firstOption)) {
    return { inputError: getUsage(firstOption) };
  }
  const { inputError, lines } = getNumberOfLines(firstOption, secondOption);
  if (inputError) {
    return { inputError };
  }
  const parsedArgs = { lines, fileName: getFileName(userArgs) };
  return { parsedArgs, inputError: '' };
};

module.exports = { parseOptions };
