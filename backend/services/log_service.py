import random
from datetime import datetime, timedelta
from typing import List, Dict, Any

class LogService:
    def __init__(self):
        self.logs = self._generate_mock_logs()

    def _generate_mock_logs(self) -> List[Dict[str, Any]]:
        logs = []
        levels = ["INFO", "WARNING", "ERROR", "DEBUG"]
        sources = ["aws", "datadog", "sentry"]
        messages = [
            "User login successful",
            "Database connection failed",
            "Payment processing error",
            "API rate limit exceeded",
            "Cache miss",
            "New user registered",
            "Email sent successfully",
            "Job processing started",
            "Job processing completed",
            "Invalid credentials"
        ]

        now = datetime.now()
        for i in range(100):
            timestamp = now - timedelta(minutes=i*5)
            logs.append({
                "id": f"log-{i}",
                "timestamp": timestamp.isoformat(),
                "level": random.choice(levels),
                "source": random.choice(sources),
                "message": random.choice(messages),
                "metadata": {"request_id": f"req-{random.randint(1000, 9999)}"}
            })
        return logs

    def get_logs(self, query: str = None, limit: int = 50) -> List[Dict[str, Any]]:
        # In a real app, this would query a database or external API
        filtered_logs = self.logs
        if query:
            query = query.lower()
            filtered_logs = [
                log for log in self.logs 
                if query in log["message"].lower() or query in log["source"].lower()
            ]
        return filtered_logs[:limit]

log_service = LogService()
