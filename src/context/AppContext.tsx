import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Expense, Category, BudgetRecommendation } from '../types';
import { mockExpenses, mockCategories, mockBudgetRecommendations } from '../utils/mockData';

interface AppContextType {
  expenses: Expense[];
  categories: Category[];
  budgetRecommendations: BudgetRecommendation[];
  isLoading: boolean;
  addExpense: (expense: Expense) => void;
  deleteExpense: (id: string) => void;
  updateExpense: (id: string, expense: Partial<Expense>) => void;
  getCategoryById: (id: string) => Category | undefined;
  getMonthlyTotal: () => number;
  getExpensesByCategory: () => Record<string, number>;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [budgetRecommendations, setBudgetRecommendations] = useState<BudgetRecommendation[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Load initial data
  useEffect(() => {
    // In a real application, this would fetch from the XANO backend
    const loadData = async () => {
      setIsLoading(true);
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 800));
        
        setExpenses(mockExpenses);
        setCategories(mockCategories);
        setBudgetRecommendations(mockBudgetRecommendations);
      } catch (error) {
        console.error('Error loading data:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    loadData();
  }, []);

  const addExpense = (expense: Expense) => {
    setExpenses(prev => [expense, ...prev]);
  };

  const deleteExpense = (id: string) => {
    setExpenses(prev => prev.filter(expense => expense.id !== id));
  };

  const updateExpense = (id: string, updatedExpense: Partial<Expense>) => {
    setExpenses(prev => 
      prev.map(expense => (expense.id === id ? { ...expense, ...updatedExpense } : expense))
    );
  };

  const getCategoryById = (id: string) => {
    return categories.find(category => category.id === id);
  };

  const getMonthlyTotal = () => {
    const now = new Date();
    const currentMonth = now.getMonth();
    const currentYear = now.getFullYear();
    
    return expenses
      .filter(expense => {
        const expenseDate = new Date(expense.date);
        return expenseDate.getMonth() === currentMonth && 
               expenseDate.getFullYear() === currentYear;
      })
      .reduce((total, expense) => total + expense.amount, 0);
  };

  const getExpensesByCategory = () => {
    return expenses.reduce((acc, expense) => {
      const { categoryId, amount } = expense;
      acc[categoryId] = (acc[categoryId] || 0) + amount;
      return acc;
    }, {} as Record<string, number>);
  };

  return (
    <AppContext.Provider
      value={{
        expenses,
        categories,
        budgetRecommendations,
        isLoading,
        addExpense,
        deleteExpense,
        updateExpense,
        getCategoryById,
        getMonthlyTotal,
        getExpensesByCategory,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};