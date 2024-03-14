import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const StaticBar = ({ percentage }) => {
  return (
    <View style={staticStyles.container}>
      <View style={[staticStyles.bar, { width: `${percentage}%` }]}/>
    </View>
  );
};

const staticStyles = StyleSheet.create({
  container: {
    width: '100%',
    height: 15,
    backgroundColor: 'lightgray',
    borderRadius: 10,
    overflow: 'hidden',
  },
  bar: {
    height: '100%',
    width: 20,
    backgroundColor: '#FFE338',
  },
});

export default StaticBar;
