import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const CircleWithText = ({ text }) => {
  return (
    <View style={styles.circle}>
      <Text style={styles.text}>{text}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  circle: {
    width: 50,
    height: 50,
    borderRadius: 50,
    backgroundColor: '#FFE338',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 10,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default CircleWithText;
