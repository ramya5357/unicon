import { Expense, Category, BudgetRecommendation, AiInsight } from '../types';
import { 
  ShoppingBag, 
  Home, 
  Car, 
  Utensils, 
  CreditCard, 
  Plane, 
  Coffee, 
  HeartPulse, 
  Shirt, 
  GraduationCap,
  Tv,
  Dumbbell
} from 'lucide-react';

// Helper to generate random IDs
const generateId = () => Math.random().toString(36).substring(2, 15);

// Current date in ISO format
const now = new Date().toISOString();

// Mock Categories
export const mockCategories: Category[] = [
  { id: 'cat1', name: 'Shopping', color: '#10B981', icon: 'ShoppingBag' },
  { id: 'cat2', name: 'Housing', color: '#3B82F6', icon: 'Home' },
  { id: 'cat3', name: 'Transportation', color: '#F59E0B', icon: 'Car' },
  { id: 'cat4', name: 'Food & Dining', color: '#EF4444', icon: 'Utensils' },
  { id: 'cat5', name: 'Bills & Utilities', color: '#8B5CF6', icon: 'CreditCard' },
  { id: 'cat6', name: 'Travel', color: '#EC4899', icon: 'Plane' },
  { id: 'cat7', name: 'Coffee & Drinks', color: '#6D28D9', icon: 'Coffee' },
  { id: 'cat8', name: 'Health & Fitness', color: '#059669', icon: 'HeartPulse' },
  { id: 'cat9', name: 'Clothing', color: '#D97706', icon: 'Shirt' },
  { id: 'cat10', name: 'Education', color: '#7C3AED', icon: 'GraduationCap' },
  { id: 'cat11', name: 'Entertainment', color: '#DC2626', icon: 'Tv' },
  { id: 'cat12', name: 'Gym & Fitness', color: '#2563EB', icon: 'Dumbbell' },
];

// Function to get a random date in the last 30 days
const getRandomRecentDate = () => {
  const date = new Date();
  date.setDate(date.getDate() - Math.floor(Math.random() * 30));
  return date.toISOString();
};

// Mock Expenses
export const mockExpenses: Expense[] = [
  {
    id: generateId(),
    amount: 89.99,
    description: 'Groceries at Whole Foods',
    date: getRandomRecentDate(),
    categoryId: 'cat1',
    notes: 'Weekly grocery shopping',
    createdAt: now,
    updatedAt: now,
  },
  {
    id: generateId(),
    amount: 1500,
    description: 'Monthly Rent',
    date: getRandomRecentDate(),
    categoryId: 'cat2',
    isRecurring: true,
    createdAt: now,
    updatedAt: now,
  },
  {
    id: generateId(),
    amount: 45.99,
    description: 'Gas Station',
    date: getRandomRecentDate(),
    categoryId: 'cat3',
    createdAt: now,
    updatedAt: now,
  },
  {
    id: generateId(),
    amount: 65.43,
    description: 'Dinner at Olive Garden',
    date: getRandomRecentDate(),
    categoryId: 'cat4',
    createdAt: now,
    updatedAt: now,
  },
  {
    id: generateId(),
    amount: 120.50,
    description: 'Electricity Bill',
    date: getRandomRecentDate(),
    categoryId: 'cat5',
    isRecurring: true,
    createdAt: now,
    updatedAt: now,
  },
  {
    id: generateId(),
    amount: 349.99,
    description: 'Flight to New York',
    date: getRandomRecentDate(),
    categoryId: 'cat6',
    createdAt: now,
    updatedAt: now,
  },
  {
    id: generateId(),
    amount: 4.99,
    description: 'Starbucks Coffee',
    date: getRandomRecentDate(),
    categoryId: 'cat7',
    createdAt: now,
    updatedAt: now,
  },
  {
    id: generateId(),
    amount: 75.00,
    description: 'Doctor Visit',
    date: getRandomRecentDate(),
    categoryId: 'cat8',
    notes: 'Annual checkup',
    createdAt: now,
    updatedAt: now,
  },
  {
    id: generateId(),
    amount: 129.99,
    description: 'New Shoes',
    date: getRandomRecentDate(),
    categoryId: 'cat9',
    createdAt: now,
    updatedAt: now,
  },
  {
    id: generateId(),
    amount: 299.99,
    description: 'Online Course',
    date: getRandomRecentDate(),
    categoryId: 'cat10',
    createdAt: now,
    updatedAt: now,
  },
  {
    id: generateId(),
    amount: 19.99,
    description: 'Movie Tickets',
    date: getRandomRecentDate(),
    categoryId: 'cat11',
    createdAt: now,
    updatedAt: now,
  },
  {
    id: generateId(),
    amount: 55.00,
    description: 'Gym Membership',
    date: getRandomRecentDate(),
    categoryId: 'cat12',
    isRecurring: true,
    createdAt: now,
    updatedAt: now,
  },
  {
    id: generateId(),
    amount: 35.45,
    description: 'Lunch at Office',
    date: getRandomRecentDate(),
    categoryId: 'cat4',
    createdAt: now,
    updatedAt: now,
  },
  {
    id: generateId(),
    amount: 9.99,
    description: 'Streaming Subscription',
    date: getRandomRecentDate(),
    categoryId: 'cat11',
    isRecurring: true,
    createdAt: now,
    updatedAt: now,
  },
  {
    id: generateId(),
    amount: 150.00,
    description: 'Car Service',
    date: getRandomRecentDate(),
    categoryId: 'cat3',
    notes: 'Oil change and inspection',
    createdAt: now,
    updatedAt: now,
  },
];

