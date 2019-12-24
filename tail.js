const { parseUserArguments, handleSubOperations } = require("./src/tailLib.js");
const { helperFunctions } = require("./src/config");

const main = function() {
  const commandLineArgs = process.argv;
  let { parsedUserInputs, valid, inputError } = parseUserArguments(
    commandLineArgs
  );
  let { error, message } = handleSubOperations(
    valid,
    parsedUserInputs,
    helperFunctions(),
    inputError
  );
  error && console.error(error);
  message && console.log(message);
};

main();
