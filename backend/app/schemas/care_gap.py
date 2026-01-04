from pydantic import BaseModel, Field
from datetime import date


class CareGap(BaseModel):
    id: str

    memberId: str = Field(alias="member_id")
    type: str
    description: str
    priority: str
    dueDate: date = Field(alias="due_date")
    status: str

    class Config:
        from_attributes = True
        populate_by_name = True
        allow_population_by_field_name = True
