from typing import Dict, Any

class LLMService:
    def process_query(self, user_query: str) -> Dict[str, Any]:
        # Mock NLP to Query conversion
        # In a real app, this would call OpenAI/Gemini/etc.
        
        user_query_lower = user_query.lower()
        
        response = {
            "original_query": user_query,
            "interpreted_intent": "unknown",
            "generated_query": {},
            "explanation": "I'm not sure what you mean."
        }

        if "failed" in user_query_lower or "error" in user_query_lower:
            response["interpreted_intent"] = "filter_logs"
            response["generated_query"] = {"level": "ERROR"}
            response["explanation"] = "Filtering for logs with ERROR level."
        elif "login" in user_query_lower:
             response["interpreted_intent"] = "search_logs"
             response["generated_query"] = {"keyword": "login"}
             response["explanation"] = "Searching for logs containing 'login'."
        else:
            response["interpreted_intent"] = "general_search"
            response["generated_query"] = {"keyword": user_query}
            response["explanation"] = f"Searching for logs containing '{user_query}'."

        return response

llm_service = LLMService()
