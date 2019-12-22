const fs = require("fs");

const isFileExist = function(path) {
  return fs.existsSync(path);
};

const reader = function(path, encoding) {
  return fs.readFileSync(path, encoding);
};

module.exports = { isFileExist, reader };
