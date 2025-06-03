import React from 'react';
import { YStack, XStack, Avatar, Text, Button, Separator } from 'tamagui';

const Profile = () => {
  return (
    <YStack padding={20} space={20} alignItems="center">
      {/* Profile Header */}
      <YStack alignItems="center" space={10}>
        <Avatar size={100} circular>
          <Avatar.Image src="https://via.placeholder.com/100" />
        </Avatar>
        <Text fontSize={20} fontWeight="bold">John Doe</Text>
        <Text color="gray">johndoe@example.com</Text>
      </YStack>

      <Separator />

      {/* Profile Details */}
      <YStack width="100%" space={15}>
        <XStack justifyContent="space-between">
          <Text fontWeight="bold">Phone:</Text>
          <Text>+1 234 567 890</Text>
        </XStack>
        <XStack justifyContent="space-between">
          <Text fontWeight="bold">Address:</Text>
          <Text>123 Main St, City, Country</Text>
        </XStack>
        <XStack justifyContent="space-between">
          <Text fontWeight="bold">Member Since:</Text>
          <Text>January 2020</Text>
        </XStack>
      </YStack>

      <Separator />

      {/* Action Buttons */}
      <XStack space={10}>
        <Button theme="primary">Edit Profile</Button>
        <Button theme="secondary">Logout</Button>
      </XStack>
    </YStack>
  );
};

export default Profile;
