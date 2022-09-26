import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {useAuth} from '../hooks/Authentication/useAuth';
import MainTabs from './MainScreens/MainTabs';
import Login from './Auth/Login';
import MainDrawer from './MainScreens/MainDrawer';

const AuthSwitcher = () => {
  const {user} = useAuth();
  // return <>{user ? <MainDrawer /> : <Login />}</>;
return <MainDrawer/>
};

export default AuthSwitcher;

const styles = StyleSheet.create({});
