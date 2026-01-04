# Create tables (init.sql)
ai_queries;

care_gaps;

authorizations;

members;

## Start the database container:

docker compose -f infra/docker-compose.yml up -d

docker ps

### Confirm that tables exist:

docker exec -it ai-care-navigator-db psql -U postgres -d care_navigator

### Check what user you actually created for Postgres:

docker inspect ai-care-navigator-db | grep POSTGRES

POSTGRES_USER=app_user

POSTGRES_PASSWORD=app_password

POSTGRES_DB=ai_care_navigator

### Log in to Postgre:

docker exec -it ai-care-navigator-db psql -U app_user -d ai_care_navigator

\dt

#### ai_care_navigator=# \dt

 ## List of relations
 ```
 Schema |      Name      | Type  |  Owner   
--------+----------------+-------+----------
 public | ai_queries     | table | app_user
 public | authorizations | table | app_user
 public | care_gaps      | table | app_user
 public | members        | table | app_user
(4 rows)
```
```
INSERT INTO members (
  id,
  first_name,
  last_name,
  date_of_birth,
  gender,
  risk_tier,
  email,
  phone,
  address
) VALUES (
  'MBR-001',
  'John',
  'Smith',
  '1958-03-15',
  'Male',
  'High',
  'john.smith@email.com',
  '(555) 123-4567',
  '123 Main St, Springfield, IL 62701'
);
```

### Verify:

ai_care_navigator=# SELECT * FROM members;

```
INSERT INTO authorizations (
  id,
  member_id,
  type,
  status,
  request_date,
  decision_date,
  description,
  provider,
  units,
  unit_type,
  denial_reason,
  policy_reference
) VALUES
(
  'AUTH-001',
  'MBR-001',
  'PDN',
  'Approved',
  '2024-01-05',
  '2024-01-10',
  'Private Duty Nursing - 40 hours/week',
  'ABC Home Health Services',
  40,
  'hours/week',
  NULL,
  'Policy Section 4.2.1'
),
(
  'AUTH-002',
  'MBR-001',
  'DME',
  'Denied',
  '2024-01-08',
  '2024-01-15',
  'Electric Wheelchair',
  'MedEquip Solutions',
  NULL,
  NULL,
  'Medical necessity criteria not met',
  'Policy Section 6.1.3'
);
```
SELECT id, member_id, type, status FROM authorizations;

## Remove MOCK_MEMBERS, MOCK_CARE_GAPS, MOCK_AUTHORIZATIONS

Install package: pip install sqlalchemy asyncpg

## AI QUERIES

For every AI request, we will save a row into ai_queries with:

query_text → payload.query

member_id → payload.context.memberId (if present)

authorization_id → payload.context.authorizationId (if present)

response_text → AI response text

### To test query you need to run in docker to get ai_care_navigator

docker exec -it ai-care-navigator-db psql -U app_user -d ai_care_navigator

```
SELECT
  query_text,
  member_id,
  authorization_id,
  created_at
FROM ai_queries
ORDER BY created_at DESC;
```
## We now have:

✔ AI endpoint

✔ Async FastAPI

✔ PostgreSQL persistence

✔ Audit trail for AI decisions

✔ Foundation for AI agents / memory

✔ Healthcare-compliant architecture

### store AI decisions

You link them to member + authorization

You can audit, replay, analyze AI usage

### Add GET /ai/history (view past AI decisions)

update file backend/app/api/ai.py to get history

curl http://localhost:8000/ai/history

## Wire AI History into the Frontend

# Docker
cd ../infra

docker compose down

docker compose build --no-cache

docker compose up -d

 docker ps
 ```
CONTAINER ID   IMAGE           COMMAND                  CREATED          STATUS                    PORTS                                         NAMES
d19ded11359e   infra-backend   "uvicorn app.main:ap…"   26 seconds ago   Up 20 seconds             0.0.0.0:8000->8000/tcp, [::]:8000->8000/tcp   ai-care-navigator-backend
5e78f658d518   postgres:16     "docker-entrypoint.s…"   26 seconds ago   Up 25 seconds (healthy)   0.0.0.0:5432->5432/tcp, [::]:5432->5432/tcp   ai-care-navigator-db
```

