export const getMethodColor = (method, darkMode) => {
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
  const colors = darkMode ? darkColors : lightColors;
  return colors[method] || (darkMode ? 'bg-gray-800 text-gray-300 border border-gray-700' : 'bg-gray-100 text-gray-800');
};

export const getStatusColor = (code, darkMode) => {
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