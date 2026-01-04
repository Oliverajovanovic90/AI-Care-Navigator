from fastmcp.client import Client


class CareNavigatorMCPClient:
    def __init__(self, url: str):
        self.url = url

    async def list_tools(self):
        async with Client(self.url) as client:
            return await client.list_tools()

    async def call_tool(self, name: str, arguments: dict):
        async with Client(self.url) as client:
            return await client.call_tool(name, arguments)
