from fastapi import APIRouter
from pydantic import BaseModel
from services.llm_service import llm_service

router = APIRouter()

class ChatRequest(BaseModel):
    message: str

class ChatResponse(BaseModel):
    response: str
    action: dict

@router.post("/", response_model=ChatResponse)
async def chat(request: ChatRequest):
    result = llm_service.process_query(request.message)
    
    # Construct a natural language response based on the result
    response_text = result["explanation"]
    
    return ChatResponse(
        response=response_text,
        action=result
    )
