import React from 'react';
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import BottomTabs from './src/components/BottomTabs';
import CustomHeader from './src/components/CustomHeader';
import SettingsPage from './src/pages/SettingsPage';
import ThemeProvider from './src/providers/ThemeProvider';
import { useSettingsStore } from './src/store/settingsStore';
import { useColorScheme } from 'react-native';

const Drawer = createDrawerNavigator();

function AppContent(): React.JSX.Element {
  const { settings } = useSettingsStore();
  const systemColorScheme = useColorScheme();

  // Force re-render when settings change by accessing the settings object
  React.useEffect(() => {
    // This ensures component re-renders when settings change
  }, [settings.theme]);

  // Determine the active theme
  const getActiveTheme = () => {
    if (settings.theme === 'auto') {
      return systemColorScheme || 'light';
    }
    return settings.theme;
  };

  const activeTheme = getActiveTheme();

  // Create custom navigation theme
  const navigationTheme = activeTheme === 'dark' 
    ? {
        ...DarkTheme,
        colors: {
          ...DarkTheme.colors,
          primary: '#007bff',
          background: '#000000',
          card: '#1a1a1a',
          text: '#ffffff',
          border: '#333333',
        },
      }
    : {
        ...DefaultTheme,
        colors: {
          ...DefaultTheme.colors,
          primary: '#007bff',
          background: '#ffffff',
          card: '#f8f9fa',
          text: '#333333',
          border: '#e9ecef',
        },
      };

  return (
    <NavigationContainer theme={navigationTheme}>
      <Drawer.Navigator
        screenOptions={{
          drawerStyle: {
            backgroundColor: navigationTheme.colors.card,
          },
          drawerLabelStyle: {
            color: navigationTheme.colors.text,
          },
          drawerActiveTintColor: navigationTheme.colors.primary,
          drawerInactiveTintColor: navigationTheme.colors.text,
          headerStyle: {
            backgroundColor: navigationTheme.colors.card,
          },
          headerTintColor: navigationTheme.colors.text,
          headerTitleStyle: {
            color: navigationTheme.colors.text,
          },
        }}
      >
        <Drawer.Screen name="Main" component={BottomTabs} />
        <Drawer.Screen name="Settings" component={SettingsPage} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}

function App(): React.JSX.Element {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}

export default App;
