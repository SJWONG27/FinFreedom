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
              <View style={{ flexDirection: 'row', justifyContent: 'space-between',marginTop:3,}}>
                      <View style={DSRStyle.income}>
  <Text style={{textAlign: 'center', fontSize: 18,margin:4}}>Income</Text>
  <Text style={{textAlign: 'center',fontSize:20,color:'green'}}>RM {totalIncome}</Text>
                      </View>
                      <View style={DSRStyle.expenses}>
                      <Text style={{textAlign: 'center', fontSize: 18,margin:4}}>Expenses</Text>
                      <Text style={{textAlign: 'center',fontSize:20,color:'red'}}>RM {totalExpenses.toFixed(2)}</Text>
                      </View>
</View>
          </View>
        
          <View style={DSRStyle.container5}>
            <View style={DSRStyle.container4}>
              <Text style={DSRStyle.label}>Category</Text>
              <Text style={DSRStyle.label}>Amount</Text>
            </View>
            {monthlyExpenses[selectedMonth] ? monthlyExpenses[selectedMonth].map((expense, index) => (
              <View key={index} style={DSRStyle.container4}>
                <Ionicons name={getIconName(expense.category)} size={24} color='#000000' />
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
                  color='#000000'
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
  
    },
    container2: {
      flex: 0.3,
      marginTop:50,
      flexDirection: 'column',
      backgroundColor: '#ffffff',
      alignItems: 'center',
      justifyContent: 'center',
      padding: 30,
      backgroundColor: '#ffffff',
      borderRadius: 10,
    elevation: 5,
    textAlign: 'center',
      marginBottom:10,
      marginHorizontal:20,

    },
    container3: {
      flex: 0.5,
      marginVertical: 10,
      paddingHorizontal: 10,
      
    },
    container4: {
      flexDirection: 'row',
      alignItems: 'center',
      borderColor:'#000000',
      paddingVertical: 8,
      marginVertical: 5,
      borderRadius: 5,
      backgroundColor: '#ffffff',
      marginLeft:35,
      
    },
    container5: {
      elevation:5,
      borderColor:'#000000',
      backgroundColor: '#ffffff',
    },
    label: {
      flex: 1,
      fontSize: 18,
      fontWeight: 'bold',
      color: '#000000',
      textAlign: 'center',
      marginLeft:35,
    },
    logo: {
      height: 316,
      width: 316,
      marginTop: 150,
      
    },
    title: {
      fontSize: 22,
      fontWeight: 'bold',
      color:'#000000',
      marginBottom: 10,
      textAlign: 'center',
      marginTop: 10,
    },
    message1: {
      flex: 2,
      fontSize: 15,
      color: '#000000',
      textAlign: 'center',
      
    },
    message2: {
      fontSize: 12,
      fontWeight: 'bold',
      color: '#000000',
      padding: 25,
      textAlign: 'center',
      color: 'silver',
    },
    pieChartContainer: {
      
      justifyContent: 'center',
      alignItems: 'center',
      margin: 10,
      backgroundColor: 'white',
      borderRadius: 10,
      padding: 10,
        backgroundColor: '#ffffff',
  borderRadius: 10,
  shadowOffset: {
    width: 0,
    height: 2,
},
shadowOpacity: 0.25,
shadowRadius: 3.84,
elevation: 4,

    },
    chartTitle: {
      fontSize: 18,
      fontWeight: 'bold',
      color: '#000000',
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
      color: '#000000',
      marginLeft: 5,
    },
    income: {
      width:175,
      fontSize: 16,
      marginBottom: 5,
    //   backgroundColor: '#ffffff',
    //   borderRadius: 10,
    //   shadowOffset: {
    //     width: 0,
    //     height: 2,
    // },
    // shadowOpacity: 0.25,
    // shadowRadius: 3.84,
    // elevation: 15,
    // opacity:0.8,
    textAlign: 'center',
    
    },
    expenses: {
      width:175,
      fontSize: 16,
      marginBottom: 5,
    //   backgroundColor: '#ffffff',
    //   borderRadius: 10,
    //   shadowOffset: {
    //     width: 0,
    //     height: 2,
    // },
    // shadowOpacity: 0.25,
    // shadowRadius: 3.84,
    // elevation: 15,
    // opacity:0.8,
    textAlign: 'center',
    
    },
  });
  
  export default Budget;
  