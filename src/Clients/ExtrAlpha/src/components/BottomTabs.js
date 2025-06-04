import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Home from '../pages/Home';
import Search from '../pages/Search';
import SettingsPage from '../pages/SettingsPage';
import ExpenseTransactionForm from './ExpenseTransactionForm';
import ExpenseList from './ExpenseList';
import { useTheme } from '../hooks/useTheme';
import { useSettingsStore } from '../store/settingsStore';

const Tab = createBottomTabNavigator();

const BottomTabs = () => {
  const { isDark, colors } = useTheme();
  const { settings } = useSettingsStore(); // This ensures re-render on settings change

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false, // Hide header for bottom tabs
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = focused ? 'home' : 'home';
          } else if (route.name === 'Search') {
            iconName = focused ? 'text-search' : 'text-search';
          } else if (route.name === 'Settings') {
            iconName = focused ? 'account-settings' : 'account-settings';
          }

          return <Icon name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.textSecondary,
        tabBarStyle: {
          backgroundColor: colors.backgroundStrong,
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
          height: 70,
          position: 'absolute',
          overflow: 'hidden',
          borderTopWidth: 1,
          borderTopColor: colors.border,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: 'bold',
          color: colors.text,
        },
        tabBarHideOnKeyboard: true,
      })}
    >
      <Tab.Screen name="Home" component={ExpenseList} />
      <Tab.Screen name="Search" component={Search} />
      <Tab.Screen name="Settings" component={SettingsPage} />
    </Tab.Navigator>
  );
};

export default BottomTabs;
