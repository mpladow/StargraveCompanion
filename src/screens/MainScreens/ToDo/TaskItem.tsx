import {Pressable, StyleSheet, View} from 'react-native';
import React from 'react';
import {Checkbox, Text} from 'react-native-paper';

interface Props {
  text: string;
  status?: string;
  onCompletedPress: () => void;
  onDeleteHandler: () => void;
}
const TaskItem: React.FC<Props> = ({
  text,
  status,
  onCompletedPress,
  onDeleteHandler,
}) => {
  return (
    <View style={styles.listItem}>
      <View style={{flex: 0.9}}>
        <Text>{text}</Text>
      </View>
      <View style={{flex: .35, flexDirection: 'row'}}>
        <Checkbox
          status={status == 'Open' ? 'indeterminate' : 'checked'}
          uncheckedColor='#000000'
          onPress={onCompletedPress}
        />
        <Pressable style={styles.buttonDelete} onPress={onDeleteHandler}>
          <Text style={{color: 'white'}}>Delete</Text>
        </Pressable>
      </View>
    </View>
  );
};

export default TaskItem;

const styles = StyleSheet.create({
  buttonDelete: {
    backgroundColor: 'red',
    padding: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  listItem: {
    flexDirection: 'row',
    padding: 8,
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 8,
  },
});
