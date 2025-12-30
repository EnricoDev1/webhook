import React, { useState, useEffect, useCallback } from 'react';
import Header from './components/Header';
import WebhookUrlBar from './components/WebhookUrlBar';
import RequestList from './components/RequestList';
import RequestDetails from './components/RequestDetails';
import { useWebhook } from './hooks/useWebhook';
import { useSocket } from './hooks/useSocket';
import { useRequests } from './hooks/useRequests';

function App() {
  const [darkMode, setDarkMode] = useState(true);
  const { webhookUrl } = useWebhook();

  const {
    requests,
    selectedRequest,
    setSelectedRequest,
    remove,           // delete function
    addRequest        // to handle incoming socket requests
  } = useRequests();

  // Handle new incoming webhook via Socket.io
  const handleNewRequest = useCallback((newRequest) => {
    addRequest(newRequest);
    // Optional: auto-select the newest request
    // setSelectedRequest(newRequest);
  }, [addRequest]);

  // Connect socket and listen for new requests
  useSocket(handleNewRequest);

  // Update URL to /v/{hookId}
  useEffect(() => {
    const hookId = localStorage.getItem('hookId');
    if (hookId) {
      window.history.replaceState(null, '', `/v/${hookId}`);
    }
  }, []);

  const bgClass = darkMode ? 'bg-gray-900' : 'bg-gray-50';
  const textClass = darkMode ? 'text-gray-100' : 'text-gray-900';

  return (
    <div className={`min-h-screen ${bgClass} ${textClass} transition-colors duration-200`}>
      <Header darkMode={darkMode} setDarkMode={setDarkMode} requestCount={requests.length} />

      <main className="max-w-7xl mx-auto px-4 py-6">
        <WebhookUrlBar webhookUrl={webhookUrl} darkMode={darkMode} />

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Request List */}
          <div className="lg:col-span-1">
            <RequestList
              requests={requests}
              selectedRequest={selectedRequest}
              onSelect={setSelectedRequest}
              onDelete={remove}
              darkMode={darkMode}  // ← Pass boolean directly, NOT a string!
            />
          </div>

          {/* Request Details */}
          <div className="lg:col-span-3">
            <RequestDetails
              request={selectedRequest}
              onClose={() => setSelectedRequest(null)}
              darkMode={darkMode}
            />
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;