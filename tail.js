const fs = require("fs");
const { stderr, stdout } = process;
const { parseArguments, handleSubOperations } = require("./src/tailLib.js");

const main = function() {
  const commandLineArgs = process.argv;
  const fsTools = {
    isFileExist: fs.existsSync,
    reader: fs.readFileSync,
    encoding: "utf8"
  };
  const { parsedUserInputs, valid, inputError } = parseArguments(
    commandLineArgs
  );
  const { error, message } = handleSubOperations(
    valid,
    parsedUserInputs,
    fsTools,
    inputError
  );
  error && stderr.write(error);
  message && stdout.write(message);
};

main();
