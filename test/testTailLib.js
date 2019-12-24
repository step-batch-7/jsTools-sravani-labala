const assert = require("chai").assert;
const {
  parseArguments,
  loadLinesFromFile,
  getRequiredLines,
  generateErrorMessage,
  handleSubOperations
} = require("../src/tailLib.js");

describe("parseArguments", function() {
  it("should parse fileName and the default lines as 10 if number of lines is not mentioned", function() {
    const commandLineArgs = ["node", "tail.js", "goodFile"];
    assert.deepStrictEqual(parseArguments(commandLineArgs), {
      parsedUserInputs: {
        fileNames: ["goodFile"],
        lines: 10
      },
      isInputsValid: true
    });
  });
  it("should parse fileName and the number of lines are given in the command line args with space in between", function() {
    const commandLineArgs = ["node", "tail.js", "-n", "5", "goodFile"];
    assert.deepStrictEqual(parseArguments(commandLineArgs), {
      parsedUserInputs: {
        fileNames: ["goodFile"],
        lines: 5
      },
      isInputsValid: true
    });
  });
  it("should give error message when only option is mentioned without the count but has the file name", function() {
    const commandLineArgs = ["node", "tail.js", "-n", "goodFile"];
    assert.deepStrictEqual(parseArguments(commandLineArgs), {
      isInputsValid: false,
      inputError: "tail: illegal offset -- goodFile"
    });
  });
});

describe("loadLinesFromFile", function() {
  it("should load the last ten lines by default", function() {
    const existsSync = function(path) {
      assert.strictEqual(path, "./appTests/testingFiles/fileWithMoreLines.txt");
      return true;
    };
    const readFileSync = function(path, encoding) {
      assert.strictEqual(path, "./appTests/testingFiles/fileWithMoreLines.txt");
      assert.strictEqual(encoding, "utf8");
      return "1\n2\n3\n4\n5\n6\n7\n8\n9\n10\n11\n12\n13\n14\n15";
    };
    const parsedUserInputs = {
      fileNames: ["./appTests/testingFiles/fileWithMoreLines.txt"],
      lines: 10
    };
    const encoding = "utf8";
    assert.deepStrictEqual(
      loadLinesFromFile(parsedUserInputs, {
        readFileSync,
        existsSync,
        encoding
      }),
      { message: "6\n7\n8\n9\n10\n11\n12\n13\n14\n15", error: "" }
    );
  });
  it("should give the array of wrong file path or names", function() {
    const existsSync = function(path) {
      assert.strictEqual(path, "wrongFile");
      return false;
    };
    const parsedUserInputs = {
      fileNames: ["wrongFile"],
      lines: 10
    };
    const readFileSync = function() {
      return;
    };
    const encoding = "utf8";
    assert.deepStrictEqual(
      loadLinesFromFile(parsedUserInputs, {
        existsSync,
        readFileSync,
        encoding
      }),
      { error: "tail: wrongFile: no such file or directory", message: "" }
    );
  });
});

describe("getRequiredLines", function() {
  it("should give the required number of lines of the file content", function() {
    const fileContent = [
      10,
      ["1\n2\n3\n4\n5\n6\n7\n8\n9\n10\n11\n12\n13\n14\n15"]
    ];
    assert.strictEqual(
      getRequiredLines(fileContent),
      "6\n7\n8\n9\n10\n11\n12\n13\n14\n15"
    );
  });
});

describe("generateErrorMessage", function() {
  it("should give the error message along with the file name", function() {
    const fileName = ["wrongFile"];
    assert.strictEqual(
      generateErrorMessage(fileName),
      "tail: wrongFile: no such file or directory"
    );
  });
});

describe("handleSubOperations", function() {
  it("should give the required lines of the file if the file name is mentioned and if it exists", function() {
    const existsSync = function(path) {
      assert.strictEqual(path, "./appTests/testingFiles/fileWithMoreLines.txt");
      return true;
    };
    const readFileSync = function(path, encoding) {
      assert.strictEqual(path, "./appTests/testingFiles/fileWithMoreLines.txt");
      assert.strictEqual(encoding, "utf8");
      return "1\n2\n3\n4\n5\n6\n7\n8\n9\n10\n11\n12\n13\n14\n15";
    };
    const parsedUserInputs = {
      fileNames: ["./appTests/testingFiles/fileWithMoreLines.txt"],
      lines: 10
    };
    const encoding = "utf8";
    assert.deepStrictEqual(
      handleSubOperations(true, parsedUserInputs, {
        existsSync,
        readFileSync,
        encoding
      }),
      { message: "6\n7\n8\n9\n10\n11\n12\n13\n14\n15", error: "" }
    );
  });
  it("should give 'waiting for standard input' if the file names are not mentioned", function() {
    const parsedUserInputs = { fileNames: [], lines: 10 };
    assert.strictEqual(
      handleSubOperations(true, parsedUserInputs),
      "waiting for standard input"
    );
  });
  it("should give nothing if the inputs are not isInputsValid", function() {
    const error = "tail: illegal offset -- goodFile";
    assert.deepStrictEqual(
      handleSubOperations(false, parseArguments, {}, error),
      { error: error, message: "" }
    );
  });
});
