# Agent

-- Create file agent.py
run    python agentv1.py
Output:
[AGENT RECEIVED QUERY] Why was this authorization denied?

-- Create agent/mcp_client.py
-- After update agent.py
AI Care Navigator — Agent v2 (MCP connected)

--Create agent.py

## Run Order
Backend
cd backend
source .venv/bin/activate
uvicorn app.main:app --reload --port 8000

Terminal 2 — MCP server
cd mcp
source .venv/bin/activate
python server.py

Terminal 3 — Agent
cd agent
source ../mcp/.venv/bin/activate
python agent.py




