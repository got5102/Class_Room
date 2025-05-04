import React from 'react';
import { Link } from 'react-router-dom';
import { Home } from 'lucide-react';

const NotFoundPage = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-gray-50 dark:bg-gray-900">
      <div className="text-center">
        <h1 className="text-9xl font-bold text-blue-600 dark:text-blue-400">404</h1>
        <h2 className="text-3xl font-semibold text-gray-900 dark:text-white mt-4">Page Not Found</h2>
        <p className="text-gray-600 dark:text-gray-400 mt-2 max-w-md">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <Link
          to="/"
          className="inline-flex items-center px-4 py-2 mt-6 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
        >
          <Home size={18} className="mr-2" /> Go Home
        </Link>
      </div>
    </div>
  );
};

export default NotFoundPage;