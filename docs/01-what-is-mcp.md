# What Is the Model Context Protocol (MCP)?

**Written for beginners, by Asdale Dynamics, LLC.** Plain English, step by step, never condescending.

If you've used an AI assistant, you know it can write emails, summarize notes, and answer questions. But until recently, your AI could only see what you typed or pasted into the chat. It couldn't peek at the files on your computer, read your calendar, or query your database unless you copied everything in by hand.

The **Model Context Protocol (MCP)** changes that. Think of MCP as a universal plug — like USB, but for AI. It lets AI assistants safely connect to the tools and data you already use, without you having to copy and paste forever.

## The idea in one sentence

MCP lets an AI assistant ask your computer for information (your files, a database, a calendar) through a small helper program called an **MCP server**, instead of you pasting that information into the chat yourself.

## The three parts

| Part | What it is | Real-world analogy |
|------|-----------|-------------------|
| **AI host** | The AI app you chat with (Claude Desktop, VS Code with Copilot, etc.) | You, holding the remote |
| **MCP client** | The part of the AI app that speaks MCP | The cable |
| **MCP server** | A small program that exposes one kind of data (files, database, etc.) | The appliance you plug in |

The AI host runs the MCP client. The client talks to MCP servers. Each server is responsible for one thing — for example, one server reads files from a folder you choose, another queries a SQLite database.

## Why this matters

Before MCP, connecting an AI to your data meant writing custom code for every AI app and every data source. With MCP:

- **One server works with many AI apps.** A file server built for MCP works in Claude Desktop, in supported editors, and anywhere else MCP is supported.
- **You stay in control.** The server only sees what you tell it to see. Nothing leaves your machine unless you want it to.
- **Standardized.** One way of asking "list files" or "read this document," regardless of which AI you use.

## What this manual covers

1. [Installing and running an MCP server locally](02-installing-running-mcp-server.md) — get a server up on your own computer
2. [Connecting to files](03-connecting-to-files.md) — let an AI read files from a folder you pick
3. [Connecting to databases](04-connecting-to-databases.md) — let an AI query a local database safely
4. [Safety rules for AI file access](05-safety-rules-ai-file-access.md) — keep your private data private
5. [Step-by-step checklists](06-step-by-step-checklists.md) — copy-paste friendly checklists for every step

This manual and the matching static website are published by **Asdale Dynamics, LLC**, an Indiana LLC focused on beginner-friendly AI education. Learn more at dylanasdale.github.io.
