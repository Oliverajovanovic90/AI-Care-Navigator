# AI-Care-Navigator
An AI-powered care coordination &amp; prior-authorization assistant for healthcare teams

1️⃣ Problem Description (What problem are we solving?)

Healthcare teams (case managers, analysts, coordinators) struggle with:

Understanding member status (risk, tier, care gaps)

Interpreting authorization decisions (approved/denied/why)

Navigating policies & guidelines

Writing clear notes and summaries

This leads to:

Delays

Manual work

Errors

Poor member experience

👉 Goal: Build an AI-powered web app that:

Helps users query patient data

Explains authorization outcomes

Summarizes care gaps

Uses AI agents + MCP to reason across data, rules, and documents

2️⃣ What the App Does (High-Level)
👩‍⚕️ User (Case Manager / Analyst)

Search for a member

View:

Demographics

Risk tier

Active authorizations

Ask AI questions like:

“Why was this PDN request denied?”

“Summarize this member’s care gaps”

“What actions should I take next?”

🤖 AI System

Uses coding agents

Uses MCP to access:

Member database

Authorization rules

Policy documents

Returns:

Clear explanations

Structured recommendations

Generated notes

3️⃣ System Architecture (Very Important for Points)
Frontend (React / Next.js)
   |
   | REST API (OpenAPI)
   v
Backend (FastAPI)
   |
   |---- PostgreSQL / SQLite
   |---- MCP Server
   |---- AI Coding Agent

4️⃣ Frontend (What you build)

Tech

React or Next.js

TypeScript

Centralized API client

Pages

Member Search

Member Profile

AI Assistant Chat

Authorization Details

Key Requirements

Centralized API calls (api.ts)

Clean component structure

Unit tests for core logic (Jest / Vitest)

5️⃣ Backend (What you build)

Overview

The AI Care Navigator Backend is a modular, production-oriented FastAPI application that provides REST APIs for member management, care gaps, authorizations, and an AI-powered assistant.

The backend is designed with clear API contracts, separation of concerns, and frontend-first integration.
At the current stage, the system uses in-memory mock data to validate API behavior and frontend communication. This will be replaced with a PostgreSQL-backed persistence layer in the next phase.

This backend serves as the foundation for a future AI Agent + MCP-based architecture, where AI reasoning is driven by real healthcare data and tool usage.

Technologies Used

FastAPI – High-performance Python web framework

Pydantic – Data validation and schema enforcement

Uvicorn – ASGI server

Python 3.12

OpenAPI (Swagger) – Automatic API documentation

Modular Routers – Clean separation by domain (members, authorizations, ai)

Why FastAPI + Pydantic

This project intentionally uses FastAPI + Pydantic to align with modern backend best practices and AI-driven systems.

FastAPI

Automatic OpenAPI specification generation

Native async support and high performance

Clear request/response contracts

Excellent frontend–backend collaboration

Pydantic

Strong runtime data validation

Explicit schemas shared across endpoints

Prevents silent data mismatches between frontend and backend

Ideal for AI systems where structured inputs and outputs are critical

Together, FastAPI and Pydantic ensure:

Reliable API contracts

Easy integration with frontend and AI agents

Clear documentation for peer reviewers and future maintainers

Project Structure
backend/
├── app/
│   ├── main.py                # FastAPI application entry point
│   ├── api/
│   │   ├── members.py         # Member search, profile, care gaps, authorizations
│   │   ├── authorizations.py  # Authorization endpoints
│   │   └── ai.py              # AI assistant endpoint
│   ├── schemas/
│   │   ├── member.py          # Member schema
│   │   ├── care_gap.py        # Care gap schema
│   │   └── authorization.py   # Authorization schema
│   └── __init__.py
├── .venv/
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

Get Member Care Gaps
GET /members/{member_id}/care-gaps

Get Member Authorizations
GET /members/{member_id}/authorizations

AI Assistant
Query AI
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


The AI endpoint currently uses backend-driven logic and structured data.
It will later be replaced by a tool-based AI Agent using database-backed queries and MCP.

OpenAPI Documentation

FastAPI automatically generates OpenAPI documentation.

Swagger UI
http://localhost:8000/docs

ReDoc
http://localhost:8000/redoc

OpenAPI Screenshots

The following screenshots document the live API contract and are included for peer review clarity.

📁 Recommended location

backend/docs/


📸 Suggested screenshots

openapi-overview.png – Full API list

openapi-members.png – Members endpoints

openapi-ai.png – AI query endpoint

Example
![OpenAPI Overview](docs/openapi-overview.png)
![Members API](docs/openapi-members.png)
![AI API](docs/openapi-ai.png)


These screenshots demonstrate a working, documented API contract and were captured from a running instance of the backend.

Running the Backend Locally
1. Create virtual environment
python -m venv .venv
source .venv/bin/activate

2. Install dependencies
pip install fastapi uvicorn

3. Start the server
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000


Backend available at:

http://localhost:8000


6️⃣ Database Layer

Tables:
create 4 tables:

members

care_gaps

authorizations

ai_queries (for AI audit & MCP later)

