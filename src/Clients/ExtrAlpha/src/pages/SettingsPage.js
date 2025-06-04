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
    setBiometric 
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
              <Icon name="close" size={24} color="#666" />
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
                    borderColor={selectedValue === option.value ? "#007bff" : "transparent"}
                    alignItems="center"
                    justifyContent="space-between"
                  >
                    <Text color="$color" fontSize={14}>{option.label}</Text>
                    {selectedValue === option.value && (
                      <Icon name="check" size={20} color="#007bff" />
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

  return (
    <YStack flex={1} backgroundColor="$background">
      {/* Header Section */}
      <YStack padding={20} paddingBottom={10} backgroundColor="$backgroundStrong" borderBottomWidth={1} borderBottomColor="$borderColor">
        <XStack alignItems="center" justifyContent="center" space={10}>
          <Icon name="cog" size={24} color="#007bff" />
          <H3 textAlign="center" color="$color">Settings</H3>
        </XStack>
      </YStack>

      <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
        <YStack paddingHorizontal={20} space={15} paddingBottom={100}>
          
          {/* Appearance Section */}
          <Card elevation={2} padding={16} backgroundColor="$backgroundStrong" borderRadius={12} borderWidth={1} borderColor="$borderColor">
            <YStack space={15}>
              <XStack alignItems="center" space={10}>
                <Icon name="palette" size={20} color="#007bff" />
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
                    <Icon name="chevron-down" size={20} color="#666" />
                  </XStack>
                </TouchableOpacity>
              </YStack>
            </YStack>
          </Card>

          {/* Language & Region Section */}
          <Card elevation={2} padding={16} backgroundColor="$backgroundStrong" borderRadius={12} borderWidth={1} borderColor="$borderColor">
            <YStack space={15}>
              <XStack alignItems="center" space={10}>
                <Icon name="translate" size={20} color="#007bff" />
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
                    <Icon name="chevron-down" size={20} color="#666" />
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
                    <Icon name="chevron-down" size={20} color="#666" />
                  </XStack>
                </TouchableOpacity>
              </YStack>
            </YStack>
          </Card>

          {/* Notifications Section */}
          <Card elevation={2} padding={16} backgroundColor="$backgroundStrong" borderRadius={12} borderWidth={1} borderColor="$borderColor">
            <YStack space={15}>
              <XStack alignItems="center" space={10}>
                <Icon name="bell" size={20} color="#007bff" />
                <Text fontSize={18} fontWeight="bold" color="$color">Notifications</Text>
              </XStack>
              
              <XStack justifyContent="space-between" alignItems="center">
                <YStack>
                  <Text fontSize={14} fontWeight="600" color="$colorPress">Push Notifications</Text>
                  <Text fontSize={12} color="$colorPress">Receive expense reminders and updates</Text>
                </YStack>
                <Switch 
                  checked={settings.notifications} 
                  onCheckedChange={setNotifications}
                  backgroundColor={settings.notifications ? "#007bff" : "#e0e0e0"}
                />
              </XStack>
            </YStack>
          </Card>

          {/* Security Section */}
          <Card elevation={2} padding={16} backgroundColor="$backgroundStrong" borderRadius={12} borderWidth={1} borderColor="$borderColor">
            <YStack space={15}>
              <XStack alignItems="center" space={10}>
                <Icon name="shield-check" size={20} color="#007bff" />
                <Text fontSize={18} fontWeight="bold" color="$color">Security</Text>
              </XStack>
              
              <XStack justifyContent="space-between" alignItems="center">
                <YStack>
                  <Text fontSize={14} fontWeight="600" color="$colorPress">Biometric Authentication</Text>
                  <Text fontSize={12} color="$colorPress">Use fingerprint or face ID to unlock</Text>
                </YStack>
                <Switch 
                  checked={settings.biometric} 
                  onCheckedChange={setBiometric}
                  backgroundColor={settings.biometric ? "#007bff" : "#e0e0e0"}
                />
              </XStack>
            </YStack>
          </Card>

          {/* Data & Privacy Section */}
          <Card elevation={2} padding={16} backgroundColor="$backgroundStrong" borderRadius={12} borderWidth={1} borderColor="$borderColor">
            <YStack space={15}>
              <XStack alignItems="center" space={10}>
                <Icon name="database" size={20} color="#007bff" />
                <Text fontSize={18} fontWeight="bold" color="$color">Data & Privacy</Text>
              </XStack>
              
              <YStack space={12}>
                <XStack justifyContent="space-between" alignItems="center">
                  <XStack alignItems="center" space={8}>
                    <Icon name="export" size={16} color="#666" />
                    <Text fontSize={14} color="$colorPress">Export Data</Text>
                  </XStack>
                  <Button size="small" backgroundColor="#007bff" color="white" borderRadius={6} onPress={handleExportData}>
                    Export
                  </Button>
                </XStack>
                
                <XStack justifyContent="space-between" alignItems="center">
                  <XStack alignItems="center" space={8}>
                    <Icon name="delete-sweep" size={16} color="#666" />
                    <Text fontSize={14} color="$colorPress">Clear Cache</Text>
                  </XStack>
                  <Button size="small" backgroundColor="#6c757d" color="white" borderRadius={6} onPress={handleClearCache}>
                    Clear
                  </Button>
                </XStack>

                <XStack justifyContent="space-between" alignItems="center">
                  <XStack alignItems="center" space={8}>
                    <Icon name="delete-forever" size={16} color="#dc3545" />
                    <Text fontSize={14} color="#dc3545">Delete All Data</Text>
                  </XStack>
                  <Button size="small" backgroundColor="#dc3545" color="white" borderRadius={6} onPress={handleDeleteAllData}>
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
                <Icon name="information" size={20} color="#007bff" />
                <Text fontSize={18} fontWeight="bold" color="$color">About</Text>
              </XStack>
              
              <YStack space={8}>
                <XStack justifyContent="space-between">
                  <XStack alignItems="center" space={8}>
                    <Icon name="application" size={16} color="#666" />
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

          {/* Save Button */}
          <Button 
            backgroundColor="#007bff" 
            borderRadius={10} 
            onPress={handleSaveSettings}
            elevation={3}
            pressStyle={{ backgroundColor: "#0056b3" }}
            height={50}
            marginTop={10}
          >
            <XStack alignItems="center" justifyContent="center" space={8} paddingHorizontal={20}>
              <Icon name="content-save" size={18} color="white" />
              <Text color="white" fontSize={16} fontWeight="bold">Save Settings</Text>
            </XStack>
          </Button>
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
