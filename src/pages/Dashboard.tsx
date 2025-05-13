import React from 'react';
import { useApp } from '../context/AppContext';
import { formatCurrency, formatDate, calculatePercentChange } from '../utils/formatters';
import { mockAiInsights, mockMonthlySpending, mockCategorySpending } from '../utils/mockData';
import { TrendingUp, TrendingDown, AlertCircle, Lightbulb, PiggyBank } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from 'recharts';

const Dashboard: React.FC = () => {
  const { expenses, categories, budgetRecommendations, isLoading, getMonthlyTotal } = useApp();
  
  const monthlyTotal = getMonthlyTotal();
  const previousMonthTotal = 2450; // Mock previous month data
  const percentChange = calculatePercentChange(monthlyTotal, previousMonthTotal);
  
  if (isLoading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <div className="text-center">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary-500 border-t-transparent mx-auto"></div>
          <p className="mt-2 text-sm text-gray-600">Loading your financial data...</p>
        </div>
      </div>
    );
  }
  
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="font-bold text-gray-900">Financial Dashboard</h1>
          <p className="text-sm text-gray-600">Track, analyze and optimize your spending</p>
        </div>
        <div className="mt-4 md:mt-0">
          <button className="btn btn-primary">Download Report</button>
        </div>
      </div>
      
      {/* Stats cards */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        <div className="card p-5 animate-slide-up" style={{ animationDelay: '0ms' }}>
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-medium text-gray-500">Monthly Spending</h3>
            <span className={`flex items-center text-xs font-medium ${percentChange >= 0 ? 'text-error-600' : 'text-success-600'}`}>
              {percentChange >= 0 ? (
                <TrendingUp className="mr-1 h-3 w-3" />
              ) : (
                <TrendingDown className="mr-1 h-3 w-3" />
              )}
              {Math.abs(percentChange).toFixed(1)}%
            </span>
          </div>
          <div className="mt-2">
            <span className="text-2xl font-bold text-gray-900">{formatCurrency(monthlyTotal)}</span>
            <div className="mt-1 flex items-center text-xs text-gray-500">
              vs {formatCurrency(previousMonthTotal)} last month
            </div>
          </div>
        </div>
        
        <div className="card p-5 animate-slide-up" style={{ animationDelay: '50ms' }}>
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-medium text-gray-500">Average per Day</h3>
            <span className="flex items-center text-xs font-medium text-success-600">
              <TrendingDown className="mr-1 h-3 w-3" />
              4.2%
            </span>
          </div>
          <div className="mt-2">
            <span className="text-2xl font-bold text-gray-900">{formatCurrency(monthlyTotal / 30)}</span>
            <div className="mt-1 flex items-center text-xs text-gray-500">
              Based on current month
            </div>
          </div>
        </div>
        
        <div className="card p-5 animate-slide-up" style={{ animationDelay: '100ms' }}>
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-medium text-gray-500">Top Category</h3>
            <div 
              className="h-3 w-3 rounded-full" 
              style={{ backgroundColor: categories[0].color }}
            ></div>
          </div>
          <div className="mt-2">
            <span className="text-2xl font-bold text-gray-900">{categories[0].name}</span>
            <div className="mt-1 flex items-center text-xs text-gray-500">
              {formatCurrency(834.65)} this month
            </div>
          </div>
        </div>
        
        <div className="card p-5 animate-slide-up" style={{ animationDelay: '150ms' }}>
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-medium text-gray-500">Budget Status</h3>
            <span className="flex items-center text-xs font-medium text-warning-600">
              <PiggyBank className="mr-1 h-3 w-3" />
              80%
            </span>
          </div>
          <div className="mt-2">
            <span className="text-2xl font-bold text-gray-900">{formatCurrency(2854.32)}</span>
            <div className="mt-1 flex items-center text-xs text-gray-500">
              of {formatCurrency(3500)} budget
            </div>
          </div>
          <div className="mt-2 h-1.5 w-full rounded-full bg-gray-200">
            <div 
              className="h-1.5 rounded-full bg-warning-500" 
              style={{ width: '80%' }}
            ></div>
          </div>
        </div>
      </div>
      
      {/* Charts section */}
      <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
        {/* Monthly trend chart */}
        <div className="card p-5">
          <h3 className="text-base font-medium text-gray-900">Monthly Spending Trend</h3>
          <p className="text-sm text-gray-500">How your spending compares to your budget</p>
          
          <div className="mt-3 h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={mockMonthlySpending}
                margin={{ top: 10, right: 10, left: 0, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
                <XAxis dataKey="month" axisLine={false} tickLine={false} />
                <YAxis 
                  axisLine={false} 
                  tickLine={false} 
                  tickFormatter={(value) => `$${value}`} 
                />
                <Tooltip 
                  formatter={(value) => [`$${value}`, 'Amount']}
                  contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}
                />
                <Bar 
                  dataKey="amount" 
                  fill="#10B981" 
                  radius={[4, 4, 0, 0]} 
                  animationDuration={1500}
                />
                <Bar 
                  dataKey="budget" 
                  fill="#E5E7EB" 
                  radius={[4, 4, 0, 0]} 
                  animationDuration={1500}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
        
        {/* Category breakdown */}
        <div className="card p-5">
          <h3 className="text-base font-medium text-gray-900">Spending by Category</h3>
          <p className="text-sm text-gray-500">Where your money is going this month</p>
          
          <div className="mt-3 h-64 flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={mockCategorySpending.slice(0, 6)}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  innerRadius={50}
                  animationDuration={1500}
                  animationBegin={200}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  labelLine={false}
                >
                  {mockCategorySpending.slice(0, 6).map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  formatter={(value) => [`$${value}`, 'Amount']}
                  contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
      
      {/* AI Insights */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-gray-900">AI Insights</h2>
        
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {mockAiInsights.map((insight) => {
            // Determine icon based on insight type
            let Icon = Lightbulb;
            let bgColor = 'bg-primary-50';
            let iconColor = 'text-primary-500';
            
            if (insight.type === 'spending_anomaly') {
              Icon = AlertCircle;
              bgColor = 'bg-error-50';
              iconColor = 'text-error-500';
            } else if (insight.type === 'saving_opportunity') {
              Icon = PiggyBank;
              bgColor = 'bg-success-50';
              iconColor = 'text-success-500';
            } else if (insight.type === 'pattern') {
              Icon = TrendingUp;
              bgColor = 'bg-secondary-50';
              iconColor = 'text-secondary-500';
            }
            
            return (
              <div 
                key={insight.id} 
                className={`card ${bgColor} p-4 animate-slide-in`}
                style={{ animationDelay: `${mockAiInsights.indexOf(insight) * 100}ms` }}
              >
                <div className="flex items-start">
                  <div className={`flex h-8 w-8 items-center justify-center rounded-full ${bgColor} ${iconColor}`}>
                    <Icon className="h-5 w-5" />
                  </div>
                  <div className="ml-3">
                    <h4 className="text-sm font-medium text-gray-900">{insight.title}</h4>
                    <p className="mt-1 text-sm text-gray-600">{insight.description}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      
      {/* Recent Transactions */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold text-gray-900">Recent Transactions</h2>
          <a href="/expenses" className="text-sm font-medium text-primary-600 hover:text-primary-700">
            View All
          </a>
        </div>
        
        <div className="overflow-hidden rounded-lg border border-gray-200 bg-white">
          <ul className="divide-y divide-gray-200">
            {expenses.slice(0, 5).map((expense) => {
              const category = categories.find(c => c.id === expense.categoryId);
              
              return (
                <li key={expense.id} className="px-4 py-3 sm:px-6 hover:bg-gray-50 transition-colors">
                  <div className="flex items-center justify-between">
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
                        <p className="text-xs text-gray-500">{formatDate(expense.date, 'short')}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium text-gray-900">
                        {formatCurrency(expense.amount)}
                      </p>
                      <p className="text-xs text-gray-500">{category?.name}</p>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;