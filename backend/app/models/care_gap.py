from sqlalchemy import Column, String, Date, Text, TIMESTAMP, ForeignKey
from sqlalchemy.sql import func
from app.db.database import Base


class CareGap(Base):
    __tablename__ = "care_gaps"

    id = Column(String(20), primary_key=True, index=True)

    member_id = Column(
        String(20),
        ForeignKey("members.id", ondelete="CASCADE"),
        nullable=False,
        index=True,
    )

    type = Column(String(200), nullable=False)
    description = Column(Text, nullable=False)
    priority = Column(String(20), nullable=False)
    due_date = Column(Date, nullable=False)
    status = Column(String(30), nullable=False)

    created_at = Column(
        TIMESTAMP,
        server_default=func.now(),
        nullable=False,
    )
