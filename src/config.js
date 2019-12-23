const fs = require("fs");

const isFileExist = function(path) {
  return fs.existsSync(path);
};

const reader = function(path, encoding) {
  return fs.readFileSync(path, encoding);
};

const error = function(message) {
  console.error(message);
};

const output = function(message) {
  console.log(message);
};
module.exports = { isFileExist, reader, error, output };
