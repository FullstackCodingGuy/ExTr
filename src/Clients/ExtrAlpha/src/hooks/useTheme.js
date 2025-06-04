import { useSettingsStore } from '../store/settingsStore';
import { useColorScheme } from 'react-native';

/**
 * Hook to get the current active theme and theme-related utilities
 * @returns {Object} Theme utilities and current theme
 */
export const useTheme = () => {
  const { settings } = useSettingsStore();
  const systemColorScheme = useColorScheme();

  // Determine the actual theme to use
  const getActiveTheme = () => {
    if (settings.theme === 'auto') {
      return systemColorScheme || 'light';
    }
    return settings.theme;
  };

  const activeTheme = getActiveTheme();
  const isDark = activeTheme === 'dark';

  // Theme-aware colors (for components that need manual color handling)
  const colors = {
    background: isDark ? '#000000' : '#ffffff',
    backgroundStrong: isDark ? '#1a1a1a' : '#f8f9fa',
    text: isDark ? '#ffffff' : '#333333',
    textSecondary: isDark ? '#cccccc' : '#666666',
    textMuted: isDark ? '#999999' : '#999999',
    border: isDark ? '#333333' : '#e9ecef',
    primary: '#007bff',
    success: '#28a745',
    warning: '#ffc107',
    danger: '#dc3545',
  };

  return {
    theme: activeTheme,
    isDark,
    colors,
    settings,
  };
};

export default useTheme;
