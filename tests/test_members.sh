#!/usr/bin/env bash
set -e

BASE_URL="http://localhost:8000"

echo "=============================="
echo "Running Members API Tests"
echo "=============================="

echo ""
echo "1️⃣ Health check"
curl -s "$BASE_URL/health" | grep "ok"
echo "✅ Health check passed"

echo ""
echo "2️⃣ Search members by name (John)"
curl -s "$BASE_URL/members?name=John" | grep "MBR-001"
echo "✅ Member search passed"

echo ""
echo "3️⃣ Get member by ID"
curl -s "$BASE_URL/members/MBR-001" | grep "John"
echo "✅ Get member passed"

echo ""
echo "4️⃣ Get member care gaps"
curl -s "$BASE_URL/members/MBR-001/care-gaps" | grep "Annual"
echo "✅ Care gaps passed"

echo ""
echo "5️⃣ Get member authorizations"
curl -s "$BASE_URL/members/MBR-001/authorizations" | grep "AUTH"
echo "✅ Authorizations passed"

echo ""
echo "🎉 All member tests passed successfully!"
