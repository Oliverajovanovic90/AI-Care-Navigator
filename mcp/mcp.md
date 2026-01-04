# MCP
# Create MCP folder structure
mkdir -p mcp
cd mcp
python -m venv .venv
source .venv/bin/activate
pip install fastmcp httpx

Why httpx? We’ll call your existing FastAPI backend endpoints from the MCP server.

# Create mcp/server.py

# Run the MCP server
cd mcp
source .venv/bin/activate
python server.py

Output:
Starting MCP server 'AI Care Navigator MCP' with server.py:2582
transport 'http' on http://0.0.0.0:3333/mcp    

Run MCP Inspector:
Open a new terminal
Run Inspector (Node required). The standard approach is the MCP Inspector package, launched via npx. 

Output:

(.venv) @Oliverajovanovic90 ➜ /workspaces/AI-Care-Navigator/mcp (main) $ python server.py


         ╭──────────────────────────────────────────────────────────────────────────────╮         
         │                                                                              │         
         │                                                                              │         
         │                         ▄▀▀ ▄▀█ █▀▀ ▀█▀ █▀▄▀█ █▀▀ █▀█                        │         
         │                         █▀  █▀█ ▄▄█  █  █ ▀ █ █▄▄ █▀▀                        │         
         │                                                                              │         
         │                                                                              │         
         │                                FastMCP 2.14.2                                │         
         │                            https://gofastmcp.com                             │         
         │                                                                              │         
         │                    🖥  Server:      AI Care Navigator MCP                     │         
         │                    🚀 Deploy free: https://fastmcp.cloud                     │         
         │                                                                              │         
         ╰──────────────────────────────────────────────────────────────────────────────╯         
         ╭──────────────────────────────────────────────────────────────────────────────╮         
         │                          ✨ FastMCP 3.0 is coming!                           │         
         │         Pin fastmcp<3 in production, then upgrade when you're ready.         │         
         ╰──────────────────────────────────────────────────────────────────────────────╯         


[01/03/26 17:11:40] INFO     Starting MCP server 'AI Care Navigator MCP' with       server.py:2582
                             transport 'http' on http://0.0.0.0:3333/mcp                          
INFO:     Started server process [11092]
INFO:     Waiting for application startup.
INFO:     Application startup complete.
INFO:     Uvicorn running on http://0.0.0.0:3333 (Press CTRL+C to quit)



Connect it to your MCP server URL: http://localhost:3333

MCP Server: http://localhost:3333

Transport: HTTP / streamable-http (depends on Inspector version)

# Test tools:

search_members(name="John")

get_member(member_id="MBR-001")

query_ai(query="Why denied?", memberId="MBR-001", authorizationId="AUTH-002")

-- Start the Inspector (new terminal)
npx @modelcontextprotocol/inspector

Example test:

{
  "name": "search_members",
  "arguments": {
    "name": "John"
  }
}
