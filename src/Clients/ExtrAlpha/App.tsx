import React from 'react';
import { StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import BottomTabs from './src/components/BottomTabs';
import CustomHeader from './src/components/CustomHeader';
import SettingsPage from './src/pages/SettingsPage';
import { TamaguiProvider } from 'tamagui';
import config from './src/tamagui.config';

const Drawer = createDrawerNavigator();

function App(): React.JSX.Element {
  return (
    <TamaguiProvider config={config}>
      <StatusBar barStyle="dark-content" backgroundColor="#f8f9fa" />
      <NavigationContainer>
        <Drawer.Navigator
          screenOptions={{
            // header: (props) => <CustomHeader {...props} />, // Custom header with toggle button
          }}
        >
          <Drawer.Screen name="Main" component={BottomTabs} />
          <Drawer.Screen name="Settings" component={SettingsPage} />
        </Drawer.Navigator>
      </NavigationContainer>
    </TamaguiProvider>
  );
}

export default App;
