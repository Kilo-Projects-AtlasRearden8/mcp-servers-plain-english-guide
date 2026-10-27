# STATUS

## What was built

A beginner manual and static website explaining the Model Context Protocol (MCP), published by Asdale Dynamics, LLC (Indiana, formed October 2026). Written for Dylan Asdale's audience — plain English, step by step, never condescending, local-first, no secrets or personal data.

### Contents

- `docs/` — six-chapter Markdown manual:
  - `01-what-is-mcp.md` — what MCP servers do, the three parts (host/client/server), why it matters
  - `02-installing-running-mcp-server.md` — installing Node.js, `npm install`, running `demo-server/server.js`, configuring an MCP client (Claude Desktop example), troubleshooting
  - `03-connecting-to-files.md` — connecting the demo server to files, `list_files` and `read_file`, pointing at your own folder, limitations
  - `04-connecting-to-databases.md` — how database MCP access works, SQLite practice example, read-only users, what to look for / red flags
  - `05-safety-rules-ai-file-access.md` — eight safety rules for AI file access, quick safety checklist, incident response, healthcare disclaimer (education only)
  - `06-step-by-step-checklists.md` — copy-paste checklists A–F
- `site/` — static HTML website mirroring the manual: `index.html` + one page per chapter, shared `style.css`, system fonts, works offline, no build step, no external assets
- `demo-server/` — working dependency-free MCP server over stdio: `initialize`, `tools/list`, `tools/call` with `list_files` and `read_file`, path-traversal protection, read-only, confined to `demo-server/data/`
- `scripts/verify-mcp.js` — starts the server, runs initialize + tools/list + two tools/calls + a path-traversal check, exits non-zero on failure
- `README.md` — credits Asdale Dynamics, LLC and Dylan Asdale, links dylanasdale.github.io
- `LICENSE` — MIT, exact line: `Copyright (c) 2026 Asdale Dynamics, LLC`
- `.gitignore` — node_modules, .DS_Store, .env, *.log

No `.github/workflows`, no remotes, no pushes, no secrets, no API keys, no personal data in files.

## How to run it

```bash
cd /path/to/mcp-servers-plain-english-guide

# Read the manual
open docs/01-what-is-mcp.md        # or open site/index.html in any browser

# Run the demo MCP server
cd demo-server
npm install
node server.js                     # prints "MCP filesystem demo server running on stdio"
# leave this terminal open; stop with Ctrl + C

# Verify the server works (new terminal)
cd ..
node scripts/verify-mcp.js         # expect 15 PASS, VERIFICATION OK, exit 0

# Lint / syntax check
npm run lint                       # node --check on both JS files, exit 0
```

## Verification results

- `npm run lint`: pass — both JS files parse cleanly
- `node scripts/verify-mcp.js`: 15 passed, 0 failed
  - initialize handshake (protocolVersion 2024-11-05, capabilities, serverInfo)
  - tools/list returns list_files and read_file with input schemas
  - tools/call list_files returns file listing including README.md
  - tools/call read_file returns file contents
  - path traversal attempt (`../../package.json`) is rejected/reported as error
- All seven site HTML files pass structure + credit + copyright checks
- Git commit `3bf6e96` on branch `master`, 22 files, 2028 insertions; not pushed, no remote configured

## Known gaps

- Demo server is read-only (no write/delete tools) — by design, documented
- Demo server handles stdio only; no HTTP/SSE MCP transport
- Only one database example (SQLite); Postgres/MySQL patterns mentioned conceptually, not shipped as servers
- HTML site has no search or dark mode; single shared stylesheet, no build step by design
- No test framework; verification is the standalone `scripts/verify-mcp.js` script
