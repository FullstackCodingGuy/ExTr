import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Types for TypeScript-like documentation
/**
 * @typedef {Object} Expense
 * @property {string} id - Unique identifier
 * @property {string} title - Expense title
 * @property {number} amount - Expense amount
 * @property {string} category - Expense category
 * @property {string} date - Expense date (ISO string)
 * @property {string} description - Optional description
 * @property {string} type - 'income' | 'expense'
 */

/**
 * @typedef {Object} Category
 * @property {string} id - Unique identifier
 * @property {string} name - Category name
 * @property {string} icon - Icon name
 * @property {string} color - Category color
 */

/**
 * @typedef {Object} Settings
 * @property {string} theme - 'light' | 'dark' | 'auto'
 * @property {string} language - Language code
 * @property {string} currency - Currency code
 * @property {boolean} notifications - Notifications enabled
 * @property {boolean} biometric - Biometric auth enabled
 */

// Default categories
const defaultCategories = [
  { id: '1', name: 'Food & Dining', icon: 'food', color: '#FF6B6B' },
  { id: '2', name: 'Transportation', icon: 'car', color: '#4ECDC4' },
  { id: '3', name: 'Shopping', icon: 'shopping', color: '#45B7D1' },
  { id: '4', name: 'Entertainment', icon: 'movie', color: '#96CEB4' },
  { id: '5', name: 'Bills & Utilities', icon: 'receipt', color: '#FECA57' },
  { id: '6', name: 'Healthcare', icon: 'medical', color: '#FF9FF3' },
  { id: '7', name: 'Education', icon: 'school', color: '#54A0FF' },
  { id: '8', name: 'Travel', icon: 'airplane', color: '#5F27CD' },
  { id: '9', name: 'Income', icon: 'cash', color: '#00D2D3' },
  { id: '10', name: 'Other', icon: 'dots-horizontal', color: '#747d8c' }
];

// Default settings
const defaultSettings = {
  theme: 'light',
  language: 'en',
  currency: 'USD',
  notifications: true,
  biometric: false
};

// Create the main store
export const useAppStore = create(
  persist(
    (set, get) => ({
      // ===== EXPENSES STATE =====
      expenses: [],
      searchQuery: '',
      selectedCategory: 'all',
      dateRange: { start: null, end: null },

      // ===== CATEGORIES STATE =====
      categories: defaultCategories,

      // ===== SETTINGS STATE =====
      settings: defaultSettings,

      // ===== UI STATE =====
      isLoading: false,
      error: null,
      selectedTab: 'Home',

      // ===== EXPENSE ACTIONS =====
      addExpense: (expense) => {
        const newExpense = {
          ...expense,
          id: Date.now().toString(), // Simple ID generation
          date: expense.date || new Date().toISOString(),
        };
        
        set((state) => ({
          expenses: [newExpense, ...state.expenses],
        }));
      },

      updateExpense: (id, updatedExpense) => {
        set((state) => ({
          expenses: state.expenses.map((expense) =>
            expense.id === id ? { ...expense, ...updatedExpense } : expense
          ),
        }));
      },

      deleteExpense: (id) => {
        set((state) => ({
          expenses: state.expenses.filter((expense) => expense.id !== id),
        }));
      },

      // ===== FILTERING ACTIONS =====
      setSearchQuery: (query) => {
        set({ searchQuery: query });
      },

      setSelectedCategory: (category) => {
        set({ selectedCategory: category });
      },

      setDateRange: (range) => {
        set({ dateRange: range });
      },

      clearFilters: () => {
        set({
          searchQuery: '',
          selectedCategory: 'all',
          dateRange: { start: null, end: null },
        });
      },

      // ===== CATEGORY ACTIONS =====
      addCategory: (category) => {
        const newCategory = {
          ...category,
          id: Date.now().toString(),
        };
        
        set((state) => ({
          categories: [...state.categories, newCategory],
        }));
      },

      updateCategory: (id, updatedCategory) => {
        set((state) => ({
          categories: state.categories.map((category) =>
            category.id === id ? { ...category, ...updatedCategory } : category
          ),
        }));
      },

      deleteCategory: (id) => {
        set((state) => ({
          categories: state.categories.filter((category) => category.id !== id),
        }));
      },

      // ===== SETTINGS ACTIONS =====
      updateSettings: (newSettings) => {
        set((state) => ({
          settings: { ...state.settings, ...newSettings },
        }));
      },

      setTheme: (theme) => {
        set((state) => ({
          settings: { ...state.settings, theme },
        }));
      },

      setLanguage: (language) => {
        set((state) => ({
          settings: { ...state.settings, language },
        }));
      },

      setCurrency: (currency) => {
        set((state) => ({
          settings: { ...state.settings, currency },
        }));
      },

      toggleNotifications: () => {
        set((state) => ({
          settings: {
            ...state.settings,
            notifications: !state.settings.notifications,
          },
        }));
      },

      toggleBiometric: () => {
        set((state) => ({
          settings: {
            ...state.settings,
            biometric: !state.settings.biometric,
          },
        }));
      },

      // ===== UI ACTIONS =====
      setLoading: (isLoading) => set({ isLoading }),
      
      setError: (error) => set({ error }),
      
      clearError: () => set({ error: null }),

      setSelectedTab: (tab) => set({ selectedTab: tab }),

      // ===== COMPUTED VALUES / GETTERS =====
      getTotalExpenses: () => {
        const { expenses } = get();
        return expenses
          .filter((expense) => expense.type === 'expense')
          .reduce((total, expense) => total + expense.amount, 0);
      },

      getTotalIncome: () => {
        const { expenses } = get();
        return expenses
          .filter((expense) => expense.type === 'income')
          .reduce((total, expense) => total + expense.amount, 0);
      },

      getBalance: () => {
        const { getTotalIncome, getTotalExpenses } = get();
        return getTotalIncome() - getTotalExpenses();
      },

      getExpensesByCategory: () => {
        const { expenses } = get();
        const categoryTotals = {};
        
        expenses
          .filter((expense) => expense.type === 'expense')
          .forEach((expense) => {
            if (!categoryTotals[expense.category]) {
              categoryTotals[expense.category] = 0;
            }
            categoryTotals[expense.category] += expense.amount;
          });
        
        return categoryTotals;
      },

      getRecentExpenses: (limit = 5) => {
        const { expenses } = get();
        return expenses
          .sort((a, b) => new Date(b.date) - new Date(a.date))
          .slice(0, limit);
      },

      // ===== DATA EXPORT/IMPORT =====
      exportData: () => {
        const { expenses, categories, settings } = get();
        return {
          expenses,
          categories,
          settings,
          exportDate: new Date().toISOString(),
          version: '1.0.0',
        };
      },

      importData: (data) => {
        try {
          set({
            expenses: data.expenses || [],
            categories: data.categories || defaultCategories,
            settings: { ...defaultSettings, ...data.settings },
          });
          
          return { success: true };
        } catch (error) {
          console.error('Import failed:', error);
          return { success: false, error: error.message };
        }
      },

      clearAllData: () => {
        set({
          expenses: [],
          categories: defaultCategories,
          settings: defaultSettings,
          searchQuery: '',
          selectedCategory: 'all',
          dateRange: { start: null, end: null },
          error: null,
        });
      },

      // ===== INITIALIZATION =====
      initializeApp: () => {
        // Initialize filtered expenses on app start
        get().filterExpenses();
        
        // Any other initialization logic
        console.log('App store initialized');
      },
    }),
    {
      name: 'expense-tracker-storage', // Storage key
      storage: createJSONStorage(() => AsyncStorage),
      // Only persist certain parts of the state
      partialize: (state) => ({
        expenses: state.expenses,
        categories: state.categories,
        settings: state.settings,
      }),
    }
  )
);

