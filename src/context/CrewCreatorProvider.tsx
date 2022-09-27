import {StyleSheet, Text, useColorScheme, View} from 'react-native';
import React, {
  createContext,
  ReactElement,
  ReactNode,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import {Colors} from '../themes/Colors';
import { Background } from '../types/models';

interface CrewCreatorContextProps {
  backgrounds: Background[];
}

export const CrewCreatorContext = createContext<CrewCreatorContextProps>(
  {} as CrewCreatorContextProps,
);
const CrewCreatorProvider = ({
  children,
}: {
  children: ReactNode;
}): ReactElement => {
  const [backgrounds, setBackgrounds] = useState<Background[]>([]);
  // get data from realmdb
  useEffect(()=> {
  }, [])
  const getBackgrounds = () => {
{}
  }

  return (
    <CrewCreatorContext.Provider value={{backgrounds}}>
      {children}
    </CrewCreatorContext.Provider>
  );
};

export const useCrewCreator = () => {
  const context = useContext(CrewCreatorContext);
  if (!context) {
    throw new Error(
      'useCrewCreator must be used within the CrewCreatorContext',
    );
  }
  return context;
};

export default CrewCreatorProvider;

const styles = StyleSheet.create({});
