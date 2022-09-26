import {StyleSheet, Text, View} from 'react-native';
import React, {useContext} from 'react';
import {ThemeContext} from '../../context/ThemeProvider';

const useCustomTheme = () => {
  const context = useContext(ThemeContext);
  if (!context)
    throw new Error('useCustomTheme must be used within the ThemeProvider');
  return context;
};

export default useCustomTheme;

const styles = StyleSheet.create({});
