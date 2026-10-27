// MCP filesystem demo server (stdio, dependency-free)
// Part of the MCP beginner guide by Asdale Dynamics, LLC.
// Runs on your computer only. Only reads files inside ALLOWED_DIR.

const fs = require("fs");
const path = require("path");
const readline = require("readline");

const PROTOCOL_VERSION = "2024-11-05";

// Change this to any folder you want the AI to be able to read.
// Default: demo-server/data/ inside this repository.
const ALLOWED_DIR = path.resolve(__dirname, "data");

function log(message) {
  process.stderr.write(`${message}\n`);
}

// Safety: make sure a resolved path stays inside ALLOWED_DIR.
function isInsideAllowedDir(targetPath) {
  const resolved = path.resolve(targetPath);
  const allowed = path.resolve(ALLOWED_DIR) + path.sep;
  return resolved === path.resolve(ALLOWED_DIR) ||
    resolved.startsWith(allowed);
}

function safeResolve(relativePath) {
  if (!relativePath || relativePath === "") {
    return path.resolve(ALLOWED_DIR);
  }
  return path.resolve(ALLOWED_DIR, relativePath);
}

function listFiles(dirRelative) {
  const target = safeResolve(dirRelative);
  if (!isInsideAllowedDir(target)) {
    throw new Error("Requested path is outside the allowed folder");
  }
  if (!fs.existsSync(target)) {
    throw new Error("Folder does not exist: " + dirRelative);
  }
  const stat = fs.statSync(target);
  if (!stat.isDirectory()) {
    throw new Error("Path is not a folder: " + dirRelative);
  }
  const entries = fs.readdirSync(target, { withFileTypes: true });
  return entries.map((entry) => ({
    name: entry.name,
    type: entry.isDirectory() ? "directory" : "file",
  }));
}

function readFileContent(fileRelative) {
  const target = safeResolve(fileRelative);
  if (!isInsideAllowedDir(target)) {
    throw new Error("Requested path is outside the allowed folder");
  }
  if (!fs.existsSync(target)) {
    throw new Error("File does not exist: " + fileRelative);
  }
  const stat = fs.statSync(target);
  if (!stat.isFile()) {
    throw new Error("Path is not a file: " + fileRelative);
  }
  const MAX_BYTES = 50000;
  let content = fs.readFileSync(target, "utf8");
  let truncated = false;
  if (Buffer.byteLength(content, "utf8") > MAX_BYTES) {
    content = Buffer.from(content, "utf8").slice(0, MAX_BYTES).toString("utf8");
    truncated = true;
  }
  const note = truncated ? "\n\n... (file was truncated to the first 50,000 bytes)" : "";
  return content + note;
}

const TOOLS = [
  {
    name: "list_files",
    description: "List files and folders inside the allowed folder.",
    inputSchema: {
      type: "object",
      properties: {
        path: {
          type: "string",
          description: "Relative path inside the allowed folder. Leave blank for the folder itself.",
        },
      },
      additionalProperties: false,
    },
  },
  {
    name: "read_file",
    description: "Read the text contents of one file inside the allowed folder.",
    inputSchema: {
      type: "object",
      properties: {
        path: {
          type: "string",
          description: "Relative path to the file inside the allowed folder.",
        },
      },
      required: ["path"],
      additionalProperties: false,
    },
  },
];

function makeResult(id, result) {
  return JSON.stringify({ jsonrpc: "2.0", id, result });
}

function makeError(id, code, message) {
  return JSON.stringify({ jsonrpc: "2.0", id, error: { code, message } });
}

function handleCall(id, params) {
  const name = params && params.name;
  const args = params && params.arguments ? params.arguments : {};

  try {
    if (name === "list_files") {
      const files = listFiles(args.path);
      return makeResult(id, {
        content: [
          {
            type: "text",
            text: JSON.stringify({ folder: args.path || ".", files }, null, 2),
          },
        ],
      });
    }
    if (name === "read_file") {
      const text = readFileContent(args.path);
      return makeResult(id, {
        content: [{ type: "text", text }],
      });
    }
    return makeError(id, -32602, "Unknown tool: " + String(name));
  } catch (err) {
    return makeResult(id, {
      content: [
        {
          type: "text",
          text: "Error: " + err.message,
        },
      ],
      isError: true,
    });
  }
}

function handleRequest(message) {
  if (!message || typeof message !== "object") {
    return;
  }

  const { jsonrpc, id, method, params } = message;

  if (jsonrpc !== "2.0") {
    return;
  }

  // Notifications have no id. We still acknowledge known ones silently.
  if (id === undefined) {
    if (method === "initialized") {
      return;
    }
    log("Ignored notification: " + String(method));
    return;
  }

  if (method === "initialize") {
    process.stdout.write(
      makeResult(id, {
        protocolVersion: PROTOCOL_VERSION,
        capabilities: {
          tools: {},
        },
        serverInfo: {
          name: "mcp-filesystem-demo",
          version: "1.0.0",
        },
      }) + "\n"
    );
    return;
  }

  if (method === "tools/list") {
    process.stdout.write(makeResult(id, { tools: TOOLS }) + "\n");
    return;
  }

  if (method === "tools/call") {
    process.stdout.write(handleCall(id, params) + "\n");
    return;
  }

  process.stdout.write(makeError(id, -32601, "Method not found: " + String(method)) + "\n");
}

function main() {
  // Ensure the default data folder exists.
  if (!fs.existsSync(ALLOWED_DIR)) {
    fs.mkdirSync(ALLOWED_DIR, { recursive: true });
  }

  log("MCP filesystem demo server running on stdio");
  log("Allowed folder: " + ALLOWED_DIR);

  const rl = readline.createInterface({
    input: process.stdin,
    crlfDelay: Infinity,
  });

  rl.on("line", (line) => {
    const trimmed = line.trim();
    if (!trimmed) {
      return;
    }
    try {
      const message = JSON.parse(trimmed);
      handleRequest(message);
    } catch (err) {
      // Malformed JSON on stdin: ignore, keep stdout clean for MCP clients.
      log("Ignored malformed input line");
    }
  });

  rl.on("close", () => {
    log("stdin closed, shutting down");
    process.exit(0);
  });

  process.on("SIGINT", () => {
    log("SIGINT received, shutting down");
    process.exit(0);
  });
}

main();
