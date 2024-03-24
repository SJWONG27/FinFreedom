import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, Modal, StyleSheet, TouchableWithoutFeedback, TouchableOpacity } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { Picker } from '@react-native-picker/picker';
import { usePremiumStatus } from '../Premium';

// Define fixed parameters based on the type of mutual funds or investment strategy
const mutualFundsData = [
  { name: 'Public Mutual Fund', processingFee: 1.5, annualReturnRate: 8 },
  { name: 'CIMB-Principal Mutual Fund', processingFee: 2, annualReturnRate: 7 },
  { name: 'Maybank Mutual Fund', processingFee: 1.8, annualReturnRate: 9 },
  { name: 'Affin Hwang Mutual Fund', processingFee: 1.7, annualReturnRate: 7.5 },
  { name: 'Kenanga Investors Mutual Fund', processingFee: 2.2, annualReturnRate: 8.5 },
  { name: 'RHB Asset Management Mutual Fund', processingFee: 1.6, annualReturnRate: 9.2 },
];


const MutualFundsCalculator = () => {
  const [initialInvestment, setInitialInvestment] = useState('');
  const [investmentDuration, setInvestmentDuration] = useState('');
  const [selectedMutualFund, setSelectedMutualFund] = useState(mutualFundsData[0]);
  const [futureValue, setFutureValue] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const { isPremiumUser } = usePremiumStatus();

  const calculateFutureValue = () => {
    // Convert initial investment and duration input to numbers
    const initialInvestmentValue = parseFloat(initialInvestment);
    const duration = parseInt(investmentDuration);

    if (isNaN(initialInvestmentValue) || isNaN(duration)) {
      alert('Please enter valid numbers for Initial Investment and Investment Duration.');
      return;
    }

    // Retrieve selected mutual fund parameters
    const { processingFee, annualReturnRate } = selectedMutualFund;

    // Perform calculation
    // Future Value = P * (1 + r)^n
    const r = annualReturnRate / 100; // Convert percentage to decimal
    const n = duration;
    const futureValueWithoutFee = initialInvestmentValue * Math.pow((1 + r), n);
    const processingFeeAmount = (processingFee / 100) * futureValueWithoutFee;
    const futureValueWithFee = futureValueWithoutFee - processingFeeAmount;

    // Calculate returns and adjusted returns
    const returns = futureValueWithFee - initialInvestmentValue;
    const adjustedReturns = returns - processingFeeAmount;
    const annualizedReturn = (Math.pow((futureValueWithFee / initialInvestmentValue), (1 / duration)) - 1) * 100;

    setFutureValue({
      returns: returns.toFixed(2), // Round to 2 decimal places
      adjustedReturns: adjustedReturns.toFixed(2), // Round to 2 decimal places
      annualizedReturn: annualizedReturn.toFixed(2), // Round to 2 decimal places
    });
    setModalVisible(true); // Show the modal after calculating future value
  };

  useEffect(() => {
    // Call the calculation function whenever initial investment or duration changes
    if (initialInvestment !== '' && investmentDuration !== '') {
      calculateFutureValue();
    }
  }, [initialInvestment, investmentDuration]);

  const showDescription = (description) => {
    // Implement logic to display description
    alert(`${description}`);
  };

  return (
    <View style={styles.container}>
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <TouchableWithoutFeedback onPress={() => setModalVisible(false)}>
          <View style={styles.modalBackground}>
            <TouchableWithoutFeedback>
              <View style={styles.modalContainer}>
                <Text style={styles.modalTitle}>Mutual Funds Calculator</Text>

                <Text>Mutual Fund:</Text>
                <View style={styles.pickerContainer}>
  <Picker
    selectedValue={selectedMutualFund}
    onValueChange={(itemValue, itemIndex) => setSelectedMutualFund(itemValue)}
    style={{ backgroundColor: 'lightgray', borderRadius: 5 }} // Apply borderRadius here
  >
    {mutualFundsData.map((fund, index) => (
      <Picker.Item key={index} label={fund.name} value={fund} />
    ))}
  </Picker>
</View>
<View style={styles.fixedValuesContainer}>
                  <Text style={styles.fixedValueText}>
                    Processing Fee: {selectedMutualFund.processingFee}%
                  </Text>
                  <Text style={styles.fixedValueText}>
                    Annual Return Rate: {selectedMutualFund.annualReturnRate}%
                  </Text>
                </View>
                
                <Text><TouchableOpacity onPress={() => showDescription('This is the duration for which you plan to keep your investment in the mutual fund, expressed in years.')}>
      <FontAwesome name="question-circle" size={20} color="black" />
    </TouchableOpacity>  Initial Investment Amount: </Text>
                <TextInput
                  style={styles.input}
                  value={initialInvestment}
                  onChangeText={setInitialInvestment}
                  keyboardType="numeric"
                />

                <Text><TouchableOpacity onPress={() => showDescription('This is the amount of money you initially invest in the mutual fund.')}>
      <FontAwesome name="question-circle" size={20} color="black" />
    </TouchableOpacity>  Investment Duration (in years):</Text>
                <TextInput
                  style={styles.input}
                  value={investmentDuration}
                  onChangeText={setInvestmentDuration}
                  keyboardType="numeric"
                />

            

<View style={styles.resultContainer}>
  <Text style={styles.resultTitle}>Results:</Text>
  <View style={styles.resultItem}>
    <View style={styles.resultLabelContainer}>
    <TouchableOpacity onPress={() => showDescription('Returns represent the total profit or loss from your investment, excluding any fees.')}>
        <FontAwesome name="question-circle" size={20} color="black" />
      </TouchableOpacity>
      <Text style={styles.resultLabel}> Returns: </Text>
    </View>
    <Text style={{fontWeight:'bold'}}>RM {futureValue?.returns || 0}</Text>
  </View>
  <View style={styles.resultItem}>
    <View style={styles.resultLabelContainer}>
    <TouchableOpacity onPress={() => showDescription('Adjusted returns are the total profit or loss from your investment, accounting for any fees or expenses incurred.')}>
        <FontAwesome name="question-circle" size={20} color="black" />
      </TouchableOpacity>
      <Text style={styles.resultLabel}> Adjusted Returns:</Text>
    </View>
    <Text style={{fontWeight:'bold'}}>RM {futureValue?.adjustedReturns || 0}</Text>
  </View>
  <View style={styles.resultItem}>
    <View style={styles.resultLabelContainer}>
    <TouchableOpacity onPress={() => showDescription('Annualized return is the average rate of return per year on your investment over its entire duration.')}>
        <FontAwesome name="question-circle" size={20} color="black" />
      </TouchableOpacity>
      <Text style={styles.resultLabel}> Annualized Return: </Text>
    </View>
    <Text style={{fontWeight:'bold'}}>{futureValue?.annualizedReturn || 0}%</Text>
  </View>
</View>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>

      <Button
  title={isPremiumUser ? "Mutual Funds Benefit Calculator" : "Unlock Premium to use Mutual Funds Benefit Calculator"}
  onPress={() => setModalVisible(true)}
  disabled={!isPremiumUser}
  style={[styles.button, !isPremiumUser && styles.disabledButton]}
  color={!isPremiumUser ? 'black' : 'black'} // Change background color based on button state
  borderRadius={!isPremiumUser ? 20 : 10} // Change border radius based on button state
  disabledTitleStyle={{ color: 'black' }} // Change text color when disabled
/>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalBackground: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    backgroundColor: '#FFFFFF',
    padding: 20,
    borderRadius: 10,
    elevation: 5,
    width:300,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  fixedValuesContainer: {
    marginBottom: 10,
  },
  fixedValueText: {
    marginBottom: 5,
    color: 'gray', // Fixed value text color
  },
  resultContainer: {
    marginTop: 20,
  },
  resultTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
    color:'black',
  },
  // button: {
  //   borderRadius: 20,
  //   backgroundColor: 'grey', // You can change this color to your preference
  //   padding: 10,
  //   margin: 10,
  // },
  // disabledButton: {
  //   backgroundColor: 'grey',
  //   borderRadius:20,
  // },

  resultItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  resultLabelContainer: {
    flexDirection: 'row',
    marginRight: 10,
  },
  resultLabel: {
    marginRight: 5,
  },
});

export default MutualFundsCalculator;
