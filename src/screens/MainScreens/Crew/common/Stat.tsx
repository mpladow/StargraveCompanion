import {StyleSheet, View} from 'react-native';
import React from 'react';
import {Text} from 'react-native-paper';

interface Stat {
  stat: string;
  modifierValue: number;
}
const Stat = ({stat, modifierValue}) => {
  const statText = `${stat} ${Math.sign(modifierValue) == 1 ? '+' : '-'}${modifierValue}`;
  return (
      <Text>{statText}</Text>
  );
};

export default Stat;

const styles = StyleSheet.create({});
