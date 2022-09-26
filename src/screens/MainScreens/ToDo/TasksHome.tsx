import {
  FlatList,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  useColorScheme,
  View,
} from 'react-native';
import React, {useEffect, useMemo, useState} from 'react';
import TaskAdd from './TaskAdd';
import TaskItem from './TaskItem';
import Realm from 'realm';
import {useRealm} from '../../../hooks/Realm/useRealm';
import {Item} from 'react-native-paper/lib/typescript/components/List/List';
import {TasksSchema} from '../../../realm/models';
import Section from '../../../common/components/Atoms/Section';
import { Colors } from '../../../themes/Colors';

interface Task {
  _id: Realm.BSON.ObjectId;
  Text: string;
  Status?: string;
  GroupName?: string;
}

// use realm to interact with the database
const initRealm = async () => {
  // ## init realm - NOTE not sure what path is and what that relates to
  // const realm = await Realm.open({
  //   path: 'myRealm',
  //   schema: [TaskSchema],
  // });
  //write to database
  // realm.write(() => {
  //   let task1 = realm.create('Task', {
  //     _id: 1,
  //     text: 'go grocery shopping',
  //     dateCreated: Date.now(),
  //     status: 'Open',
  //   });
  //   console.warn(task1.text, 'TEST');
  // });
  // #### reading all records from dataase
  // const tasks = realm.objects('Task');
  // console.log(`The List of tasks are: ${tasks.map(task => {return `${task.text} ${task._id}`}  )}`);
  // // #### reading a single item from database
  // const myTask = realm.objectForPrimaryKey('Task', 1)
  // console.log('My task is ' + myTask?.text)
  // // #### update a single found item from database
  // realm.write(() => {
  //   const myTask = realm.objectForPrimaryKey('Task', 1)
  //   console.log('My task is ' + myTask?.text + ' ' +  myTask?.status)
  //   myTask.status = 'Closed';
  //   console.log('My task status has changed to:  ' + myTask?.text + ' ' +  myTask?.status)
  // })
  // // ### delete ONE record from the database
  // realm.write(() => {
  //   let myTask = realm.objectForPrimaryKey('Task', 1);
  //   realm.delete(myTask)
  //   console.log('Task has been deleted');
  // })
};
// initRealm();

const TasksHome = () => {
  const [tasks, setTasks] = useState([] as Task[]);
  const [group, setGroup] = useState('');

  const {realm} = useRealm();

  const isDarkMode = useColorScheme() === 'dark';

  // const backgroundStyle = {
  //   backgroundColor: isDarkMode ? Colors.dark.background : Colors.light.background,
  //   flex: 1,
  // };
  // const sortedTasks = useMemo(() => {
  //   return realm?.objects<Task>('Task').filter(x => x.Status == 'Open');
  // }, tasks);

  const setAllTasksFromRealm = () => {
    let _tasks = realm?.objects<Task>('Task');
    let tasksJson = _tasks?.toJSON() as Task[];
    if (tasksJson?.length > 0) {
      setTasks(tasksJson);

      // setTasks(_tasks?.toJSON() as Task[]);
    }
    setTasks(_tasks?.toJSON() as Task[]);

    try {
      _tasks?.addListener(onRealmTasksChange);
    } catch (error) {}
    // try {
    //   _Tasks?.addListener(() => {
    //     setTasks([..._Tasks]);Í
    //   });
    // } catch (error) {}
  };
  const onRealmTasksChange = (tasks, changes) => {
    let _tasks = realm?.objects('Task');
    console.log(_tasks, 'ALL TASKS FROM LISTERNER');
    setTasks(_tasks?.toJSON() as Task[]);
  };

  useEffect(() => {
    setAllTasksFromRealm();
  }, []);

  const addTaskItem = val => {
    // add value in realm
    console.log(val, 'value');
    let taskItem = {_id: new Realm.BSON.ObjectId(), Text: val, Status: 'Open'};

    realm?.write(() => {
      let itemCreated = realm.create('Task', taskItem);
      console.log(itemCreated, 'itemCreated');
    });
  };

  const deleteTaskItem = id => {
    let itemToDelete = realm
      ?.objects<Task>('Task')
      .find(x => x._id.toHexString() == id);

    console.log(itemToDelete, 'item to delete');
    realm?.write(() => {
      realm.delete(itemToDelete);
    });
  };
  const toggleCompleteTaskItem = id => {
    let itemToUpdate = realm
      ?.objects<Task>('Task')
      .find(x => x._id.toHexString() == id);
    realm?.write(() => {
      if (itemToUpdate != null) {
        itemToUpdate.Status =
          itemToUpdate.Status == 'Open' ? 'Complete' : 'Open';
      }
    });
  };

  return (
    <KeyboardAvoidingView
      style={[styles.container]}
      behavior={Platform.OS === 'ios' ? 'height' : 'padding'} 
      keyboardVerticalOffset={50}>
        <View style={styles.contentContainer}>
          <Section title="To Do List">Synced with RealmDb and MongoDb.</Section>
          <FlatList
            data={tasks}
            ListEmptyComponent={
              <View style={{paddingHorizontal: 24}}>
                <Text>No Items Exist</Text>
              </View>
            }
            renderItem={({item}) => {
              console.log(item, 'items in render');
              return (
                <TaskItem
                  status={item.Status}
                  text={item.Text}
                  onCompletedPress={() =>
                    toggleCompleteTaskItem(item._id.toHexString())
                  }
                  onDeleteHandler={() => {
                    deleteTaskItem(item._id.toHexString());
                  }}
                />
              );
            }}
          />
        </View>
      <View style={styles.footer}>
        <TaskAdd onAddPress={val => addTaskItem(val)}></TaskAdd>
      </View>
    </KeyboardAvoidingView>
  );
};

export default TasksHome;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    flex: 1,
  },
  contentContainer: {
    flex: 1,
    flexDirection: 'column',
  },
  footer: {
    justifyContent: 'center',
    height: 80,
  },
});
