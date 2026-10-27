// Unit tests for the demo MCP server's path-safety logic.
// Runs without starting the server (no stdio, no child process).
// Exercises directory-traversal protection: the core safety feature.

const assert = require("assert");
const path = require("path");

const { ALLOWED_DIR, isInsideAllowedDir, safeResolve, listFiles, readFileContent } =
  require("../demo-server/server.js");

let passed = 0;
let failed = 0;

function test(name, fn) {
  try {
    fn();
    passed += 1;
    console.log("PASS: " + name);
  } catch (err) {
    failed += 1;
    console.error("FAIL: " + name + " — " + err.message);
  }
}

function throws(fn, messageContains) {
  let threw = false;
  try {
    fn();
  } catch (err) {
    threw = true;
    if (messageContains && !err.message.includes(messageContains)) {
      throw new Error("expected error to include '" + messageContains + "', got: " + err.message);
    }
  }
  if (!threw) {
    throw new Error("expected function to throw, but it did not");
  }
}

// Inside the allowed folder is allowed.
test("file directly inside allowed dir is allowed", () => {
  assert.strictEqual(isInsideAllowedDir(path.join(ALLOWED_DIR, "hello.txt")), true);
});

test("file in a subfolder of allowed dir is allowed", () => {
  assert.strictEqual(isInsideAllowedDir(path.join(ALLOWED_DIR, "sub", "note.txt")), true);
});

test("the allowed folder itself is allowed", () => {
  assert.strictEqual(isInsideAllowedDir(ALLOWED_DIR), true);
});

// Escaping the allowed folder is blocked.
test("parent directory traversal is blocked", () => {
  assert.strictEqual(isInsideAllowedDir(path.join(ALLOWED_DIR, "..", "package.json")), false);
});

test("deep traversal with backslashes is blocked", () => {
  assert.strictEqual(isInsideAllowedDir(path.join(ALLOWED_DIR, "..", "..", "LICENSE")), false);
});

test("absolute path outside allowed dir is blocked", () => {
  assert.strictEqual(isInsideAllowedDir(path.resolve("/", "etc", "passwd")), false);
});

// safeResolve keeps traversal outside the allowed folder.
test("safeResolve of traversal stays outside allowed dir", () => {
  const target = safeResolve("../../package.json");
  assert.strictEqual(isInsideAllowedDir(target), false);
});

// read_file and list_files reject traversal at the tool level.
test("readFileContent throws on traversal path", () => {
  throws(() => readFileContent("../../package.json"), "outside the allowed folder");
});

test("listFiles throws on traversal path", () => {
  throws(() => listFiles("../../"), "outside the allowed folder");
});

// read_file throws on a missing file.
test("readFileContent throws on missing file", () => {
  throws(() => readFileContent("does-not-exist.txt"), "does not exist");
});

console.log(`\n${passed} passed, ${failed} failed`);
if (failed === 0) {
  console.log("PATH-SAFETY TESTS OK");
  process.exit(0);
} else {
  console.error("PATH-SAFETY TESTS FAILED");
  process.exit(1);
}
