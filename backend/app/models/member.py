from sqlalchemy import Column, String, Date, Text, TIMESTAMP
from sqlalchemy.sql import func
from app.db.database import Base


class Member(Base):
    __tablename__ = "members"

    id = Column(String(20), primary_key=True, index=True)

    first_name = Column(String(100), nullable=False)
    last_name = Column(String(100), nullable=False)
    date_of_birth = Column(Date, nullable=False)
    gender = Column(String(20), nullable=False)
    risk_tier = Column(String(20), nullable=False)

    email = Column(String(255))
    phone = Column(String(50))
    address = Column(Text)

    created_at = Column(
        TIMESTAMP,
        server_default=func.now(),
        nullable=False,
    )
