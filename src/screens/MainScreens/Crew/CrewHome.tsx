import {StyleSheet, View} from 'react-native';
import React, {useState} from 'react';
import Container from '../../../common/components/Atoms/Container';
import {Button, TextInput} from 'react-native-paper';
import Text from '../../../common/components/Atoms/Text';
import Field from '../../../common/components/Atoms/Field';
import {useForm} from 'react-hook-form';
import {useUserPreferences} from '../../../context/PreferencesProvider';

const CrewHome = ({navigation}) => {
  const [crewName, setCrewName] = useState<string>('');

  const [editMode, setEditMode] = useState(false);
  type CrewHomeFormProps = {
    crewName: string;
  };

  const {
    control,
    handleSubmit,
    formState: {errors, isValid},
  } = useForm<CrewHomeFormProps>({
    mode: 'onBlur',
    reValidateMode: 'onBlur',
  });

  const {toggleMode} = useUserPreferences();
  const editCaptain = () => {
    navigation.navigate('CaptainEdit');
  };
  return (
    <Container>
      <View>
        <Text>Crew Name</Text>
      </View>
      {editMode ? (
        <Field control={control} fieldName={crewName} />
      ) : (
        <Text></Text>
      )}
      <Field control={control} fieldName={crewName} />
      <Text>CrewHdf dfds fdome</Text>
      <Button onPress={() => toggleMode()}>TOGGLE MODE</Button>
      <Button onPress={() => editCaptain()}>Edit Captain</Button>
    </Container>
  );
};

export default CrewHome;

const styles = StyleSheet.create({});