// Selector hooks for better performance
export const useExpenses = () => useAppStore((state) => state.expenses);
export const useCategories = () => useAppStore((state) => state.categories);
export const useSettings = () => useAppStore((state) => state.settings);
export const useLoading = () => useAppStore((state) => state.isLoading);
export const useError = () => useAppStore((state) => state.error);

// Action hooks
export const useExpenseActions = () => useAppStore((state) => ({
  addExpense: state.addExpense,
  updateExpense: state.updateExpense,
  deleteExpense: state.deleteExpense,
  setSearchQuery: state.setSearchQuery,
  setSelectedCategory: state.setSelectedCategory,
  setDateRange: state.setDateRange,
  clearFilters: state.clearFilters,
}));

export const useSettingsActions = () => useAppStore((state) => ({
  updateSettings: state.updateSettings,
  setTheme: state.setTheme,
  setLanguage: state.setLanguage,
  setCurrency: state.setCurrency,
  toggleNotifications: state.toggleNotifications,
  toggleBiometric: state.toggleBiometric,
}));

export const useDataActions = () => useAppStore((state) => ({
  exportData: state.exportData,
  importData: state.importData,
  clearAllData: state.clearAllData,
}));

// Computed value hooks
export const useFinancialData = () => {
  const expenses = useAppStore((state) => state.expenses);
  
  return useAppStore((state) => {
    const totalExpenses = state.expenses
      .filter((expense) => expense.type === 'expense')
      .reduce((total, expense) => total + expense.amount, 0);
    
    const totalIncome = state.expenses
      .filter((expense) => expense.type === 'income')
      .reduce((total, expense) => total + expense.amount, 0);
    
    const balance = totalIncome - totalExpenses;
    
    const expensesByCategory = {};
    state.expenses
      .filter((expense) => expense.type === 'expense')
      .forEach((expense) => {
        if (!expensesByCategory[expense.category]) {
          expensesByCategory[expense.category] = 0;
        }
        expensesByCategory[expense.category] += expense.amount;
      });
    
    const recentExpenses = state.expenses
      .sort((a, b) => new Date(b.date) - new Date(a.date))
      .slice(0, 5);
    
    return {
      totalExpenses,
      totalIncome,
      balance,
      expensesByCategory,
      recentExpenses,
    };
  });
};
