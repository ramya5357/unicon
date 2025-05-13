import React from 'react';
import { Link } from 'react-router-dom';
import { Home } from 'lucide-react';

const PageNotFound: React.FC = () => {
  return (
    <div className="flex h-full flex-col items-center justify-center py-16 text-center">
      <div className="rounded-full bg-error-50 p-6">
        <span className="text-4xl">404</span>
      </div>
      <h1 className="mt-6 text-3xl font-bold text-gray-900">Page Not Found</h1>
      <p className="mt-3 max-w-md text-gray-600">
        The page you are looking for doesn't exist or has been moved.
      </p>
      <Link
        to="/"
        className="mt-8 inline-flex items-center rounded-md bg-primary-500 px-4 py-2 text-sm font-medium text-white hover:bg-primary-600 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
      >
        <Home className="mr-2 h-4 w-4" />
        Back to Dashboard
      </Link>
    </div>
  );
};

export default PageNotFound;