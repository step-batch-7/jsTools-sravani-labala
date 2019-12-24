const { existsSync, readFileSync } = require("fs");
const { stderr, stdout } = process;
const { parseArguments, handleSubOperations } = require("./src/tailLib.js");

const main = function() {
  const commandLineArgs = process.argv;
  const { parsedUserInputs, isInputsValid, inputError } = parseArguments(
    commandLineArgs
  );
  const { error, message } = handleSubOperations(
    isInputsValid,
    parsedUserInputs,
    { existsSync, readFileSync, encoding: "utf8" },
    inputError
  );
  stderr.write(error);
  stdout.write(message);
};

main();
