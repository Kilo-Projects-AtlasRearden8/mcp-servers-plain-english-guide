# Safety Rules for AI File Access

**Written for beginners, by Asdale Dynamics, LLC.** Plain English, step by step, never condescending.

Letting an AI read your files is powerful. It also means the AI — and anyone who can talk to that AI — could potentially read anything the MCP server can reach. These rules help you keep your private data private.

This guide is educational. It is not a substitute for professional security advice.

## Rule 1: Choose the folder, don't let the server choose

Point the MCP server at one specific folder — for example, `demo-server/data/` or a "Notes for AI" folder you create. Never point it at your whole home directory, your `Documents` folder, or your drive root.

Bad: `C:\Users\you\Documents` (too broad)
Better: `C:\Users\you\Documents\ai-notes` (chosen on purpose)

## Rule 2: Assume anything in the allowed folder could be read

If a file is inside the folder the server can see, treat it as readable by the AI. Don't keep secrets in that folder "just in case the AI never looks there." It might.

## Rule 3: Keep secrets out of MCP folders

Never put these in an MCP-accessible folder:

- Passwords, API keys, or access tokens
- Credit card or bank account numbers
- Social Security numbers or IDs
- Medical records about real people
- Someone else's private documents or messages
- Your SSH keys or encryption keys

If you need to work with sensitive files, process them yourself first, remove the secrets, then put the cleaned copy in the MCP folder.

## Rule 4: Prefer read-only servers

The demo server in this guide only reads files — it cannot change or delete anything. When choosing MCP servers, prefer ones that only do what you need. A file-reading server should not be able to delete files.

## Rule 5: Don't connect MCP to production data while learning

Use practice files and practice databases (like `practice.db` in the previous chapter), not your real business records, not your live website database, and not your only copy of anything important.

## Rule 6: You are still in charge

The AI suggests; you decide. Before acting on anything an AI tells you based on your files — especially money, health, or legal decisions — double-check it yourself. AI can make mistakes.

## Rule 7: Local is usually safer

The MCP servers in this guide run on your computer (`stdio`), not in the cloud. Your file contents don't leave your machine unless you specifically configure them to. Keep it local-first whenever you can.

## Rule 8: Know what your AI app remembers

Some AI apps remember past chats to train future models. Check your app's settings and turn off training/data sharing if you're working with personal files. This is an app setting, not an MCP setting — look in your AI app's privacy options.

## Quick safety checklist

Before pointing an MCP server at a real folder:

- [ ] The folder contains only files I'm comfortable an AI reading
- [ ] No passwords, keys, IDs, or medical info inside
- [ ] The server is read-only (cannot delete or overwrite)
- [ ] I'm using a practice copy, not my only/live data
- [ ] I know the full path I'm pointing the server at
- [ ] I've checked my AI app's data-sharing/training settings

## If you accidentally shared something sensitive

1. Stop the MCP server.
2. Remove the file from the allowed folder (or point the server at a different folder).
3. Assume the AI may have seen it — if it was a password or API key, change it.
4. Restart the server and your AI app.

## A note about healthcare

Asdale Dynamics, LLC publishes education-only healthcare-worker AI aids. MCP can help organize paperwork or summarize public information, but **never use AI or MCP to make medical decisions, diagnose, or handle real patient records without professional oversight.** This guide is not medical advice.
