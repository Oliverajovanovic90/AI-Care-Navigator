"""
AI Care Navigator — Agent v1 (Skeleton)

This agent will orchestrate:
- Member lookup
- Authorization review
- AI reasoning via MCP tools

Step 1: Skeleton only (no MCP, no DB, no LLM)
"""

from typing import Optional, Dict


class CareNavigatorAgent:
    def __init__(self):
        pass

    def handle_query(
        self,
        query: str,
        context: Optional[Dict] = None,
    ) -> str:
        """
        Main entry point for the agent.

        Args:
            query: User question
            context: Optional context (memberId, authorizationId)

        Returns:
            Final agent response (string)
        """
        return f"[AGENT RECEIVED QUERY] {query}"


if __name__ == "__main__":
    agent = CareNavigatorAgent()

    response = agent.handle_query(
        query="Why was this authorization denied?",
        context={
            "memberId": "MBR-001",
            "authorizationId": "AUTH-002",
        },
    )

    print(response)
