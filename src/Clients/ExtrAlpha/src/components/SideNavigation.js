import React from 'react';
import { YStack, Text, Button } from 'tamagui';

const SideNavigation = ({ onNavigate }) => {
  return (
    <YStack width={200} padding={20} space={20} backgroundColor="$light">
      <Text fontSize={20} fontWeight="bold">Menu</Text>
      <Button onPress={() => onNavigate('Home')}>Home</Button>
      <Button onPress={() => onNavigate('Profile')}>Profile</Button>
      <Button onPress={() => onNavigate('Settings')}>Settings</Button>
    </YStack>
  );
};

export default SideNavigation;
