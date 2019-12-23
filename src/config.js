const fs = require("fs");

const helperFunctions = function() {
  return {
    isFileExist: fs.existsSync,
    reader: fs.readFileSync,
    error: console.error,
    output: console.log,
    encoding: "utf8"
  };
};

module.exports = { helperFunctions };
