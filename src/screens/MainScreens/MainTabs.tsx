import {StyleSheet, useColorScheme, View} from 'react-native';
import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import TasksHome from './ToDo/TasksHome';
import NotesHome from './Notes/NotesHome';
import {Button, Text} from 'react-native-paper';
import {useAuth} from '../../hooks/Authentication/useAuth';
import PhotoshareHome from './PhotoShare/PhotoshareHome';

const MainTabs = () => {
  const MainTab = createBottomTabNavigator();
  const isDarkMode = useColorScheme() === 'dark';


  const {logout} = useAuth();

  return (
    <MainTab.Navigator
      screenOptions={{
        tabBarStyle: {backgroundColor: isDarkMode? 'transparent' : 'transparent'},
        headerStyle: {backgroundColor: 'transparent'},
        headerTitle: () => <Text>{}</Text>,
        headerRight: () => (
          <Button
            onPress={() => {
              logout();
              console.log('LOGOUT');
            }}>
            Logout
          </Button>
        ),
      }}>
      <MainTab.Screen
        name="TasksHome"
        options={{title: 'Tasks'}}
        component={TasksHome}
      />
      <MainTab.Screen
        name="NotesHome"
        options={{title: 'Notes'}}
        component={NotesHome}
      />
      <MainTab.Screen
        name="PhotoShareHome"
        options={{title: 'PhoShare'}}
        component={PhotoshareHome}
      />
    </MainTab.Navigator>
  );
};

export default MainTabs;

const styles = StyleSheet.create({});
