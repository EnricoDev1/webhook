export default function QueryParamsPanel({ queryParams, darkMode, codeBg }) {
  
  return (
    <div className={`flex-1 ${codeBg} p-5 rounded-xl overflow-auto border ${darkMode ? 'border-gray-700' : 'border-gray-300'}`}>
        {Object.keys(queryParams).length > 0 ? (
          <table className="w-full text-sm">
            <thead>
              <tr className={`border-b ${darkMode ? 'border-gray-700' : 'border-gray-300'}`}>
                <th className="text-left py-2 pr-4 font-semibold text-yellow-400 w-48">Parameter</th>
                <th className="text-left py-2 font-semibold text-yellow-400">Value</th>
              </tr>
            </thead>
            <tbody>
              {Object.entries(queryParams).map(([key, value]) => (
                <tr key={key} className={`border-b ${darkMode ? 'border-gray-800' : 'border-gray-200'} hover:bg-opacity-50 ${darkMode ? 'hover:bg-gray-800' : 'hover:bg-gray-100'}`}>
                  <td className="py-2 pr-4 font-mono text-green-400 font-semibold w-48">{key}</td>
                  <td className="py-2 font-mono text-gray-300 break-all">{value}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div className="text-gray-500 italic text-sm">No query parameters</div>
        )}
      </div>
  )
};

