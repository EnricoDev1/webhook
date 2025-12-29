import React, { useState, useEffect } from 'react';
import {
  Copy, Trash2, Eye, Clock, Globe, User,
  Sun, Moon, Activity, XCircle
} from 'lucide-react';
import { BASE_URL } from './config';

function App() {
  const [requests, setRequests] = useState([]);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [webhookUrl, setWebhookUrl] = useState('');
  const [darkMode, setDarkMode] = useState(true);

  const getHookId = async () => {
    try {
      const response = await fetch('http://localhost/api/hookId', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
      });
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      const data = await response.json();
      return data.id;
    } catch (error) {
      console.error('Error fetching webhook ID:', error);
    }
  };

  // Generate webhook URL using getHookId
  useEffect(() => {
    const generateWebhookUrl = async () => {
      if (!localStorage.getItem('hookId')) {
        const hookId = await getHookId();
        localStorage.setItem('hookId', hookId);
      }
      setWebhookUrl(`${BASE_URL}/${localStorage.getItem('hookId')}`);
    };
    generateWebhookUrl();
  }, []);

  // Fetch requests from a test URL
  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const token = localStorage.getItem('hookId');
        const response = await fetch('http://localhost/api/db/request', {
          method: 'GET', // o 'POST', 'DELETE' a seconda dell'endpoint
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
        });
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        const data = await response.json();
        const formattedRequests = data.slice(0, 20).map((item) => ({
          id: item.id,
          method: 'POST',
          url: `/api/webhook/${item.id}`,
          timestamp: new Date(),
          statusCode: 200,
          headers: {
            'Content-Type': 'application/json',
            'User-Agent': 'Test-Agent/1.0'
          },
          body: JSON.stringify(item, null, 2),
          ip: `192.168.1.${Math.floor(Math.random() * 255)}`,
          time: Math.floor(Math.random() * 1000),
        }));

        setRequests(formattedRequests);
      } catch (error) {
        console.error('Error fetching requests:', error);
      }
    };

    fetchRequests();
  }, []);

  const getMethodColor = (method) => {
    const darkColors = {
      GET: 'bg-blue-900/30 text-blue-300 border border-blue-800/50',
      POST: 'bg-green-900/30 text-green-300 border border-green-800/50',
      PUT: 'bg-yellow-900/30 text-yellow-300 border border-yellow-800/50',
      DELETE: 'bg-red-900/30 text-red-300 border border-red-800/50'
    };
    const lightColors = {
      GET: 'bg-blue-100 text-blue-800',
      POST: 'bg-green-100 text-green-800',
      PUT: 'bg-yellow-100 text-yellow-800',
      DELETE: 'bg-red-100 text-red-800'
    };
    return darkMode ? darkColors[method] || 'bg-gray-800 text-gray-300 border border-gray-700' : lightColors[method] || 'bg-gray-100 text-gray-800';
  };

  const getStatusColor = (code) => {
    if (darkMode) {
      if (code >= 200 && code < 300) return 'bg-green-900/40 text-green-300';
      if (code >= 400 && code < 500) return 'bg-yellow-900/40 text-yellow-300';
      return 'bg-red-900/40 text-red-300';
    } else {
      if (code >= 200 && code < 300) return 'bg-green-100 text-green-800';
      if (code >= 400 && code < 500) return 'bg-yellow-100 text-yellow-800';
      return 'bg-red-100 text-red-800';
    }
  };

  const bgClass = darkMode ? 'bg-gray-900' : 'bg-gray-50';
  const textClass = darkMode ? 'text-gray-100' : 'text-gray-900';
  const textMutedClass = darkMode ? 'text-gray-400' : 'text-gray-600';
  const cardBgClass = darkMode ? 'bg-gray-800' : 'bg-white';
  const borderClass = darkMode ? 'border-gray-700' : 'border-gray-200';
  const hoverBgClass = darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-50';
  const selectedBgClass = darkMode ? 'bg-blue-900/30' : 'bg-blue-50';
  const buttonPrimaryClass = 'bg-blue-600 hover:bg-blue-700 text-white';
  const buttonSecondaryClass = darkMode ? 'bg-gray-700 hover:bg-gray-600 text-gray-200' : 'bg-gray-100 hover:bg-gray-200 text-gray-700';
  const buttonDangerClass = darkMode ? 'bg-red-900/40 hover:bg-red-800/40 text-red-200' : 'bg-red-100 hover:bg-red-200 text-red-700';

  const handleCopy = () => {
    navigator.clipboard.writeText(webhookUrl);
  };

  const handleClear = () => {
    setRequests([]);
    setSelectedRequest(null);
  };

  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem('hookId');
      const response = await fetch(`http://localhost/api/db/request/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      // Rimuove la richiesta dallo stato
      setRequests(prev => prev.filter(req => req.id !== id));

      // Deseleziona se era selezionata
      if (selectedRequest?.id === id) setSelectedRequest(null);

    } catch (error) {
      console.error('Error deleting request:', error);
    }
  };


  const formatTimeAgo = (timestamp) => {
    const now = new Date();
    const diffSec = Math.floor((now - new Date(timestamp)) / 1000);
    if (diffSec < 60) return `${diffSec}s ago`;
    if (diffSec < 3600) return `${Math.floor(diffSec / 60)}m ago`;
    return `${Math.floor(diffSec / 3600)}h ago`;
  };

  return (
    <div className={`min-h-screen ${bgClass} ${textClass} transition-colors duration-200`}>
      <header className={`${cardBgClass} shadow-lg ${borderClass} border-b`}>
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <div>
              <h1 className="text-2xl font-bold">Webhook Dashboard</h1>
              <p className={textMutedClass}>Monitor and debug webhook requests</p>
            </div>
            <div className={`flex items-center ${darkMode ? 'bg-gray-700' : 'bg-gray-100'} px-3 py-1.5 rounded-lg`}>
              <Activity className={`h-4 w-4 mr-2 ${darkMode ? 'text-green-400' : 'text-green-500'}`} />
              <span className="font-semibold">{requests.length}</span>
              <span className={`text-sm ml-1 ${textMutedClass}`}>requests</span>
            </div>
          </div>
          <button
            onClick={() => setDarkMode(!darkMode)}
            className={`p-2 rounded-lg ${buttonSecondaryClass} transition-colors`}
            aria-label="Toggle dark mode"
          >
            {darkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-6">
        <div className={`${cardBgClass} rounded-lg shadow p-4 mb-6 ${borderClass} border flex justify-between items-center`}>
          <div className="flex items-center">
            <Globe className={`h-4 w-4 mr-2 ${darkMode ? 'text-green-400' : 'text-green-500'}`} />
            <span className="font-medium">Your Webhook URL:</span>
            <code className={`ml-2 px-3 py-1.5 ${darkMode ? 'bg-gray-900' : 'bg-gray-900'} text-green-400 rounded font-mono text-sm`}>
              {webhookUrl}
            </code>
          </div>
          <button onClick={handleCopy} className={`flex items-center px-3 py-1.5 rounded text-sm transition-colors ${buttonPrimaryClass}`}>
            <Copy className="h-3.5 w-3.5 mr-1.5" />
            Copy
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <div className="lg:col-span-1">
            <div className={`${cardBgClass} rounded-lg shadow ${borderClass} border h-full flex flex-col`}>
              <div className={`px-4 py-3 border-b ${borderClass} flex justify-between items-center`}>
                <h3 className="font-semibold text-sm">Requests</h3>
                <button
                  onClick={handleClear}
                  disabled={requests.length === 0}
                  className={`flex items-center px-2 py-1 rounded text-xs transition-colors ${buttonDangerClass} disabled:opacity-50 disabled:cursor-not-allowed`}
                >
                  <Trash2 className="h-3 w-3 mr-1" /> Clear All
                </button>
              </div>
              <div className="flex-1 overflow-y-auto max-h-[calc(100vh-250px)]">
                {requests.length === 0 ? (
                  <div className="text-center py-8 px-4">
                    <div className={`text-4xl mb-3 ${darkMode ? 'text-gray-700' : 'text-gray-300'}`}>📭</div>
                    <p className={`text-sm ${textMutedClass}`}>No requests yet</p>
                  </div>
                ) : (
                  <div className="divide-y" style={{ divideColor: darkMode ? '#374151' : '#e5e7eb' }}>
                    {requests.map((request) => (
                      <div
                        key={request.id}
                        className={`p-3 cursor-pointer transition-colors ${hoverBgClass} ${selectedRequest?.id === request.id ? selectedBgClass : ''}`}
                        onClick={() => setSelectedRequest(request)}
                      >
                        <div className="flex justify-between items-start mb-2">
                          <div className="flex items-center space-x-2">
                            <span className={`px-1.5 py-0.5 rounded text-xs font-medium ${getMethodColor(request.method)}`}>{request.method}</span>
                            <span className={`px-1.5 py-0.5 rounded text-xs ${getStatusColor(request.statusCode)}`}>{request.statusCode}</span>
                          </div>
                          <button
                            onClick={(e) => { e.stopPropagation(); handleDelete(request.id); }}
                            className={`p-1 rounded hover:bg-red-900/20 ${darkMode ? 'text-gray-400 hover:text-red-300' : 'text-gray-500 hover:text-red-500'}`}
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
                            <span className="truncate block">{request.headers['User-Agent']}</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center">
                              <Clock className={`h-2.5 w-2.5 mr-1.5 ${textMutedClass}`} />
                              <span className={textMutedClass}>{formatTimeAgo(request.timestamp)}</span>
                            </div>
                            <span className={`text-xs font-medium ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>{request.time}ms</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="lg:col-span-3">
            {selectedRequest ? (
              <div className={`${cardBgClass} rounded-lg shadow ${borderClass} border h-full flex flex-col`}>
                <div className={`px-6 py-4 border-b ${borderClass} flex justify-between items-center`}>
                  <div>
                    <h3 className="font-semibold text-lg">Request Details</h3>
                    <div className="flex items-center space-x-4 mt-1">
                      <span className={`px-2 py-1 rounded text-sm font-medium ${getMethodColor(selectedRequest.method)}`}>
                        {selectedRequest.method} {selectedRequest.url}
                      </span>
                      <div className={`text-sm ${textMutedClass} flex items-center`}>
                        <User className="h-3 w-3 mr-1" /> {selectedRequest.ip}
                      </div>
                      <div className={`text-sm ${textMutedClass} flex items-center`}>
                        <Clock className="h-3 w-3 mr-1" /> {new Date(selectedRequest.timestamp).toLocaleString()}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => navigator.clipboard.writeText(JSON.stringify(selectedRequest, null, 2))}
                      className={`flex items-center px-3 py-1.5 rounded text-sm transition-colors ${buttonSecondaryClass}`}
                    >
                      <Copy className="h-3.5 w-3.5 mr-1.5" /> Copy
                    </button>
                    <button
                      onClick={() => handleDelete(selectedRequest.id)}
                      className={`flex items-center px-3 py-1.5 rounded text-sm transition-colors ${buttonDangerClass}`}
                    >
                      <Trash2 className="h-3.5 w-3.5 mr-1.5" /> Delete
                    </button>
                    <button
                      onClick={() => setSelectedRequest(null)}
                      className={`p-1.5 ${darkMode ? 'text-gray-400 hover:text-gray-200' : 'text-gray-500 hover:text-gray-700'}`}
                    >
                      <XCircle className="h-5 w-5" />
                    </button>
                  </div>
                </div>

                <div className="flex-1 overflow-hidden p-6 grid grid-cols-2 gap-6">
                  <div className="h-full flex flex-col">
                    <p className={`text-sm ${textMutedClass} mb-2`}>Headers</p>
                    <pre className={`flex-1 ${darkMode ? 'bg-gray-900' : 'bg-gray-900'} text-green-400 p-4 rounded text-sm overflow-auto border ${darkMode ? 'border-gray-700' : 'border-transparent'}`}>
                      {JSON.stringify(selectedRequest.headers, null, 2)}
                    </pre>
                  </div>
                  <div className="h-full flex flex-col">
                    <p className={`text-sm ${textMutedClass} mb-2`}>Body</p>
                    <pre className={`flex-1 ${darkMode ? 'bg-gray-900' : 'bg-gray-900'} text-green-400 p-4 rounded text-sm overflow-auto border ${darkMode ? 'border-gray-700' : 'border-transparent'}`}>
                      {selectedRequest.body}
                    </pre>
                  </div>
                </div>
              </div>
            ) : (
              <div className={`${cardBgClass} rounded-lg shadow ${borderClass} border h-full flex flex-col items-center justify-center p-8`}>
                <Eye className={`h-16 w-16 ${darkMode ? 'text-gray-600' : 'text-gray-400'} mb-4`} />
                <h3 className="font-medium text-xl mb-2">Select a Request</h3>
                <p className={textMutedClass}>Click on any request in the list to view its full details</p>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
