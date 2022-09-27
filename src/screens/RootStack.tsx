import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import MainTabs from './MainScreens/MainTabs';


const RootStack = () => {
  const RootStack = createStackNavigator();

  return (
    <RootStack.Navigator screenOptions={{headerShown: false}}>
      <RootStack.Screen
        name="Main"
        component={MainTabs}
      />
    </RootStack.Navigator>
  );
};

export default RootStack;

const styles = StyleSheet.create({});
