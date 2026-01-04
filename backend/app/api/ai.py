from fastapi import APIRouter, Depends, Query
from sqlalchemy.ext.asyncio import AsyncSession

from app.schemas.ai import AIQueryRequest, AIQueryResponse
from app.db.database import get_db
from app.models.ai_query import AIQuery

from sqlalchemy import select
from typing import Optional, List



router = APIRouter(prefix="/ai", tags=["ai"])


@router.post("/query", response_model=AIQueryResponse)
async def query_ai(
    payload: AIQueryRequest,
    db: AsyncSession = Depends(get_db),
):
    query_lower = payload.query.lower()

    # ------------------------------
    # DENIAL EXPLANATION
    # ------------------------------
    if "denied" in query_lower or "denial" in query_lower:
        response_text = (
            "This authorization was denied because medical necessity "
            "criteria were not met based on the submitted documentation.\n\n"
            "**Recommended Next Steps:**\n"
            "1. Review policy requirements\n"
            "2. Gather additional clinical documentation\n"
            "3. Consider submitting an appeal or peer-to-peer review"
        )
        sources = [
            "Authorization Policy",
            "Utilization Management Guidelines",
        ]

    # ------------------------------
    # CARE GAPS
    # ------------------------------
    elif "care gap" in query_lower or "care gaps" in query_lower:
        response_text = (
            "This member has outstanding care gaps that require follow-up.\n\n"
            "**Recommendations:**\n"
            "1. Prioritize high-risk gaps\n"
            "2. Coordinate with the PCP\n"
            "3. Schedule necessary screenings"
        )
        sources = [
            "Care Gap Registry",
            "Quality Measures",
        ]

    # ------------------------------
    # NEXT ACTIONS
    # ------------------------------
    elif "next action" in query_lower or "next step" in query_lower:
        response_text = (
            "Recommended next actions include:\n"
            "1. Follow up on pending authorizations\n"
            "2. Address high-priority care gaps\n"
            "3. Perform care management outreach"
        )
        sources = [
            "Care Management Playbook",
        ]

    # ------------------------------
    # DEFAULT RESPONSE
    # ------------------------------
    else:
        response_text = (
            "I am your AI Care Navigator. You can ask me about:\n"
            "- Authorization denials\n"
            "- Care gaps\n"
            "- Recommended next actions\n"
            "- Policy explanations"
        )
        sources = [
            "AI Care Navigator",
        ]

    # ------------------------------
    # PERSIST AI QUERY TO DATABASE
    # ------------------------------
    ai_query = AIQuery(
        query_text=payload.query,
        member_id=payload.context.memberId if payload.context else None,
        authorization_id=payload.context.authorizationId if payload.context else None,
        response_text=response_text,
    )

    db.add(ai_query)
    await db.commit()

    # ------------------------------
    # RETURN RESPONSE TO CLIENT
    # ------------------------------
    return AIQueryResponse(
        response=response_text,
        sources=sources,
    )

@router.get("/history", response_model=List[AIQueryResponse])
async def get_ai_history(
    member_id: Optional[str] = Query(None),
    authorization_id: Optional[str] = Query(None),
    db: AsyncSession = Depends(get_db),
):
    stmt = select(AIQuery).order_by(AIQuery.created_at.desc())

    if member_id:
        stmt = stmt.where(AIQuery.member_id == member_id)

    if authorization_id:
        stmt = stmt.where(AIQuery.authorization_id == authorization_id)

    result = await db.execute(stmt)
    records = result.scalars().all()

    return [
        AIQueryResponse(
            response=r.response_text,
            sources=[]
        )
        for r in records
    ]
