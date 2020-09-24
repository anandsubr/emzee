import React, { useState, useEffect } from "react";
import {
  Image, View, TouchableWithoutFeedback, Text
} from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import FontAwesome from 'react-native-vector-icons/FontAwesome';

import InitScreen from '../screens/InitScreen';
import LoginScreen from '../screens/LoginScreen';
import OTPVerificationScreen from '../screens/OTPVerificationScreen';
import EventScreen from '../screens/EventScreen';
import GuestScreen from '../screens/GuestScreen';
import PhotosScreen from '../screens/PhotosScreen';
import SettingsScreen from '../screens/SettingsScreen';
import StyleConfig from "../helper/StyleConfig";
const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const TabNavigator = ((props) => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName = "birthday-cake";

          if (route.name === 'EventScreen') {
            iconName = "birthday-cake";
          } else if (route.name === 'Photos') {
            iconName = "camera";
          } else if (route.name === 'Guests') {
            iconName = "group";
          } else if (route.name === 'Settings') {
            iconName = "gear";
          }

          // You can return any component that you like here!
          return <FontAwesome name={iconName} size={StyleConfig.countPixelRatio(28)} color={color}  />;

          // <Icon name={iconName} size={32} color={color} />;
        },
      })}
      tabBarOptions={{
        showLabel: true,
        activeTintColor: StyleConfig.COLORS.purple,
        inactiveTintColor: "#33333399",
        
      }}
    >
      <Tab.Screen name="Events" component={EventScreen} />
      <Tab.Screen name="Photos" component={PhotosScreen} />
      <Tab.Screen  name="Guests" component={GuestScreen} />
      <Tab.Screen name="Settings" component={SettingsScreen} />
    </Tab.Navigator>

  )
})



const AppNavigator = ({ ...props }) => {

  return (
    <NavigationContainer>
      <Stack.Navigator
        headerMode={'screen'}
      >
        <Stack.Screen options={{ headerShown: false }} name="Init" component={InitScreen} path={'init'} />
        <Stack.Screen options={{ headerShown: false }} name="Login" component={LoginScreen} />
        <Stack.Screen options={{ headerShown: false }} name="OTPVerificationScreen" component={OTPVerificationScreen} />

        <Stack.Screen options={{ headerShown: false }} name="Dashboard" component={TabNavigator} />
        
       
      </Stack.Navigator>

    </NavigationContainer >
  );
}

export default AppNavigator ;