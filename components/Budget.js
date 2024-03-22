import React, { useState } from 'react';
import { View, Text, StyleSheet, ImageBackground, ScrollView } from 'react-native';
import PickerYearMonth from '../components/smallComponents/PickerYearMonth';
import { Ionicons } from '@expo/vector-icons';
import { PieChart } from 'react-native-svg-charts';

function Budget() {
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1);

  // Sample expenses data for each month
  const monthlyExpenses = {
    1: [
      { category: 'Food', amount: 100 },
      { category: 'Transportation', amount: 150 },
      { category: 'Entertainment', amount: 200 },
    ],
    2: [
      { category: 'Food', amount: 120 },
      { category: 'Transportation', amount: 180 },
      { category: 'Entertainment', amount: 220 },
    ],
    // Add more months as needed
  };

  // Calculate total income
  // Calculate total income
  const totalIncome = selectedMonth === 1 || selectedMonth === 2 ? 5000 : 0;

  // Calculate total expenses for the selected month
  const totalExpenses = monthlyExpenses[selectedMonth]
    ? monthlyExpenses[selectedMonth].reduce((acc, expense) => acc + expense.amount, 0)
    : 0;

  // Function to generate data for the pie chart
  const generateChartData = () => {
    const chartData = [];
    Object.values(monthlyExpenses[selectedMonth] || {}).forEach((expense) => {
      chartData.push({
        key: expense.category,
        value: expense.amount,
        svg: { fill: getCategoryColor(expense.category) },
      });
    });
    return chartData;
  };

  // Function to get icon name based on category
  const getIconName = (category) => {
    switch (category) {
      case 'Food':
        return 'fast-food-outline';
      case 'Transportation':
        return 'car-sport-outline';
      case 'Entertainment':
        return 'happy-outline';
      // Add more cases for other categories
      default:
        return 'logo-react';
    }
  };

  // Function to get font color based on category
  const getCategoryColor = (category) => {
    switch (category) {
      case 'Food':
        return '#FF6347'; // Tomato
      case 'Transportation':
        return '#4682B4'; // Steel Blue
      case 'Entertainment':
        return '#32CD32'; // Lime Green
      // Add more cases for other categories
      default:
        return '#FFFFFF'; // White
    }
  };

  return (
    <ImageBackground
      source={require('../assets/background.png')}
      style={DSRStyle.container}
    >
      <ScrollView>
        <View style={DSRStyle.container}>

          <View style={DSRStyle.container2}>
            <Text style={DSRStyle.title}>Budget Planner</Text>
            <PickerYearMonth
              selectedYear={selectedYear}
              selectedMonth={selectedMonth}
              onYearChange={setSelectedYear}
              onMonthChange={setSelectedMonth}
            />
            <View style={DSRStyle.container3}>
              <Text style={DSRStyle.message1}>Income: RM {totalIncome}</Text>
              <Text style={DSRStyle.message1}>Total Expenses: RM {totalExpenses.toFixed(2)}</Text>
            </View>
          </View>

          <View style={DSRStyle.container5}>
            <View style={DSRStyle.container4}>
              <Text style={DSRStyle.label}>Category</Text>
              <Text style={DSRStyle.label}>Amount</Text>
            </View>
            {monthlyExpenses[selectedMonth] ? monthlyExpenses[selectedMonth].map((expense, index) => (
              <View key={index} style={DSRStyle.container4}>
                <Ionicons name={getIconName(expense.category)} size={24} color="#FFFFFF" />
                <Text style={DSRStyle.message1}>{expense.category}</Text>
                <Text style={DSRStyle.message1}>RM {expense.amount.toFixed(2)}</Text>
              </View>
            )) : <Text style={DSRStyle.message2}>No expenses recorded for this month.</Text>}
          </View>

          <View style={DSRStyle.pieChartContainer}>
            <Text style={DSRStyle.chartTitle}>Monthly Expenses Breakdown</Text>
            <PieChart
              style={{ height: 180, width: 180 }}
              data={generateChartData()}
              spacing={0}
              outerRadius={'90%'}
              innerRadius={'70%'}
              padAngle={0}
              sort={(a, b) => b.value - a.value}
              renderDecorator={({ item, pieCentroid }) => (
                <Ionicons
                  name={getIconName(item.key)}
                  size={24}
                  color="#FFFFFF"
                  x={pieCentroid[0]}
                  y={pieCentroid[1]}
                  origin={{ x: -12, y: -12 }}
                />
              )}
            />
            {generateChartData().map((item, index) => (
              <View key={index} style={DSRStyle.legendItem}>
                <Ionicons name={getIconName(item.key)} size={16} color={item.svg.fill} />
                <Text style={DSRStyle.legendLabel}>{`${item.key}: ${((item.value / totalExpenses) * 100).toFixed(2)}%`}</Text>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>
    </ImageBackground>
  );
}

const DSRStyle = StyleSheet.create({
    container: {
      flex: 1,
      padding: 10,
    },
    container2: {
      flex: 0.3,
      marginTop: 20,
      flexDirection: 'column',
      backgroundColor: 'rgba(255, 255, 255, 0.1)',
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 10,
      padding: 10,
    },
    container3: {
      flex: 0.5,
      marginVertical: 10,
      paddingHorizontal: 10,
    },
    container4: {
      flexDirection: 'row',
      alignItems: 'center',
      borderColor: '#FFFFFF',
      paddingVertical: 8,
      marginVertical: 5,
      borderRadius: 5,
    },
    container5: {
      borderBottomWidth: 0.3,
      borderColor: '#FFFFFF',
    },
    label: {
      flex: 1,
      fontSize: 18,
      fontWeight: 'bold',
      color: '#FFFFFF',
      textAlign: 'center',
    },
    logo: {
      height: 316,
      width: 316,
      marginTop: 150,
    },
    title: {
      fontSize: 22,
      fontWeight: 'bold',
      color: '#6A6AFF',
      marginBottom: 10,
      textAlign: 'center',
      marginTop: 10,
    },
    message1: {
      flex: 2,
      fontSize: 15,
      color: '#FFFFFF',
      textAlign: 'center',
    },
    message2: {
      fontSize: 12,
      fontWeight: 'bold',
      color: '#FFFFFF',
      padding: 25,
      textAlign: 'center',
      color: 'silver',
    },
    pieChartContainer: {
      flex: 0.8,
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 10,
      backgroundColor: 'black',
      borderRadius: 10,
      padding: 10,
    },
    chartTitle: {
      fontSize: 18,
      fontWeight: 'bold',
      color: '#FFFFFF',
      marginBottom: 10,
      textAlign: 'center',
    },
    legendItem: {
      flexDirection: 'row',
      alignItems: 'center',
      marginVertical: 5,
    },
    legendLabel: {
      fontSize: 14,
      color: '#FFFFFF',
      marginLeft: 5,
    },
  });
  
  export default Budget;
  