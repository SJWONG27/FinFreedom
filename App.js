import React, { useState, useEffect } from 'react';
import Login from './components/Login';
import Register from './components/Register';
import Landing from './components/Landing';
import Home from './components/Home';
import Budget from './components/Budget';
import Discover from './components/Discover';
import Profile from './components/Profile';
import BudgetCategory from './components/BudgetCategory';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { Ionicons } from '@expo/vector-icons';
import {View} from 'react-native';
import { FIREBASE_AUTH } from './firebase';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const MainAppNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'Budget') {
            iconName = focused ? 'calculator' : 'calculator-outline';
          } else if (route.name === 'Add button') {
            iconName = 'add-circle-outline';
          } else if (route.name === 'Discover') {
            iconName = focused ? 'planet' : 'planet-outline';
          } else if (route.name === 'Profile') {
            iconName = focused ? 'person-circle' : 'person-circle-outline';
          } 

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#6A6AFF',
        tabBarInactiveTintColor: '#6A6AFF',
        tabBarStyle: {
          backgroundColor: '#000000',
          borderBlockColor:"#000000",
        },
      })}

    >
      <Tab.Screen name="Home" component={Home} options={{ headerShown: false }} />
      <Tab.Screen name="Budget" component={Budget} options={{ headerShown: false }}/>
      <Tab.Screen name="Add button" component={BudgetCategory} options={{ headerShown: false,  tabBarLabel: ''  }}/>
      <Tab.Screen name="Discover" component={Discover} options={{ headerShown: false }} />
      <Tab.Screen name="Profile" component={Profile} options={{ headerShown: false }}/>
    </Tab.Navigator>
  );
};

const App = () => {
  return (
    <View style={{flex:1}}>
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Landing">
        <Stack.Screen name="Landing" component={Landing} options={{ headerShown: false }} />
        <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
        <Stack.Screen name="Register" component={Register} options={{ headerShown: false }} />
        <Stack.Screen name="MainApp" component={MainAppNavigator} options={{ headerShown: false }} /> 
      </Stack.Navigator>
    </NavigationContainer>
    </View>
  );
};


export default App;
