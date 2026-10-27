# MCP Servers — Plain English Guide

A beginner manual and static website explaining the Model Context Protocol (MCP): what MCP servers do, how to install and run one locally, how to connect to files and databases, and safety rules for AI file access. Includes step-by-step checklists and a working demo MCP server you can run today — no accounts, no API keys, no secrets.

Written by **Asdale Dynamics, LLC** — beginner-friendly AI education, books, and practical tools.

## Who this is for

Dylan Asdale is a registered nurse turned AI author and founder of **Asdale Dynamics, LLC** (Indiana, formed October 2026). His book *The Massive AI Manual* and hub site [dylanasdale.github.io](https://dylanasdale.github.io) explain AI "like a friend would": plain English, step by step, never condescending.

This guide is for anyone who wants to understand MCP without a computer science degree — small-business owners, authors, healthcare workers (education only), and curious beginners.

## What's inside

| Folder | What it contains |
|--------|------------------|
| `docs/` | The beginner manual as Markdown: what MCP is, installing and running a server, connecting to files, connecting to databases, safety rules, and step-by-step checklists |
| `site/` | A static HTML website mirroring the manual (no build step — open `site/index.html` in any browser) |
| `demo-server/` | A working local MCP server (filesystem, stdio, no dependencies) you can install and run to try MCP yourself |
| `scripts/` | `verify-mcp.js` checks the MCP handshake works; `test-path-safety.js` unit-tests the directory-traversal protection |

## Quick start

### 1. Read the manual

Open `docs/01-what-is-mcp.md` in any text editor, or open `site/index.html` in your web browser to read the polished static site.

### 2. Run the demo MCP server

```bash
cd demo-server
npm install
node server.js
```

You should see:

```
MCP filesystem demo server running on stdio
```

Leave that terminal open. To stop the server, press `Ctrl + C`.

### 3. Verify it works

In a new terminal, from the repository root:

```bash
node scripts/verify-mcp.js
```

You should see `VERIFICATION OK` and exit code 0. This starts the demo server, performs the MCP handshake (`initialize`, `tools/list`, `tools/call`), reads a file, and confirms that directory-traversal attacks are blocked.

You can also run the standalone path-safety unit tests:

```bash
node scripts/test-path-safety.js
```

### 4. Connect an MCP client

Connect your AI app (for example, Claude Desktop) to the demo server by adding it to the app's MCP server config:

```json
{
  "mcpServers": {
    "demo-files": {
      "command": "node",
      "args": ["/absolute/path/to/mcp-servers-plain-english-guide/demo-server/server.js"],
      "env": {}
    }
  }
}
```

- Replace `/absolute/path/to/...` with the real full path to `demo-server/server.js` on your computer.
- On Windows, use forward slashes or double backslashes in the path.
- Save the file and restart your AI app.

Then ask the AI: "What files are available?" or "Read hello.txt."

## What the demo server does

It exposes two read-only tools over MCP:

- `list_files` — lists files and folders inside the allowed folder
- `read_file` — reads the text contents of one file inside the allowed folder

By default it only touches `demo-server/data/`. It cannot reach the rest of your computer, cannot delete or overwrite files, cannot run programs, and cannot access the internet.

## Safety

Read `docs/05-safety-rules-ai-file-access.md` before pointing an MCP server at folders with real personal data. Short version: choose one specific folder, keep passwords and keys out of it, prefer read-only servers, and practice on copies, not your live data.

This guide is educational. It is not a substitute for professional security advice, and it is not medical advice.

## License

MIT License. Copyright (c) 2026 Asdale Dynamics, LLC. See `LICENSE`.

## Published by

**Asdale Dynamics, LLC** — Indiana, formed October 2026.  
Beginner-friendly AI education, books and guides, practical tools.  
[Dylan Asdale](https://dylanasdale.github.io) — registered nurse, AI author, founder.  
*The Massive AI Manual* — AI explained "like a friend would."
