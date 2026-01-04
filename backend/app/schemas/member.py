from pydantic import BaseModel, Field
from datetime import date


class Member(BaseModel):
    id: str

    firstName: str = Field(alias="first_name")
    lastName: str = Field(alias="last_name")
    dateOfBirth: date = Field(alias="date_of_birth")
    gender: str
    riskTier: str = Field(alias="risk_tier")

    email: str | None = None
    phone: str | None = None
    address: str | None = None

    class Config:
        from_attributes = True
        populate_by_name = True
        allow_population_by_field_name = True
