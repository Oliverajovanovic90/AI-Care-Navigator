from sqlalchemy.ext.asyncio import (
    AsyncSession,
    create_async_engine,
    async_sessionmaker,
)
from sqlalchemy.orm import declarative_base
import os

# ------------------------------------------------------------------
# Database configuration
# ------------------------------------------------------------------

# DB_HOST = os.getenv("POSTGRES_HOST", "localhost")
DB_USER = os.getenv("POSTGRES_USER", "app_user")
DB_PASSWORD = os.getenv("POSTGRES_PASSWORD", "app_password")
DB_HOST = os.getenv("POSTGRES_HOST", "127.0.0.1")
DB_PORT = os.getenv("POSTGRES_PORT", "5432")
DB_NAME = os.getenv("POSTGRES_DB", "ai_care_navigator")

DATABASE_URL = (
    f"postgresql+asyncpg://{DB_USER}:{DB_PASSWORD}"
    f"@{DB_HOST}:{DB_PORT}/{DB_NAME}"
)

# ------------------------------------------------------------------
# SQLAlchemy engine & session
# ------------------------------------------------------------------

engine = create_async_engine(
    DATABASE_URL,
    echo=True,  # Logs SQL (good for development)
)

AsyncSessionLocal = async_sessionmaker(
    engine,
    expire_on_commit=False,
    class_=AsyncSession,
)

Base = declarative_base()

# ------------------------------------------------------------------
# Dependency
# ------------------------------------------------------------------

async def get_db() -> AsyncSession:
    async with AsyncSessionLocal() as session:
        yield session
