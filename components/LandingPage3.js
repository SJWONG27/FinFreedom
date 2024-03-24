import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView,
    Image, } from 'react-native';
import Login from './Login';

const LandingPage3 = ({navigation}) => {
  return (
    <SafeAreaView style={styles.container}>
        <Image
          source={require('../assets/11.png')}
          style={styles.Image}
          resizeMode="contain"
        />
      <View style={styles.content}>
        <View style={styles.contentHeader}>
          <Text style={styles.title}>
            Financial Expenditure Graph
          </Text>
          <Text style={styles.text}>
            Visualize and analyze spending patterns to identify savings opportunities.
          </Text>
        </View>
      <View style={styles.row}>
        <TouchableOpacity
          onPress={() => navigation.navigate('Login')} >
           <View style={styles.label}>
            <View style={styles.textWrapper}>
              <Text style={styles.skipText}>Skip</Text>
            </View>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => navigation.navigate('Login')}>
            <View style={styles.box}>
              <View style={styles.rectangle}/>
              <Text style={styles.nextText}>Next</Text>
            </View>
        </TouchableOpacity>
      </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center', // Center content vertically
      alignItems: 'stretch',
    },
    Image: {
      width: '100%',
      height: 330,
    },
    content: {
      flex: 1,
      justifyContent: 'space-between',
      paddingVertical: 24,
      paddingHorizontal: 24,
    },
    contentHeader: {
      paddingHorizontal: 24,
    },
    title: {
      fontSize: 28,
      fontWeight: '500',
      color: '#281b52',
      textAlign: 'center',
      marginTop: 30,
      marginBottom: 12,
      lineHeight: 40,
    },
    text: {
      fontSize: 15,
      lineHeight: 24,
      fontWeight: '400',
      color: '#9992a7',
      marginTop: 20,
      textAlign: 'center',
    },

    label: {
        backgroundColor: 'transparent', // Example background color
        padding: 10,
        paddingLeft: 30,
        paddingRight: 30,
        left: -15,
        borderRadius: 12,
        left: 30,
      },
    skipText: {
      color: 'black', 
      fontSize: 25,
      fontWeight: '600',
    },
    
    row: {
      flexDirection: 'row', 
      justifyContent: 'space-between',
      paddingHorizontal: 15,
    },
    
    box: {
      backgroundColor: 'blue', 
      padding: 10,
      paddingLeft: 30,
      paddingRight: 30,
      left: -15,
      borderRadius: 12,
    },
    nextText: {
      color: 'white', 
      fontSize: 25,
      fontWeight: '600',
    },
  });

export default LandingPage3;




