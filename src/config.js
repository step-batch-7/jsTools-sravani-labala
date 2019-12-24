const fs = require("fs");

const helperFunctions = function() {
  return {
    isFileExist: fs.existsSync,
    reader: fs.readFileSync,
    encoding: "utf8"
  };
};

module.exports = { helperFunctions };
