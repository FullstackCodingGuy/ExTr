import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import BottomTabs from './src/components/BottomTabs';
import CustomHeader from './src/components/CustomHeader';
import SettingsPage from './src/pages/SettingsPage';
import ThemeProvider from './src/providers/ThemeProvider';

const Drawer = createDrawerNavigator();

function App(): React.JSX.Element {
  return (
    <ThemeProvider>
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
    </ThemeProvider>
  );
}

export default App;
