"use strict";

const assert = require("chai").assert;
const performTail = require("../src/performTail").performTail;

describe("performTail", function() {
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
    assert.deepStrictEqual(
      performTail(["goodFile"], {
        existsSync,
        readFileSync
      }),
      { content: "6\n7\n8\n9\n10\n11\n12\n13\n14\n15", error: "" }
    );
  });

  it("should give error if the options are not valid", function() {
    assert.deepStrictEqual(performTail(["-n", "goodFile"]), {
      error: "tail: illegal offset -- goodFile",
      content: ""
    });
  });

  it("should give the error content if the file doesn't exist", function() {
    const existsSync = function(path) {
      assert.strictEqual(path, "wrongFile");
      return false;
    };
    const readFileSync = function() {
      return;
    };
    assert.deepStrictEqual(
      performTail(["wrongFile"], {
        existsSync,
        readFileSync
      }),
      { error: "tail: wrongFile: no such file or directory", content: "" }
    );
  });

  it("should give nothing if the number of lines is zero", function() {
    const existsSync = function(path) {
      assert.strictEqual(path, "goodFile");
      return true;
    };
    const readFileSync = function(path, encoding) {
      assert.strictEqual(path, "goodFile");
      assert.strictEqual(encoding, "utf8");
      return "1\n2\n3\n4\n5";
    };
    assert.deepStrictEqual(
      performTail(["-n", "0", "goodFile"], { existsSync, readFileSync }),
      {
        error: "",
        content: ""
      }
    );
  });
});
