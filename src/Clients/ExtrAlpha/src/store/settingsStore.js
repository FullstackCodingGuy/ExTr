import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Default settings
const defaultSettings = {
  theme: 'light',
  language: 'en',
  currency: 'USD',
  notifications: true,
};

// Theme options
export const themeOptions = [
  { value: 'light', label: '☀️ Light Theme' },
  { value: 'dark', label: '🌙 Dark Theme' },
  { value: 'auto', label: '🔄 Auto (System)' }
];

// Language options
export const languageOptions = [
  { value: 'en', label: '🇺🇸 English' },
  { value: 'es', label: '🇪🇸 Spanish' },
  { value: 'fr', label: '🇫🇷 French' },
  { value: 'de', label: '🇩🇪 German' },
  { value: 'zh', label: '🇨🇳 Chinese' },
  { value: 'ja', label: '🇯🇵 Japanese' },
  { value: 'ko', label: '🇰🇷 Korean' },
  { value: 'it', label: '🇮🇹 Italian' },
  { value: 'pt', label: '🇵🇹 Portuguese' },
  { value: 'ru', label: '🇷🇺 Russian' },
  { value: 'ar', label: '🇸🇦 Arabic' },
  { value: 'hi', label: '🇮🇳 Hindi' }
];

// Currency options
export const currencyOptions = [
  { value: 'USD', label: '🇺🇸 USD - US Dollar' },
  { value: 'EUR', label: '🇪🇺 EUR - Euro' },
  { value: 'GBP', label: '🇬🇧 GBP - British Pound' },
  { value: 'JPY', label: '🇯🇵 JPY - Japanese Yen' },
  { value: 'INR', label: '🇮🇳 INR - Indian Rupee' },
  { value: 'CAD', label: '🇨🇦 CAD - Canadian Dollar' },
  { value: 'AUD', label: '🇦🇺 AUD - Australian Dollar' },
  { value: 'CHF', label: '🇨🇭 CHF - Swiss Franc' },
  { value: 'CNY', label: '🇨🇳 CNY - Chinese Yuan' },
  { value: 'SEK', label: '🇸🇪 SEK - Swedish Krona' },
  { value: 'NOK', label: '🇳🇴 NOK - Norwegian Krone' },
  { value: 'SGD', label: '🇸🇬 SGD - Singapore Dollar' }
];

// Create the settings store with persistence
export const useSettingsStore = create(
  persist(
    (set, get) => ({
      // Settings state
      settings: defaultSettings,

      // Actions
      updateSetting: (key, value) => {
        set((state) => ({
          settings: {
            ...state.settings,
            [key]: value,
          },
        }));
      },

      updateSettings: (newSettings) => {
        set((state) => ({
          settings: {
            ...state.settings,
            ...newSettings,
          },
        }));
      },

      resetSettings: () => {
        set({ settings: defaultSettings });
      },

      // Getters
      getTheme: () => get().settings.theme,
      getLanguage: () => get().settings.language,
      getCurrency: () => get().settings.currency,
      getNotifications: () => get().settings.notifications,

      // Theme specific actions
      setTheme: (theme) => {
        set((state) => ({
          settings: {
            ...state.settings,
            theme,
          },
        }));
      },

      // Language specific actions
      setLanguage: (language) => {
        set((state) => ({
          settings: {
            ...state.settings,
            language,
          },
        }));
      },

      // Currency specific actions
      setCurrency: (currency) => {
        set((state) => ({
          settings: {
            ...state.settings,
            currency,
          },
        }));
      },

      // Notifications specific actions
      setNotifications: (notifications) => {
        set((state) => ({
          settings: {
            ...state.settings,
            notifications,
          },
        }));
      },
    }),
    {
      name: 'extr-settings-storage', // unique name for storage
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (state) => ({ settings: state.settings }), // only persist settings
    }
  )
);
