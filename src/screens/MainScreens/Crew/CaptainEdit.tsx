import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Button, TextInput} from 'react-native-paper';
import {useNavigation} from '@react-navigation/native';
import Field from '../../../common/components/Atoms/Field';
import {useForm} from 'react-hook-form';
import {
  BackgroundProps,
  EquipmentProps,
  PowerProps,
  StatlineProps,
} from '../../../types/models';
import Container from '../../../common/components/Atoms/Container';
import DropdownField from '../../../common/components/Atoms/DropdownField';
import {DropdownItem} from '../../../types/types';
import {useCrewCreator} from '../../../context/CrewCreatorProvider';

type CharacterFormProps = {
  Name: string;
  Background?: string;
  Level: number;
  GearSlots: number;
  Equipment: EquipmentProps[];
  StatLine: StatlineProps[];
  Powers: PowerProps[];
};
const CaptainEdit = () => {
  const navigation = useNavigation();
  const [editMode, setEditMode] = useState(true);
  const {backgrounds, createCaptain} = useCrewCreator();
  const [dropdownBackgrounds, setDropdownBackgrounds] = useState<
    DropdownItem[]
  >([]);
  const {
    control,
    handleSubmit,
    setValue,
    getValues,
    watch,
    reset,
    formState: {errors, isValid},
  } = useForm<CharacterFormProps>({
    mode: 'onBlur',
    reValidateMode: 'onBlur',
    defaultValues: {
      Name: 'dfdfd',
    },
  });

  useEffect(() => {
    // setup dropdown values
    const _bg = backgrounds.map(
      x => ({label: x.Name, value: x._id.toHexString()} as DropdownItem),
    );
    setDropdownBackgrounds(_bg);
  }, [backgrounds]);

  const onResetPress = () => {
    reset();
    console.log('RESET FORM');
  };
  const bgWatch = watch('Background');

  useEffect(() => {
    console.log('BACKGROUND CHANGED');
  }, [bgWatch]);
  return (
    <Container>
      <Text style={{fontSize: 30}}>Create Captain</Text>

      <Field
        // ref={crewNameRef}
        control={control}
        fieldName={'Name'}
        label="Captain Name"
        placeholder="Enter Captain Name"
        disabled={!editMode}
      />
      <DropdownField
        control={control}
        fieldName={'Background'}
        label="Background"
        placeholder="Select Background"
        disabled={!editMode}
        values={dropdownBackgrounds}
      />

      {getValues('Background') && (
        <View>
          <Text>background has been set</Text>
        </View>
      )}
      <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
        <View style={{flex: 0.45}}>
          <Button mode="outlined" onPress={onResetPress}>
            Reset
          </Button>
        </View>
        <View style={{flex: 0.45}}>
          <Button mode="contained" onPress={() => {}}>
            Add Captain
          </Button>
        </View>
      </View>

      {/* <Button onPress={() => navigation.goBack()}>Go Back</Button> */}
    </Container>
  );
};

export default CaptainEdit;

const styles = StyleSheet.create({});
