# AI Care Navigator – Backend API

### Overview

The AI Care Navigator Backend is a FastAPI-based REST API that powers the AI Care Navigator application.
It provides endpoints for member search, member profiles, care gaps, authorizations, and an AI-powered assistant.

At this stage, the backend uses in-memory mock data to mirror the frontend data model.

This allows rapid prototyping, API contract validation, and full frontend–backend integration before introducing a database.

### Tech Stack

FastAPI – Backend framework

Pydantic – Data validation and response schemas

Uvicorn – ASGI server

Python 3.12

Modular router architecture (members, authorizations, ai)

Project Structure
backend/
├── app/
│   ├── main.py                # FastAPI app entry point
│   ├── api/
│   │   ├── members.py         # Member search, profile, care gaps, authorizations
│   │   ├── authorizations.py  # Authorization-related endpoints
│   │   └── ai.py              # AI assistant endpoint
│   ├── schemas/
│   │   ├── member.py          # Member response schema
│   │   ├── care_gap.py        # Care gap schema
│   │   └── authorization.py   # Authorization schema
│   └── __init__.py
├── .venv/                     # Python virtual environment
└── README.md

API Endpoints
Health Check
GET /health


Response:

{ "status": "ok" }

Members
Search Members
GET /members


Query Parameters:

memberId (optional)

name (optional)

Examples:

/members
/members?memberId=MBR-001
/members?name=John

Get Member Profile
GET /members/{member_id}


Example:

/members/MBR-001

Get Member Care Gaps
GET /members/{member_id}/care-gaps

Get Member Authorizations
GET /members/{member_id}/authorizations

AI Assistant
Query AI Assistant
POST /ai/query


Request body:

{
  "query": "Why was this authorization denied?",
  "context": {
    "memberId": "MBR-001",
    "authorizationId": "AUTH-002"
  }
}


Response:

{
  "response": "Explanation of denial...",
  "sources": ["Policy Section 6.1.3"]
}


The AI endpoint currently uses rule-based logic and backend data.
It will later be upgraded to a tool-based AI agent backed by a database and MCP.

Running the Backend Locally
1. Create and activate virtual environment
python -m venv .venv
source .venv/bin/activate

2. Install dependencies
pip install fastapi uvicorn

3. Run the API
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000


The API will be available at:

http://localhost:8000


Interactive OpenAPI docs:

http://localhost:8000/docs

Current Limitations

Uses in-memory mock data

No persistence (data resets on restart)

AI logic is rule-based (not agent-driven yet)

Next Planned Enhancements

PostgreSQL database integration

SQLAlchemy models

Replace mock data with persistent storage

AI Agent with tool usage

MCP server integration

Docker Compose deployment

Integration tests and CI/CD

Status

✅ Frontend–backend integration complete
✅ API contract validated
🚧 Database and AI agent coming next

backend/
├── app/
│   ├── api/
│   │   ├── members.py
│   │   ├── authorizations.py
│   │   └── ai.py          ← AI endpoint lives here
│   │
│   ├── models/
│   │   ├── member.py
│   │   ├── care_gap.py
│   │   ├── authorization.py
│   │   └── ai_query.py    ← ai_queries DB model
│   │
│   ├── schemas/
│   │   ├── member.py
│   │   ├── care_gap.py
│   │   ├── authorization.py
│   │   └── ai.py          ← request/response schemas
│   │
│   └── db/
│       └── database.py


