import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import CrewHome from './CrewHome';
import CaptainCreate from './CaptainCreate';
import FirstMateEdit from './FirstMateEdit';
import { Button, useTheme } from 'react-native-paper';
import { useUserPreferences } from '../../../context/PreferencesProvider';
import { transformer } from '../../../../metro.config';
import { useAuth } from '../../../hooks/Authentication/useAuth';
import EquipmentSelector from './common/EquipmentSelector';

const CrewStack = () => {
  let CrewStack = createStackNavigator();
  const { isDarkMode } = useUserPreferences();
  const { colors } = useTheme();
  const { logout } = useAuth();

  return (
    <CrewStack.Navigator screenOptions={{
      headerShown: true,
      headerStyle: { backgroundColor: 'transparent' },
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
        <CrewStack.Screen name="CaptainCreate" component={CaptainCreate} />
        <CrewStack.Screen name="FirstMateCreate" component={FirstMateEdit} />
        <CrewStack.Screen name="Equipment" component={EquipmentSelector} />
      </CrewStack.Group>
    </CrewStack.Navigator>
  );
};

export default CrewStack;

const styles = StyleSheet.create({});
