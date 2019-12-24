const assert = require("chai").assert;
const fs = require("fs");
const { helperFunctions } = require("./../src/config");

describe("helperFunctions", function() {
  it("should give the list of helper functions", function() {
    assert.deepStrictEqual(helperFunctions(), {
      isFileExist: fs.existsSync,
      reader: fs.readFileSync,
      encoding: "utf8"
    });
  });
});
