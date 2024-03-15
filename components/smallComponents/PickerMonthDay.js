import React, { useState, useRef } from 'react';
import { View, Text, StyleSheet, Modal, ScrollView, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const PickerMonthDay = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedMonthIndex, setSelectedMonthIndex] = useState(1);
  const [selectedDayIndex, setSelectedDayIndex] = useState(1);

  const monthScrollViewRef = useRef(null);
  const dayScrollViewRef = useRef(null);

  const months = ['', 'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December', ''];
  const daysInMonth = [0, 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31, 0];

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
    if (index >= 0 && index < daysInMonth[selectedMonthIndex]) {
      setSelectedDayIndex(index + 1); // Adding 1 to make days start from 1 instead of 0
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
        <Text style={styles.selectedValues}>{months[selectedMonthIndex]} {selectedDayIndex} <Ionicons name={'caret-down'} size={20} color={'#FFE338'} /> </Text>
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
                {Array.from({ length: daysInMonth[selectedMonthIndex] }, (_, i) => i + 1).map((day) => (
                  <Text key={day} style={[styles.option, selectedDayIndex === day && styles.selectedOption]}>{day}</Text>
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
    color:'#FFFFFF',
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