// Mock Budget Recommendations
export const mockBudgetRecommendations: BudgetRecommendation[] = [
  {
    id: generateId(),
    categoryId: 'cat7',
    recommendedAmount: 50,
    previousAmount: 80,
    reason: 'You\'re spending 37.5% less on coffee than last month. Consider reducing your budget.',
    confidenceScore: 0.85,
  },
  {
    id: generateId(),
    categoryId: 'cat4',
    recommendedAmount: 600,
    previousAmount: 500,
    reason: 'Your food expenses consistently exceed your budget by about 20%. Consider a more realistic budget.',
    confidenceScore: 0.92,
  },
  {
    id: generateId(),
    categoryId: 'cat11',
    recommendedAmount: 100,
    previousAmount: 150,
    reason: 'Your entertainment spending has decreased over the past 3 months. You could allocate this budget elsewhere.',
    confidenceScore: 0.78,
  },
];

// Mock AI Insights
export const mockAiInsights: AiInsight[] = [
  {
    id: generateId(),
    type: 'saving_opportunity',
    title: 'Coffee shop savings',
    description: 'You spent $87 on coffee shops this month. Making coffee at home could save you approximately $65 monthly.',
    severity: 'medium',
    categoryId: 'cat7',
    createdAt: now,
  },
  {
    id: generateId(),
    type: 'spending_anomaly',
    title: 'Unusual restaurant spending',
    description: 'Your dining out expenses are 45% higher this month compared to your 3-month average.',
    severity: 'high',
    categoryId: 'cat4',
    createdAt: now,
  },
  {
    id: generateId(),
    type: 'pattern',
    title: 'Recurring expenses optimization',
    description: 'You have 5 subscription services totaling $65.95/month. Consider reviewing these for services you may not be using frequently.',
    severity: 'low',
    createdAt: now,
  },
  {
    id: generateId(),
    type: 'tip',
    title: 'Weekend spending trend',
    description: 'You tend to spend 34% more on weekends than weekdays. Setting a weekend budget might help manage this pattern.',
    severity: 'medium',
    createdAt: now,
  },
];

// Mock Monthly Spending Trends
export const mockMonthlySpending = [
  { month: 'Jan', amount: 2450, budget: 3000 },
  { month: 'Feb', amount: 2800, budget: 3000 },
  { month: 'Mar', amount: 3100, budget: 3000 },
  { month: 'Apr', amount: 2600, budget: 3000 },
  { month: 'May', amount: 2900, budget: 3000 },
  { month: 'Jun', amount: 3200, budget: 3000 },
];

// Mock Category Spending Breakdown
export const mockCategorySpending = mockCategories.map(category => ({
  name: category.name,
  value: Math.floor(Math.random() * 1000) + 100,
  color: category.color,
}));