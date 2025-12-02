import React from 'react';
import { Terminal, AlertCircle, Info, CheckCircle, AlertTriangle } from 'lucide-react';
import clsx from 'clsx';

interface Log {
    id: string;
    timestamp: string;
    level: string;
    source: string;
    message: string;
    metadata: Record<string, any>;
}

interface LogViewerProps {
    logs: Log[];
    loading: boolean;
}

const LogViewer: React.FC<LogViewerProps> = ({ logs, loading }) => {
    const getLevelIcon = (level: string) => {
        switch (level.toUpperCase()) {
            case 'ERROR': return <AlertCircle className="w-4 h-4 text-red-500" />;
            case 'WARNING': return <AlertTriangle className="w-4 h-4 text-yellow-500" />;
            case 'INFO': return <Info className="w-4 h-4 text-blue-500" />;
            case 'DEBUG': return <CheckCircle className="w-4 h-4 text-gray-500" />;
            default: return <Terminal className="w-4 h-4 text-gray-400" />;
        }
    };

    const getLevelColor = (level: string) => {
        switch (level.toUpperCase()) {
            case 'ERROR': return 'text-red-400';
            case 'WARNING': return 'text-yellow-400';
            case 'INFO': return 'text-blue-400';
            case 'DEBUG': return 'text-gray-400';
            default: return 'text-gray-300';
        }
    };

    return (
        <div className="h-full flex flex-col bg-[#0d1117] text-gray-300 font-mono text-sm border-r border-gray-800">
            <div className="p-4 border-b border-gray-800 flex items-center justify-between bg-[#161b22]">
                <h2 className="font-semibold text-gray-100 flex items-center gap-2">
                    <Terminal className="w-5 h-5" />
                    Live Logs
                </h2>
                <span className="text-xs text-gray-500">{logs.length} events</span>
            </div>

            <div className="flex-1 overflow-auto p-2 space-y-1 custom-scrollbar">
                {loading && logs.length === 0 ? (
                    <div className="flex items-center justify-center h-full text-gray-500">
                        Loading logs...
                    </div>
                ) : (
                    logs.map((log) => (
                        <div
                            key={log.id}
                            className="group flex items-start gap-3 p-2 hover:bg-[#161b22] rounded transition-colors cursor-pointer"
                        >
                            <div className="mt-0.5 shrink-0 opacity-70 group-hover:opacity-100">
                                {getLevelIcon(log.level)}
                            </div>
                            <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-2 mb-0.5">
                                    <span className={clsx("font-bold text-xs", getLevelColor(log.level))}>
                                        {log.level}
                                    </span>
                                    <span className="text-xs text-gray-500">
                                        {new Date(log.timestamp).toLocaleTimeString()}
                                    </span>
                                    <span className="text-xs px-1.5 py-0.5 rounded bg-gray-800 text-gray-400">
                                        {log.source}
                                    </span>
                                </div>
                                <p className="break-all text-gray-300 leading-relaxed">
                                    {log.message}
                                </p>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default LogViewer;
