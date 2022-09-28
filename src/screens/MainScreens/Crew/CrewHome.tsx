import {StyleSheet, View} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
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
  const [editMode, setEditMode] = useState(false);

  const {backgrounds, currentTeam, createNewTeam} = useCrewCreator();

  const [bgDropdown, setBgDropdown] = useState<DropdownItem[]>([]);
  type CrewHomeFormProps = {
    crewName: string;
  };
  // const crewNameRef = useRef()


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

  // useEffect(() => {
  //   // setup dropdown values
  //   const _bg = backgrounds.map(
  //     x => ({label: x.Name, value: x._id.toHexString()} as DropdownItem),
  //   );
  //   setBgDropdown(_bg);
  // }, [backgrounds]);

  const onEditCrewNamePress = () => {
    setEditMode(!editMode);
  };
  const onCreateNewTeamPress = () => {
    let crewName = getValues('crewName');
    console.log(getValues('crewName'));
    createNewTeam(crewName);
  };
  return (
    <Container>
      <Field
      // ref={crewNameRef}
        control={control}
        fieldName={'crewName'}
        label="Crew Name"
        placeholder="Enter Crew Name"
        disabled={editMode}
        right={
          <TextInput.Icon
            icon={editMode ? 'pencil' : 'check'}
            onPress={onEditCrewNamePress}
          />
        }
      />
      {currentTeam ? (
        <Text>TEAM EXISTS</Text>
      ) : (
        <Button onPress={onCreateNewTeamPress}>Create new team</Button>
      )}
      {/* <DropdownField
        control={control}
        fieldName={'Background'}
        label="Background"
        placeholder="Enter Crew Name"
        disabled={editMode}
        values={bgDropdown}
      /> */}

      <Button onPress={() => toggleMode()}>TOGGLE MODE</Button>
      <Button onPress={() => editCaptain()}>Edit Captain</Button>
    </Container>
  );
};

export default CrewHome;

const styles = StyleSheet.create({});
