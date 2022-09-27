import {StyleSheet, Text, useColorScheme, View} from 'react-native';
import React, {
  createContext,
  ReactElement,
  ReactNode,
  useContext,
  useMemo,
  useState,
} from 'react';
import {Colors} from '../themes/Colors';

interface PreferencesContextProps {
  isDarkMode: boolean;
  toggleMode: () => void;
}

export const PreferencesContext = createContext<PreferencesContextProps>(
  {} as PreferencesContextProps,
);
const PreferencesProvider = ({
  children,
}: {
  children: ReactNode;
}): ReactElement => {
  // const current = useMemo(() => {
  //     const isDarkMode = useColorScheme() === 'dark';
  //     if (isDarkMode)
  //         return true;
  //     else {
  //         return false;
  //     }
  // }, []);

  const [isDarkMode, setIsDarkMode] = useState<boolean>(true);
  const toggleMode = () => {
    console.log(`mode changed to ${isDarkMode}`);
    setIsDarkMode(!isDarkMode);
  };
  return (
    <PreferencesContext.Provider value={{isDarkMode, toggleMode}}>
      {children}
    </PreferencesContext.Provider>
  );
};

export const useUserPreferences = () => {
  const context = useContext(PreferencesContext);
  if (!context) {
    throw new Error('useUserPreferences must be used within the RealmProvider');
  }
  return context;
};

export default PreferencesProvider;

const styles = StyleSheet.create({});
