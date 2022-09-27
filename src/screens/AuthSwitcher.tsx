import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {useAuth} from '../hooks/Authentication/useAuth';
import MainTabs from './MainScreens/MainTabs';
import Login from './Auth/Login';
import RootStack from './RootStack';

const AuthSwitcher = () => {
  const {user} = useAuth();
return <RootStack/>
};

export default AuthSwitcher;

const styles = StyleSheet.create({});
