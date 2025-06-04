import React, { useState } from 'react';
import { YStack, XStack, Text, Card, H3, Separator, Switch, Select, Button } from 'tamagui';
import { ScrollView, Alert, TouchableOpacity, Modal } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useSettingsStore, themeOptions, languageOptions, currencyOptions } from '../store/settingsStore';

const SettingsPage = () => {
  // Get settings from store
  const { 
    settings, 
    setTheme, 
    setLanguage, 
    setCurrency, 
    setNotifications,
    resetSettings
  } = useSettingsStore();
  
  // Dropdown state
  const [themeDropdownVisible, setThemeDropdownVisible] = useState(false);
  const [languageDropdownVisible, setLanguageDropdownVisible] = useState(false);
  const [currencyDropdownVisible, setCurrencyDropdownVisible] = useState(false);

  // Custom Dropdown Component
  const CustomDropdown = ({ visible, onClose, options, selectedValue, onSelect, title }) => (
    <Modal visible={visible} transparent animationType="fade">
      <TouchableOpacity 
        style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'center', alignItems: 'center' }}
        onPress={onClose}
      >
        <YStack 
          backgroundColor="$backgroundStrong" 
          borderRadius={12} 
          padding={20} 
          margin={20} 
          maxHeight="70%" 
          minWidth="80%"
          borderWidth={1} 
          borderColor="$borderColor"
        >
          <XStack justifyContent="space-between" alignItems="center" marginBottom={15}>
            <Text fontSize={18} fontWeight="bold" color="$color">{title}</Text>
            <TouchableOpacity onPress={onClose}>
              <Icon name="close" size={24} color="$colorPress" />
            </TouchableOpacity>
          </XStack>
          
          <ScrollView showsVerticalScrollIndicator={false}>
            <YStack space={5}>
              {options.map((option) => (
                <TouchableOpacity
                  key={option.value}
                  onPress={() => {
                    onSelect(option.value);
                    onClose();
                  }}
                >
                  <XStack 
                    padding={12} 
                    borderRadius={8} 
                    backgroundColor={selectedValue === option.value ? "$blue2" : "transparent"}
                    borderWidth={selectedValue === option.value ? 1 : 0}
                    borderColor={selectedValue === option.value ? "$blue8" : "transparent"}
                    alignItems="center"
                    justifyContent="space-between"
                  >
                    <Text color="$color" fontSize={14}>{option.label}</Text>
                    {selectedValue === option.value && (
                      <Icon name="check" size={20} color="$blue8" />
                    )}
                  </XStack>
                </TouchableOpacity>
              ))}
            </YStack>
          </ScrollView>
        </YStack>
      </TouchableOpacity>
    </Modal>
  );

  const handleSaveSettings = () => {
    // Settings are automatically saved due to Zustand persistence
    Alert.alert('Success', 'Settings saved successfully!', [{ text: 'OK' }]);
  };

  const handleExportData = () => {
    Alert.alert('Export Data', 'Your data will be exported to your device.', [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Export', onPress: () => console.log('Exporting data...') }
    ]);
  };

  const handleClearCache = () => {
    Alert.alert('Clear Cache', 'This will clear all cached data. Continue?', [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Clear', onPress: () => console.log('Clearing cache...') }
    ]);
  };

  const handleDeleteAllData = () => {
    Alert.alert(
      'Delete All Data', 
      'This action cannot be undone. All your expense data will be permanently deleted.',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Delete', style: 'destructive', onPress: () => console.log('Deleting all data...') }
      ]
    );
  };

  const handleSignOut = () => {
    Alert.alert(
      'Sign Out', 
      'Are you sure you want to sign out?',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Sign Out', style: 'destructive', onPress: () => {
          resetSettings();
          console.log('User signed out...');
        }}
      ]
    );
  };

  return (
    <YStack flex={1} backgroundColor="$background">
      {/* Header Section */}
      <YStack padding={20} paddingBottom={10} backgroundColor="$backgroundStrong" borderBottomWidth={1} borderBottomColor="$borderColor">
        <XStack alignItems="center" justifyContent="center" space={10}>
          <Icon name="cog" size={24} color="$blue8" />
          <H3 textAlign="center" color="$color">Settings</H3>
        </XStack>
      </YStack>

      <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
        <YStack paddingHorizontal={20} space={15} paddingBottom={100}>
          
          {/* Appearance Section */}
          <Card elevation={2} padding={16} backgroundColor="$backgroundStrong" borderRadius={12} borderWidth={1} borderColor="$borderColor">
            <YStack space={15}>
              <XStack alignItems="center" space={10}>
                <Icon name="palette" size={20} color="$blue8" />
                <Text fontSize={18} fontWeight="bold" color="$color">Appearance</Text>
              </XStack>
              
              <YStack space={10}>
                <Text fontSize={14} fontWeight="600" color="$colorPress">Theme</Text>
                <TouchableOpacity onPress={() => setThemeDropdownVisible(true)}>
                  <XStack 
                    backgroundColor="$background" 
                    borderRadius={8} 
                    borderWidth={1} 
                    borderColor="$borderColor"
                    height={45}
                    paddingHorizontal={12}
                    alignItems="center"
                    justifyContent="space-between"
                  >
                    <Text color="$color" fontSize={14}>
                      {themeOptions.find(option => option.value === settings.theme)?.label}
                    </Text>
                    <Icon name="chevron-down" size={20} color="$colorPress" />
                  </XStack>
                </TouchableOpacity>
              </YStack>
            </YStack>
          </Card>

          {/* Language & Region Section */}
          <Card elevation={2} padding={16} backgroundColor="$backgroundStrong" borderRadius={12} borderWidth={1} borderColor="$borderColor">
            <YStack space={15}>
              <XStack alignItems="center" space={10}>
                <Icon name="translate" size={20} color="$blue8" />
                <Text fontSize={18} fontWeight="bold" color="$color">Language & Region</Text>
              </XStack>
              
              <YStack space={10}>
                <Text fontSize={14} fontWeight="600" color="$colorPress">Language</Text>
                <TouchableOpacity onPress={() => setLanguageDropdownVisible(true)}>
                  <XStack 
                    backgroundColor="$background" 
                    borderRadius={8} 
                    borderWidth={1} 
                    borderColor="$borderColor"
                    height={45}
                    paddingHorizontal={12}
                    alignItems="center"
                    justifyContent="space-between"
                  >
                    <Text color="$color" fontSize={14}>
                      {languageOptions.find(option => option.value === settings.language)?.label}
                    </Text>
                    <Icon name="chevron-down" size={20} color="$colorPress" />
                  </XStack>
                </TouchableOpacity>
              </YStack>

              <YStack space={10}>
                <Text fontSize={14} fontWeight="600" color="$colorPress">Default Currency</Text>
                <TouchableOpacity onPress={() => setCurrencyDropdownVisible(true)}>
                  <XStack 
                    backgroundColor="$background" 
                    borderRadius={8} 
                    borderWidth={1} 
                    borderColor="$borderColor"
                    height={45}
                    paddingHorizontal={12}
                    alignItems="center"
                    justifyContent="space-between"
                  >
                    <Text color="$color" fontSize={14}>
                      {currencyOptions.find(option => option.value === settings.currency)?.label}
                    </Text>
                    <Icon name="chevron-down" size={20} color="$colorPress" />
                  </XStack>
                </TouchableOpacity>
              </YStack>
            </YStack>
          </Card>

          {/* Notifications Section */}
          <Card elevation={2} padding={16} backgroundColor="$backgroundStrong" borderRadius={12} borderWidth={1} borderColor="$borderColor">
            <YStack space={15}>
              <XStack alignItems="center" space={10}>
                <Icon name="bell" size={20} color="$blue8" />
                <Text fontSize={18} fontWeight="bold" color="$color">Notifications</Text>
              </XStack>
              
              <XStack justifyContent="space-between" alignItems="center">
                <YStack flex={1}>
                  <Text fontSize={14} fontWeight="600" color="$color">Push Notifications</Text>
                  <Text fontSize={12} color="$colorPress">Receive expense reminders and updates</Text>
                </YStack>
                <Switch 
                  size="$4"
                  checked={settings.notifications} 
                  onCheckedChange={setNotifications}
                  backgroundColor={settings.notifications ? "$blue8" : "$gray6"}
                  borderColor={settings.notifications ? "$blue8" : "$gray6"}
                >
                  <Switch.Thumb 
                    animation="bouncy" 
                    backgroundColor="white"
                  />
                </Switch>
              </XStack>
            </YStack>
          </Card>

          {/* Data & Privacy Section */}
          <Card elevation={2} padding={16} backgroundColor="$backgroundStrong" borderRadius={12} borderWidth={1} borderColor="$borderColor">
            <YStack space={15}>
              <XStack alignItems="center" space={10}>
                <Icon name="database" size={20} color="$blue8" />
                <Text fontSize={18} fontWeight="bold" color="$color">Data & Privacy</Text>
              </XStack>
              
              <YStack space={12}>
                <XStack justifyContent="space-between" alignItems="center" minHeight={40}>
                  <XStack alignItems="center" space={8} flex={1}>
                    <Icon name="export" size={18} color="$blue8" />
                    <YStack>
                      <Text fontSize={14} fontWeight="600" color="$color">Export Data</Text>
                      <Text fontSize={12} color="$colorPress">Download your expense data</Text>
                    </YStack>
                  </XStack>
                  <Button 
                    size="$3" 
                    backgroundColor="$blue8" 
                    color="white" 
                    borderRadius={8} 
                    onPress={handleExportData}
                    paddingHorizontal={16}
                    pressStyle={{ backgroundColor: "$blue9" }}
                  >
                    Export
                  </Button>
                </XStack>
                
                <Separator />
                
                <XStack justifyContent="space-between" alignItems="center" minHeight={40}>
                  <XStack alignItems="center" space={8} flex={1}>
                    <Icon name="delete-sweep" size={18} color="$colorPress" />
                    <YStack>
                      <Text fontSize={14} fontWeight="600" color="$color">Clear Cache</Text>
                      <Text fontSize={12} color="$colorPress">Free up storage space</Text>
                    </YStack>
                  </XStack>
                  <Button 
                    size="$3" 
                    backgroundColor="$gray8" 
                    color="white" 
                    borderRadius={8} 
                    onPress={handleClearCache}
                    paddingHorizontal={16}
                    pressStyle={{ backgroundColor: "$gray9" }}
                  >
                    Clear
                  </Button>
                </XStack>

                <Separator />

                <XStack justifyContent="space-between" alignItems="center" minHeight={40}>
                  <XStack alignItems="center" space={8} flex={1}>
                    <Icon name="delete-forever" size={18} color="$red8" />
                    <YStack>
                      <Text fontSize={14} fontWeight="600" color="$red8">Delete All Data</Text>
                      <Text fontSize={12} color="$colorPress">Permanently remove all data</Text>
                    </YStack>
                  </XStack>
                  <Button 
                    size="$3" 
                    backgroundColor="$red8" 
                    color="white" 
                    borderRadius={8} 
                    onPress={handleDeleteAllData}
                    paddingHorizontal={16}
                    pressStyle={{ backgroundColor: "$red9" }}
                  >
                    Delete
                  </Button>
                </XStack>
              </YStack>
            </YStack>
          </Card>

          {/* About Section */}
          <Card elevation={2} padding={16} backgroundColor="$backgroundStrong" borderRadius={12} borderWidth={1} borderColor="$borderColor">
            <YStack space={15}>
              <XStack alignItems="center" space={10}>
                <Icon name="information" size={20} color="$blue8" />
                <Text fontSize={18} fontWeight="bold" color="$color">About</Text>
              </XStack>
              
              <YStack space={8}>
                <XStack justifyContent="space-between">
                  <XStack alignItems="center" space={8}>
                    <Icon name="application" size={16} color="$colorPress" />
                    <Text fontSize={14} color="$colorPress">App Version</Text>
                  </XStack>
                  <Text fontSize={14} color="$color">1.0.0</Text>
                </XStack>
                
                <XStack justifyContent="space-between">
                  <XStack alignItems="center" space={8}>
                    <Icon name="file-document" size={16} color="#666" />
                    <Text fontSize={14} color="$colorPress">Terms of Service</Text>
                  </XStack>
                  <Text fontSize={14} color="#007bff">View</Text>
                </XStack>

                <XStack justifyContent="space-between">
                  <XStack alignItems="center" space={8}>
                    <Icon name="shield-account" size={16} color="#666" />
                    <Text fontSize={14} color="$colorPress">Privacy Policy</Text>
                  </XStack>
                  <Text fontSize={14} color="#007bff">View</Text>
                </XStack>
              </YStack>
            </YStack>
          </Card>

          {/* Sign Out Section */}
          <Card elevation={2} padding={16} backgroundColor="$backgroundStrong" borderRadius={12} borderWidth={1} borderColor="$borderColor">
            <YStack space={15}>
              <XStack alignItems="center" space={10}>
                <Icon name="logout" size={20} color="#dc3545" />
                <Text fontSize={18} fontWeight="bold" color="$color">Account</Text>
              </XStack>
              
              <XStack justifyContent="space-between" alignItems="center" minHeight={40}>
                <XStack alignItems="center" space={8} flex={1}>
                  <Icon name="account-remove" size={18} color="#dc3545" />
                  <YStack>
                    <Text fontSize={14} fontWeight="600" color="#dc3545">Sign Out</Text>
                    <Text fontSize={12} color="$colorPress">Sign out of your account</Text>
                  </YStack>
                </XStack>
                <Button 
                  size="$3" 
                  backgroundColor="#dc3545" 
                  color="white" 
                  borderRadius={8} 
                  onPress={handleSignOut}
                  paddingHorizontal={16}
                  pressStyle={{ backgroundColor: "#c82333" }}
                >
                  <XStack alignItems="center" space={6}>
                    <Icon name="logout" size={14} color="white" />
                    <Text color="white" fontSize={14} fontWeight="600">Sign Out</Text>
                  </XStack>
                </Button>
              </XStack>
            </YStack>
          </Card>
        </YStack>
      </ScrollView>

      {/* Dropdown Modals */}
      <CustomDropdown
        visible={themeDropdownVisible}
        onClose={() => setThemeDropdownVisible(false)}
        options={themeOptions}
        selectedValue={settings.theme}
        onSelect={setTheme}
        title="Select Theme"
      />

      <CustomDropdown
        visible={languageDropdownVisible}
        onClose={() => setLanguageDropdownVisible(false)}
        options={languageOptions}
        selectedValue={settings.language}
        onSelect={setLanguage}
        title="Select Language"
      />

      <CustomDropdown
        visible={currencyDropdownVisible}
        onClose={() => setCurrencyDropdownVisible(false)}
        options={currencyOptions}
        selectedValue={settings.currency}
        onSelect={setCurrency}
        title="Select Currency"
      />
    </YStack>
  );
};

export default SettingsPage;
