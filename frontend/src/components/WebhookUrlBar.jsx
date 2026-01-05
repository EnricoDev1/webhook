import { Globe, Copy } from 'lucide-react';
import SplashCopyButton from './SplashCopyButton';

export default function WebhookUrlBar({ webhookUrl, darkMode }) {
  return (
    <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow p-4 mb-6 border ${darkMode ? 'border-gray-700' : 'border-gray-200'} flex justify-between items-center`}>
      <div className="flex items-center">
        <Globe className={`h-4 w-4 mr-2 ${darkMode ? 'text-green-400' : 'text-green-500'}`} />
        <span className="font-medium">Your Webhook URL:</span>
        <a href={`${webhookUrl}`} target='_blank' className={`ml-2 px-3 py-1.5 bg-gray-900 text-green-400 rounded font-mono text-sm underline decoration`}>
          {webhookUrl || 'Loading...'}
        </a>
      </div>
        <SplashCopyButton text={"Copy URL"} darkMode={darkMode}/>
    </div>
  );
}