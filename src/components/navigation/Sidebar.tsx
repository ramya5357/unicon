import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Receipt, 
  PieChart, 
  Settings, 
  PlusCircle,
  LogOut,
  TrendingUp,
  Wallet
} from 'lucide-react';
import { format } from 'date-fns';

interface SidebarProps {
  closeSidebar: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ closeSidebar }) => {
  const currentDate = format(new Date(), 'MMMM d, yyyy');
  
  const navigation = [
    { name: 'Dashboard', path: '/', icon: LayoutDashboard },
    { name: 'Expenses', path: '/expenses', icon: Receipt },
    { name: 'Reports', path: '/reports', icon: PieChart },
    { name: 'Settings', path: '/settings', icon: Settings },
  ];

  return (
    <div className="flex h-full flex-col bg-white">
      <div className="flex items-center px-4 py-5">
        <div className="flex items-center justify-between w-full">
          <div className="flex items-center">
            <Wallet className="h-8 w-8 text-primary-500" />
            <span className="ml-2 text-xl font-semibold text-gray-900">SpendSmart</span>
          </div>
          <span className="text-xs font-medium text-gray-500">{currentDate}</span>
        </div>
      </div>
      
      <div className="mx-4 my-3">
        <NavLink
          to="/expenses/add"
          className="flex w-full items-center justify-center gap-2 rounded-md bg-primary-500 px-4 py-2.5 text-sm font-medium text-white hover:bg-primary-600 transition-colors"
          onClick={closeSidebar}
        >
          <PlusCircle className="h-4 w-4" />
          <span>Add Expense</span>
        </NavLink>
      </div>
      
      <div className="flex-1 overflow-y-auto py-2">
        <nav className="space-y-1 px-2">
          {navigation.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              className={({ isActive }) => 
                `flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors ${
                  isActive
                    ? 'bg-primary-50 text-primary-700'
                    : 'text-gray-700 hover:bg-gray-100'
                }`
              }
              onClick={closeSidebar}
            >
              <item.icon className="h-5 w-5" />
              <span>{item.name}</span>
            </NavLink>
          ))}
        </nav>
        
        <div className="mt-10 px-3">
          <div className="rounded-md bg-secondary-50 p-3">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-secondary-800">Monthly Overview</span>
              <TrendingUp className="h-4 w-4 text-secondary-600" />
            </div>
            <div className="mt-2">
              <div className="text-2xl font-bold text-secondary-900">$2,854.32</div>
              <div className="text-xs text-secondary-700">of $3,500 budget</div>
              <div className="mt-2 h-2 w-full rounded-full bg-secondary-200">
                <div className="h-2 rounded-full bg-secondary-600" style={{ width: '65%' }}></div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="border-t border-gray-200 p-4">
        <button className="flex w-full items-center justify-between rounded-md px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100">
          <div className="flex items-center">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-200">
              <span className="text-sm font-medium text-gray-600">JS</span>
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-900">John Smith</p>
              <p className="text-xs font-normal text-gray-500">View Profile</p>
            </div>
          </div>
          <LogOut className="h-4 w-4 text-gray-500" />
        </button>
      </div>
    </div>
  );
};

export default Sidebar;