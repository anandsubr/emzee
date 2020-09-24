import React, { useState, useEffect } from "react";
import {
  Image, View, TouchableWithoutFeedback, Text
} from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import InitScreen from '../screens/InitScreen';
import LoginScreen from '../screens/LoginScreen';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();
const AppNavigator = ({ ...props }) => {

  return (
    <NavigationContainer>
      <Stack.Navigator
        headerMode={'screen'}
      >
        <Stack.Screen options={{ headerShown: false }} name="Init" component={InitScreen} path={'init'} />
        <Stack.Screen options={{ headerShown: false }} name="Login" component={LoginScreen} />
       
      </Stack.Navigator>

    </NavigationContainer >
  );
}

export default AppNavigator ;