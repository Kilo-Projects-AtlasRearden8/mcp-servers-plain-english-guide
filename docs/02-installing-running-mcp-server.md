# Installing and Running an MCP Server Locally

**Written for beginners, by Asdale Dynamics, LLC.** Plain English, step by step, never condescending.

This chapter walks you through installing and running one MCP server on your own computer. We use a tiny demo server included in this repository (`demo-server/`) so you can try everything without signing up for anything or entering any API keys.

## What you need

- A computer (Windows, Mac, or Linux)
- **Node.js** version 18 or newer. Check with:

  ```bash
  node --version
  ```

  If you don't have it, download it from nodejs.org. The LTS version is fine.

- A terminal (Command Prompt or PowerShell on Windows, Terminal on Mac, any terminal on Linux)

No accounts, no credit cards, no secrets needed.

## Step 1: Get this repository

Download or clone the guide, then open a terminal in the folder:

```bash
cd mcp-servers-plain-english-guide
```

Look inside — you should see a `demo-server/` folder with `server.js` and `package.json`.

## Step 2: Install the demo server's dependencies

The demo server needs one small library to speak the MCP protocol. From the `demo-server/` folder:

```bash
cd demo-server
npm install
```

This creates a `node_modules/` folder. That's normal — it's just code the server needs to run.

## Step 3: Run the server

```bash
node server.js
```

You should see:

```
MCP filesystem demo server running on stdio
```

The server stays running and waits for an MCP client (like an AI app) to connect. Leave that terminal open.

To stop the server, press `Ctrl + C` in that terminal.

## Step 4: Point an MCP client at it

How you connect depends on the AI app you use. In **Claude Desktop**, for example, you edit a config file (usually `claude_desktop_config.json`) and add something like:

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
- Save the file and restart Claude Desktop. The server should appear in the connection list.

Every MCP client has its own config format. Check your app's docs for "MCP server configuration" or "local MCP server."

## What the demo server does

It exposes two tools over MCP:

- **list_files** — list the files in a folder you allow
- **read_file** — read the contents of one file you allow

It only touches the `demo-server/data/` folder by default. It cannot reach the rest of your computer. See the safety chapter for why that matters.

## Troubleshooting checklist

- `node: command not found` — install Node.js first, then restart your terminal
- `Cannot find module` — run `npm install` inside `demo-server/`
- Client can't connect — double-check the path is absolute (not relative), and restart the AI app after changing config
- Nothing happens — make sure `node server.js` is running in its own terminal before the client tries to connect

## Next

Once the server is running, head to [Connecting to files](03-connecting-to-files.md) to try it out.
