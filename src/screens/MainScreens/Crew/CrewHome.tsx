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
import UnitCardCharacter from './common/UnitCardCharacter';

const CrewHome = ({navigation}) => {
  const [editMode, setEditMode] = useState(false);

  const {currentTeam, createNewTeam, deleteTeam, updateTeamName} =
    useCrewCreator();

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

  const editCaptain = () => {
    navigation.navigate('CaptainCreate');
  };

  const editFirstMate = () => {
    navigation.navigate('CaptainCreate');
  };
  useEffect(() => {
    if (currentTeam) {
      setEditMode(false);
    }else{
      setEditMode(true);
    }
  }, [currentTeam]);

  useEffect(() => {
    if (currentTeam) setValue('crewName', currentTeam?.TeamName);
    
  }, [currentTeam?.TeamName]);


  const onEditCrewNamePress = () => {
    if (!editMode) {
      updateTeamName(getValues('crewName'));
    }
    setEditMode(!editMode);
  };
  const onCreateNewTeamPress = () => {
    let crewName = getValues('crewName');
    
    createNewTeam(crewName);
  };

  const renderCrew = () => {
    return (
      <View>
        {renderCrewDetails()}
        {renderCaptainField()}
        {renderFirstMateField()}
        <Button onPress={deleteTeam}>Delete CREW DEBUG</Button>
      </View>
    );
  };
  const renderCrewDetails = () => {
    return (
      <View
        style={{
          paddingVertical: 8,
          paddingHorizontal: 4,
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}>
        <Text>Credits: {currentTeam?.Credits}</Text>
        <Text>Specialists: 4/{currentTeam?.SpecialistSlots}</Text>
      </View>
    );
  };
  const renderCaptainField = () => {
    return currentTeam?.Captain ? (
      <UnitCardCharacter character={currentTeam?.Captain}/>
    ) : (
      <View style={{paddingBottom: 8}}>
        <Button mode="contained" onPress={editCaptain}>
          Add Captain
        </Button>
      </View>
    );
  };

  const renderFirstMateField = () => {
    return currentTeam?.FirstMate ? (
      <View>
        <Text>First Mate Created</Text>
      </View>
    ) : (
      <View>
        <Button mode="contained" onPress={editCaptain}>
          Add First Mate
        </Button>
      </View>
    );
  };
  return (
    <Container>
      <Field
        // ref={crewNameRef}
        control={control}
        fieldName={'crewName'}
        label="Crew Name"
        placeholder="Enter Crew Name"
        disabled={!editMode}
        right={
          <TextInput.Icon
            icon={editMode ? 'check' : 'pencil'}
            onPress={onEditCrewNamePress}
          />
        }
      />
      {!currentTeam ? (
        <Button onPress={onCreateNewTeamPress}>Create new team</Button>
      ) : (
        renderCrew()
      )}
    </Container>
  );
};

export default CrewHome;

const styles = StyleSheet.create({});
