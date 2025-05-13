import React, { useState, ChangeEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { formatCurrency } from '../utils/formatters';
import { Receipt, Camera, Upload, ArrowLeft, Check, X } from 'lucide-react';

const AddExpense: React.FC = () => {
  const navigate = useNavigate();
  const { categories, addExpense } = useApp();
  
  const [expenseData, setExpenseData] = useState({
    description: '',
    amount: '',
    date: new Date().toISOString().split('T')[0],
    categoryId: '',
    notes: '',
    isRecurring: false,
  });
  
  const [receiptImage, setReceiptImage] = useState<File | null>(null);
  const [receiptPreview, setReceiptPreview] = useState<string | null>(null);
  const [isProcessingReceipt, setIsProcessingReceipt] = useState(false);
  const [aiSuggestions, setAiSuggestions] = useState<{
    description?: string;
    amount?: string;
    categoryId?: string;
  } | null>(null);
  
  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target as HTMLInputElement;
    
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setExpenseData({ ...expenseData, [name]: checked });
    } else {
      setExpenseData({ ...expenseData, [name]: value });
    }
  };
  
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setReceiptImage(file);
      
      // Create preview URL
      const previewUrl = URL.createObjectURL(file);
      setReceiptPreview(previewUrl);
      
      // Simulate OCR processing
      simulateOcrProcessing(previewUrl);
    }
  };
  
  const simulateOcrProcessing = (imageUrl: string) => {
    setIsProcessingReceipt(true);
    
    // Simulate API call to OCR service
    setTimeout(() => {
      // Mock OCR results
      const ocrResults = {
        description: 'Grocery shopping at Whole Foods',
        amount: '87.43',
        categoryId: 'cat1', // Shopping category
      };
      
      setAiSuggestions(ocrResults);
      setIsProcessingReceipt(false);
    }, 2000);
  };
  
  const acceptSuggestion = (field: string, value: string) => {
    setExpenseData({ ...expenseData, [field]: value });
    
    // Remove this suggestion
    if (aiSuggestions) {
      const newSuggestions = { ...aiSuggestions };
      delete newSuggestions[field as keyof typeof aiSuggestions];
      
      // If no more suggestions, clear the state
      if (Object.keys(newSuggestions).length === 0) {
        setAiSuggestions(null);
      } else {
        setAiSuggestions(newSuggestions);
      }
    }
  };
  
  const dismissSuggestion = (field: string) => {
    if (aiSuggestions) {
      const newSuggestions = { ...aiSuggestions };
      delete newSuggestions[field as keyof typeof aiSuggestions];
      
      // If no more suggestions, clear the state
      if (Object.keys(newSuggestions).length === 0) {
        setAiSuggestions(null);
      } else {
        setAiSuggestions(newSuggestions);
      }
    }
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form
    if (!expenseData.description || !expenseData.amount || !expenseData.date || !expenseData.categoryId) {
      alert("Please fill in all required fields.");
      return;
    }
    
    // Create new expense
    const newExpense = {
      id: Math.random().toString(36).substring(2, 15),
      description: expenseData.description,
      amount: parseFloat(expenseData.amount),
      date: expenseData.date,
      categoryId: expenseData.categoryId,
      notes: expenseData.notes,
      isRecurring: expenseData.isRecurring,
      receiptUrl: receiptPreview || undefined,
      tags: [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    
    // Add to context
    addExpense(newExpense);
    
    // Navigate back to expenses list
    navigate('/expenses');
  };
  
  return (
    <div className="mx-auto max-w-3xl animate-fade-in">
      <div className="mb-6">
        <button
          className="flex items-center text-gray-600 hover:text-gray-900"
          onClick={() => navigate(-1)}
        >
          <ArrowLeft className="mr-1 h-4 w-4" />
          <span>Back to Expenses</span>
        </button>
      </div>
      
      <div className="rounded-lg bg-white p-6 shadow-sm">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h1 className="font-bold text-gray-900">Add New Expense</h1>
            <p className="text-sm text-gray-600">Fill in the details or scan a receipt</p>
          </div>
          <div className="flex space-x-2">
            <label 
              htmlFor="receipt-upload"
              className="btn btn-outline flex cursor-pointer items-center gap-2"
            >
              <Camera className="h-4 w-4" />
              <span>Scan Receipt</span>
            </label>
            <input
              id="receipt-upload"
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleFileChange}
            />
          </div>
        </div>
        
        {/* AI Suggestions */}
        {aiSuggestions && Object.keys(aiSuggestions).length > 0 && (
          <div className="mb-6 rounded-lg bg-primary-50 p-4">
            <div className="mb-2 flex items-center">
              <Receipt className="h-5 w-5 text-primary-600" />
              <span className="ml-2 font-medium text-primary-800">
                AI Analysis Results
              </span>
            </div>
            
            <div className="space-y-2">
              {aiSuggestions.description && (
                <div className="flex items-center justify-between rounded-md bg-white p-2">
                  <div>
                    <span className="text-xs font-medium text-gray-500">Description:</span>
                    <p className="text-sm text-gray-800">{aiSuggestions.description}</p>
                  </div>
                  <div className="flex space-x-1">
                    <button 
                      className="rounded-full p-1 text-success-600 hover:bg-success-50"
                      onClick={() => acceptSuggestion('description', aiSuggestions.description!)}
                    >
                      <Check className="h-4 w-4" />
                    </button>
                    <button 
                      className="rounded-full p-1 text-error-600 hover:bg-error-50"
                      onClick={() => dismissSuggestion('description')}
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              )}
              
              {aiSuggestions.amount && (
                <div className="flex items-center justify-between rounded-md bg-white p-2">
                  <div>
                    <span className="text-xs font-medium text-gray-500">Amount:</span>
                    <p className="text-sm text-gray-800">{formatCurrency(parseFloat(aiSuggestions.amount))}</p>
                  </div>
                  <div className="flex space-x-1">
                    <button 
                      className="rounded-full p-1 text-success-600 hover:bg-success-50"
                      onClick={() => acceptSuggestion('amount', aiSuggestions.amount!)}
                    >
                      <Check className="h-4 w-4" />
                    </button>
                    <button 
                      className="rounded-full p-1 text-error-600 hover:bg-error-50"
                      onClick={() => dismissSuggestion('amount')}
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              )}
              
              {aiSuggestions.categoryId && (
                <div className="flex items-center justify-between rounded-md bg-white p-2">
                  <div>
                    <span className="text-xs font-medium text-gray-500">Category:</span>
                    <p className="text-sm text-gray-800">
                      {categories.find(c => c.id === aiSuggestions.categoryId)?.name || 'Unknown'}
                    </p>
                  </div>
                  <div className="flex space-x-1">
                    <button 
                      className="rounded-full p-1 text-success-600 hover:bg-success-50"
                      onClick={() => acceptSuggestion('categoryId', aiSuggestions.categoryId!)}
                    >
                      <Check className="h-4 w-4" />
                    </button>
                    <button 
                      className="rounded-full p-1 text-error-600 hover:bg-error-50"
                      onClick={() => dismissSuggestion('categoryId')}
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
        
        {/* Receipt upload and preview */}
        {(isProcessingReceipt || receiptPreview) && (
          <div className="mb-6 rounded-lg border border-gray-200 p-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-medium text-gray-700">Receipt Image</h3>
              <button
                className="text-xs text-gray-500 hover:text-gray-700"
                onClick={() => {
                  setReceiptPreview(null);
                  setReceiptImage(null);
                  setAiSuggestions(null);
                }}
              >
                Remove
              </button>
            </div>
            
            <div className="mt-2">
              {isProcessingReceipt ? (
                <div className="flex h-40 items-center justify-center bg-gray-50">
                  <div className="text-center">
                    <div className="mx-auto h-8 w-8 animate-spin rounded-full border-4 border-primary-500 border-t-transparent"></div>
                    <p className="mt-2 text-sm text-gray-600">Processing receipt...</p>
                  </div>
                </div>
              ) : (
                receiptPreview && (
                  <div className="relative h-40 overflow-hidden rounded-md bg-gray-100">
                    <img
                      src={receiptPreview}
                      alt="Receipt"
                      className="h-full w-full object-contain"
                    />
                  </div>
                )
              )}
            </div>
          </div>
        )}
        
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div>
              <label htmlFor="description" className="mb-1 block text-sm font-medium text-gray-700">
                Description *
              </label>
              <input
                type="text"
                id="description"
                name="description"
                value={expenseData.description}
                onChange={handleInputChange}
                className="input w-full"
                placeholder="What did you spend on?"
                required
              />
            </div>
            
            <div>
              <label htmlFor="amount" className="mb-1 block text-sm font-medium text-gray-700">
                Amount *
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">
                  $
                </span>
                <input
                  type="number"
                  id="amount"
                  name="amount"
                  value={expenseData.amount}
                  onChange={handleInputChange}
                  className="input w-full pl-7"
                  placeholder="0.00"
                  min="0"
                  step="0.01"
                  required
                />
              </div>
            </div>
            
            <div>
              <label htmlFor="date" className="mb-1 block text-sm font-medium text-gray-700">
                Date *
              </label>
              <input
                type="date"
                id="date"
                name="date"
                value={expenseData.date}
                onChange={handleInputChange}
                className="input w-full"
                required
              />
            </div>
            
            <div>
              <label htmlFor="categoryId" className="mb-1 block text-sm font-medium text-gray-700">
                Category *
              </label>
              <select
                id="categoryId"
                name="categoryId"
                value={expenseData.categoryId}
                onChange={handleInputChange}
                className="select w-full"
                required
              >
                <option value="" disabled>
                  Select category
                </option>
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>
            
            <div className="md:col-span-2">
              <label htmlFor="notes" className="mb-1 block text-sm font-medium text-gray-700">
                Notes
              </label>
              <textarea
                id="notes"
                name="notes"
                value={expenseData.notes}
                onChange={handleInputChange}
                className="input w-full"
                placeholder="Add any additional details..."
                rows={3}
              />
            </div>
            
            <div className="md:col-span-2">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="isRecurring"
                  name="isRecurring"
                  checked={expenseData.isRecurring}
                  onChange={handleInputChange}
                  className="h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                />
                <label htmlFor="isRecurring" className="ml-2 text-sm text-gray-700">
                  This is a recurring expense
                </label>
              </div>
            </div>
          </div>
          
          <div className="mt-6 flex justify-end space-x-3">
            <button
              type="button"
              className="btn btn-outline"
              onClick={() => navigate('/expenses')}
            >
              Cancel
            </button>
            <button type="submit" className="btn btn-primary">
              Save Expense
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddExpense;