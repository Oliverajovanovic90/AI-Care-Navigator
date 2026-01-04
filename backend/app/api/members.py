from fastapi import APIRouter, HTTPException, Query, Depends
from typing import List, Optional
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from app.schemas.member import Member
from app.schemas.care_gap import CareGap
from app.schemas.authorization import Authorization

from app.db.database import get_db
from app.models.member import Member as MemberModel
from app.models.care_gap import CareGap as CareGapModel
from app.models.authorization import Authorization as AuthorizationModel

router = APIRouter(prefix="/members", tags=["members"])

# ------------------------------------------------------------------
# Temporary mock data (will be removed step by step)
# ------------------------------------------------------------------

# ------------------------------------------------------------------
# ✅ STEP 13.1 — REAL DB SEARCH (this is the ONLY change so far)
# ------------------------------------------------------------------

@router.get("", response_model=List[Member])
async def search_members(
    memberId: Optional[str] = Query(None),
    name: Optional[str] = Query(None),
    db: AsyncSession = Depends(get_db),
):
    stmt = select(MemberModel)

    if memberId:
        stmt = stmt.where(MemberModel.id.ilike(f"%{memberId}%"))

    if name:
        stmt = stmt.where(
            (MemberModel.first_name.ilike(f"%{name}%")) |
            (MemberModel.last_name.ilike(f"%{name}%"))
        )

    result = await db.execute(stmt)
    members = result.scalars().all()

    return members

@router.get("/{member_id}/authorizations", response_model=list[Authorization])
async def get_member_authorizations(
    member_id: str,
    db: AsyncSession = Depends(get_db),
):
    stmt = select(AuthorizationModel).where(
        AuthorizationModel.member_id == member_id
    )
    result = await db.execute(stmt)
    authorizations = result.scalars().all()

    return authorizations


@router.get("/{member_id}", response_model=Member)
async def get_member(
    member_id: str,
    db: AsyncSession = Depends(get_db),
):
    stmt = select(MemberModel).where(MemberModel.id == member_id)
    result = await db.execute(stmt)
    member = result.scalar_one_or_none()

    if not member:
        raise HTTPException(status_code=404, detail="Member not found")

    return member



@router.get("/{member_id}/care-gaps", response_model=list[CareGap])
async def get_member_care_gaps(
    member_id: str,
    db: AsyncSession = Depends(get_db),
):
    stmt = select(CareGapModel).where(CareGapModel.member_id == member_id)
    result = await db.execute(stmt)
    care_gaps = result.scalars().all()

    return care_gaps

