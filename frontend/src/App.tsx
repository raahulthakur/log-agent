import { useState, useEffect } from 'react';
import LogViewer from './components/LogViewer';
import ChatInterface from './components/ChatInterface';
import axios from 'axios';

// Define types locally or import
interface Log {
  id: string;
  timestamp: string;
  level: string;
  source: string;
  message: string;
  metadata: Record<string, any>;
}

function App() {
  const [logs, setLogs] = useState<Log[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchLogs = async (query?: string) => {
    setLoading(true);
    try {
      const params = query ? { q: query } : {};
      const response = await axios.get('http://localhost:8000/api/logs', { params });
      setLogs(response.data);
    } catch (error) {
      console.error("Failed to fetch logs", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLogs();
  }, []);

  const handleSendMessage = async (message: string): Promise<string> => {
    try {
      const response = await axios.post('http://localhost:8000/api/chat', { message });
      const { response: botResponse, action } = response.data;

      // If the action implies a search, refresh the logs
      if (action && action.generated_query) {
        // In a real app, we would parse the generated query properly.
        // For this mock, we just pass the keyword if present, or the level.
        let query = "";
        if (action.generated_query.keyword) {
          query = action.generated_query.keyword;
        } else if (action.generated_query.level) {
          query = action.generated_query.level;
        }

        // Refresh logs with the new query
        fetchLogs(query);
      }

      return botResponse;
    } catch (error) {
      console.error("Chat error", error);
      return "Sorry, something went wrong.";
    }
  };

  return (
    <div className="flex h-screen w-full overflow-hidden">
      {/* Left Panel: Logs */}
      <div className="w-2/3 h-full">
        <LogViewer logs={logs} loading={loading} />
      </div>

      {/* Right Panel: Chat */}
      <div className="w-1/3 h-full shadow-xl z-20">
        <ChatInterface onSendMessage={handleSendMessage} />
      </div>
    </div>
  );
}

export default App;
