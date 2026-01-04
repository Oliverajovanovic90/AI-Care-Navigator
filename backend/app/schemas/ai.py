from pydantic import BaseModel
from typing import Optional, List


class AIContext(BaseModel):
    memberId: Optional[str] = None
    authorizationId: Optional[str] = None


class AIQueryRequest(BaseModel):
    query: str
    context: Optional[AIContext] = None


class AIQueryResponse(BaseModel):
    response: str
    sources: List[str]
