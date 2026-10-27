# Step-by-Step Checklists

**Written for beginners, by Asdale Dynamics, LLC.** Plain English, step by step, never condescending.

Copy these checklists and check them off as you go.

---

## Checklist A: Install and run the demo MCP server

- [ ] Node.js 18+ is installed (`node --version` shows v18 or higher)
- [ ] You've downloaded or cloned this guide
- [ ] Terminal is open inside `mcp-servers-plain-english-guide/demo-server/`
- [ ] `npm install` ran without errors
- [ ] `node server.js` prints: `MCP filesystem demo server running on stdio`
- [ ] That terminal stays open while you use the server
- [ ] To stop: press `Ctrl + C`

## Checklist B: Connect the demo server to an AI app

- [ ] The demo server is running (`node server.js`)
- [ ] You know the absolute path to `demo-server/server.js`
- [ ] Your AI app's MCP config points `command: "node"` and `args: ["<absolute path>/demo-server/server.js"]`
- [ ] The path contains no typos and no `~` shortcuts (use the full path)
- [ ] You restarted the AI app after saving the config
- [ ] The AI app shows the server as connected

## Checklist C: Try file access

- [ ] `demo-server/data/` exists
- [ ] You added a practice file, e.g. `demo-server/data/hello.txt`
- [ ] You asked the AI: "What files are available?"
- [ ] You asked the AI to read a file: "Read hello.txt"
- [ ] The AI answered with the file's contents (no copy-pasting by you)

## Checklist D: Point the server at your own folder

- [ ] You created or chose a folder with only AI-safe files
- [ ] You edited `ALLOWED_DIR` in `demo-server/server.js` to that folder's full path
- [ ] You restarted the server (`Ctrl + C`, then `node server.js`)
- [ ] You restarted your AI app
- [ ] The AI can list and read files in your chosen folder

## Checklist E: Safety before using real data

- [ ] The folder has no passwords, API keys, IDs, or medical records
- [ ] The server is read-only
- [ ] You're using a practice copy, not your only/live data
- [ ] You checked your AI app's data-sharing/training settings
- [ ] You understand the AI can make mistakes — you'll double-check important answers

## Checklist F: Try a database connection (when you're ready)

- [ ] You installed SQLite (or your chosen database tool)
- [ ] You created a practice database (not your live data)
- [ ] You found an MCP server for your database type
- [ ] You configured the MCP server with a read-only database user
- [ ] No passwords are hard-coded in shared config files
- [ ] You asked one practice question and got an answer

---

Keep these checklists handy. If something doesn't work, go back to the matching chapter and walk through it again. You've got this.

— Asdale Dynamics, LLC (Indiana, formed Oct 2026)
Beginner-friendly AI education. dylanasdale.github.io
