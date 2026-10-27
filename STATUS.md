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
- `demo-server/` — working dependency-free MCP server over stdio: `initialize`, `tools/list`, `tools/call` with `list_files` and `read_file`, path-traversal protection, read-only, confined to `demo-server/data/`; exports its safety functions so they can be unit-tested without starting the server
- `scripts/verify-mcp.js` — integration test: starts the server, runs initialize + tools/list + tools/call (list_files, read_file, missing-arg, unknown-tool) + path-traversal check; exits non-zero on failure
- `scripts/test-path-safety.js` — unit test of the directory-traversal protection (10 checks, no child process)
- `package.json` — `lint`, `test`, `start` scripts
- `README.md` — credits Asdale Dynamics, LLC and Dylan Asdale, links dylanasdale.github.io; cross-platform quick start
- `LICENSE` — MIT, exact line: `Copyright (c) 2026 Asdale Dynamics, LLC`
- `.gitignore` — node_modules, .DS_Store, .env, *.log

No `.github/workflows`, no remotes, no pushes, no secrets, no API keys, no personal data in files.

## How to run it

```bash
cd /path/to/mcp-servers-plain-english-guide

# Read the manual
open docs/01-what-is-mcp.md        # or open site/index.html in any browser (Linux: xdg-open; Windows: start)

# Lint / syntax check
npm run lint                       # node --check on all three JS files, exit 0

# Run the demo MCP server
cd demo-server
npm install
node server.js                     # prints "MCP filesystem demo server running on stdio"
# leave this terminal open; stop with Ctrl + C

# Verify the server works (new terminal, from repository root)
cd ..
npm test                           # runs test-path-safety.js then verify-mcp.js
# expect: 10 PATH-SAFETY TESTS OK, then 17 PASS, VERIFICATION OK, exit 0
```

Or run the two test scripts individually:
```bash
node scripts/test-path-safety.js   # 10 passed, 0 failed
node scripts/verify-mcp.js         # 17 passed, 0 failed
```

## Verification results

- `npm run lint`: pass — all three JS files parse cleanly
- `node scripts/test-path-safety.js`: 10 passed, 0 failed
  - file/subfolder/allowed-dir itself are allowed
  - parent traversal, deep traversal, absolute outside path all blocked
  - `safeResolve` of traversal stays outside
  - `readFileContent`/`listFiles` throw on traversal and missing file
- `node scripts/verify-mcp.js`: 17 passed, 0 failed
  - initialize handshake (protocolVersion 2024-11-05, capabilities, serverInfo)
  - tools/list returns list_files and read_file with input schemas
  - tools/call list_files returns file listing including README.md
  - tools/call read_file returns file contents
  - path traversal (`../../package.json`) is rejected
  - read_file without required `path` argument reports an error
  - unknown tool (`delete_file`) is rejected
- All seven site HTML files pass structure + credit + copyright checks
- LLC credit ("Asdale Dynamics, LLC") present in LICENSE, README, all docs, all site pages
- Exact copyright line `Copyright (c) 2026 Asdale Dynamics, LLC` present in LICENSE and echoed in README/site
- Git commits on branch `master`: not pushed, no remote configured

## Known gaps

- Demo server is read-only (no write/delete tools) — by design, documented
- Demo server handles stdio only; no HTTP/SSE MCP transport
- Only one database example (SQLite via CLI); Postgres/MySQL patterns mentioned conceptually, not shipped as servers — the included demo server is file-based, which is stated throughout
- HTML site has no search or dark mode; single shared stylesheet, no build step by design
- No external test framework; verification is the two standalone scripts under `scripts/`
