import React from 'react';
import type { PropsWithChildren } from 'react';
import {
  Text,
  useColorScheme,
} from 'react-native';

import { createTamagui, TamaguiProvider, View } from 'tamagui'
import { defaultConfig } from '@tamagui/config/v4' // for quick config install this
import { HomeDemo } from './src/pages/HomeDemo';
import Profile from './src/pages/Profile';


const config = createTamagui(defaultConfig)

function App(): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <TamaguiProvider config={config}>
      {/* <HomeDemo /> */}
      <Profile />
    </TamaguiProvider>
  );
}

export default App;
