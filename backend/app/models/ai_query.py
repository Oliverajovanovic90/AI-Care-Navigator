from sqlalchemy import Column, String, Text, TIMESTAMP
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.sql import func
from app.db.database import Base


class AIQuery(Base):
    __tablename__ = "ai_queries"

    id = Column(
        UUID(as_uuid=True),
        primary_key=True,
        server_default=func.gen_random_uuid(),
    )

    query_text = Column(Text, nullable=False)

    member_id = Column(String(20))
    authorization_id = Column(String(20))

    response_text = Column(Text)

    created_at = Column(
        TIMESTAMP,
        server_default=func.now(),
        nullable=False,
    )
