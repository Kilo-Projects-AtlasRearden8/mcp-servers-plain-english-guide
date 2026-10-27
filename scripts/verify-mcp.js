// MCP demo server verification script
// Starts demo-server/server.js, performs an MCP initialize + tools/list
// handshake over stdio, exercises list_files and read_file, then exits.

const { spawn } = require("child_process");
const path = require("path");

const SERVER = path.join(__dirname, "..", "demo-server", "server.js");

let passed = 0;
let failed = 0;

function assert(condition, message) {
  if (condition) {
    passed += 1;
    console.log("PASS: " + message);
  } else {
    failed += 1;
    console.error("FAIL: " + message);
  }
}

function send(proc, message) {
  return new Promise((resolve, reject) => {
    const line = JSON.stringify(message) + "\n";
    proc.stdin.write(line, (err) => {
      if (err) reject(err);
      else resolve();
    });
  });
}

function nextLine(proc) {
  return new Promise((resolve, reject) => {
    const onData = (chunk) => {
      const text = Buffer.from(chunk).toString("utf8");
      const lines = text.split("\n");
      // Keep partial lines simple: verification output is line-based.
      for (const line of lines) {
        if (line.trim()) {
          proc.stdout.removeListener("data", onData);
          resolve(JSON.parse(line.trim()));
          return;
        }
      }
    };
    proc.stdout.on("data", onData);
  });
}

async function main() {
  const proc = spawn("node", [SERVER], {
    stdio: ["pipe", "pipe", "pipe"],
  });

  let stderr = "";
  proc.stderr.on("data", (chunk) => {
    stderr += Buffer.from(chunk).toString("utf8");
  });

  proc.on("error", (err) => {
    console.error("Failed to start server:", err.message);
    process.exit(1);
  });

  try {
    // 1. Initialize
    await send(proc, {
      jsonrpc: "2.0",
      id: 1,
      method: "initialize",
      params: {
        protocolVersion: "2024-11-05",
        capabilities: {},
        clientInfo: { name: "verify-script", version: "1.0.0" },
      },
    });
    const initResp = await nextLine(proc);
    assert(initResp.id === 1, "initialize response has matching id");
    assert(initResp.result && initResp.result.protocolVersion === "2024-11-05", "initialize result reports protocol version");
    assert(initResp.result && !!initResp.result.capabilities, "initialize result has capabilities");
    assert(initResp.result && initResp.result.serverInfo && initResp.result.serverInfo.name === "mcp-filesystem-demo", "initialize result names the demo server");

    // 2. tools/list
    await send(proc, { jsonrpc: "2.0", id: 2, method: "tools/list", params: {} });
    const listResp = await nextLine(proc);
    assert(listResp.id === 2, "tools/list response has matching id");
    const tools = listResp.result && listResp.result.tools;
    assert(Array.isArray(tools) && tools.length >= 2, "tools/list returns at least two tools");
    const names = tools.map((t) => t.name);
    assert(names.includes("list_files") && names.includes("read_file"), "tools/list includes list_files and read_file");

    // 3. tools/call list_files
    await send(proc, {
      jsonrpc: "2.0",
      id: 3,
      method: "tools/call",
      params: { name: "list_files", arguments: { path: "." } },
    });
    const listCall = await nextLine(proc);
    assert(listCall.id === 3, "list_files call has matching id");
    const content = listCall.result && listCall.result.content;
    assert(content && content[0] && content[0].text, "list_files returns text content");
    const body = JSON.parse(content[0].text);
    assert(Array.isArray(body.files), "list_files returns a files array");
    const readme = body.files.find((f) => f.name === "README.md");
    assert(!!readme, "README.md appears in the file listing");

    // 4. tools/call read_file
    await send(proc, {
      jsonrpc: "2.0",
      id: 4,
      method: "tools/call",
      params: { name: "read_file", arguments: { path: "README.md" } },
    });
    const readCall = await nextLine(proc);
    assert(readCall.id === 4, "read_file call has matching id");
    const readText = readCall.result && readCall.result.content && readCall.result.content[0] && readCall.result.content[0].text;
    assert(typeof readText === "string" && readText.length > 0, "read_file returns non-empty text");
    assert(/hello from the mcp demo folder/i.test(readText), "read_file returns the README contents");

    // 5. Path traversal is blocked
    await send(proc, {
      jsonrpc: "2.0",
      id: 5,
      method: "tools/call",
      params: { name: "read_file", arguments: { path: "../../package.json" } },
    });
    const traversal = await nextLine(proc);
    const traversalText =
      traversal.result && traversal.result.content && traversal.result.content[0]
        ? traversal.result.content[0].text
        : "";
    assert(/Error/.test(traversalText) || (traversal.error && traversal.error.message), "path traversal attempt is rejected or reported as an error");

    console.log(`\n${passed} passed, ${failed} failed`);
    if (failed === 0) {
      console.log("VERIFICATION OK");
      proc.kill("SIGINT");
      process.exit(0);
    } else {
      console.error("VERIFICATION FAILED");
      proc.kill("SIGINT");
      process.exit(1);
    }
  } catch (err) {
    console.error("Verification error:", err.message);
    console.error("Server stderr:\n" + stderr);
    proc.kill("SIGINT");
    process.exit(1);
  }
}

main();
