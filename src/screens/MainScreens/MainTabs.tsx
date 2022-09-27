import {StyleSheet, useColorScheme, View} from 'react-native';
import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import TasksHome from './ToDo/TasksHome';
import NotesHome from './Notes/NotesHome';
import {Button, Text} from 'react-native-paper';
import {useAuth} from '../../hooks/Authentication/useAuth';
import PhotoshareHome from './PhotoShare/PhotoshareHome';
import CrewHome from './Crew/CrewHome';
import CrewStack from './Crew/CrewStack';

const MainTabs = () => {
  const MainTab = createBottomTabNavigator();
  const isDarkMode = useColorScheme() === 'dark';


  const {logout} = useAuth();

  return (
    <MainTab.Navigator
      screenOptions={{
        tabBarStyle: {backgroundColor: isDarkMode? 'transparent' : 'transparent'},
        headerStyle: {backgroundColor: 'transparent'},
        headerShown: false,
        // headerTitle: () => <Text>{}</Text>,
      }}>
        <MainTab.Screen name="CrewStack" component={CrewStack}/>

    </MainTab.Navigator>
  );
};

export default MainTabs;

const styles = StyleSheet.create({});
