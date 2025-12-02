from fastapi import APIRouter, Query
from typing import List, Optional
from services.log_service import log_service

router = APIRouter()

@router.get("/", response_model=List[dict])
async def get_logs(
    q: Optional[str] = Query(None, description="Search query"),
    limit: int = Query(50, description="Max number of logs to return")
):
    return log_service.get_logs(query=q, limit=limit)
