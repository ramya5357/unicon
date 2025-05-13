import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { formatCurrency } from '../utils/formatters';
import { mockAiInsights, mockMonthlySpending, mockCategorySpending } from '../utils/mockData';
import { Calendar, Download, ChevronDown, BarChart2, PieChart as PieChartIcon, LineChart as LineChartIcon } from 'lucide-react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  Area,
  AreaChart,
} from 'recharts';

type ChartType = 'bar' | 'pie' | 'line' | 'area';
type PeriodType = 'weekly' | 'monthly' | 'yearly';

const Reports: React.FC = () => {
  const { expenses, categories, isLoading } = useApp();
  const [chartType, setChartType] = useState<ChartType>('bar');
  const [period, setPeriod] = useState<PeriodType>('monthly');
  
  if (isLoading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <div className="text-center">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary-500 border-t-transparent mx-auto"></div>
          <p className="mt-2 text-sm text-gray-600">Loading your reports...</p>
        </div>
      </div>
    );
  }

  // Sample data for the different chart types
  const spendingTrendData = mockMonthlySpending;
  const categoryData = mockCategorySpending;
  
  const renderChart = () => {
    const colors = ['#10B981', '#3B82F6', '#F59E0B', '#EF4444', '#8B5CF6', '#EC4899'];
    
    switch (chartType) {
      case 'bar':
        return (
          <ResponsiveContainer width="100%" height={400}>
            <BarChart
              data={spendingTrendData}
              margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis 
                dataKey="month" 
                axisLine={false} 
                tickLine={false} 
              />
              <YAxis
                axisLine={false}
                tickLine={false}
                tickFormatter={(value) => `$${value}`}
              />
              <Tooltip
                formatter={(value) => [`$${value}`, 'Amount']}
                contentStyle={{ 
                  borderRadius: '8px',
                  border: 'none',
                  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                }}
              />
              <Legend />
              <Bar 
                name="Actual Spending" 
                dataKey="amount" 
                fill="#10B981" 
                radius={[4, 4, 0, 0]}
                animationDuration={1500}
              />
              <Bar 
                name="Budget" 
                dataKey="budget" 
                fill="#D1FAE5" 
                radius={[4, 4, 0, 0]} 
                animationDuration={1500}
              />
            </BarChart>
          </ResponsiveContainer>
        );
      
      case 'pie':
        return (
          <ResponsiveContainer width="100%" height={400}>
            <PieChart>
              <Pie
                data={categoryData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={150}
                innerRadius={60}
                paddingAngle={1}
                animationDuration={1500}
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
              >
                {categoryData.map((entry, index) => (
                  <Cell 
                    key={`cell-${index}`} 
                    fill={entry.color || colors[index % colors.length]} 
                  />
                ))}
              </Pie>
              <Tooltip
                formatter={(value) => [`$${value}`, 'Amount']}
                contentStyle={{ 
                  borderRadius: '8px',
                  border: 'none',
                  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        );
      
      case 'line':
        return (
          <ResponsiveContainer width="100%" height={400}>
            <LineChart
              data={spendingTrendData}
              margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis 
                dataKey="month" 
                axisLine={false} 
                tickLine={false} 
              />
              <YAxis
                axisLine={false}
                tickLine={false}
                tickFormatter={(value) => `$${value}`}
              />
              <Tooltip
                formatter={(value) => [`$${value}`, 'Amount']}
                contentStyle={{ 
                  borderRadius: '8px',
                  border: 'none',
                  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                }}
              />
              <Legend />
              <Line
                name="Actual Spending"
                type="monotone"
                dataKey="amount"
                stroke="#10B981"
                strokeWidth={3}
                dot={{ r: 4 }}
                activeDot={{ r: 6 }}
                animationDuration={1500}
              />
              <Line
                name="Budget"
                type="monotone"
                dataKey="budget"
                stroke="#3B82F6"
                strokeWidth={2}
                strokeDasharray="5 5"
                dot={{ r: 3 }}
                animationDuration={1500}
              />
            </LineChart>
          </ResponsiveContainer>
        );
      
      case 'area':
        return (
          <ResponsiveContainer width="100%" height={400}>
            <AreaChart
              data={spendingTrendData}
              margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis 
                dataKey="month" 
                axisLine={false} 
                tickLine={false} 
              />
              <YAxis
                axisLine={false}
                tickLine={false}
                tickFormatter={(value) => `$${value}`}
              />
              <Tooltip
                formatter={(value) => [`$${value}`, 'Amount']}
                contentStyle={{ 
                  borderRadius: '8px',
                  border: 'none',
                  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                }}
              />
              <Legend />
              <Area
                name="Actual Spending"
                type="monotone"
                dataKey="amount"
                fill="#D1FAE5"
                stroke="#10B981"
                strokeWidth={2}
                animationDuration={1500}
              />
              <Area
                name="Budget"
                type="monotone"
                dataKey="budget"
                fill="#DBEAFE"
                stroke="#3B82F6"
                strokeWidth={2}
                strokeDasharray="5 5"
                animationDuration={1500}
              />
            </AreaChart>
          </ResponsiveContainer>
        );
      
      default:
        return null;
    }
  };
  
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="font-bold text-gray-900">Reports & Analysis</h1>
          <p className="text-sm text-gray-600">Visualize and understand your spending</p>
        </div>
        <div className="mt-4 flex items-center gap-2 sm:mt-0">
          <div className="relative">
            <select
              className="h-9 rounded-md border border-gray-300 pl-8 pr-6 text-sm focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500"
              value={period}
              onChange={(e) => setPeriod(e.target.value as PeriodType)}
            >
              <option value="weekly">This Week</option>
              <option value="monthly">This Month</option>
              <option value="yearly">This Year</option>
            </select>
            <Calendar className="absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500 pointer-events-none" />
            <ChevronDown className="absolute right-2 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500 pointer-events-none" />
          </div>
          
          <button className="btn btn-outline flex items-center gap-1">
            <Download className="h-4 w-4" />
            <span>Export</span>
          </button>
        </div>
      </div>
      
      {/* Chart view buttons */}
      <div className="space-y-5">
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setChartType('bar')}
            className={`flex items-center gap-1 rounded-md px-3 py-1.5 text-sm font-medium transition-colors ${
              chartType === 'bar'
                ? 'bg-primary-100 text-primary-700'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            <BarChart2 className="h-4 w-4" />
            <span>Bar Chart</span>
          </button>
          
          <button
            onClick={() => setChartType('pie')}
            className={`flex items-center gap-1 rounded-md px-3 py-1.5 text-sm font-medium transition-colors ${
              chartType === 'pie'
                ? 'bg-primary-100 text-primary-700'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            <PieChartIcon className="h-4 w-4" />
            <span>Pie Chart</span>
          </button>
          
          <button
            onClick={() => setChartType('line')}
            className={`flex items-center gap-1 rounded-md px-3 py-1.5 text-sm font-medium transition-colors ${
              chartType === 'line'
                ? 'bg-primary-100 text-primary-700'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            <LineChartIcon className="h-4 w-4" />
            <span>Line Chart</span>
          </button>
          
          <button
            onClick={() => setChartType('area')}
            className={`flex items-center gap-1 rounded-md px-3 py-1.5 text-sm font-medium transition-colors ${
              chartType === 'area'
                ? 'bg-primary-100 text-primary-700'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            <LineChartIcon className="h-4 w-4" />
            <span>Area Chart</span>
          </button>
        </div>
        
        {/* Chart container */}
        <div className="card p-5">
          <h2 className="mb-4 text-lg font-medium text-gray-900">
            {chartType === 'pie' 
              ? 'Spending by Category' 
              : 'Spending Trend Analysis'}
          </h2>
          {renderChart()}
        </div>
      </div>
      
      {/* Insights */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-gray-900">AI-Powered Insights</h2>
        
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {mockAiInsights.map((insight) => (
            <div 
              key={insight.id} 
              className="card p-4 hover:shadow-md transition-shadow"
            >
              <div className="flex space-x-4">
                <div className={`
                  h-10 w-10 flex-shrink-0 rounded-full 
                  ${insight.type === 'spending_anomaly' ? 'bg-error-100 text-error-600' : 
                    insight.type === 'saving_opportunity' ? 'bg-success-100 text-success-600' :
                    insight.type === 'pattern' ? 'bg-secondary-100 text-secondary-600' :
                    'bg-primary-100 text-primary-600'}
                  flex items-center justify-center
                `}>
                  <span className="text-sm font-medium">
                    {insight.type === 'spending_anomaly' ? '!' : 
                     insight.type === 'saving_opportunity' ? '$' : 
                     insight.type === 'pattern' ? 'P' : 'i'}
                  </span>
                </div>
                <div>
                  <h3 className="text-base font-medium text-gray-900">{insight.title}</h3>
                  <p className="mt-1 text-sm text-gray-600">{insight.description}</p>
                  <div className="mt-2 flex items-center justify-between">
                    <span className={`
                      inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium
                      ${insight.severity === 'high' ? 'bg-error-100 text-error-800' : 
                        insight.severity === 'medium' ? 'bg-warning-100 text-warning-800' :
                        'bg-gray-100 text-gray-800'}
                    `}>
                      {insight.severity.charAt(0).toUpperCase() + insight.severity.slice(1)} Priority
                    </span>
                    <span className="text-xs text-gray-500">
                      {new Date(insight.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Stats overview */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        <div className="card p-5">
          <h3 className="mb-3 text-base font-medium text-gray-900">Top Spending Categories</h3>
          <ul className="space-y-3">
            {categoryData.slice(0, 4).map((category, index) => (
              <li key={index} className="flex items-center justify-between">
                <div className="flex items-center">
                  <div 
                    className="h-3 w-3 rounded-full mr-2" 
                    style={{ backgroundColor: category.color }}
                  ></div>
                  <span className="text-sm text-gray-800">{category.name}</span>
                </div>
                <span className="text-sm font-medium text-gray-900">
                  {formatCurrency(category.value)}
                </span>
              </li>
            ))}
          </ul>
        </div>
        
        <div className="card p-5">
          <h3 className="mb-3 text-base font-medium text-gray-900">Monthly Comparison</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Current Month:</span>
              <span className="text-sm font-medium text-gray-900">{formatCurrency(2854.32)}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Previous Month:</span>
              <span className="text-sm font-medium text-gray-900">{formatCurrency(3120.45)}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Difference:</span>
              <span className="text-sm font-medium text-success-600">
                {formatCurrency(-266.13)} (-8.5%)
              </span>
            </div>
            <div className="pt-2">
              <div className="h-2 w-full rounded-full bg-gray-200">
                <div className="h-2 rounded-full bg-primary-500" style={{ width: '85%' }}></div>
              </div>
              <div className="mt-1 flex items-center justify-between text-xs text-gray-500">
                <span>Current</span>
                <span>Previous</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="card p-5 sm:col-span-2 lg:col-span-1">
          <h3 className="mb-3 text-base font-medium text-gray-900">Budget Status</h3>
          <div className="space-y-3">
            {['Housing', 'Food & Dining', 'Shopping'].map((category, index) => (
              <div key={index} className="space-y-1">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-800">{category}</span>
                  <span className="text-xs font-medium text-gray-500">
                    {formatCurrency(800 - index * 200)} / {formatCurrency(1000 - index * 150)}
                  </span>
                </div>
                <div className="h-2 w-full rounded-full bg-gray-200">
                  <div 
                    className={`h-2 rounded-full ${
                      index === 0 ? 'bg-primary-500' : 
                      index === 1 ? 'bg-warning-500' : 
                      'bg-error-500'
                    }`} 
                    style={{ width: `${80 - index * 10}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reports;