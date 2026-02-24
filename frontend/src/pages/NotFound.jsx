import { Link } from 'react-router-dom';
import Header from '../components/Header';

function NotFound() {
  return (
    <div className="min-h-screen bg-gray-900 text-gray-100">
      <div className="flex flex-col items-center justify-center h-[calc(100vh-64px)]">
        <h1 className="text-6xl font-bold text-red-500 mb-4">404</h1>
        <p className="text-xl text-gray-400 mb-8">Page not found</p>
        <Link
          to="/v/"
          className="px-6 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors"
        >
          Go Home
        </Link>
      </div>
    </div>
  );
}

export default NotFound;