members

authorizations

care_gaps

ai_interactions

Requirements

SQLite (local)

PostgreSQL (prod)

Alembic migrations

Clear documentation

7️⃣ MCP (This is where you score BIG)
MCP Server Tools

get_member_data

get_authorization_policy

explain_denial

summarize_care_gaps

MCP Workflow

User asks question

Agent decides which tools to call

MCP server fetches data

Agent synthesizes response

👉 This explicit MCP usage = full 2 points

8️⃣ Coding Agent (Required)

You’ll document:

How you used an agent to:

Generate boilerplate

Refactor endpoints

Create tests

Include:

AGENTS.md

Example prompts

Tool usage flow

This directly matches:

AI-assisted system development

9️⃣ Containerization

docker-compose.yml

frontend

backend

database

One command:

docker-compose up --build


👉 Full points here.

🔟 Testing Strategy
Type	Coverage
Unit	Business logic
Integration	API + DB
Frontend	Core UI logic
AI	Prompt + response tests
1️⃣1️⃣ Deployment

Options:

AWS (EC2 / App Runner)

Render

Railway

Proof

Public URL

Screenshot in README

1️⃣2️⃣ CI/CD

GitHub Actions

Run tests on PR

Deploy on main branch

1️⃣3️⃣ Reproducibility (README matters)

Your README will include:

Problem description

Architecture diagram

Tech stack

How AI tools were used

MCP explanation

Setup steps

Testing

Deployment link


## MCP & Agent Architecture

This project includes an internal MCP (Model Context Protocol) server
and a standalone AI agent used for orchestration and testing.

The MCP server exposes backend capabilities as structured tools
 The agent consumes MCP tools to perform multi-step reasoning tasks
Both are intended for development, testing, and AI workflow exploration
 They are not required to run the production application

AI System Development & MCP Usage
Overview

This project uses Model Context Protocol (MCP) to expose backend capabilities as structured AI tools and to enable an AI agent to orchestrate multi-step workflows across the system.

MCP is used as an internal integration layer, not as a user-facing component. This mirrors real-world AI system architectures where agents and tool protocols operate behind the scenes.

Why MCP Was Used

The primary goals of using MCP in this project were:

To standardize how backend functionality is exposed to AI systems

To decouple AI orchestration logic from application business logic

To enable multi-step reasoning and tool chaining (search → retrieve → explain)

To demonstrate modern AI-assisted system design beyond simple prompt usage

MCP allows the AI agent to interact with the system through explicit, typed tools rather than ad-hoc API calls or brittle prompt parsing.

MCP Server Architecture

The MCP server is implemented using FastMCP and runs as a standalone service.

It exposes backend functionality as MCP tools that internally call the FastAPI backend.

AI Agent Design

A standalone AI agent consumes the MCP server using the FastMCP client.

# The agent:

Discovers available MCP tools dynamically

Executes tools programmatically

Orchestrates multi-step workflows

Demonstrates AI reasoning over real backend data

Example Agent Workflow

Search for a member by name

Retrieve member details

Fetch care gaps and authorizations

Ask the AI to explain an authorization denial

Persist the AI interaction in the database

This workflow is executed without any hardcoded backend logic inside the agent — all interactions happen via MCP tools.

### Running MCP Server
cd mcp
python server.py


### Running Agent
cd agent
python agent.py


# tests/
└── integration/
    ├── test_members.sh   ✅ backend + DB
    └── test_ai.sh        ✅ AI endpoint + DB

    notebooks/
└── agent_experiments.ipynb  

### This notebook can:

use ToyAIKit

connect LLMs

explore agent tools

read/write files

do interactive prompts

Agent Development (Exploratory)

During development, Jupyter notebooks were used to explore agent behavior, MCP tool usage, and LLM-assisted workflows using ToyAIKit and OpenAI.

These notebooks are provided for learning and experimentation only and are not part of the automated test or CI pipeline.




# Testing

This project includes end-to-end integration tests that validate the full system behavior across:

FastAPI backend

PostgreSQL database

AI reasoning endpoints

Dockerized infrastructure

Tests are implemented as executable shell scripts, making them easy to run locally and suitable for CI pipelines.

Prerequisites

Before running tests, ensure:

Docker & Docker Compose are installed

Containers are running:

docker compose up -d


Backend is available at:

http://localhost:8000

Running Integration Tests

All integration tests are located in the tests/ directory.

1️⃣ Members API Tests
./tests/test_members.sh


Covers:

Health check

Member search

Member profile retrieval

Care gaps retrieval

Authorization retrieval

Database-backed responses

2️⃣ AI API Tests
./tests/test_ai.sh


Covers:

AI authorization denial reasoning

AI care gap explanations

AI endpoint correctness

Persistent AI query storage in PostgreSQL

Test Structure
tests/
├── test_members.sh   # Member, care gap, authorization workflows
└── test_ai.sh        # AI reasoning and persistence workflows

Notes

Tests run against real services (no mocks)

Database interactions are fully exercised

Output is human-readable and CI-friendly

Scripts can be reused in automated pipelines (CI/CD)
