# Create virtual env
python -m venv .venv
source .venv/bin/activate
pip install fastapi uvicorn

# Run FastAPI from backend
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
-- Uvicorn running on port 8000
Health endpoint
 http://localhost:8000/health

 Swagger UI
 http://localhost:8000/docs

 # Create schemas (Pydantic models)
 -- Create Member.py (Pydantic)
mkdir -p app/schemas
touch app/schemas/member.py

--Create the API route file
mkdir -p app/api
touch app/api/members.py
-- Update previously created file- Register the router (Open app/main.py)
Open in browser to check:
 http://localhost:8000/members/MBR-001

http://localhost:8000/docs

# Implement GET /members/search
Once it is confirm that everything works, than update file backend/app/api/members.py

Direct URL tests:
http://localhost:8000/members/search?memberId=MBR

http://localhost:8000/members/search?name=john

# Add Care Gaps endpoint
-- target endpoint GET /members/{id}/care-gaps
touch app/schemas/care_gap.py

-- Update members API with care gaps:
backend/app/api/members.py

## Add Authorizations endpoints
These will match your frontend calls:
api.getMemberAuthorizations(memberId)
api.getAuthorization(id)

Target endpoints:
GET /members/{id}/authorizations
GET /authorizations/{id}

-- Create Authorization schema and auth for API:
touch app/schemas/authorization.py
touch app/api/authorizations.py

-- Add member authorizations endpoint in - Update (backend/app/api/members.py)
-- Register the authorizations router and update file (backend/app/main.py)
Test Authorization : 
http://localhost:8000/members/MBR-001/authorizations

http://localhost:8000/authorizations/AUTH-002

# AI endpoint
Accept query + context

Return response + sources

Create AIQueryRequest / AIQueryResponse schemas
Create app/api/ai.py
Implement mock AI logic (matching your frontend exactly)
Register route
Test from Swagger
Then wire frontend to backend (remove mocks)

## Create AI schemas
touch app/schemas/ai.py

-- Create AI API route:
touch app/api/ai.py

-- Register AI router:
backend/app/main.py - Update it to include the AI router
Test the AI endpoint:
http://localhost:8000/docs

OR
{
  "query": "Why was this authorization denied?",
  "context": {
    "memberId": "MBR-001",
    "authorizationId": "AUTH-002"
  }
}

# Wire frontend to backend (remove frontend mocks)
cd frontend
echo "VITE_API_URL=http://localhost:8000" > .env

-- Update getMember() in frontend/src/services/api.ts

# Wire searchMembers() to backend
This replaces the frontend mock for:
GET /members/search

frontend/src/services/api.ts

# Wire getMemberCareGaps() to backend
# Update getMemberAuthorizations() in api.ts
# Update the rest

# Now is done
Frontend

React app (Lovable)

Search page

Member profile

AI assistant

Wired to backend (no mocks)

Backend

FastAPI

Members API

Authorizations API

Care gaps API

AI endpoint

Clean router structure

# Create new file for Postgres database
mkdir -p app/db
touch app/db/database.py

Test:
python -c "from app.db.database import DATABASE_URL; print(DATABASE_URL)"
Output:
postgresql+asyncpg://app_user:app_password@localhost:5432/ai_care_navigator

# Create SQLAlchemy models
-- Create a models folder:
mkdir -p app/models
touch app/models/member.py
touch app/models/care_gap.py
touch app/models/authorization.py
touch app/models/ai_query.py

-- Check code:
python - <<EOF
from app.models.ai_query import AIQuery
print(AIQuery.__tablename__)
EOF

# Wire FastAPI to the database (remove mocks)

We will do this endpoint by endpoint:

/members/search

/members/{id}

/members/{id}/care-gaps

/members/{id}/authorizations

/ai/query

-- Update app/api/members.py
-- Update Pydantic Member schema: app/schemas/member.py and all schemas to point at DB

# Remove all Mocks
MOCKs were useful only for Phase 1
Used mocks to:
Build frontend quickly (Lovable)
Define API contracts early
Avoid DB setup initially

backend/app/api/members.py
# REMOVED PREVIOUSLY MOCK DATA FROM members.py
MOCK_MEMBERS = [
    {
        "id": "MBR-001",
        "firstName": "John",
        "lastName": "Smith",
        "dateOfBirth": "1958-03-15",
        "gender": "Male",
        "riskTier": "High",
        "email": "john.smith@email.com",
        "phone": "(555) 123-4567",
        "address": "123 Main St, Springfield, IL 62701",
    },
    {
        "id": "MBR-002",
        "firstName": "Mary",
        "lastName": "Johnson",
        "dateOfBirth": "1965-07-22",
        "gender": "Female",
        "riskTier": "Medium",
        "email": "mary.johnson@email.com",
        "phone": "(555) 234-5678",
        "address": "456 Oak Ave, Chicago, IL 60601",
    },
]

MOCK_CARE_GAPS = [
    {
        "id": "CG-001",
        "memberId": "MBR-001",
        "type": "Annual Wellness Visit",
        "description": "Member has not completed annual wellness visit in 14 months",
        "priority": "High",
        "dueDate": "2024-02-15",
        "status": "Open",
    },
    {
        "id": "CG-002",
        "memberId": "MBR-001",
        "type": "Diabetes Eye Exam",
        "description": "Diabetic retinal exam overdue by 6 months",
        "priority": "High",
        "dueDate": "2024-01-30",
        "status": "Open",
    },
]

MOCK_AUTHORIZATIONS = [
    {
        "id": "AUTH-001",
        "memberId": "MBR-001",
        "type": "PDN",
        "status": "Approved",
        "requestDate": "2024-01-05",
        "decisionDate": "2024-01-10",
        "description": "Private Duty Nursing - 40 hours/week",
        "provider": "ABC Home Health Services",
        "units": 40,
        "unitType": "hours/week",
        "policyReference": "Policy Section 4.2.1",
    },
    {
        "id": "AUTH-002",
        "memberId": "MBR-001",
        "type": "DME",
        "status": "Denied",
        "requestDate": "2024-01-08",
        "decisionDate": "2024-01-15",
        "description": "Electric Wheelchair",
        "denialReason": "Medical necessity criteria not met",
        "policyReference": "Policy Section 6.1.3",
        "provider": "MedEquip Solutions",
    },
]

# AI QUERIES
Persist AI Queries (Step by Step)
STEP — What we will add (conceptually)

For every AI request, we will save a row into ai_queries with:

query_text → payload.query

member_id → payload.context.memberId (if present)

authorization_id → payload.context.authorizationId (if present)

response_text → AI response text
