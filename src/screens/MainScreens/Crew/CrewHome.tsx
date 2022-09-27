import {StyleSheet, View} from 'react-native';
import React, {useState} from 'react';
import Container from '../../../common/components/Atoms/Container';
import {Button, Menu, TextInput} from 'react-native-paper';
import Text from '../../../common/components/Atoms/Text';
import Field from '../../../common/components/Atoms/Field';
import {useForm} from 'react-hook-form';
import {useUserPreferences} from '../../../context/PreferencesProvider';
import DropDown from 'react-native-paper-dropdown';
import {useCrewCreator} from '../../../context/CrewCreatorProvider';
import {DropdownItem} from '../../../types/types';
import DropdownField from '../../../common/components/Atoms/DropdownField';

const CrewHome = ({navigation}) => {
  const [crewName, setCrewName] = useState<string>('');

  const [editMode, setEditMode] = useState(false);

  const {backgrounds} = useCrewCreator();

  const [bgDropdown, setBgDropdown] = useState<DropdownItem[]>([]);
  type CrewHomeFormProps = {
    crewName: string;
  };

  const {
    control,
    handleSubmit,
    setValue,
    getValues,
    formState: {errors, isValid},
  } = useForm<CrewHomeFormProps>({
    mode: 'onBlur',
    reValidateMode: 'onBlur',
  });

  const {toggleMode} = useUserPreferences();
  const editCaptain = () => {
    navigation.navigate('CaptainEdit');
  };
  const [showDropDown, setShowDropDown] = useState(false);

  const onEditCrewNamePress = () => {
    setEditMode(!editMode);
  };
  return (
    <Container>
      <Field
        control={control}
        fieldName={'crewName'}
        label="Crew Name"
        placeholder="Enter Crew Name"
        disabled={editMode}
        right={<TextInput.Icon icon="pencil" onPress={onEditCrewNamePress} />}
      />
      <DropdownField
        control={control}
        fieldName={'Background'}
        label="Crew Name"
        placeholder="Enter Crew Name"
        disabled={editMode}
        values={bgDropdown}
      />

      <Button onPress={() => toggleMode()}>TOGGLE MODE</Button>
      <Button onPress={() => editCaptain()}>Edit Captain</Button>
    </Container>
  );
};

export default CrewHome;

const styles = StyleSheet.create({});
