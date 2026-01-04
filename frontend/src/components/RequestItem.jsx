// src/components/RequestList/RequestItem.jsx
import React from 'react';
import { Trash2, User, Clock } from 'lucide-react';
import { getMethodColor, getStatusColor } from '../utils/colors';
import { formatTimeAgo } from '../utils/formatters';

export default function RequestItem({
  request,
  isSelected,
  onSelect,
  onDelete,
  darkMode,
}) {
  const baseClasses = `
    block p-4 rounded-lg cursor-pointer transition-all duration-200
    border
  `;

  const hoverClasses = darkMode 
    ? 'hover:bg-gray-700 hover:border-gray-600' 
    : 'hover:bg-gray-50 hover:border-gray-300';

  const selectedClasses = darkMode
    ? 'bg-blue-900/50 border-blue-600 ring-2 ring-blue-500/50'
    : 'bg-blue-50 border-blue-400 ring-2 ring-blue-300/50';

  const textMuted = darkMode ? 'text-gray-400' : 'text-gray-600';
  console.log(request);
  return (
    <div
      className={`${baseClasses} ${isSelected ? selectedClasses : 'border-transparent'} ${hoverClasses}`}
      onClick={() => onSelect(request)}
    >
      {/* Top row: Method, Status, Delete */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-3">
          <span className={`px-3 py-1 rounded-md text-xs font-bold uppercase tracking-wider ${getMethodColor(request.method, darkMode)}`}>
            {request.method}
          </span>
          <span className={`px-2.5 py-1 rounded text-xs font-medium ${getStatusColor(request.statusCode, darkMode)}`}>
            {request.statusCode}
          </span>
        </div>

        <button
          onClick={(e) => {
            e.stopPropagation();
            onDelete(request.id);
          }}
          className={`
            p-2 rounded-lg transition-all opacity-60 hover:opacity-100
            ${darkMode 
              ? 'hover:bg-red-900/40 text-red-400' 
              : 'hover:bg-red-100 text-red-600'}
          `}
          aria-label="Delete request"
        >
          <Trash2 className="h-4 w-4" />
        </button>
      </div>

      {/* Details */}
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <User className={`h-4 w-4 ${textMuted}`} />
          <span className={`text-sm ${textMuted}`}>{request.ip}</span>
        </div>

        <div className="truncate">
          <span className={`text-xs ${textMuted} mr-2`}>Path:</span>
          <code className="text-sm font-mono bg-black/10 dark:bg-white/10 px-2 py-0.5 rounded">
            {request.url}
          </code>
        </div>

        <div className="flex items-center justify-between text-xs">
          <div className="flex items-center gap-2">
            <Clock className={`h-3.5 w-3.5 ${textMuted}`} />
            <span className={textMuted}>{formatTimeAgo(request.timestamp)}</span>
          </div>
          <span className={`font-semibold ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
            {request.time}ms
          </span>
        </div>
      </div>
    </div>
  );
}