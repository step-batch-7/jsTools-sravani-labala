const { parseUserOptions, handleOperation } = require("./src/utility");
const { isFileExist, reader, error, output } = require("./src/config.js");

const main = function() {
  const commandLineArgs = process.argv;
  const encoding = "utf8";
  const parseUserInputs = parseUserOptions(commandLineArgs);
  handleOperation(
    parseUserInputs,
    isFileExist,
    reader,
    encoding,
    error,
    output
  );
};

main();
