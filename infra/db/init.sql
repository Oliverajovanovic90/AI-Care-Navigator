-- AI Care Navigator DB schema
-- Idempotent-ish: safe to re-run by dropping existing tables in dev
DROP TABLE IF EXISTS ai_queries;
DROP TABLE IF EXISTS care_gaps;
DROP TABLE IF EXISTS authorizations;
DROP TABLE IF EXISTS members;

CREATE TABLE members (
  id              VARCHAR(20) PRIMARY KEY,
  first_name      VARCHAR(100) NOT NULL,
  last_name       VARCHAR(100) NOT NULL,
  date_of_birth   DATE NOT NULL,
  gender          VARCHAR(20) NOT NULL,
  risk_tier       VARCHAR(20) NOT NULL,
  email           VARCHAR(255),
  phone           VARCHAR(50),
  address         TEXT,
  created_at      TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE TABLE care_gaps (
  id            VARCHAR(20) PRIMARY KEY,
  member_id     VARCHAR(20) NOT NULL REFERENCES members(id) ON DELETE CASCADE,
  type          VARCHAR(200) NOT NULL,
  description   TEXT NOT NULL,
  priority      VARCHAR(20) NOT NULL,
  due_date      DATE NOT NULL,
  status        VARCHAR(30) NOT NULL,
  created_at    TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE TABLE authorizations (
  id               VARCHAR(20) PRIMARY KEY,
  member_id        VARCHAR(20) NOT NULL REFERENCES members(id) ON DELETE CASCADE,
  type             VARCHAR(50) NOT NULL,
  status           VARCHAR(30) NOT NULL,
  request_date     DATE NOT NULL,
  decision_date    DATE,
  description      TEXT NOT NULL,
  provider         VARCHAR(255),
  units            INTEGER,
  unit_type        VARCHAR(50),
  denial_reason    TEXT,
  policy_reference VARCHAR(255),
  created_at       TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE TABLE ai_queries (
  id               UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  query_text       TEXT NOT NULL,
  member_id        VARCHAR(20),
  authorization_id VARCHAR(20),
  response_text    TEXT,
  created_at       TIMESTAMP NOT NULL DEFAULT NOW()
);

-- Needed for gen_random_uuid()
CREATE EXTENSION IF NOT EXISTS pgcrypto;




