import React, { useState } from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import PickerMonthDay from './PickerMonthDay';

const NumberPad = () => {
  const [amount, setAmount] = useState('');

  const handleInput = (input) => {
    if (input === 'delete') {
      setAmount(amount.slice(0, -1));
    } else {
      setAmount(amount + input);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.amount}>{amount}</Text>
      <View style={styles.container2}>
        <View>
          <View style={styles.row}>
            <Pressable onPress={() => handleInput('7')} style={styles.button}>
              <Text style={styles.buttonText}>7</Text>
            </Pressable>
            <Pressable onPress={() => handleInput('8')} style={styles.button}>
              <Text style={styles.buttonText}>8</Text>
            </Pressable>
            <Pressable onPress={() => handleInput('9')} style={styles.button}>
              <Text style={styles.buttonText}>9</Text>
            </Pressable>
          </View>
          <View style={styles.row}>
            <Pressable onPress={() => handleInput('4')} style={styles.button}>
              <Text style={styles.buttonText}>4</Text>
            </Pressable>
            <Pressable onPress={() => handleInput('5')} style={styles.button}>
              <Text style={styles.buttonText}>5</Text>
            </Pressable>
            <Pressable onPress={() => handleInput('6')} style={styles.button}>
              <Text style={styles.buttonText}>6</Text>
            </Pressable>
          </View>
          <View style={styles.row}>
            <Pressable onPress={() => handleInput('1')} style={styles.button}>
              <Text style={styles.buttonText}>1</Text>
            </Pressable>
            <Pressable onPress={() => handleInput('2')} style={styles.button}>
              <Text style={styles.buttonText}>2</Text>
            </Pressable>
            <Pressable onPress={() => handleInput('3')} style={styles.button}>
              <Text style={styles.buttonText}>3</Text>
            </Pressable>
          </View>
          <View style={styles.row}>
            <Pressable onPress={() => handleInput('.')} style={styles.button}>
              <Text style={styles.buttonText}>.</Text>
            </Pressable>
            <Pressable onPress={() => handleInput('0')} style={styles.button}>
              <Text style={styles.buttonText}>0</Text>
            </Pressable>
            <Pressable onPress={() => handleInput('delete')} style={styles.button}>
              <Text style={styles.buttonText}>DEL</Text>
            </Pressable>
          </View>
        </View>
        
        <View style={styles.container}>
          <PickerMonthDay/>
          <Pressable style={styles.buttonLong}>
            <Text style={styles.buttonLongText}>Confirm</Text>
          </Pressable>
        </View>

      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor:'black'
  },
  row: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  container2: {
    flex: 1,
    flexDirection: 'row',
  },
  container3: {
    flex: 0.5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 55,
    height: 55,
    // backgroundColor: '#DDDDDD',
    marginHorizontal: 5,
    borderRadius: 5,
    borderWidth: 0.2,
    borderColor: '#FFFFFF'
  },
  buttonLong: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 100,
    height: 50,
    marginHorizontal: 5,
    borderRadius: 5,
    borderWidth: 0.2,
    borderColor: '#FFFFFF'
  },
  buttonText: {
    fontSize: 20,
    color: '#FFFFFF',
  },
  buttonLongText: {
    fontSize: 20,
    fontWeight:'bold',
    color: '#1A43BF',
  },
  amount: {
    fontSize: 24,
    marginBottom: 20,
    color: '#6A6AFF',
  },
});

export default NumberPad;
