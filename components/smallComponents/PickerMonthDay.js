import React, { useState, useRef } from 'react';
import { View, Text, StyleSheet, Modal, ScrollView, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const PickerMonthDay = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedMonthIndex, setSelectedMonthIndex] = useState(1);
  const [selectedDayIndex, setSelectedDayIndex] = useState(1);
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());

  const monthScrollViewRef = useRef(null);
  const dayScrollViewRef = useRef(null);
  const yearScrollViewRef = useRef(null);

  const months = ['', 'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December', ''];
  const daysInMonth = ['', ...Array.from({ length: 31 }, (_, i) => i + 1), 0]; // Added blank values at beginning and end
  const futureYears = ['', '2024', '2025', '2026', '2027', '2028', '2029', '2030', '2031', '2032', '2033', '2034', '2035', '2036', '2037', '2038', '2039', '2040', '2041', '2042', '2043', '2044', '2045', '2046', '2047', '2048', '2049', '2050', ''];

  const toggleModal = () => {
    setModalVisible(!modalVisible);
  };

  const onMonthScroll = (event) => {
    const index = Math.round((event.nativeEvent.contentOffset.y + (event.nativeEvent.layoutMeasurement.height * 0.35)) / 49);
    if (index >= 0 && index < months.length) {
      setSelectedMonthIndex(index);
    }
  };

  const onDayScroll = (event) => {
    const index = Math.round((event.nativeEvent.contentOffset.y + (event.nativeEvent.layoutMeasurement.height * 0.35)) / 49);
    if (index >= 0 && index < daysInMonth.length) {
      setSelectedDayIndex(index);
    }
  };

  const onYearScroll = (event) => {
    const index = Math.round((event.nativeEvent.contentOffset.y + (event.nativeEvent.layoutMeasurement.height * 0.35)) / 49);
    if (index >= 0 && index < futureYears.length) {
      setSelectedYear(futureYears[index]);
    }
  };

  const onConfirm = () => {
    toggleModal();
  };

  const onLeave = () => {
    toggleModal();
  };

  return (
    <View style={styles.container}>
      <Pressable onPress={toggleModal} style={styles.pressable}>
        <Text style={styles.selectedValues}>{months[selectedMonthIndex]} {selectedDayIndex}, {selectedYear} <Ionicons name={'caret-down'} size={20} color={'#FFE338'} /> </Text>
      </Pressable>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={toggleModal}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <View style={styles.buttonContainer}>
              <Pressable onPress={onLeave} style={[styles.button, styles.leaveButton]}>
                <Text style={styles.buttonTextLeave}>Leave</Text>
              </Pressable>
              <Pressable onPress={onConfirm} style={[styles.button, styles.confirmButton]}>
                <Text style={styles.buttonTextConfirm}>Confirm</Text>
              </Pressable>
            </View>
            <View style={styles.row}>
              <ScrollView
                ref={monthScrollViewRef}
                onScroll={onMonthScroll}
                contentContainerStyle={styles.scrollViewContent}
              >
                {months.map((month, index) => (
                  <Text key={index} style={[styles.option, selectedMonthIndex === index && styles.selectedOption]}>{month}</Text>
                ))}
              </ScrollView>
              <ScrollView
                ref={dayScrollViewRef}
                onScroll={onDayScroll}
                contentContainerStyle={styles.scrollViewContent}
              >
                {daysInMonth.map((day, index) => (
                  <Text key={index} style={[styles.option, selectedDayIndex === index && styles.selectedOption]}>{day}</Text>
                ))}
              </ScrollView>
              <ScrollView
                ref={yearScrollViewRef}
                onScroll={onYearScroll}
                contentContainerStyle={styles.scrollViewContent}
              >
                {futureYears.map((year, index) => (
                  <Text key={index} style={[styles.option, selectedYear === year && styles.selectedOption]}>{year}</Text>
                ))}
              </ScrollView>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 0.3,
    alignItems: 'center',
    justifyContent: 'center',
  },
  pressable: {
    padding: 10,
    alignContent: 'center',
    justifyContent: 'space-between',
  },
  selectedValues: {
    color:'#000000',
    fontWeight: 'bold',
    fontSize: 16,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 10,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    paddingLeft: 25,
    paddingRight:25,
    paddingBottom: 25,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    flex: 0.25,
  },
  row: {
    flexDirection: 'row',
    flex:1,
  },
  scrollViewContent: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  option: {
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    width: 120,
    textAlign: 'center',
    fontSize: 20,
  },
  selectedOption: {
    fontWeight: 'bold',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  button: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonTextLeave: {
    color: '#8B0000',
    fontWeight: 'bold',
  },
  buttonTextConfirm: {
    color: '#1A43BF',
    fontWeight: 'bold',
  },
});

export default PickerMonthDay;
