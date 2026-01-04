from fastapi import APIRouter, HTTPException
from typing import List
from app.schemas.authorization import Authorization

router = APIRouter(prefix="/authorizations", tags=["authorizations"])

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


@router.get("/{authorization_id}", response_model=Authorization)
def get_authorization(authorization_id: str):
    for auth in MOCK_AUTHORIZATIONS:
        if auth["id"] == authorization_id:
            return auth
    raise HTTPException(status_code=404, detail="Authorization not found")
