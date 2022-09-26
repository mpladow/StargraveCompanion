/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import 'react-native-gesture-handler';
import {
  NavigationContainer,
  DarkTheme as NavigationDarkTheme,
  DefaultTheme as NavigationDefaultTheme,
} from '@react-navigation/native';
import React, {type PropsWithChildren} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import RealmProvider from './src/context/RealmProvider';
import AuthProvider from './src/context/AuthProvider';
import AuthSwitcher from './src/screens/AuthSwitcher';
import MainDrawer from './src/screens/MainScreens/MainDrawer';
import CrewHome from './src/screens/MainScreens/Crew/CrewHome';
import merge from 'deepmerge';

import {
  MD3DarkTheme as PaperDarkTheme,
  DefaultTheme as PaperDefaultTheme,
  Provider as PaperProvider,
} from 'react-native-paper';
const App = () => {
  const isDarkMode = useColorScheme() === 'dark';



  const CombinedDefaultTheme = merge(PaperDarkTheme, NavigationDefaultTheme);
  const CombinedDarkTheme = merge(PaperDarkTheme, NavigationDarkTheme);

  const backgroundStyle = {
    backgroundColor: !isDarkMode
      ? CombinedDarkTheme.colors.background
      : CombinedDefaultTheme.colors.background,
    flex: 1,
    color: isDarkMode ? CombinedDarkTheme.colors.text : CombinedDefaultTheme.colors.text,
  };
  return (
    <PaperProvider theme={!isDarkMode? CombinedDarkTheme: CombinedDefaultTheme}>
      <NavigationContainer theme={!isDarkMode? CombinedDarkTheme: CombinedDefaultTheme}>
        <SafeAreaView style={backgroundStyle}>
          {/* <PaperProvider theme={isDarkMode ? darkPaperTheme: darkPaperTheme}> */}
          {/* <RealmProvider> */}
          <AuthProvider>
            <StatusBar
              barStyle={isDarkMode ? 'dark-content' : 'light-content'}
              backgroundColor={backgroundStyle.backgroundColor}
            />
            <AuthSwitcher />
          </AuthProvider>
          {/* </RealmProvider> */}
        </SafeAreaView>
      </NavigationContainer>
    </PaperProvider>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
