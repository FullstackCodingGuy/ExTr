import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useTheme } from '../hooks/useTheme';

const CustomHeader = ({ navigation }) => {
  const { colors } = useTheme();
  
  return (
    <View style={{ 
      flexDirection: 'row', 
      alignItems: 'center', 
      padding: 10, 
      backgroundColor: colors.backgroundStrong 
    }}>
      <TouchableOpacity onPress={() => navigation.toggleDrawer()} style={{ marginRight: 10 }}>
        <Icon name="menu" size={24} color={colors.text} />
      </TouchableOpacity>
      <Icon name="arrow-back" size={24} color="transparent" />
    </View>
  );
};

export default CustomHeader;
