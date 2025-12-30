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
  const hoverBgClass = darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-50';
  const selectedBgClass = darkMode ? 'bg-blue-900/30' : 'bg-blue-50';
  const textMutedClass = darkMode ? 'text-gray-400' : 'text-gray-600';

  return (
    <div
      className={`p-3 cursor-pointer transition-colors ${hoverBgClass} ${
        isSelected ? selectedBgClass : ''
      }`}
      onClick={() => onSelect(request)}
    >
      <div className="flex justify-between items-start mb-2">
        <div className="flex items-center space-x-2">
          <span
            className={`px-1.5 py-0.5 rounded text-xs font-medium ${getMethodColor(
              request.method,
              darkMode
            )}`}
          >
            {request.method}
          </span>
          <span
            className={`px-1.5 py-0.5 rounded text-xs ${getStatusColor(
              request.statusCode,
              darkMode
            )}`}
          >
            {request.statusCode}
          </span>
        </div>
        <button
          onClick={(e) => {
            e.stopPropagation();
            onDelete(request.id);
          }}
          className={`p-1 rounded hover:bg-red-900/20 ${
            darkMode
              ? 'text-gray-400 hover:text-red-300'
              : 'text-gray-500 hover:text-red-500'
          }`}
          aria-label="Delete request"
        >
          <Trash2 className="h-3 w-3" />
        </button>
      </div>

      <div className="space-y-1.5 text-xs">
        <div className="flex items-center">
          <User className={`h-2.5 w-2.5 mr-1.5 ${textMutedClass}`} />
          <span className={`truncate ${textMutedClass}`}>{request.ip}</span>
        </div>

        <div className="flex items-center">
          <span className={`mr-1.5 ${textMutedClass}`}>Path:</span>
          <span className="font-mono truncate">{request.url}</span>
        </div>

        <div>
          <span className={`mr-1.5 ${textMutedClass}`}>Agent:</span>
          <span className="truncate block">
            {request.headers['User-Agent']}
          </span>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Clock className={`h-2.5 w-2.5 mr-1.5 ${textMutedClass}`} />
            <span className={textMutedClass}>
              {formatTimeAgo(request.timestamp)}
            </span>
          </div>
          <span
            className={`text-xs font-medium ${
              darkMode ? 'text-gray-400' : 'text-gray-500'
            }`}
          >
            {request.time}ms
          </span>
        </div>
      </div>
    </div>
  );
}