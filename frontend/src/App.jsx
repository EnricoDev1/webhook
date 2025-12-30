import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import WebhookUrlBar from './components/WebhookUrlBar';
import RequestList from './components/RequestList';
import RequestDetails from './components/RequestDetails';
import { useWebhook } from './hooks/useWebhook';
import { useSocket } from './hooks/useSocket';

function App() {
  const [requests, setRequests] = useState([]);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [darkMode, setDarkMode] = useState(true);
  const { webhookUrl } = useWebhook();

  const bgClass = darkMode ? 'bg-gray-900' : 'bg-gray-50';
  const textClass = darkMode ? 'text-gray-100' : 'text-gray-900';

  useSocket();
  // change the page url to the correct one
  useEffect(() => {
    const hookId = localStorage.getItem('hookId');
    if (hookId) {
      const newUrl = `/v/${hookId}`;
      window.history.replaceState(null, '', newUrl);
    }
  }, []);

  return (
    <div className={`min-h-screen ${bgClass} ${textClass} transition-colors duration-200`}>
      <Header darkMode={darkMode} setDarkMode={setDarkMode} requestCount={requests.length} />
      <main className="max-w-7xl mx-auto px-4 py-6">
        <WebhookUrlBar webhookUrl={webhookUrl} darkMode={darkMode} />
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <div className="lg:col-span-1">
            <RequestList
              requests={requests}
              selectedRequest={selectedRequest}
              onSelect={setSelectedRequest}
              onClear={() => { setRequests([]); setSelectedRequest(null); }}
              onDelete={(id) => { /* da fare */ }}
              darkMode={darkMode}
            />
          </div>
          <div className="lg:col-span-3">
            <RequestDetails request={selectedRequest} darkMode={darkMode}/>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;