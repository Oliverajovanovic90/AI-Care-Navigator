# AI Care Navigator

AI-powered care coordination & prior-authorization assistant for healthcare teams.
AI Care Navigator is a full-stack, cloud-deployed backend system designed to help healthcare analysts and care managers understand member data, care gaps, and authorization decisions using AI-assisted reasoning, structured APIs, and modern system architecture.
This project demonstrates AI-assisted system design, tool-based reasoning (MCP), backend engineering, integration testing, CI/CD, and cloud deployment.

### Problem Description

Healthcare teams (case managers, analysts, care coordinators) often struggle with:

Understanding member risk and care gaps

Interpreting authorization decisions (approved vs denied)

Navigating complex medical policies

Writing clear summaries and next-step recommendations

This leads to:

Manual effort

Delays in care

Errors and inconsistent decisions

Poor member experience

### Goal

Build an AI-powered system that:

Exposes clean APIs for member data

Explains authorization outcomes

Summarizes care gaps

Demonstrates modern AI orchestration using tools (MCP + agents)

### High-Level System Overview

User Flow

Search for a member

View demographics, care gaps, and authorizations

Ask AI questions such as:

“Why was this authorization denied?”

“What actions should I take next?”

System Responsibilities

Backend provides structured data and AI endpoints

AI reasoning is handled via tool-based orchestration (MCP)

Integration tests validate real workflows

CI/CD automates validation

Backend is deployed to the cloud

## Architecture Overview

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

## Project Folder Structure:

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



## Frontend
Purpose:

The frontend provides an intuitive interface for healthcare users to interact with member data and AI explanations.

Tech:

React / TypeScript

Centralized API client

Component-based structure

AI Tooling

Lovable was used to assist with:

UI scaffolding

Component layout ideas

Frontend structure suggestions

The frontend demonstrates how a real care management UI would consume the backend APIs.

## Backend (FastAPI)
#### Overview

The backend is a production-oriented FastAPI application that exposes:

Member search & profiles

Care gaps

Authorizations

AI-powered explanations

Persistent AI audit logs

It is designed to support AI agents and MCP-based orchestration.

#### Tech Stack:

FastAPI

Pydantic

SQLAlchemy (async)

PostgreSQL

Uvicorn

Python 3.12

Docker

## Backend Structure

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

## API Endpoints
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

## Database Layer

Tables:

members

care_gaps

authorizations

ai_interactions (audit trail)

### Databases

SQLite (local development)

PostgreSQL (Docker & production)

## Model Context Protocol (MCP)
MCP is used to:

Expose backend capabilities as typed AI tools

Decouple AI reasoning from business logic

Enable multi-step workflows (search → retrieve → explain)

### MCP Tools

search_members

get_member

get_member_care_gaps

get_member_authorizations

query_ai

### MCP Workflow

User asks a question

AI agent decides which tools to call

MCP server executes backend actions

Agent synthesizes final response

## AI Agent
Purpose:

A standalone AI agent consumes MCP tools to perform reasoning workflows.

#### Agent Capabilities

Discovers MCP tools dynamically

Calls backend tools via MCP

Orchestrates multi-step reasoning

Persists AI interactions

#### Example Workflow

Search member

Fetch authorizations

Identify denial

Ask AI to explain

Store response in DB

The agent is for development, experimentation, and demonstration, not production deployment.

### AI-Assisted Development (Transparency)

This project was explicitly built with AI assistance:

ChatGPT was used to:

Design architecture

Debug Docker, MCP, and agent integration

Create tests and CI workflows

Improve documentation

Lovable was used to assist frontend design and structure

This aligns with modern AI-assisted engineering workflows and is intentionally documented.

### MCP Server
cd mcp
python server.py

### Agent
cd agent
python agent.py

## Testing Strategy
Philosophy

Tests validate real system behavior (no mocks).

#### Tests cover:

API correctness

Database interaction

AI reasoning output

Persistence of AI queries

#### Test Structure
tests/
├── test_members.sh
├── test_ai.sh
└── notebooks/
    └── agent_experiments.ipynb

### Running Tests
docker compose up -d
./tests/test_members.sh
./tests/test_ai.sh

## Containerization

Docker is used for:

Backend service

PostgreSQL database

#### Local run:
docker compose up --build

## Deployment
Platform: Render

Deployed Component: Backend API only

Docker-based deployment

Managed PostgreSQL

#### Public URL
https://ai-care-navigator.onrender.com


Free tier instances may spin down after inactivity.

#### Deployment Architecture:

Client
  │ HTTPS
FastAPI Backend (Docker)
  │ Private Network
PostgreSQL (Render Managed)


## CI/CD

GitHub Actions

Runs integration tests on every push to main

Validates backend, database, and AI endpoints

Prevents broken deployments


## Reproducibility

This project can be run end-to-end using:

Docker

Docker Compose

GitHub Actions

Render

## How to Run This Project

#### Clone the Repository

git clone https://github.com/Oliverajovanovic90/AI-Care-Navigator.git

cd AI-Care-Navigator

#### Prerequisites

Ensure the following are installed:

Docker (v20+)

Docker Compose

Git

curl (for test scripts)

No local Python installation is required if using Docker.

#### Start the System (Backend + Database)

From the project root:

cd infra
docker compose up -d


This will start:

FastAPI backend (http://localhost:8000)

PostgreSQL database

#### Verify backend health:

curl http://localhost:8000/health


Expected response:

{ "status": "ok" }

#### View API Documentation

Open your browser:

Swagger UI
👉 http://localhost:8000/docs

ReDoc
👉 http://localhost:8000/redoc

These pages show the full OpenAPI contract used by the frontend and AI systems.

#### Run Integration Tests (Required for Grading)

From the project root:

./tests/test_members.sh

./tests/test_ai.sh

These tests validate:

Member search and profiles

Care gaps and authorizations

AI explanations

Database persistence

End-to-end workflows (no mocks)

##### Expected output ends with:

All tests passed successfully!

#### Run MCP Server (Development Only)

The MCP server is not required to run the application, but can be started for exploration:

cd mcp

python server.py

#### Run AI Agent (Development Only)

The standalone agent demonstrates MCP-based reasoning:

cd agent

python agent.py

The agent will:

Discover MCP tools

Search members

Explain authorization denials

Persist AI responses

#### Cloud Deployment (No Local Setup Needed)

The backend is already deployed on Render:

 https://ai-care-navigator.onrender.com


### Summary

This project demonstrates:

Production-grade backend architecture

AI tool-based reasoning (MCP)

Containerized deployment

Integration testing

CI/CD pipelines

Real-world AI system design
