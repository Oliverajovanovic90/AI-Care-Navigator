AI Care Navigator

An AI-powered care coordination & prior-authorization assistant for healthcare teams

📌 Overview

AI Care Navigator is a full-stack, AI-assisted healthcare application designed to help care managers, analysts, and coordinators:

Understand member status and risk

Interpret authorization decisions

Identify and prioritize care gaps

Receive AI-generated explanations and next-step recommendations

The system combines a production-ready backend, AI reasoning, Model Context Protocol (MCP), containerized infrastructure, and automated testing and CI to demonstrate modern AI-driven system design.

❓ Problem Statement

Healthcare teams face significant challenges when working with fragmented systems:

Member data spread across tools

Authorization denials that are difficult to interpret

Manual review of policies and guidelines

Time-consuming documentation and note writing

This leads to:

Delays in care

Increased administrative burden

Errors and inconsistencies

Poor member experience

🎯 Goal

Build an AI-powered system that:

Centralizes member, care gap, and authorization data

Explains authorization outcomes in plain language

Recommends next actions

Demonstrates real-world AI orchestration using tools (not just prompts)

🏗️ System Architecture
High-Level Architecture
┌──────────────────┐
│   Frontend UI    │
│ (React / Next.js)│
└────────┬─────────┘
         │ REST / HTTPS
┌────────▼─────────┐
│ FastAPI Backend  │
│  (Dockerized)    │
├──────────────────┤
│ MCP Server       │
│ AI Endpoints     │
└────────┬─────────┘
         │ Private Network
┌────────▼─────────┐
│ PostgreSQL DB    │
│ (Managed / Local)│
└──────────────────┘

Key Design Principles

Clear API contracts (OpenAPI)

Separation of concerns

Tool-based AI reasoning

Production-style deployment

Testability and reproducibility

Project Folder Structure:
AI-Care-Navigator/
├── .github/
│   └── workflows/
│       └── ci.yml                  # GitHub Actions CI pipeline
│
├── agent/                           # Standalone AI agent (dev & testing)
│   ├── agent.py
│   ├── mcp_client.py
│   └── README.md
│
├── backend/                         # FastAPI backend (production service)
│   ├── Dockerfile
│   ├── requirements.txt
│   ├── app/
│   │   ├── main.py                  # FastAPI app entry point
│   │   ├── api/
│   │   │   ├── members.py           # Members endpoints
│   │   │   ├── authorizations.py    # Authorization endpoints
│   │   │   └── ai.py                # AI assistant endpoint
│   │   ├── db/
│   │   │   ├── session.py           # SQLAlchemy async DB session
│   │   │   └── models.py            # ORM models
│   │   ├── schemas/
│   │   │   ├── member.py
│   │   │   ├── care_gap.py
│   │   │   └── authorization.py
│   │   └── __init__.py
│   └── README.md
│
├── frontend/                        # Frontend (placeholder / optional)
│   └── README.md
│
├── infra/                           # Infrastructure & Docker orchestration
│   ├── docker-compose.yml
│   └── README.md
│
├── mcp/                             # MCP server (tool exposure layer)
│   ├── server.py
│   ├── tools.py
│   └── README.md
│
├── tests/                           # Integration tests (grading-focused)
│   ├── test_members.sh              # Backend + DB integration tests
│   ├── test_ai.sh                   # AI endpoint integration tests
│   ├── notebooks/
│   │   └── agent_experiments.ipynb  # Exploratory agent testing (optional)
│   └── README.md
│
├── docs/                            # Documentation assets
│   ├── architecture.png             # System architecture diagram
│   └── openapi/
│       ├── openapi-overview.png
│       ├── openapi-members.png
│       └── openapi-ai.png
│
├── .gitignore
├── README.md                        # Main project documentation
└── AGENTS.md                        # AI agent & prompt documentation



🎨 Frontend
Purpose

The frontend provides an intuitive interface for healthcare users to interact with member data and AI explanations.

Planned / Optional Scope

The frontend is optional for deployment and grading but included in the architecture for completeness.

