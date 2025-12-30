import { Activity } from 'lucide-react';
import ThemeToggle from './ThemeToggle';

export default function Header({ darkMode, setDarkMode, requestCount }) {
  const textMutedClass = darkMode ? 'text-gray-400' : 'text-gray-600';
  const cardBgClass = darkMode ? 'bg-gray-800' : 'bg-white';

  return (
    <header className={`${cardBgClass} shadow-lg border-b ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
      <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <div>
            <h1 className="text-2xl font-bold">Webhook Dashboard</h1>
            <p className={textMutedClass}>Monitor and debug webhook requests</p>
          </div>
          <div className={`flex items-center ${darkMode ? 'bg-gray-700' : 'bg-gray-100'} px-3 py-1.5 rounded-lg`}>
            <Activity className={`h-4 w-4 mr-2 ${darkMode ? 'text-green-400' : 'text-green-500'}`} />
            <span className="font-semibold">{requestCount}</span>
            <span className={`text-sm ml-1 ${textMutedClass}`}>requests</span>
          </div>
        </div>
        <ThemeToggle darkMode={darkMode} setDarkMode={setDarkMode} />
      </div>
    </header>
  );
}