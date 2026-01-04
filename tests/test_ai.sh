#!/usr/bin/env bash
set -e

BASE_URL="http://localhost:8000"

echo "=============================="
echo "Running AI API Tests"
echo "=============================="

echo
echo "1️⃣ AI query: authorization denial"
RESPONSE=$(curl -s -X POST "$BASE_URL/ai/query" \
  -H "Content-Type: application/json" \
  -d '{
    "query": "Why was this authorization denied?",
    "context": {
      "memberId": "MBR-001",
      "authorizationId": "AUTH-002"
    }
  }')

echo "$RESPONSE"

echo "$RESPONSE" | grep -qi "denied"
echo "✅ AI denial explanation passed"

echo
echo "2️⃣ AI query: care gaps"
RESPONSE=$(curl -s -X POST "$BASE_URL/ai/query" \
  -H "Content-Type: application/json" \
  -d '{
    "query": "Summarize this member care gaps",
    "context": {
      "memberId": "MBR-001"
    }
  }')

echo "$RESPONSE"

echo "$RESPONSE" | grep -qi "care"
echo "✅ AI care gap response passed"

echo
echo "🎉 All AI tests passed successfully!"
