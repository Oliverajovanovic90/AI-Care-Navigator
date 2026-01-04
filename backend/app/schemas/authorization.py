from pydantic import BaseModel, Field
from datetime import date


class Authorization(BaseModel):
    id: str

    memberId: str = Field(alias="member_id")
    type: str
    status: str

    requestDate: date = Field(alias="request_date")
    decisionDate: date | None = Field(alias="decision_date")

    description: str
    provider: str | None = None

    units: int | None = None
    unitType: str | None = Field(default=None, alias="unit_type")

    denialReason: str | None = Field(default=None, alias="denial_reason")
    policyReference: str | None = Field(default=None, alias="policy_reference")

    class Config:
        from_attributes = True
        populate_by_name = True
        allow_population_by_field_name = True
