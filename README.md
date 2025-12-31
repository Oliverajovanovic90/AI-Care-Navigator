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

Tech

FastAPI

Pydantic

SQLAlchemy

OpenAPI auto-generated

Endpoints

GET /members/{id}
GET /members/{id}/authorizations
POST /ai/query
POST /notes/generate


Key Requirements

Follows OpenAPI contract

Clean service layer

Unit + integration tests

6️⃣ Database Layer

Tables

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
