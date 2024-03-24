import React, { useState, useEffect } from 'react';
import Login from './components/Login';
import LandingPage1 from './components/LandingPage1';
import LandingPage2 from './components/LandingPage2';
import LandingPage3 from './components/LandingPage3';
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
import Points from './components/Points';
import { PremiumProvider } from './components/Premium';
import LandingPage1 from './components/LandingPage1';
import LandingPage2 from './components/LandingPage2';
import LandingPage3 from './components/LandingPage3';

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
          } else if (route.name === 'Goals') {
            iconName = focused ? 'planet' : 'planet-outline';
          } else if (route.name === 'Profile') {
            iconName = focused ? 'person-circle' : 'person-circle-outline';
          } 

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#000000',
        tabBarInactiveTintColor: '#000000',
        tabBarStyle: {
          backgroundColor:'#FFFFFF',
          borderBlockColor:'#FFFFFF',
        },
      })}

    >
      <Tab.Screen name="Home" component={Home} options={{ headerShown: false }} />
      <Tab.Screen name="Budget" component={Budget} options={{ headerShown: false }}/>
      <Tab.Screen name="Add button" component={BudgetCategory} options={{ headerShown: false,  tabBarLabel: ''  }}/>
      <Tab.Screen name="Goals" component={Discover} options={{ headerShown: false }} />
      <Tab.Screen name="Profile" component={Profile} options={{ headerShown: false }}/>
    </Tab.Navigator>
  );
};

const App = () => {
  return (
    <View style={{flex:1}}>
    <PremiumProvider>
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Landing">
        <Stack.Screen name="Landing" component={Landing} options={{ headerShown: false }} />
        <Stack.Screen name="LandingPage1" component={LandingPage1} options={{ headerShown: false }} />
        <Stack.Screen name="LandingPage2" component={LandingPage2} options={{ headerShown: false }} />
        <Stack.Screen name="LandingPage3" component={LandingPage3} options={{ headerShown: false }} />
        <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
        <Stack.Screen name="Register" component={Register} options={{ headerShown: false }} />
        <Stack.Screen name="MainApp" component={MainAppNavigator} options={{ headerShown: false }} /> 
        <Stack.Screen name="Points" component={Points} options={{ headerShown: false }}/>
      </Stack.Navigator>
    </NavigationContainer>
    </PremiumProvider>
    </View>
  );
};


export default App;
