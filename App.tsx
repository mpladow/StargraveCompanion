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
import React, {useEffect} from 'react';
import {SafeAreaView, StatusBar} from 'react-native';

import AuthProvider from './src/context/AuthProvider';
import AuthSwitcher from './src/screens/AuthSwitcher';
import merge from 'deepmerge';

import {
  MD3DarkTheme as PaperDarkTheme,
  DefaultTheme as PaperDefaultTheme,
  Provider as PaperProvider,
} from 'react-native-paper';
import PreferencesProvider, {
  useUserPreferences,
} from './src/context/PreferencesProvider';
import CrewCreatorProvider from './src/context/CrewCreatorProvider';
import {BackgroundBiomorphMOCK, BackgroundCyborgMOCK} from './src/mocks/realm';
import RealmContext from './src/context/RealmContext';

const App = () => {
  const {isDarkMode} = useUserPreferences();
  const CombinedDefaultTheme = merge(PaperDefaultTheme, NavigationDefaultTheme);
  const CombinedDarkTheme = merge(PaperDarkTheme, NavigationDarkTheme);

  const backgroundStyle = {
    backgroundColor: isDarkMode
      ? CombinedDarkTheme.colors.background
      : CombinedDefaultTheme.colors.background,
    flex: 1,
    color: isDarkMode
      ? CombinedDarkTheme.colors.text
      : CombinedDefaultTheme.colors.text,
  };

  const {useRealm} = RealmContext;
  const realm = useRealm();

  useEffect(() => {
    loadDevData();
  }, []);

  const loadDevData = () => {
    try {
      realm.write(() => {
        if (realm.objects('Background').isEmpty()) {
          console.log('Debug data created');
          realm.create('Background', BackgroundBiomorphMOCK);
          realm.create('Background', BackgroundCyborgMOCK);
        } else {
          console.log('Data already created');
        }
      });
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <PreferencesProvider>
      <PaperProvider
        theme={isDarkMode ? CombinedDarkTheme : CombinedDefaultTheme}>
        <NavigationContainer
          theme={isDarkMode ? CombinedDarkTheme : CombinedDefaultTheme}>
          <CrewCreatorProvider>
            <SafeAreaView style={backgroundStyle}>
              <AuthProvider>
                <StatusBar
                  barStyle={isDarkMode ? 'light-content' : 'dark-content'}
                  backgroundColor={backgroundStyle.backgroundColor}
                />
                <AuthSwitcher />
              </AuthProvider>
            </SafeAreaView>
          </CrewCreatorProvider>
        </NavigationContainer>
      </PaperProvider>
    </PreferencesProvider>
  );
};

export default App;
