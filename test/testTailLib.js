"use strict";

const assert = require("chai").assert;
const { stub } = require("sinon");
const {
  parseOptions,
  loadContent,
  extractLines
} = require("../src/tailLib.js");

describe("parseOptions", function() {
  it("should parse fileName and the default lines as 10 if number of lines is not mentioned", function() {
    assert.deepStrictEqual(parseOptions(["goodFile"]), {
      parsedArgs: {
        fileName: "goodFile",
        lines: 10
      },
      inputError: ""
    });
  });
  it("should parse fileName and the number of lines are given in the command line args", function() {
    assert.deepStrictEqual(parseOptions(["-n", "5", "goodFile"]), {
      parsedArgs: {
        fileName: "goodFile",
        lines: 5
      },
      inputError: ""
    });
  });
  it("should give error message when only option is mentioned without the count", function() {
    assert.deepStrictEqual(parseOptions(["-n", "goodFile"]), {
      inputError: "tail: illegal offset -- goodFile"
    });
  });
});

describe("loadContent", function() {
  const existsSync = stub();
  existsSync.withArgs("goodFile").returns(true);
  existsSync.withArgs("wrongFile").returns(false);
  const readFileSync = stub();
  readFileSync
    .withArgs("goodFile", "utf8")
    .returns("1\n2\n3\n4\n5\n6\n7\n8\n9\n10\n11\n12\n13\n14\n15");
  it("should load the content of the file", function() {
    assert.deepStrictEqual(
      loadContent("goodFile", { readFileSync, existsSync }),
      {
        content: "1\n2\n3\n4\n5\n6\n7\n8\n9\n10\n11\n12\n13\n14\n15",
        error: ""
      }
    );
  });
  it("should give the error message if the file doesn't exist", function() {
    assert.deepStrictEqual(loadContent("wrongFile", { existsSync }), {
      error: "tail: wrongFile: no such file or directory",
      content: ""
    });
  });
});

describe("extractLines", function() {
  it("should give the desired last number of lines of the file content without empty line at end", function() {
    const content = "1\n2\n3\n4\n5\n6\n7\n8\n9\n10\n11\n12\n13\n14\n15";
    assert.strictEqual(
      extractLines(10, content),
      "6\n7\n8\n9\n10\n11\n12\n13\n14\n15"
    );
  });
  it("should give the desired last number of lines of the file content with empty line at end", function() {
    const content = "1\n2\n3\n4\n5\n6\n7\n8\n9\n10\n11\n12\n13\n14\n15\n";
    assert.strictEqual(
      extractLines(10, content),
      "6\n7\n8\n9\n10\n11\n12\n13\n14\n15"
    );
  });
});