Technology Stack

React or Next.js

TypeScript

Centralized API client (api.ts)

Component-based UI

Core Screens

Member Search

Member Profile

Authorization Details

AI Assistant Chat

⚙️ Backend (FastAPI)
Overview

The backend is a modular, production-oriented FastAPI application that serves as the system of record for:

Members

Care gaps

Authorizations

AI-powered explanations

It is designed to support both direct API usage and AI agent tool access via MCP.

Tech Stack

Python 3.12

FastAPI

Pydantic

Uvicorn

PostgreSQL

OpenAPI / Swagger

Backend Structure
backend/
├── app/
│   ├── main.py
│   ├── api/
│   │   ├── members.py
│   │   ├── authorizations.py
│   │   └── ai.py
│   ├── schemas/
│   │   ├── member.py
│   │   ├── care_gap.py
│   │   └── authorization.py
│   └── db/
│       └── session.py
├── Dockerfile
└── README.md

API Endpoints
Health
GET /health

Members
GET /members
GET /members/{id}
GET /members/{id}/care-gaps
GET /members/{id}/authorizations

AI
POST /ai/query


Example Request

{
  "query": "Why was this authorization denied?",
  "context": {
    "memberId": "MBR-001",
    "authorizationId": "AUTH-002"
  }
}

API Documentation

Automatically generated via FastAPI:

Swagger UI: /docs

ReDoc: /redoc

Screenshots are included under docs/ for peer review clarity.

🗄️ Database Layer
Tables

members

care_gaps

authorizations

ai_interactions (audit trail)

Databases

SQLite (local development)

PostgreSQL (Docker & production)

🧩 Model Context Protocol (MCP)
Why MCP?

MCP is used to expose backend capabilities as explicit, typed AI tools, enabling:

Safe AI-tool interaction

Multi-step reasoning

Decoupling AI logic from business logic

Real-world AI system architecture

MCP Tools

search_members

get_member

get_member_care_gaps

get_member_authorizations

query_ai

MCP Workflow

User asks a question

AI agent decides which tools to call

MCP server executes backend actions

Agent synthesizes final response

🤖 AI Agent
Purpose

The AI agent demonstrates:

Tool discovery

Multi-step reasoning

AI orchestration over real backend data

Design

Uses FastMCP client

Consumes MCP tools dynamically

Executes workflows without hardcoded backend logic

Example Workflow

Search member

Fetch care gaps

Retrieve authorizations

Ask AI to explain a denial

Persist AI interaction

Running MCP & Agent Locally
# MCP Server
cd mcp
python server.py

# Agent
cd agent
python agent.py

🧪 Testing Strategy
Philosophy

Tests validate real system behavior (no mocks).

Test Types
Type	Coverage
Integration	Backend + DB
AI	AI reasoning endpoints
Infrastructure	Dockerized services
Test Structure
tests/
├── test_members.sh
├── test_ai.sh
└── notebooks/
    └── agent_experiments.ipynb

Running Tests
docker compose up -d
./tests/test_members.sh
./tests/test_ai.sh

🐳 Containerization

Dockerized backend

Docker Compose for local orchestration

PostgreSQL container

docker compose up --build

🚀 Deployment
Platform

Render

Docker-based deployment

Managed PostgreSQL

Public URL
https://ai-care-navigator.onrender.com


Free tier instances may spin down after inactivity.

Deployment Architecture
Client
  │ HTTPS
FastAPI Backend (Docker)
  │ Private Network
PostgreSQL (Render Managed)

🔄 CI/CD

GitHub Actions

Runs integration tests on every push to main

Validates backend, database, and AI endpoints

Prevents broken deployments

🔁 Reproducibility

This project can be run end-to-end using:

Docker

Docker Compose

GitHub Actions

Render

All steps are documented in this README.

✅ Summary

This project demonstrates:

Production-grade backend architecture

AI tool-based reasoning (MCP)

Containerized deployment

Integration testing

CI/CD pipelines

Real-world AI system design
