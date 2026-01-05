// src/components/RequestList/RequestList.jsx
import RequestItem from './RequestItem';

export default function RequestList({
  requests,
  selectedRequest,
  onSelect,
  onDelete,
  darkMode,
}) {
  const containerBg = darkMode ? 'bg-gray-800' : 'bg-white';
  const border = darkMode ? 'border-gray-700' : 'border-gray-200';
  const headerBg = darkMode ? 'bg-gray-750' : 'bg-gray-50';

  return (
    <div className={`h-full flex flex-col ${containerBg} rounded-xl shadow-lg border ${border}`}>
      {/* Header */}
      <div className={`px-5 py-4 border-b ${border} ${headerBg} rounded-t-xl`}>
        <h3 className="font-semibold text-lg">Recent Requests</h3>
        <p className={`text-sm mt-1 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
          {requests.length} {requests.length === 1 ? 'request' : 'requests'}
        </p>
      </div>

      {/* Scrollable List */}
      <div className="flex-1 overflow-y-auto">
        {requests.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-64 px-6 text-center">
            <div className="text-5xl mb-4 opacity-30">📭</div>
            <p className={`text-lg font-medium ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              No requests yet
            </p>
            <p className={`text-sm mt-2 ${darkMode ? 'text-gray-500' : 'text-gray-500'}`}>
              Send a request to your webhook URL to see it here
            </p>
          </div>
        ) : (
          <div className="p-3 space-y-2">
            {[...requests]
              .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
              .map((request) => (
                <RequestItem
                  key={request.id}
                  request={request}
                  isSelected={selectedRequest?.id === request.id}
                  onSelect={onSelect}
                  onDelete={onDelete}
                  darkMode={darkMode}
                />
              ))}
          </div>
        )}
      </div>
    </div>
  );
}