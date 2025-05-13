import React, { ReactNode } from 'react';
import { Search, Bell, User } from 'lucide-react';
import { Link } from 'react-router-dom';

interface HeaderProps {
  children?: ReactNode;
}

const Header: React.FC<HeaderProps> = ({ children }) => {
  return (
    <header className="sticky top-0 z-10 flex h-16 items-center justify-between bg-white px-4 shadow-sm">
      <div className="flex items-center gap-2">
        {children}
        <div className="relative hidden sm:block">
          <input
            type="text"
            placeholder="Search expenses..."
            className="w-64 rounded-md border border-gray-300 py-1.5 pl-8 pr-3 text-sm focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500"
          />
          <Search className="absolute left-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
        </div>
      </div>
      
      <div className="flex items-center space-x-3">
        <Link
          to="/auth"
          className="btn btn-primary text-sm"
        >
          Register Account
        </Link>
        
        <button className="relative rounded-full p-1 hover:bg-gray-100">
          <Bell className="h-5 w-5 text-gray-600" />
          <span className="absolute -right-0.5 -top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-accent-500 text-xs font-bold text-white">
            3
          </span>
        </button>
        
        <div className="relative">
          <button className="flex h-9 w-9 items-center justify-center rounded-full bg-primary-100 text-primary-700 hover:bg-primary-200">
            <User className="h-5 w-5" />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;