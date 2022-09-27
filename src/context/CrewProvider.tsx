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

interface CrewContextProps {
  isDarkMode: boolean;
  toggleMode: () => void;
}

export const CrewContext = createContext<CrewContextProps>(
  {} as CrewContextProps,
);
const CrewProvider = ({
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
    <CrewContext.Provider value={{isDarkMode, toggleMode}}>
      {children}
    </CrewContext.Provider>
  );
};

export const useUserPreferences = () => {
  const context = useContext(CrewContext);
  if (!context) {
    throw new Error('useUserPreferences must be used within the RealmProvider');
  }
  return context;
};

export default CrewProvider;

const styles = StyleSheet.create({});
