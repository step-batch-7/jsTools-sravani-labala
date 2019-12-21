const {
  parseUserOptions,
  loadLines,
  joinRequiredLines
} = require("./src/utility");

const main = function() {
  const commandLineArgs = process.argv;
  const parseUserInputs = parseUserOptions(commandLineArgs);
  const fileContent = loadLines(parseUserInputs);
  console.log(fileContent);
};

main();
