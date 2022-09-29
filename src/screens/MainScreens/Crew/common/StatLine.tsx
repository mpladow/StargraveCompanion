import {StyleSheet, View} from 'react-native';
import React from 'react';
import {StatlineProps, StatProps} from '../../../../types/models';
import {Text} from 'react-native-paper';
import Container from '../../../../common/components/Atoms/Container';
import Stat from './Stat';
import {Stats} from '../../../../common/enums';

interface StatLineComponent {
  statLine: StatlineProps;
}

const StatLine: React.FC<StatLineComponent> = (statLine: StatLineComponent) => {

  const calculateStat = (stat: StatProps) => {
    let modifiers = statLine.statLine.StatModifiers.filter(
      x => x.Stat == stat.Name,
    );
    let totalModCount = modifiers.reduce(
      (partial, a) => partial + a.ModifierValue,
      0,
    );
    return totalModCount + stat.Value;
  };

  return (
    <View>
      <View style={{flexDirection: 'row', justifyContent: 'space-evenly'}}>
        <Text variant="labelMedium">Move</Text>
        <Text variant="labelMedium">Fight</Text>
        <Text variant="labelMedium">Shoot</Text>
        <Text variant="labelMedium">Armour</Text>
        <Text variant="labelMedium">Will</Text>
        <Text variant="labelMedium">Health</Text>
      </View>
      <View style={{flexDirection: 'row', justifyContent: 'space-evenly'}}>
        {statLine.statLine.Stats.map(x => {
          const addPlus =
            x.Name == 'Fight' || x.Name == 'Shoot' || x.Name == 'Will';
          const markup = addPlus ? (
            <View>
              <Text variant="bodyMedium">+{calculateStat(x)}</Text>
            </View>
          ) : (
            <View>
              <Text variant="bodyMedium">{calculateStat(x)}</Text>
            </View>
          );
          return markup;
        })}
      </View>
    </View>
  );
};

export default StatLine;

const styles = StyleSheet.create({});
