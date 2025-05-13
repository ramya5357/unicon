export interface Expense {
  id: string;
  amount: number;
  description: string;
  date: string;
  categoryId: string;
  receiptUrl?: string;
  notes?: string;
  isRecurring?: boolean;
  tags?: string[];
  createdAt: string;
  updatedAt: string;
}

export interface Category {
  id: string;
  name: string;
  color: string;
  icon: string;
  budget?: number;
}

export interface BudgetRecommendation {
  id: string;
  categoryId: string;
  recommendedAmount: number;
  previousAmount: number;
  reason: string;
  confidenceScore: number;
}

export interface SpendingTrend {
  month: string;
  amount: number;
  budget?: number;
}

export interface AiInsight {
  id: string;
  type: 'saving_opportunity' | 'spending_anomaly' | 'pattern' | 'tip';
  title: string;
  description: string;
  severity: 'low' | 'medium' | 'high';
  categoryId?: string;
  createdAt: string;
}

export interface UserPreferences {
  currency: string;
  theme: 'light' | 'dark' | 'system';
  notifications: boolean;
  dateFormat: string;
}

export type Period = 'daily' | 'weekly' | 'monthly' | 'yearly' | 'custom';

export interface ChartData {
  name: string;
  value: number;
  color?: string;
}