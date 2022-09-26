import {Keyboard, Pressable, StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import Button from '../../../common/components/Atoms/Button';
import { IconButton, TextInput, Button as PaperButton } from 'react-native-paper';

interface Props {
  onAddPress: (val: string) => void;
}

const TaskAdd: React.FC<Props> = ({onAddPress}) => {
  const [value, setValue] = useState('test');

  const onAddPressHandler = () => {
    if (value !== '') {
      onAddPress(value);
      setValue('');
      Keyboard.dismiss()
    }
  };
  return (
    <View style={styles.container}>
      <TextInput
      mode='outlined'
        style={styles.textInput}
        value={value}
        onChangeText={val => setValue(val)}
      />

      <Button onPress={onAddPressHandler} disabled={value == ''}>
        Add
      </Button>
    </View>
  );
};

export default TaskAdd;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 12,
  },
  textInput: {
    flex: 1,
  },
});
