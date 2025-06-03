import React from 'react';
import { XStack, Button } from 'tamagui';

const BottomTab = ({ onNavigate }) => {
  return (
    <XStack height={60} padding={10} space={20} backgroundColor="$light" justifyContent="space-around" alignItems="center">
      <Button onPress={() => onNavigate('Home')}>Home</Button>
      <Button onPress={() => onNavigate('Search')}>Search</Button>
      <Button onPress={() => onNavigate('Settings')}>Settings</Button>
    </XStack>
  );
};

export default BottomTab;
