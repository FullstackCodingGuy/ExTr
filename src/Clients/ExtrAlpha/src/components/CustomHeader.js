import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const CustomHeader = ({ navigation }) => (
  <View style={{ flexDirection: 'row', alignItems: 'center', padding: 10, backgroundColor: '#f8f9fa' }}>
    <TouchableOpacity onPress={() => navigation.toggleDrawer()} style={{ marginRight: 10 }}>
      <Icon name="menu" size={24} color="#000" />
    </TouchableOpacity>
    <Icon name="arrow-back" size={24} color="transparent" />
  </View>
);

export default CustomHeader;
