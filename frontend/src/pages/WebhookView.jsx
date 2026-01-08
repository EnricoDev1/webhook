import React, { useState, useCallback, useEffect } from 'react';
import Header from '../components/Header';
import WebhookUrlBar from '../components/WebhookUrlBar';
import RequestList from '../components/RequestList';
import RequestDetails from '../components/RequestDetails';
import { useWebhook } from '../hooks/useWebhook';
import { useSocket } from '../hooks/useSocket';
import { useRequests } from '../hooks/useRequests';
import { useParams, useNavigate } from 'react-router-dom';

function WebhookView() {
  const [darkMode, setDarkMode] = useState(true);
  const { hookId, webhookUrl } = useWebhook();
  const navigate = useNavigate();

  const {
    requests,
    selectedRequest,
    setSelectedRequest,
    addRequest,
    remove,
    deleteAllRequests
  } = useRequests();

  const handleNewRequest = useCallback((newRequest) => {
    addRequest(newRequest);
    setSelectedRequest(newRequest);
  }, [addRequest]);

  useSocket(handleNewRequest);

  const bgClass = darkMode ? 'bg-gray-900' : 'bg-gray-50';
  const textClass = darkMode ? 'text-gray-100' : 'text-gray-900';
  const {urlUuid} = useParams(); 

  useEffect(() => {
  if (!urlUuid || urlUuid != hookId) {
    navigate(`/v/${hookId}`);
  }
  }, [urlUuid, hookId, navigate]); 

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
              onDelete={remove}
              darkMode={darkMode}
              onDeleteAll={deleteAllRequests}
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

export default WebhookView;