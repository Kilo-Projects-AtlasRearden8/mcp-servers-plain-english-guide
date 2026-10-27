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
| `scripts/verify-mcp.js` | A script that starts the demo server and verifies the MCP handshake works |

## Quick start

```bash
# 1. Read the manual
open docs/01-what-is-mcp.md
# or open the website:
open site/index.html

# 2. Run the demo MCP server
cd demo-server
npm install      # (optional; the server has no runtime dependencies)
node server.js
# MCP filesystem demo server running on stdio

# 3. Verify it works
cd ..
node scripts/verify-mcp.js
```

Then connect an MCP client (for example, Claude Desktop) to `node <absolute path>/demo-server/server.js` and ask it to read files inside `demo-server/data/`.

## Safety

Read `docs/05-safety-rules-ai-file-access.md` before pointing an MCP server at folders with real personal data. Short version: choose one specific folder, keep passwords and keys out of it, prefer read-only servers, and practice on copies, not your live data.

## License

MIT License. Copyright (c) 2026 Asdale Dynamics, LLC. See `LICENSE`.

## Published by

**Asdale Dynamics, LLC** — Indiana, formed October 2026.  
Beginner-friendly AI education, books and guides, practical tools.  
[Dylan Asdale](https://dylanasdale.github.io) — registered nurse, AI author, founder.  
*The Massive AI Manual* — AI explained "like a friend would."
