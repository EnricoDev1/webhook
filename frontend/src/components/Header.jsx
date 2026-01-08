import { Activity, Edit3 } from 'lucide-react';
import ThemeToggle from './ThemeToggle';
import { useNavigate } from 'react-router-dom';

export default function Header({ 
  darkMode, 
  setDarkMode, 
  requestCount, 
  hookId 
}) {
  const navigate = useNavigate();

  const textMutedClass = darkMode ? 'text-gray-400' : 'text-gray-600';
  const cardBgClass = darkMode ? 'bg-gray-800' : 'bg-white';
  const buttonBgClass = darkMode ? 'bg-blue-600 hover:bg-blue-700' : 'bg-blue-500 hover:bg-blue-600';
  const buttonTextClass = 'text-white';

  const handleEdit = () => {
    if (hookId) {
      navigate(`/v/${hookId}/edit`);
    }
  };

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

        <div className="flex items-center space-x-3">
          {/* Edit Button */}
          <button
            onClick={handleEdit}
            disabled={!hookId}
            className={`
              flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-colors
              ${buttonBgClass} ${buttonTextClass}
              disabled:opacity-50 disabled:cursor-not-allowed
              focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
              ${darkMode ? 'focus:ring-offset-gray-800' : 'focus:ring-offset-white'}
            `}
            title="Edit webhook settings"
          >
            <Edit3 className="h-4 w-4" />
            <span className="hidden sm:inline">Edit</span>
          </button>

          {/* Theme Toggle */}
          <ThemeToggle darkMode={darkMode} setDarkMode={setDarkMode} />
        </div>
      </div>
    </header>
  );
}