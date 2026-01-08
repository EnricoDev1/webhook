import React, { useState } from 'react';
import ErrorToast from '../components/ErrorToast';
import { useEdit } from '../hooks/useEdit';

function WebhookView() {
    const [darkMode] = useState(true);
    const [contentType, setContentType] = useState('text/html');
    const [responseBody, setResponseBody] = useState('<h1>Hello World!</h1>');
    const [statusCode, setStatusCode] = useState();
    const [errors, setErrors] = useState([]);

    const bgClass = darkMode ? 'bg-gray-900' : 'bg-gray-50';
    const textClass = darkMode ? 'text-gray-100' : 'text-gray-900';
    const cardBg = darkMode ? 'bg-gray-800' : 'bg-white';
    const borderClass = darkMode ? 'border-gray-700' : 'border-gray-200';

    const addError = (msg) => {
        const id = Date.now();
        setErrors(prev => [...prev, { id, message: msg }]);
    };

    const {
        content, 
        error,
        updateContent
    } = useEdit();

    return (
        <div className={`min-h-screen ${bgClass} ${textClass} transition-colors duration-200`}>
            {/* Error Toasts */}
            {errors.map(err => (
                <ErrorToast
                    key={err.id}
                    message={err.message}
                    onClose={() => setErrors(prev => prev.filter(e => e.id !== err.id))}
                />
            ))}

            <header className="border-b border-gray-700 px-6 py-4">
                <h1 className="text-2xl font-bold">Edit Webhook Response</h1>
                <p className="text-sm text-gray-500 mt-1">Configure the response your webhook will return</p>
            </header>

            <main className="max-w-7xl mx-auto px-4 py-8">
                {/* Configuration Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Status Code */}
                    <div className={`rounded-lg ${cardBg} border ${borderClass} p-6 shadow-md`}>
                        <h3 className="text-lg font-semibold mb-4">Status Code</h3>
                        <select
                            value={statusCode}
                            onChange={(e) => setStatusCode(e.target.value)}
                            className={`w-full px-4 py-3 rounded-md ${darkMode ? 'bg-gray-700 text-gray-100' : 'bg-gray-100 text-gray-900'} border ${borderClass} focus:outline-none focus:ring-2 focus:ring-blue-500`}
                        >
                            <option value="200">200 OK</option>
                            <option value="201">201 Created</option>
                            <option value="202">202 Accepted</option>
                            <option value="204">204 No Content</option>
                            <option value="301">301 Moved Permanently</option>
                            <option value="400">400 Bad Request</option>
                            <option value="401">401 Unauthorized</option>
                            <option value="403">403 Forbidden</option>
                            <option value="404">404 Not Found</option>
                            <option value="500">500 Internal Server Error</option>
                            <option value="502">502 Bad Gateway</option>
                            <option value="503">503 Service Unavailable</option>
                        </select>
                        <p className="text-sm text-gray-500 mt-3">
                            Current: <span className="font-mono font-semibold">{statusCode}</span>
                        </p>
                    </div>

                    {/* Content Type */}
                    <div className={`rounded-lg ${cardBg} border ${borderClass} p-6 shadow-md`}>
                        <h3 className="text-lg font-semibold mb-4">Content-Type</h3>
                        <input
                            type="text"
                            value={contentType}
                            onChange={(e) => setContentType(e.target.value)}
                            className={`w-full px-4 py-3 rounded-md ${darkMode ? 'bg-gray-700 text-gray-100' : 'bg-gray-100 text-gray-900'} border ${borderClass} focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono text-sm`}
                            placeholder="e.g., application/json"
                        />
                    </div>
                </div>

                {/* Response Body Editor */}
                <div className={`rounded-lg ${cardBg} border ${borderClass} p-6 mt-8 shadow-md`}>
                    <h3 className="text-lg font-semibold mb-4">Response Body</h3>
                    <textarea
                        value={responseBody}
                        onChange={(e) => setResponseBody(e.target.value)}
                        rows={16}
                        className={`w-full px-4 py-4 rounded-md font-mono text-sm ${darkMode ? 'bg-gray-900' : 'bg-gray-100'} border ${borderClass} focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none`}
                        placeholder="Enter your response body here..."
                    />
                    <div className="flex items-center justify-between mt-4">
                        <div className="text-sm text-gray-500">
                            Content-Type: <span className="font-mono">{contentType}</span>
                        </div>
                        <button className="px-5 py-2 bg-green-600 hover:bg-green-700 rounded-md text-white font-medium transition">
                            Save Configuration
                        </button>
                    </div>
                </div>
            </main>
        </div>
    );
}

export default WebhookView;