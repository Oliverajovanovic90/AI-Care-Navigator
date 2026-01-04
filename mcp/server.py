import os
import httpx
from fastmcp import FastMCP

# MCP server name (shows in Inspector/clients)
mcp = FastMCP("AI Care Navigator MCP")

# Your FastAPI base URL
# In Codespaces, you can usually use http://localhost:8000
API_BASE = os.getenv("AI_CARE_API_BASE", "http://localhost:8000")


async def _get(path: str, params: dict | None = None):
    async with httpx.AsyncClient(timeout=20.0) as client:
        r = await client.get(f"{API_BASE}{path}", params=params)
        r.raise_for_status()
        return r.json()


async def _post(path: str, json_body: dict):
    async with httpx.AsyncClient(timeout=30.0) as client:
        r = await client.post(f"{API_BASE}{path}", json=json_body)
        r.raise_for_status()
        return r.json()


@mcp.tool()
async def search_members(memberId: str | None = None, name: str | None = None):
    """
    Search members by memberId (partial ok) and/or name (partial ok).
    Calls: GET /members?memberId=...&name=...
    """
    params = {}
    if memberId:
        params["memberId"] = memberId
    if name:
        params["name"] = name
    return await _get("/members", params=params)


@mcp.tool()
async def get_member(member_id: str):
    """
    Get a single member profile.
    Calls: GET /members/{member_id}
    """
    return await _get(f"/members/{member_id}")


@mcp.tool()
async def get_member_care_gaps(member_id: str):
    """
    Get care gaps for a member.
    Calls: GET /members/{member_id}/care-gaps
    """
    return await _get(f"/members/{member_id}/care-gaps")


@mcp.tool()
async def get_member_authorizations(member_id: str):
    """
    Get authorizations for a member.
    Calls: GET /members/{member_id}/authorizations
    """
    return await _get(f"/members/{member_id}/authorizations")


@mcp.tool()
async def query_ai(query: str, memberId: str | None = None, authorizationId: str | None = None):
    """
    Ask the AI endpoint a question and persist the interaction (your backend already persists).
    Calls: POST /ai/query
    """
    payload = {
        "query": query,
        "context": {
            "memberId": memberId,
            "authorizationId": authorizationId,
        },
    }
    return await _post("/ai/query", payload)

@mcp.tool()
def ping(message: str) -> str:
    return f"MCP received: {message}"


if __name__ == "__main__":
    # Run with HTTP transport so Inspector can connect easily.
    # Many FastMCP examples use mcp.run(transport="http", port=...). :contentReference[oaicite:1]{index=1}
    mcp.run(transport="http", host="0.0.0.0", port=3333)
