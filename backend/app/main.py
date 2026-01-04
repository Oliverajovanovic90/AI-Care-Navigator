from fastapi import FastAPI
from app.api.members import router as members_router
from app.api.authorizations import router as authorizations_router
from app.api.ai import router as ai_router

app = FastAPI(
    title="AI Care Navigator API",
    version="0.1.0",
)

app.include_router(members_router)
app.include_router(authorizations_router)
app.include_router(ai_router)


@app.get("/health")
def health():
    return {"status": "ok"}
