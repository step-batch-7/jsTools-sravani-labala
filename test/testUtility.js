const assert = require("chai").assert;
const {
  parseUserOptions,
  loadLines,
  joinRequiredLines,
  generateErrorMessage
} = require("./../src/utility");

describe("parseUserOptions", function() {
  it("should parse fileName and the default lines as 10 if number of lines is not mentioned", function() {
    const commandLineArgs = ["node", "tail.js", "goodFile"];
    assert.deepStrictEqual(parseUserOptions(commandLineArgs), {
      fileNames: ["goodFile"],
      lines: 10
    });
  });
  it("should parse fileName and the number of lines given in the command line args", function() {
    const commandLineArgs = ["node", "tail.js", "-n", "5", "goodFile"];
    assert.deepStrictEqual(parseUserOptions(commandLineArgs), {
      fileNames: ["goodFile"],
      lines: "5"
    });
  });
});

describe("loadLines", function() {
  it("should load the last ten lines by default", function() {
    const isFileExist = function(path) {
      assert.strictEqual(path, "./appTests/testingFiles/fileWithMoreLines.txt");
      return true;
    };
    const reader = function(path, encoding) {
      assert.strictEqual(path, "./appTests/testingFiles/fileWithMoreLines.txt");
      assert.strictEqual(encoding, "utf8");
      return "1\n2\n3\n4\n5\n6\n7\n8\n9\n10\n11\n12\n13\n14\n15";
    };
    const parsedLines = {
      fileNames: ["./appTests/testingFiles/fileWithMoreLines.txt"],
      lines: 10
    };
    const expected = "6\n7\n8\n9\n10\n11\n12\n13\n14\n15";
    const encoding = "utf8";
    assert.deepStrictEqual(
      loadLines(parsedLines, isFileExist, reader, encoding),
      expected
    );
  });
  it("should give the array of wrong file path or names", function() {
    const isFileExist = function(path) {
      assert.strictEqual(path, "wrongFile");
      return false;
    };
    const parsedLines = {
      fileNames: ["wrongFile"],
      lines: 10
    };
    const expected = `tail: wrongFile: no such file or directory`;
    assert.deepStrictEqual(loadLines(parsedLines, isFileExist), expected);
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
