import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native'; // Remove Picker import from here
import { Picker } from '@react-native-picker/picker'; // Import Picker from '@react-native-picker/picker'

const PickerYearMonth = () => {
  const [selectedYear, setSelectedYear] = useState('2024');
  const [selectedMonth, setSelectedMonth] = useState('January');

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Select Year and Month:</Text>
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={selectedYear}
          onValueChange={(itemValue, itemIndex) => setSelectedYear(itemValue)}
          style={styles.picker}
        >
          <Picker.Item label="2023" value="2023" />
          <Picker.Item label="2024" value="2024" />
          <Picker.Item label="2025" value="2025" />
          {/* Add more years as needed */}
        </Picker>
        <Picker
          selectedValue={selectedMonth}
          onValueChange={(itemValue, itemIndex) => setSelectedMonth(itemValue)}
          style={styles.picker}
        >
          <Picker.Item label="January" value="January" />
          <Picker.Item label="February" value="February" />
          <Picker.Item label="March" value="March" />
          {/* Add more months as needed */}
        </Picker>
      </View>
      <Text style={styles.selectedValues}>
        Selected Year: {selectedYear}, Selected Month: {selectedMonth}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  pickerContainer: {
    flexDirection: 'row',
  },
  picker: {
    flex: 1,
    height: 50, // Adjust height as needed
    // You can add more styles here
  },
  selectedValues: {
    marginTop: 20,
    fontSize: 16,
  },
});

export default PickerYearMonth;
