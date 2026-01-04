import asyncio
from mcp_client import CareNavigatorMCPClient

MCP_URL = "http://localhost:3333/mcp"


async def main():
    mcp = CareNavigatorMCPClient(MCP_URL)

    print("\n🔍 Available MCP tools:")
    tools = await mcp.list_tools()
    for t in tools:
        print(f"- {t.name}")

    print("\n👤 Searching member by name = John")
    members = await mcp.call_tool(
        "search_members",
        {"name": "John"}
    )
    print(members)

    print("\n🧠 Asking AI why authorization was denied")
    ai_response = await mcp.call_tool(
        "query_ai",
        {
            "query": "Why was this authorization denied?",
            "memberId": "MBR-001",
            "authorizationId": "AUTH-002",
        }
    )
    print(ai_response)


if __name__ == "__main__":
    asyncio.run(main())
