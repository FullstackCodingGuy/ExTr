import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from './src/pages/Home';
import Search from './src/pages/Search';
import Settings from './src/pages/Settings';
import { TamaguiProvider } from 'tamagui';
import config from './src/tamagui.config';

const Drawer = createDrawerNavigator();
const Tab = createBottomTabNavigator();

const BottomTabs = () => (
  <Tab.Navigator>
    <Tab.Screen name="Home" component={Home} />
    <Tab.Screen name="Search" component={Search} />
    <Tab.Screen name="Settings" component={Settings} />
  </Tab.Navigator>
);

function App(): React.JSX.Element {
  return (
    <TamaguiProvider config={config}>
      <NavigationContainer>
        <Drawer.Navigator>
          <Drawer.Screen name="Main" component={BottomTabs} />
          <Drawer.Screen name="Settings" component={Settings} />
        </Drawer.Navigator>
      </NavigationContainer>
    </TamaguiProvider>
  );
}

export default App;
