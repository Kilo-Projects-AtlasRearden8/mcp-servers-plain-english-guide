# Connecting an MCP Server to Your Files

**Written for beginners, by Asdale Dynamics, LLC.** Plain English, step by step, never condescending.

One of the most useful things an MCP server can do is let an AI assistant read files from your computer — so you can say "summarize the notes in my journal folder" instead of copying and pasting every note.

This chapter shows how file access works, using the demo server included in this guide.

## The golden rule of MCP file access

The AI can only see files inside a folder **you explicitly choose**. It cannot wander through your whole computer. If you point the server at `demo-server/data/`, it can see files in that folder and nothing else.

## How it works (demo server)

The demo server exposes two tools:

| Tool | What it does |
|------|--------------|
| `list_files` | Lists files and folders inside the allowed folder |
| `read_file` | Reads the text contents of one file inside the allowed folder |

The server runs on `stdio` — plain text messages sent back and forth between the AI app and the server. No website, no cloud account, no API key.

## Try it: step by step

### 1. Start the server

```bash
cd demo-server
node server.js
```

Leave this terminal open.

### 2. Add some files to play with

The server looks in `demo-server/data/` by default. Add a file:

```bash
echo "Hello from Dylan's demo folder. This is a test file for MCP." > demo-server/data/hello.txt
```

### 3. Connect an MCP client

Configure your AI app to run `node /absolute/path/to/demo-server/server.js` as an MCP server (see the previous chapter for Claude Desktop as an example).

### 4. Ask the AI

Once connected, try:

- "What files are available?"
- "Read hello.txt and tell me what it says."

The AI asks the server through MCP, the server reads the file, and the AI answers you. Nothing was copied and pasted by hand.

## Connecting to your own folder

To point the server at a folder of your own, edit `demo-server/server.js` and change the `ALLOWED_DIR` constant to the full path of your folder:

```js
const ALLOWED_DIR = "/Users/you/Documents/my-notes";
```

Then restart the server (`Ctrl + C`, then `node server.js`) and restart your AI app.

**Only point it at folders you're comfortable sharing with the AI.** Personal journals, draft writing, and project notes are fine. Password lists, tax returns, and anything with someone else's private data are not.

## What the server cannot do (by design)

- It cannot delete or overwrite files (read-only in this demo)
- It cannot go outside the allowed folder
- It cannot run programs on your computer
- It cannot access the internet

## If something doesn't show up

- Make sure the file is inside `ALLOWED_DIR`, not in a subfolder the server was told to skip
- Check that the filename has no typos
- Restart the server after changing `ALLOWED_DIR`
- Restart the AI app after changing its MCP config

## Next

Read the [safety rules](05-safety-rules-ai-file-access.md) before pointing an MCP server at folders with real personal data.
