const fs = require("fs");
const { stderr, stdout } = process;
const { handleSubOperations } = require("./src/tailLib.js");

const main = function() {
  const commandLineArgs = process.argv;
  const encoding = "utf8";
  const { error, message } = handleSubOperations(commandLineArgs, fs, encoding);
  stderr.write(error);
  stdout.write(message);
};

main();
