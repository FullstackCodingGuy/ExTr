import React from 'react';
import { YStack, Text } from 'tamagui';

const Search = () => {
  return (
    <YStack flex={1} justifyContent="center" alignItems="center" backgroundColor="$background">
      <Text fontSize={24} fontWeight="bold" color="$color">Search Page</Text>
    </YStack>
  );
};

export default Search;
