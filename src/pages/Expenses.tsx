import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { formatCurrency, formatDate } from '../utils/formatters';
import { PlusCircle, Filter, Download, ChevronDown, Search, Edit2, Trash } from 'lucide-react';

const Expenses: React.FC = () => {
  const { expenses, categories, deleteExpense, isLoading } = useApp();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [sortBy, setSortBy] = useState<string>('date-desc');
  
  if (isLoading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <div className="text-center">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary-500 border-t-transparent mx-auto"></div>
          <p className="mt-2 text-sm text-gray-600">Loading your expenses...</p>
        </div>
      </div>
    );
  }
  
  // Filter expenses based on search and category
  const filteredExpenses = expenses.filter(expense => {
    const matchesSearch = searchTerm === '' || expense.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === '' || expense.categoryId === selectedCategory;
    return matchesSearch && matchesCategory;
  });
  
  // Sort expenses
  const sortedExpenses = [...filteredExpenses].sort((a, b) => {
    switch (sortBy) {
      case 'amount-asc':
        return a.amount - b.amount;
      case 'amount-desc':
        return b.amount - a.amount;
      case 'date-asc':
        return new Date(a.date).getTime() - new Date(b.date).getTime();
      case 'date-desc':
      default:
        return new Date(b.date).getTime() - new Date(a.date).getTime();
    }
  });
  
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="font-bold text-gray-900">Expenses</h1>
          <p className="text-sm text-gray-600">Manage and track all your expenses</p>
        </div>
        <div className="mt-4 sm:mt-0">
          <Link 
            to="/expenses/add" 
            className="btn btn-primary flex items-center gap-2"
          >
            <PlusCircle className="h-4 w-4" />
            <span>Add Expense</span>
          </Link>
        </div>
      </div>
      
      {/* Filters and search */}
      <div className="rounded-lg border border-gray-200 bg-white p-4">
        <div className="flex flex-col space-y-3 sm:flex-row sm:items-center sm:justify-between sm:space-y-0">
          <div className="flex flex-1 items-center space-x-3">
            <div className="relative flex-1">
              <input
                type="text"
                placeholder="Search expenses..."
                className="w-full rounded-md border border-gray-300 py-2 pl-9 pr-3 text-sm focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
            </div>
            
            <div className="relative">
              <select
                className="h-9 rounded-md border border-gray-300 pl-3 pr-8 text-sm focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                <option value="">All Categories</option>
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
              <ChevronDown className="absolute right-2 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500 pointer-events-none" />
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <div className="relative">
              <select
                className="h-9 rounded-md border border-gray-300 pl-3 pr-8 text-sm focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
              >
                <option value="date-desc">Newest First</option>
                <option value="date-asc">Oldest First</option>
                <option value="amount-desc">Highest Amount</option>
                <option value="amount-asc">Lowest Amount</option>
              </select>
              <ChevronDown className="absolute right-2 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500 pointer-events-none" />
            </div>
            
            <button className="btn btn-outline flex items-center gap-1 px-3">
              <Filter className="h-4 w-4" />
              <span className="hidden sm:inline">Filter</span>
            </button>
            
            <button className="btn btn-outline flex items-center gap-1 px-3">
              <Download className="h-4 w-4" />
              <span className="hidden sm:inline">Export</span>
            </button>
          </div>
        </div>
      </div>
      
      {/* Expenses table */}
      <div className="overflow-hidden rounded-lg border border-gray-200 bg-white">
        <div className="overflow-x-auto">
          <table className="w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                  Description
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                  Category
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                  Date
                </th>
                <th scope="col" className="px-6 py-3 text-right text-xs font-medium uppercase tracking-wider text-gray-500">
                  Amount
                </th>
                <th scope="col" className="px-6 py-3 text-right text-xs font-medium uppercase tracking-wider text-gray-500">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {sortedExpenses.length > 0 ? (
                sortedExpenses.map((expense) => {
                  const category = categories.find(c => c.id === expense.categoryId);
                  
                  return (
                    <tr key={expense.id} className="hover:bg-gray-50 transition-colors">
                      <td className="whitespace-nowrap px-6 py-4">
                        <div className="flex items-center">
                          <div 
                            className="flex h-8 w-8 items-center justify-center rounded-full"
                            style={{ backgroundColor: category?.color + '20' }}
                          >
                            <span className="text-sm" style={{ color: category?.color }}>
                              {category?.icon.charAt(0)}
                            </span>
                          </div>
                          <div className="ml-3">
                            <p className="text-sm font-medium text-gray-900">{expense.description}</p>
                            {expense.notes && (
                              <p className="text-xs text-gray-500">{expense.notes}</p>
                            )}
                          </div>
                        </div>
                      </td>
                      <td className="whitespace-nowrap px-6 py-4">
                        <span 
                          className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium"
                          style={{ 
                            backgroundColor: category?.color + '20',
                            color: category?.color 
                          }}
                        >
                          {category?.name}
                        </span>
                      </td>
                      <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-700">
                        {formatDate(expense.date, 'medium')}
                        {expense.isRecurring && (
                          <span className="ml-2 inline-flex items-center rounded-full bg-secondary-50 px-2 py-0.5 text-xs font-medium text-secondary-700">
                            Recurring
                          </span>
                        )}
                      </td>
                      <td className="whitespace-nowrap px-6 py-4 text-right text-sm font-medium text-gray-900">
                        {formatCurrency(expense.amount)}
                      </td>
                      <td className="whitespace-nowrap px-6 py-4 text-right text-sm">
                        <div className="flex items-center justify-end space-x-2">
                          <button 
                            className="rounded-full p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-500"
                            aria-label={`Edit ${expense.description}`}
                          >
                            <Edit2 className="h-4 w-4" />
                          </button>
                          <button 
                            className="rounded-full p-1 text-gray-400 hover:bg-error-50 hover:text-error-500"
                            onClick={() => deleteExpense(expense.id)}
                            aria-label={`Delete ${expense.description}`}
                          >
                            <Trash className="h-4 w-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan={5} className="px-6 py-4 text-center text-sm text-gray-500">
                    {searchTerm || selectedCategory ? (
                      <p>No expenses found matching your filters.</p>
                    ) : (
                      <div className="py-8">
                        <p className="mb-2 text-gray-600">No expenses recorded yet.</p>
                        <Link 
                          to="/expenses/add" 
                          className="text-primary-600 hover:text-primary-700"
                        >
                          Add your first expense
                        </Link>
                      </div>
                    )}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Expenses;