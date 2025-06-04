import React, { useEffect } from 'react';
import { TamaguiProvider, Theme } from 'tamagui';
import { useColorScheme, StatusBar } from 'react-native';
import { useSettingsStore } from '../store/settingsStore';
import config from '../tamagui.config';

const ThemeProvider = ({ children }) => {
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

  // Update status bar based on theme
  useEffect(() => {
    if (activeTheme === 'dark') {
      StatusBar.setBarStyle('light-content');
      StatusBar.setBackgroundColor('#000000');
    } else {
      StatusBar.setBarStyle('dark-content');
      StatusBar.setBackgroundColor('#f8f9fa');
    }
  }, [activeTheme]);

  return (
    <TamaguiProvider config={config} defaultTheme={activeTheme}>
      <Theme name={activeTheme}>
        {children}
      </Theme>
    </TamaguiProvider>
  );
};

export default ThemeProvider;
