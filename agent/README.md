# Architecture
```
Agent (agent.py)
   |
   |  MCP client call
   v
MCP Server (mcp/server.py)
   |
   |  tool()
   v
Tool Response
```

# Run Order:

# Terminal 1 - Backend

cd backend

source .venv/bin/activate

uvicorn app.main:app --reload --port 8000

## Terminal 2 - MCP server

cd mcp

source .venv/bin/activate

python server.py

## Terminal 3 - Agent

cd agent

source ../mcp/.venv/bin/activate

python agent.py

## Output:

Agent called MCP tool search_members

MCP forwarded request to FastAPI backend

Backend queried Postgres

Result flowed back through MCP → Agent
