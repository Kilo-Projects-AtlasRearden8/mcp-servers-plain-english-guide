# Connecting an MCP Server to a Database

**Written for beginners, by Asdale Dynamics, LLC.** Plain English, step by step, never condescending.

MCP servers can also connect to databases, so an AI assistant can answer questions like "How many orders did we have last month?" without you exporting spreadsheets by hand.

This chapter explains the idea and walks through a local example. The demo server in this guide is file-based, so the database example below uses a community-style pattern you can adapt — and shows what to look for when you install a real database MCP server.

## How database access works with MCP

1. You install (or run) a database MCP server — for example, a Postgres or SQLite MCP server.
2. You tell it which database to connect to (host, port, database name) and what login to use.
3. Your AI app connects to that MCP server.
4. You ask questions in plain English. The AI turns them into database queries, the server runs them, and the AI reads the results back to you.

## Safety first: databases hold sensitive data

Databases often contain customer lists, financial records, or health information. Before connecting an MCP server to a database:

- **Use a read-only database user** whenever possible. The AI should never be able to delete records.
- **Connect to a local copy**, not your live production database, while you're learning.
- **Never hard-code passwords** in config files you might share. Use environment variables or your AI app's secret store.
- **Review the server's documentation** to see exactly what queries it allows.

## Local demo: SQLite (read-only example)

SQLite is a database that lives in a single file on your computer. No separate database program to install. This makes it a great way to learn.

### 1. Install SQLite tools

```bash
# macOS
brew install sqlite

# Ubuntu/Debian
sudo apt-get install sqlite3

# Windows: download from sqlite.org or use Node.js (better-sqlite3)
```

### 2. Create a practice database

```bash
sqlite3 practice.db <<'EOF'
CREATE TABLE books (
  id INTEGER PRIMARY KEY,
  title TEXT,
  author TEXT,
  year INTEGER
);
INSERT INTO books (title, author, year) VALUES
  ('The Massive AI Manual', 'Dylan Asdale', 2026),
  ('Learning MCP', 'Asdale Dynamics, LLC', 2026);
EOF
```

### 3. Connect an MCP server

Look for a community MCP server for SQLite (for example, servers published on the MCP server registry or GitHub). Its configuration usually looks like:

```json
{
  "mcpServers": {
    "sqlite-practice": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-sqlite", "/absolute/path/to/practice.db"],
      "env": {}
    }
  }
}
```

The exact package name and args depend on which server you choose — check its README.

### 4. Ask the AI

Once connected:

- "What tables are in the database?"
- "List all books published in 2026."

The AI writes the query, the MCP server runs it against `practice.db`, and the AI reports back.

## What to look for in a database MCP server

| Good sign | Red flag |
|-----------|----------|
| Read-only mode available | Requires full admin credentials |
| Lets you restrict which tables it can touch | Wants access to "everything" |
| Clear docs on what queries it runs | No documentation or auditing |
| Runs locally on your machine | Sends queries to a remote server by default |

## Next

Before connecting to files or databases with real data, read the [safety rules](05-safety-rules-ai-file-access.md).
