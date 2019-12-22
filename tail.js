const { parseUserOptions, loadLines } = require("./src/utility");
const { isFileExist, reader } = require("./src/fsConfig.js");

const main = function() {
  const commandLineArgs = process.argv;
  const encoding = "utf8";
  const parseUserInputs = parseUserOptions(commandLineArgs);
  const fileContent = loadLines(parseUserInputs, isFileExist, reader, encoding);
  console.log(fileContent);
};

main();
