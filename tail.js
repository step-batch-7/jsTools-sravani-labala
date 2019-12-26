const fs = require("fs");
const { stderr, stdout } = process;
const { tail } = require("./src/tailLib.js");

const main = function() {
  const commandLineArgs = process.argv.slice(2);
  const encoding = "utf8";
  const { error, message } = tail(commandLineArgs, fs, encoding);
  stderr.write(error);
  stdout.write(message);
};

main();
