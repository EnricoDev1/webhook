import { Globe, Copy } from 'lucide-react';

export default function WebhookUrlBar({ webhookUrl, darkMode }) {
  const handleCopy = () => navigator.clipboard.writeText(webhookUrl);

  return (
    <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow p-4 mb-6 border ${darkMode ? 'border-gray-700' : 'border-gray-200'} flex justify-between items-center`}>
      <div className="flex items-center">
        <Globe className={`h-4 w-4 mr-2 ${darkMode ? 'text-green-400' : 'text-green-500'}`} />
        <span className="font-medium">Your Webhook URL:</span>
        <code className={`ml-2 px-3 py-1.5 bg-gray-900 text-green-400 rounded font-mono text-sm`}>
          {webhookUrl || 'Loading...'}
        </code>
      </div>
      <button onClick={handleCopy} className="flex items-center px-3 py-1.5 rounded text-sm bg-blue-600 hover:bg-blue-700 text-white transition-colors">
        <Copy className="h-3.5 w-3.5 mr-1.5" />
        Copy
      </button>
    </div>
  );
}