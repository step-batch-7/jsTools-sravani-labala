const { parseUserArguments, handleSubOperations } = require("./src/utility");
const { helperFunctions } = require("./src/config");

const main = function() {
  const commandLineArgs = process.argv;
  const { parsedUserInputs, valid } = parseUserArguments(
    commandLineArgs,
    helperFunctions().error
  );
  handleSubOperations(valid, parsedUserInputs, helperFunctions());
};

main();
