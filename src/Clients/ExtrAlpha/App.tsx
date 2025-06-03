import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { View, TouchableOpacity, StatusBar } from 'react-native';
import Home from './src/pages/Home';
import Search from './src/pages/Search';
import Settings from './src/pages/Settings';
import { TamaguiProvider } from 'tamagui';
import config from './src/tamagui.config';

const Drawer = createDrawerNavigator();
const Tab = createBottomTabNavigator();

const CustomHeader = ({ navigation, route }) => (
  <View style={{ flexDirection: 'row', alignItems: 'center', padding: 10, marginStart: 20, marginTop:30, backgroundColor: '#f8f9fa' }}>
    <TouchableOpacity onPress={() => navigation.toggleDrawer()} style={{ marginRight: 10 }}>
      <Icon name="menu" size={24} color="#000" />
    </TouchableOpacity>
    <Icon name="arrow-back" size={24} color="transparent" />
  </View>
);

const BottomTabs = () => (
  <Tab.Navigator
    screenOptions={({ route }) => ({
      headerShown: false, // Hide header for bottom tabs
      tabBarIcon: ({ focused, color, size }) => {
        let iconName;

        if (route.name === 'Home') {
          iconName = focused ? 'home' : 'home-outline';
        } else if (route.name === 'Search') {
          iconName = focused ? 'text-search' : 'text-search';
        } else if (route.name === 'Settings') {
          iconName = focused ? 'account-settings' : 'account-settings';
        }

        return <Icon name={iconName} size={size} color={color} />;
      },
      tabBarActiveTintColor: '#007bff',
      tabBarInactiveTintColor: 'gray',
      tabBarStyle: {
        backgroundColor: '#f8f9fa',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        height: 70,
        position: 'absolute',
        overflow: 'hidden',
      },
      tabBarLabelStyle: {
        fontSize: 12,
        fontWeight: 'bold',
      },
      tabBarHideOnKeyboard: true,
    })}
  >
    <Tab.Screen name="Home" component={Home} />
    <Tab.Screen name="Search" component={Search} />
    <Tab.Screen name="Settings" component={Settings} />
  </Tab.Navigator>
);

function App(): React.JSX.Element {
  return (
    <TamaguiProvider config={config}>
      <StatusBar barStyle="dark-content" backgroundColor="#f8f9fa" />
      <NavigationContainer>
        <Drawer.Navigator
          // screenOptions={({ navigation }) => ({
          //   header: (props) => <CustomHeader {...props} />, // Add custom header with toggle button
          // })}
        >
          <Drawer.Screen name="Main" component={BottomTabs} />
          <Drawer.Screen name="Settings" component={Settings} />
        </Drawer.Navigator>
      </NavigationContainer>
    </TamaguiProvider>
  );
}

export default App;
