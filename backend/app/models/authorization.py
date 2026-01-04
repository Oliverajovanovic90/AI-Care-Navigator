from sqlalchemy import (
    Column,
    String,
    Date,
    Text,
    Integer,
    TIMESTAMP,
    ForeignKey,
)
from sqlalchemy.sql import func
from app.db.database import Base


class Authorization(Base):
    __tablename__ = "authorizations"

    id = Column(String(20), primary_key=True, index=True)

    member_id = Column(
        String(20),
        ForeignKey("members.id", ondelete="CASCADE"),
        nullable=False,
        index=True,
    )

    type = Column(String(50), nullable=False)
    status = Column(String(30), nullable=False)

    request_date = Column(Date, nullable=False)
    decision_date = Column(Date)

    description = Column(Text, nullable=False)
    provider = Column(String(255))

    units = Column(Integer)
    unit_type = Column(String(50))

    denial_reason = Column(Text)
    policy_reference = Column(String(255))

    created_at = Column(
        TIMESTAMP,
        server_default=func.now(),
        nullable=False,
    )
