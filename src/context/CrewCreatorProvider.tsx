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
import {BackgroundProps} from '../types/models';
import RealmContext from './RealmContext';
import {BackgroundSchema} from '../realm/models';
import {DropdownItem} from '../types/types';

interface CrewCreatorContextProps {
  backgrounds: BackgroundProps[];
}

export const CrewCreatorContext = createContext<CrewCreatorContextProps>(
  {} as CrewCreatorContextProps,
);
const CrewCreatorProvider = ({
  children,
}: {
  children: ReactNode;
}): ReactElement => {
  const {useRealm, useQuery} = RealmContext;

  const backgrounds = useQuery<BackgroundProps>('Background');
  // get data from realmdb
  useEffect(() => {
    // setup dropdowns
  }, []);



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
