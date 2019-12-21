const assert = require("chai").assert;
const {
  parseUserOptions,
  loadLines,
  joinRequiredLines,
  generateErrorMessage
} = require("./../src/utility");

describe("parseUserOptions", function() {
  it("should parse the user inputs from array to object format", function() {
    const commandLineArgs = ["node", "tail.js", "goodFile"];
    assert.deepStrictEqual(parseUserOptions(commandLineArgs), {
      fileNames: ["goodFile"],
      lines: 10
    });
  });
});

describe("loadLines", function() {
  it("should load the last ten lines by default", function() {
    const parsedLines = {
      fileNames: ["./appTests/testingFiles/goodFile.txt"],
      lines: 10
    };
    const expected = [
      10,
      ["1\n2\n3\n4\n5\n6\n7\n8\n9\n10\n11\n12\n13\n14\n15"]
    ];
    assert.deepStrictEqual(loadLines(parsedLines), expected);
  });
  it("should give the array of wrong file path or names", function() {
    const parsedLines = {
      fileNames: ["./wrongFile.txt"],
      lines: 10
    };
    assert.deepStrictEqual(loadLines(parsedLines), ["./wrongFile.txt"]);
  });
});

describe("joinRequiredLines", function() {
  it("should give the required number of lines of the file content", function() {
    const fileContent = [
      10,
      ["1\n2\n3\n4\n5\n6\n7\n8\n9\n10\n11\n12\n13\n14\n15"]
    ];
    const expected = "6\n7\n8\n9\n10\n11\n12\n13\n14\n15";
    assert.strictEqual(joinRequiredLines(fileContent), expected);
  });
});

describe("generateErrorMessage", function() {
  it("should give the error message along with the file name", function() {
    const fileName = ["wrongFile"];
    const expected = `tail: wrongFile: no such file or directory`;
    assert.strictEqual(generateErrorMessage(fileName), expected);
  });
});
