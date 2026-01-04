
## Model Context Protocol (MCP)

This project includes a custom MCP server that exposes backend functionality
as structured tools for AI agents.

The MCP server is implemented using FastMCP and runs as a standalone service.

### Exposed Tools
- search_members
- get_member
- get_member_care_gaps
- get_member_authorizations
- query_ai

Each MCP tool calls the corresponding FastAPI backend endpoint and returns
structured data suitable for AI agents.

The MCP server can be inspected using the official MCP Inspector and
demonstrates how AI agents can safely interact with healthcare data services
without direct database access.
