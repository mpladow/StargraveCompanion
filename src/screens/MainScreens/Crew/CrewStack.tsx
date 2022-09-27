import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import CrewHome from './CrewHome';
import CaptainEdit from './CaptainEdit';
import FirstMateEdit from './FirstMateEdit';
import { Button, useTheme } from 'react-native-paper';
import { useUserPreferences } from '../../../context/PreferencesProvider';
import { transformer } from '../../../../metro.config';
import { useAuth } from '../../../hooks/Authentication/useAuth';

const CrewStack = () => {
  let CrewStack = createStackNavigator();
  const {isDarkMode} = useUserPreferences();
  const {colors} = useTheme();
  const {logout} = useAuth();

  return (
    <CrewStack.Navigator screenOptions={{headerShown: true, 
      headerStyle: {backgroundColor: 'transparent'},
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
      <CrewStack.Screen name="Crew" component={CrewHome} />
      <CrewStack.Group mode="modal">
        <CrewStack.Screen name="CaptainEdit" component={CaptainEdit} />
        <CrewStack.Screen name="FirstMateEdit" component={FirstMateEdit} />

      </CrewStack.Group>
    </CrewStack.Navigator>
  );
};

export default CrewStack;

const styles = StyleSheet.create({});
