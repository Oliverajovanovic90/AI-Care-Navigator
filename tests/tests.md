## Testing

Integration tests are implemented as executable shell scripts to validate
end-to-end system behavior against the running Dockerized services.

### Prerequisites
- Docker + Docker Compose
- Backend running on `http://localhost:8000`

## Step 1 - Start the database (Postgres) with Docker Compose
cd /workspaces/AI-Care-Navigator/infra
docker compose up -d
docker ps

### Step 2 - Run Tests

./tests/test_members.sh
./tests/test_ai.sh


-- Make the script executable
chmod +x tests/test_members.sh
-- run the tests
./tests/test_members.sh

chmod +x tests/test_ai.sh
./tests/test_ai.sh

