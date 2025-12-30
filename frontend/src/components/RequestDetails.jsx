// src/components/RequestDetails/RequestDetails.jsx
import React from 'react';
import { Copy, Trash2, XCircle, Clock, User, Globe, Terminal } from 'lucide-react';

export default function RequestDetails({
  request,
  onClose,
  onDelete,
  darkMode,
}) {
  if (!request) {
    return (
      <div className={`h-full flex flex-col items-center justify-center rounded-xl ${darkMode ? 'bg-gray-800' : 'bg-gray-50'} px-8`}>
        <Globe className={`h-20 w-20 mb-6 ${darkMode ? 'text-gray-700' : 'text-gray-300'}`} />
        <h3 className="text-2xl font-semibold mb-3">No Request Selected</h3>
        <p className={`text-lg text-center max-w-md ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
          Click on any request in the sidebar to view its full details, headers, and payload.
        </p>
      </div>
    );
  }

  const cardBg = darkMode ? 'bg-gray-800' : 'bg-white';
  const border = darkMode ? 'border-gray-700' : 'border-gray-200';
  const textMuted = darkMode ? 'text-gray-400' : 'text-gray-600';
  const codeBg = darkMode ? 'bg-gray-900/80' : 'bg-gray-100';
  const buttonHover = darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-200';

  const handleCopy = () => {
    navigator.clipboard.writeText(JSON.stringify(request, null, 2));
  };

  return (
    <div className={`h-full flex flex-col ${cardBg} rounded-xl shadow-xl border ${border}`}>
      {/* Header */}
      <div className={`px-6 py-5 border-b ${border} flex justify-between items-start`}>
        <div>
          <div className="flex items-center gap-4 mb-3">
            <span className={`px-4 py-2 rounded-lg text-sm font-bold uppercase tracking-wider ${darkMode ? 'bg-green-900/50 text-green-300' : 'bg-green-100 text-green-800'}`}>
              {request.method}
            </span>
            <code className={`text-lg font-mono ${darkMode ? 'text-gray-200' : 'text-gray-800'}`}>
              {request.url}
            </code>
          </div>

          <div className="flex flex-wrap items-center gap-6 text-sm">
            <div className={`flex items-center gap-2 ${textMuted}`}>
              <User className="h-4 w-4" />
              <span>{request.ip}</span>
            </div>
            <div className={`flex items-center gap-2 ${textMuted}`}>
              <Clock className="h-4 w-4" />
              <span>{new Date(request.timestamp).toLocaleString()}</span>
            </div>
            <div className={`flex items-center gap-2 ${textMuted}`}>
              <Terminal className="h-4 w-4" />
              <span className="font-medium">{request.time}ms</span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handleCopy}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${darkMode ? 'bg-gray-700 hover:bg-gray-600 text-gray-200' : 'bg-gray-200 hover:bg-gray-300 text-gray-700'}`}
          >
            <Copy className="h-4 w-4" />
            Copy JSON
          </button>

          {onDelete && (
            <button
              onClick={() => onDelete(request.id)}
              className="p-2.5 rounded-lg bg-red-900/30 hover:bg-red-900/50 text-red-300 transition-colors"
            >
              <Trash2 className="h-5 w-5" />
            </button>
          )}

          <button
            onClick={onClose}
            className={`p-2.5 rounded-lg ${buttonHover} transition-colors`}
          >
            <XCircle className="h-6 w-6" />
          </button>
        </div>
      </div>

      {/* Main Content - Two Columns */}
      <div className="flex-1 overflow-y-auto p-6">
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
          {/* Headers Panel */}
          <div className="flex flex-col">
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <Terminal className="h-5 w-5" />
              Request Headers
            </h3>
            <pre className={`flex-1 ${codeBg} text-sm text-green-400 p-5 rounded-xl overflow-auto border ${darkMode ? 'border-gray-700' : 'border-gray-300'} font-mono`}>
              {JSON.stringify(request.headers, null, 2)}
            </pre>
          </div>

          {/* Body Panel */}
          <div className="flex flex-col">
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <div className="h-5 w-5 rounded bg-purple-500/20 flex items-center justify-center text-purple-400 font-bold text-xs">
                {}
              </div>
              Request Body
            </h3>
            <pre className={`flex-1 ${codeBg} text-sm text-green-400 p-5 rounded-xl overflow-auto border ${darkMode ? 'border-gray-700' : 'border-gray-300'} font-mono`}>
              {typeof request.body === 'object' && request.body !== null
                ? JSON.stringify(request.body, null, 2)
                : request.body || '<empty>'}
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
}