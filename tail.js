const fs = require("fs");
const { stderr, stdout } = process;
const { parseUserArguments, handleSubOperations } = require("./src/tailLib.js");

const main = function() {
  const commandLineArgs = process.argv;
  const helperFunctions = {
    isFileExist: fs.existsSync,
    reader: fs.readFileSync,
    encoding: "utf8"
  };
  const { parsedUserInputs, valid, inputError } = parseUserArguments(
    commandLineArgs
  );
  const { error, message } = handleSubOperations(
    valid,
    parsedUserInputs,
    helperFunctions,
    inputError
  );
  error && stderr.write(error);
  message && stdout.write(message);
};

main();
