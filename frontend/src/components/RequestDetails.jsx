// src/components/RequestDetails/RequestDetails.jsx
import { useState } from 'react';
import { Trash2, XCircle, Clock, User, Globe, Terminal } from 'lucide-react';
import SplashCopyButton from './SplashCopyButton';
import HeadersPanel from './HeadersPanel'; 
import BodyPanel from './BodyPanel'; 
import QueryParamsPanel from './QueryParams';

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

  return (
    <div className={`h-full flex flex-col ${cardBg} rounded-xl shadow-xl border ${border}`}>
      <div className={`px-6 py-5 border-b ${border} flex justify-between items-start`}>
        <div>
          <div className="flex items-center gap-4 mb-3">
            <span className={`px-4 py-2 rounded-lg text-sm font-bold uppercase tracking-wider ${darkMode ? 'bg-green-900/50 text-green-300' : 'bg-green-100 text-green-800'}`}>
              {request.request.method}
            </span>
            <code className={`text-lg font-mono ${darkMode ? 'text-gray-200' : 'text-gray-800'}`}>
              {request.request.path}
            </code>
          </div>

          <div className="flex flex-wrap items-center gap-6 text-sm">
            <div className={`flex items-center gap-2 ${textMuted}`}>
              <User className="h-4 w-4" />
              <span>{request.client.ip}</span>
            </div>
            <div className={`flex items-center gap-2 ${textMuted}`}>
              <Clock className="h-4 w-4" />
              <span>{new Date(request.timestamp).toLocaleString()}</span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <SplashCopyButton 
          text={"Copy JSON"}
          dataToCopy={JSON.stringify(request.request)}
          darkMode={darkMode}
          />

          <button
            onClick={onClose}
            className={`p-2.5 rounded-lg ${buttonHover} transition-colors`}
          >
            <XCircle className="h-6 w-6" />
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-6">
        <div className="grid grid-cols-1 gap-8">
          
          <div>
            <HeadersPanel
              headers={request.request.headers}
              darkMode={darkMode}
              codeBg={codeBg}
            />
          </div>

          <div className="space-y-3">
            <h3 className={`text-sm font-bold uppercase tracking-widest ${textMuted}`}>
              Request Body
            </h3>
            <BodyPanel
              body={request.request.body}
              darkMode={darkMode}
              codeBg={codeBg}
            />
          </div>

          <div className="space-y-3">
            <h3 className={`text-sm font-bold uppercase tracking-widest ${textMuted}`}>
              Query Parameters
            </h3>
            <QueryParamsPanel
              queryParams={request.request.query}
              darkMode={darkMode}
              codeBg={codeBg}
            />
          </div>
          
        </div>
      </div>
    </div>
  );
}