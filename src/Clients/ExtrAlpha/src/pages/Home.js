import React from 'react';
import { YStack, Text } from 'tamagui';

const Home = () => {
  return (
    <YStack flex={1} justifyContent="center" alignItems="center" backgroundColor="$background">
      <Text fontSize={24} fontWeight="bold" color="$color">Home Page</Text>
    </YStack>
  );
};

export default Home;
