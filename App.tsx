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
import React, {useState, type PropsWithChildren} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

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
import RealmProvider from './src/context/RealmProvider';
import CrewCreatorProvider from './src/context/CrewCreatorProvider';
const App = () => {
  const {isDarkMode} = useUserPreferences();
  const [dm, setDm] = useState(isDarkMode);
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
  return (
    <PreferencesProvider>
      <PaperProvider
        theme={isDarkMode ? CombinedDarkTheme : CombinedDefaultTheme}>
        <NavigationContainer
          theme={isDarkMode ? CombinedDarkTheme : CombinedDefaultTheme}>
          <CrewCreatorProvider>
            <SafeAreaView style={backgroundStyle}>
              <AuthProvider>
                {/* <RealmProvider> */}
                <StatusBar
                  barStyle={isDarkMode ? 'light-content' : 'dark-content'}
                  backgroundColor={backgroundStyle.backgroundColor}
                />
                <AuthSwitcher />
                {/* </RealmProvider> */}
              </AuthProvider>
            </SafeAreaView>
          </CrewCreatorProvider>
        </NavigationContainer>
      </PaperProvider>
    </PreferencesProvider>
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
