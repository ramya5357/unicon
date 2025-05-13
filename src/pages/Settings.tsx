import React, { useState } from 'react';
import { User, Bell, Shield, CreditCard, Download, Upload, Monitor, Moon, Sun, DollarSign } from 'lucide-react';

type SettingsTab = 'profile' | 'notifications' | 'preferences' | 'security' | 'data';

const Settings: React.FC = () => {
  const [activeTab, setActiveTab] = useState<SettingsTab>('profile');
  const [theme, setTheme] = useState('light');
  const [currency, setCurrency] = useState('USD');
  
  const tabs = [
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'preferences', label: 'Preferences', icon: Monitor },
    { id: 'security', label: 'Security', icon: Shield },
    { id: 'data', label: 'Data & Export', icon: Download },
  ];
  
  const renderTabContent = () => {
    switch (activeTab) {
      case 'profile':
        return (
          <div className="animate-fade-in">
            <h2 className="text-xl font-semibold text-gray-900">Profile Settings</h2>
            <p className="mt-1 text-sm text-gray-600">
              Manage your personal information and account preferences
            </p>
            
            <div className="mt-6 space-y-6">
              <div className="flex flex-col gap-1 sm:flex-row sm:items-center">
                <div className="h-16 w-16 rounded-full bg-gray-200 flex items-center justify-center">
                  <span className="text-2xl font-semibold text-gray-600">JS</span>
                </div>
                <div className="mt-2 sm:ml-4 sm:mt-0">
                  <button className="btn btn-outline text-sm">Change Avatar</button>
                  <p className="mt-1 text-xs text-gray-500">
                    JPG, GIF or PNG. 1MB max.
                  </p>
                </div>
              </div>
              
              <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-2">
                <div>
                  <label htmlFor="firstName" className="mb-1 block text-sm font-medium text-gray-700">
                    First Name
                  </label>
                  <input
                    type="text"
                    id="firstName"
                    className="input w-full"
                    defaultValue="John"
                  />
                </div>
                <div>
                  <label htmlFor="lastName" className="mb-1 block text-sm font-medium text-gray-700">
                    Last Name
                  </label>
                  <input
                    type="text"
                    id="lastName"
                    className="input w-full"
                    defaultValue="Smith"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="mb-1 block text-sm font-medium text-gray-700">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    className="input w-full"
                    defaultValue="john.smith@example.com"
                  />
                </div>
                <div>
                  <label htmlFor="phone" className="mb-1 block text-sm font-medium text-gray-700">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    className="input w-full"
                    defaultValue="(555) 123-4567"
                  />
                </div>
              </div>
              
              <div className="pt-5">
                <div className="flex justify-end">
                  <button
                    type="button"
                    className="btn btn-outline mr-3"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="btn btn-primary"
                  >
                    Save Changes
                  </button>
                </div>
              </div>
            </div>
          </div>
        );
      
      case 'preferences':
        return (
          <div className="animate-fade-in">
            <h2 className="text-xl font-semibold text-gray-900">Preferences</h2>
            <p className="mt-1 text-sm text-gray-600">
              Customize your experience with SpendSmart
            </p>
            
            <div className="mt-6 space-y-6">
              <div>
                <h3 className="text-base font-medium text-gray-900">Display Settings</h3>
                <div className="mt-2 space-y-4">
                  <div>
                    <label className="mb-1 block text-sm font-medium text-gray-700">
                      Theme
                    </label>
                    <div className="flex space-x-3 mt-2">
                      <button
                        className={`flex items-center justify-center h-10 w-10 rounded-md border ${
                          theme === 'light' 
                            ? 'border-primary-500 bg-primary-50' 
                            : 'border-gray-300 bg-white'
                        }`}
                        onClick={() => setTheme('light')}
                      >
                        <Sun className={`h-5 w-5 ${theme === 'light' ? 'text-primary-600' : 'text-gray-500'}`} />
                      </button>
                      <button
                        className={`flex items-center justify-center h-10 w-10 rounded-md border ${
                          theme === 'dark' 
                            ? 'border-primary-500 bg-primary-50' 
                            : 'border-gray-300 bg-white'
                        }`}
                        onClick={() => setTheme('dark')}
                      >
                        <Moon className={`h-5 w-5 ${theme === 'dark' ? 'text-primary-600' : 'text-gray-500'}`} />
                      </button>
                      <button
                        className={`flex items-center justify-center h-10 w-10 rounded-md border ${
                          theme === 'system' 
                            ? 'border-primary-500 bg-primary-50' 
                            : 'border-gray-300 bg-white'
                        }`}
                        onClick={() => setTheme('system')}
                      >
                        <Monitor className={`h-5 w-5 ${theme === 'system' ? 'text-primary-600' : 'text-gray-500'}`} />
                      </button>
                    </div>
                    <p className="mt-1 text-xs text-gray-500">
                      Choose between light, dark, or system theme
                    </p>
                  </div>
                  
                  <div>
                    <label className="mb-1 block text-sm font-medium text-gray-700">
                      Currency
                    </label>
                    <div className="relative w-full max-w-xs">
                      <select
                        className="select w-full"
                        value={currency}
                        onChange={(e) => setCurrency(e.target.value)}
                      >
                        <option value="USD">USD ($)</option>
                        <option value="EUR">EUR (€)</option>
                        <option value="GBP">GBP (£)</option>
                        <option value="JPY">JPY (¥)</option>
                        <option value="CAD">CAD ($)</option>
                        <option value="AUD">AUD ($)</option>
                      </select>
                      <DollarSign className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500 pointer-events-none" />
                    </div>
                  </div>
                  
                  <div>
                    <label className="mb-1 block text-sm font-medium text-gray-700">
                      Date Format
                    </label>
                    <div className="relative w-full max-w-xs">
                      <select
                        className="select w-full"
                        defaultValue="mm/dd/yyyy"
                      >
                        <option value="mm/dd/yyyy">MM/DD/YYYY</option>
                        <option value="dd/mm/yyyy">DD/MM/YYYY</option>
                        <option value="yyyy/mm/dd">YYYY/MM/DD</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="text-base font-medium text-gray-900">Budget Settings</h3>
                <div className="mt-2 space-y-4">
                  <div>
                    <label className="mb-1 block text-sm font-medium text-gray-700">
                      Budget Period Start
                    </label>
                    <div className="relative w-full max-w-xs">
                      <select
                        className="select w-full"
                        defaultValue="1"
                      >
                        <option value="1">1st of the month</option>
                        <option value="15">15th of the month</option>
                        <option value="custom">Custom date</option>
                      </select>
                    </div>
                  </div>
                  
                  <div className="flex items-center">
                    <input
                      id="weekStart"
                      type="checkbox"
                      className="h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                      defaultChecked
                    />
                    <label htmlFor="weekStart" className="ml-2 text-sm text-gray-700">
                      Start week on Monday
                    </label>
                  </div>
                </div>
              </div>
              
              <div className="pt-5">
                <div className="flex justify-end">
                  <button
                    type="button"
                    className="btn btn-outline mr-3"
                  >
                    Reset to Defaults
                  </button>
                  <button
                    type="submit"
                    className="btn btn-primary"
                  >
                    Save Changes
                  </button>
                </div>
              </div>
            </div>
          </div>
        );
      
      case 'notifications':
        return (
          <div className="animate-fade-in">
            <h2 className="text-xl font-semibold text-gray-900">Notification Settings</h2>
            <p className="mt-1 text-sm text-gray-600">
              Choose how and when you want to be notified
            </p>
            
            <div className="mt-6 space-y-6">
              <div>
                <h3 className="text-base font-medium text-gray-900">Email Notifications</h3>
                <div className="mt-4 space-y-4">
                  <div className="flex items-start">
                    <div className="flex h-5 items-center">
                      <input
                        id="email-budget"
                        type="checkbox"
                        className="h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                        defaultChecked
                      />
                    </div>
                    <div className="ml-3 text-sm">
                      <label htmlFor="email-budget" className="font-medium text-gray-700">
                        Budget Alerts
                      </label>
                      <p className="text-gray-500">Get notified when you're approaching or exceeding your budget</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="flex h-5 items-center">
                      <input
                        id="email-insights"
                        type="checkbox"
                        className="h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                        defaultChecked
                      />
                    </div>
                    <div className="ml-3 text-sm">
                      <label htmlFor="email-insights" className="font-medium text-gray-700">
                        AI Insights
                      </label>
                      <p className="text-gray-500">Receive weekly AI-powered insights about your spending patterns</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="flex h-5 items-center">
                      <input
                        id="email-summary"
                        type="checkbox"
                        className="h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                        defaultChecked
                      />
                    </div>
                    <div className="ml-3 text-sm">
                      <label htmlFor="email-summary" className="font-medium text-gray-700">
                        Monthly Summary
                      </label>
                      <p className="text-gray-500">Get a monthly report summarizing your expenses and savings</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="text-base font-medium text-gray-900">Push Notifications</h3>
                <div className="mt-4 space-y-4">
                  <div className="flex items-start">
                    <div className="flex h-5 items-center">
                      <input
                        id="push-transactions"
                        type="checkbox"
                        className="h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                        defaultChecked
                      />
                    </div>
                    <div className="ml-3 text-sm">
                      <label htmlFor="push-transactions" className="font-medium text-gray-700">
                        New Transactions
                      </label>
                      <p className="text-gray-500">Be notified when new transactions are detected</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="flex h-5 items-center">
                      <input
                        id="push-anomalies"
                        type="checkbox"
                        className="h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                        defaultChecked
                      />
                    </div>
                    <div className="ml-3 text-sm">
                      <label htmlFor="push-anomalies" className="font-medium text-gray-700">
                        Spending Anomalies
                      </label>
                      <p className="text-gray-500">Get alerts when unusual spending patterns are detected</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="pt-5">
                <div className="flex justify-end">
                  <button
                    type="button"
                    className="btn btn-outline mr-3"
                  >
                    Disable All
                  </button>
                  <button
                    type="submit"
                    className="btn btn-primary"
                  >
                    Save Changes
                  </button>
                </div>
              </div>
            </div>
          </div>
        );
      
      case 'security':
        return (
          <div className="animate-fade-in">
            <h2 className="text-xl font-semibold text-gray-900">Security Settings</h2>
            <p className="mt-1 text-sm text-gray-600">
              Manage your account security and authentication methods
            </p>
            
            <div className="mt-6 space-y-6">
              <div>
                <h3 className="text-base font-medium text-gray-900">Change Password</h3>
                <div className="mt-4 space-y-4">
                  <div>
                    <label htmlFor="current-password" className="mb-1 block text-sm font-medium text-gray-700">
                      Current Password
                    </label>
                    <input
                      type="password"
                      id="current-password"
                      className="input w-full"
                    />
                  </div>
                  <div>
                    <label htmlFor="new-password" className="mb-1 block text-sm font-medium text-gray-700">
                      New Password
                    </label>
                    <input
                      type="password"
                      id="new-password"
                      className="input w-full"
                    />
                  </div>
                  <div>
                    <label htmlFor="confirm-password" className="mb-1 block text-sm font-medium text-gray-700">
                      Confirm New Password
                    </label>
                    <input
                      type="password"
                      id="confirm-password"
                      className="input w-full"
                    />
                  </div>
                  <button
                    type="button"
                    className="btn btn-primary"
                  >
                    Update Password
                  </button>
                </div>
              </div>
              
              <div>
                <h3 className="text-base font-medium text-gray-900">Two-Factor Authentication</h3>
                <div className="mt-4">
                  <div className="flex items-start">
                    <div className="flex h-5 items-center">
                      <input
                        id="enable-2fa"
                        type="checkbox"
                        className="h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                      />
                    </div>
                    <div className="ml-3 text-sm">
                      <label htmlFor="enable-2fa" className="font-medium text-gray-700">
                        Enable Two-Factor Authentication
                      </label>
                      <p className="text-gray-500">
                        Add an extra layer of security to your account by requiring a verification code in addition to your password
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="text-base font-medium text-gray-900">Session Management</h3>
                <p className="mt-1 text-sm text-gray-600">
                  Manage your active sessions and sign out from other devices
                </p>
                <div className="mt-4">
                  <div className="rounded-md border border-gray-200">
                    <div className="px-4 py-3 flex items-center justify-between">
                      <div className="flex items-center">
                        <Monitor className="h-5 w-5 text-gray-500 mr-2" />
                        <div>
                          <div className="text-sm font-medium text-gray-900">Current Session</div>
                          <div className="text-xs text-gray-500">Last active: Just now</div>
                        </div>
                      </div>
                      <span className="inline-flex items-center rounded-full bg-primary-100 px-2.5 py-0.5 text-xs font-medium text-primary-800">
                        Active
                      </span>
                    </div>
                  </div>
                  <div className="mt-4">
                    <button
                      type="button"
                      className="btn btn-outline text-error-600 hover:bg-error-50"
                    >
                      Sign Out From All Other Devices
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      
      case 'data':
        return (
          <div className="animate-fade-in">
            <h2 className="text-xl font-semibold text-gray-900">Data Management</h2>
            <p className="mt-1 text-sm text-gray-600">
              Import, export, and manage your expense data
            </p>
            
            <div className="mt-6 space-y-6">
              <div>
                <h3 className="text-base font-medium text-gray-900">Export Data</h3>
                <p className="mt-1 text-sm text-gray-600">
                  Download your expense data in different formats
                </p>
                <div className="mt-4 flex flex-col sm:flex-row gap-3">
                  <button
                    type="button"
                    className="btn btn-outline flex items-center gap-2"
                  >
                    <Download className="h-4 w-4" />
                    <span>Export as CSV</span>
                  </button>
                  <button
                    type="button"
                    className="btn btn-outline flex items-center gap-2"
                  >
                    <Download className="h-4 w-4" />
                    <span>Export as PDF</span>
                  </button>
                  <button
                    type="button"
                    className="btn btn-outline flex items-center gap-2"
                  >
                    <Download className="h-4 w-4" />
                    <span>Export as JSON</span>
                  </button>
                </div>
              </div>
              
              <div>
                <h3 className="text-base font-medium text-gray-900">Import Data</h3>
                <p className="mt-1 text-sm text-gray-600">
                  Import your expense data from other services
                </p>
                <div className="mt-4">
                  <label 
                    htmlFor="file-upload"
                    className="btn btn-outline flex items-center gap-2 cursor-pointer"
                  >
                    <Upload className="h-4 w-4" />
                    <span>Upload CSV or JSON</span>
                  </label>
                  <input
                    id="file-upload"
                    type="file"
                    className="hidden"
                  />
                  <p className="mt-2 text-xs text-gray-500">
                    Supported formats: CSV, JSON. Maximum file size: 10MB.
                  </p>
                </div>
              </div>
              
              <div className="border-t border-gray-200 pt-6">
                <h3 className="text-base font-medium text-error-600">Danger Zone</h3>
                <p className="mt-1 text-sm text-gray-600">
                  Permanent actions that cannot be undone
                </p>
                <div className="mt-4 space-y-3">
                  <button
                    type="button"
                    className="btn btn-outline text-error-600 hover:bg-error-50"
                  >
                    Delete All Expenses
                  </button>
                  <button
                    type="button"
                    className="btn btn-outline text-error-600 hover:bg-error-50"
                  >
                    Delete Account
                  </button>
                </div>
              </div>
            </div>
          </div>
        );
      
      default:
        return null;
    }
  };
  
  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="font-bold text-gray-900">Settings</h1>
        <p className="text-sm text-gray-600">Manage your account settings and preferences</p>
      </div>
      
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Sidebar */}
        <div className="lg:w-64">
          <nav className="space-y-1">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as SettingsTab)}
                className={`flex w-full items-center rounded-md px-3 py-2 text-sm font-medium transition-colors ${
                  activeTab === tab.id
                    ? 'bg-primary-50 text-primary-700'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <tab.icon className={`mr-3 h-5 w-5 ${
                  activeTab === tab.id ? 'text-primary-500' : 'text-gray-400'
                }`} />
                <span>{tab.label}</span>
              </button>
            ))}
          </nav>
        </div>
        
        {/* Content */}
        <div className="flex-1">
          <div className="rounded-lg bg-white p-6 shadow-sm">
            {renderTabContent()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;