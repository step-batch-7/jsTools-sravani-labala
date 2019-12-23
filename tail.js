const { parseUserArguments, handleOperation } = require("./src/utility");
const { helperFunctions } = require("./src/config");

const main = function() {
  const commandLineArgs = process.argv;
  const parsedUserInputs = parseUserArguments(commandLineArgs);
  handleOperation(parsedUserInputs, helperFunctions());
};

main();
