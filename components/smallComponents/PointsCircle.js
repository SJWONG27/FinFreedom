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
    borderRadius: 10,
    backgroundColor: '#000000',
    justifyContent: 'center',
    alignItems: 'center',
    shadowOffset: {
      width: 0,
      height: 2,
  },
  shadowOpacity: 0.25,
  shadowRadius: 3.84,
  elevation: 15,

  },
  text: {
    fontSize: 10,
    fontWeight: 'bold',
    textAlign: 'center',
    color:'#FFF',
  },
});

export default CircleWithText;
