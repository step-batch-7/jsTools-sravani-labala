const assert = require("chai").assert;
const {
  parseOptions,
  loadContent,
  extractLines,
  tail
} = require("../src/tailLib.js");

describe("parseOptions", function() {
  it("should parse fileName and the default lines as 10 if number of lines is not mentioned", function() {
    const commandLineArgs = ["goodFile"];
    assert.deepStrictEqual(parseOptions(commandLineArgs), {
      parsedArgs: {
        fileName: "goodFile",
        lines: 10
      },
      inputError: ""
    });
  });
  it("should parse fileName and the number of lines are given in the command line args", function() {
    const commandLineArgs = ["-n", "5", "goodFile"];
    assert.deepStrictEqual(parseOptions(commandLineArgs), {
      parsedArgs: {
        fileName: "goodFile",
        lines: 5
      },
      inputError: ""
    });
  });
  it("should give error message when only option is mentioned without the count", function() {
    const commandLineArgs = ["-n", "goodFile"];
    assert.deepStrictEqual(parseOptions(commandLineArgs), {
      inputError: "tail: illegal offset -- goodFile"
    });
  });
});

describe("loadContent", function() {
  it("should load the content of the file", function() {
    const existsSync = function(path) {
      assert.strictEqual(path, "goodFile");
      return true;
    };
    const readFileSync = function(path, encoding) {
      assert.strictEqual(path, "goodFile");
      assert.strictEqual(encoding, "utf8");
      return "1\n2\n3\n4\n5\n6\n7\n8\n9\n10\n11\n12\n13\n14\n15";
    };
    const encoding = "utf8";
    assert.deepStrictEqual(
      loadContent(
        "goodFile",
        {
          readFileSync,
          existsSync
        },
        encoding
      ),
      {
        content: "1\n2\n3\n4\n5\n6\n7\n8\n9\n10\n11\n12\n13\n14\n15",
        error: ""
      }
    );
  });
  it("should give the error message if the file doesn't exist", function() {
    const existsSync = function(path) {
      assert.strictEqual(path, "wrongFile");
      return false;
    };
    const readFileSync = function() {
      return;
    };
    const encoding = "utf8";
    assert.deepStrictEqual(
      loadContent("wrongFile", {
        existsSync,
        readFileSync,
        encoding
      }),
      { error: "tail: wrongFile: no such file or directory", content: "" }
    );
  });
});

describe("extractLines", function() {
  it("should give the desired last number of lines of the file content", function() {
    const numberOfLines = 10;
    const content = "1\n2\n3\n4\n5\n6\n7\n8\n9\n10\n11\n12\n13\n14\n15";
    assert.strictEqual(
      extractLines(numberOfLines, content),
      "6\n7\n8\n9\n10\n11\n12\n13\n14\n15"
    );
  });
});

describe("tail", function() {
  it("should give the required lines of the file if the file name is mentioned and if it exists", function() {
    const existsSync = function(path) {
      assert.strictEqual(path, "goodFile");
      return true;
    };
    const readFileSync = function(path, encoding) {
      assert.strictEqual(path, "goodFile");
      assert.strictEqual(encoding, "utf8");
      return "1\n2\n3\n4\n5\n6\n7\n8\n9\n10\n11\n12\n13\n14\n15";
    };
    const commandLineArgs = ["goodFile"];
    const encoding = "utf8";
    assert.deepStrictEqual(
      tail(
        commandLineArgs,
        {
          existsSync,
          readFileSync
        },
        encoding
      ),
      { message: "6\n7\n8\n9\n10\n11\n12\n13\n14\n15", error: "" }
    );
  });
  it("should give error if the options are not valid", function() {
    const error = "tail: illegal offset -- goodFile";
    const commandLineArgs = ["-n", "goodFile"];
    assert.deepStrictEqual(tail(commandLineArgs), {
      error: error,
      message: ""
    });
  });
  it("should give the error message if the file doesn't exist", function() {
    const existsSync = function(path) {
      assert.strictEqual(path, "wrongFile");
      return false;
    };
    const readFileSync = function() {
      return;
    };
    const encoding = "utf8";
    assert.deepStrictEqual(
      tail(["wrongFile"], {
        existsSync,
        readFileSync,
        encoding
      }),
      { error: "tail: wrongFile: no such file or directory", message: "" }
    );
  });
});
