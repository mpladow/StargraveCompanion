import { StyleSheet, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import {
  Button,
  Card,
  Divider,
  Headline,
  List,
  Text,
  TextInput,
} from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import Field from '../../../common/components/Atoms/Field';
import { useForm } from 'react-hook-form';
import Container from '../../../common/components/Atoms/Container';
import DropdownField from '../../../common/components/Atoms/DropdownField';
import { DropdownItem } from '../../../types/types';
import { useCrewCreator } from '../../../context/CrewCreatorProvider';
import { FlatList, ScrollView } from 'react-native-gesture-handler';
import Stat from './common/Stat';
import { ModSource, Stats } from '../../../common/enums';
import StatLine from './common/StatLine';
import {
  EquipmentProps,
  StatlineProps,
  PowerProps,
  StatModifierProps,
  BackgroundProps,
  StatProps,
} from '../../../types/models';

type CharacterFormProps = {
  Name: string;
  Background?: string;
  Level: number;
  GearSlots: number;
  Equipment: EquipmentProps[];
  StatLine: StatlineProps;
  Powers: PowerProps[];
};

const generateCaptDefaultStatline = () => {
  console.log('Generating default stat line');
  let statLine: StatlineProps = {
    _id: new Realm.BSON.ObjectId(),
    Stats: [
      { _id: new Realm.BSON.ObjectID(), Name: Stats.Move, Value: 6 } as StatProps,
      {
        _id: new Realm.BSON.ObjectID(),
        Name: Stats.Fight,
        Value: 3,
      } as StatProps,
      {
        _id: new Realm.BSON.ObjectID(),
        Name: Stats.Shoot,
        Value: 2,
      } as StatProps,
      {
        _id: new Realm.BSON.ObjectID(),
        Name: Stats.Armour,
        Value: 9,
      } as StatProps,
      { _id: new Realm.BSON.ObjectID(), Name: Stats.Will, Value: 3 } as StatProps,
      {
        _id: new Realm.BSON.ObjectID(),
        Name: Stats.Health,
        Value: 17,
      } as StatProps,
    ],
    StatModifiers: [],
  };
  return statLine;
};
const CaptainEdit = () => {
  const navigation = useNavigation();
  const [editMode, setEditMode] = useState(true);
  const { backgrounds, createCaptain, currentTeam } = useCrewCreator();
  const [optionalStatsSelected, setOptionalStatsSelected] = useState<
    StatModifierProps[]
  >([]);
  const [dropdownBackgrounds, setDropdownBackgrounds] = useState<
    DropdownItem[]
  >([]);

  const [selectedBackground, setSelectedBackground] =
    useState<BackgroundProps>();
  const {
    control,
    handleSubmit,
    setValue,
    getValues,
    watch,
    reset,
    formState: { errors, isValid },
  } = useForm<CharacterFormProps>({
    mode: 'onBlur',
    reValidateMode: 'onBlur',
    defaultValues: {
      Name: 'dfdfd',
      StatLine: currentTeam?.Captain?.StatLine
        ? currentTeam.Captain.StatLine
        : generateCaptDefaultStatline(),
    },
  });

  useEffect(() => {
    // setup dropdown values
    const _bg = backgrounds.map(
      x => ({ label: x.Name, value: x._id.toHexString() } as DropdownItem),
    );
    setDropdownBackgrounds(_bg);
  }, [backgrounds]);

  const onResetPress = () => {
    reset();
    console.log('RESET FORM');
  };
  const bgWatch = watch('Background');
  const stats = watch('StatLine');

  // add and remove stat choices
  const toggleOptionalStatToCharacter = (
    stat: StatModifierProps,
    alreadyAdded: boolean,
  ) => {
    const statLineModifiers = getValues('StatLine.StatModifiers');
    // if this optional stat already exists, remove it
    if (alreadyAdded) {
      setOptionalStatsSelected(oldValues => {
        let x = oldValues.filter(
          x => x._id.toHexString() !== stat._id.toHexString(),
        );
        return x;
      });
      // add values to the statline form value;
      let updatedModifiers = statLineModifiers.filter(
        x => x._id.toHexString() !== stat._id.toHexString(),
      );

      setValue('StatLine.StatModifiers', updatedModifiers);
    } else {
      // remove stat modifier
      let updatedModifiers = [...statLineModifiers, stat];
      setValue('StatLine.StatModifiers', updatedModifiers);

      setOptionalStatsSelected([...optionalStatsSelected, stat]);
    }


  };

  // gset background details and modifiers

  useEffect(() => {
    const foundBG: BackgroundProps | undefined = backgrounds.find(
      x => x._id.toHexString() == bgWatch,
    );
    if (foundBG) {
      setSelectedBackground(foundBG);
      // add modifier
      const statLineModifiers: StatModifierProps[] = getValues(
        'StatLine.StatModifiers',
      );
      // find any perm stat mods and remove them.
      let updatedModifiers: StatModifierProps[];

      // add values to the statline form value;
      updatedModifiers = statLineModifiers.filter(
        x => x.Source !== ModSource.Background.toString()
      ).filter(x => x.Source !== ModSource.OptionalBackgroundMod.toString()
      );
      // remove optional selections TODO: find a better way to look at form directly
      setOptionalStatsSelected([])

      // add new perm stat modifier
      if (foundBG?.PermStatModifier?.length > 0) {
        updatedModifiers = [
          ...updatedModifiers,
          ...foundBG?.PermStatModifier,
        ];
        setValue('StatLine.StatModifiers', updatedModifiers);

      }
    }
  }, [bgWatch, stats]);

  return (
    <ScrollView style={{ marginHorizontal: 4 }}>
      <Text style={{ fontSize: 30 }}>Create Captain</Text>

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

      {selectedBackground && (
        <>
          <Card mode="outlined" style={{ marginBottom: 4 }}>
            <Card.Title
              title={
                <Text variant="titleSmall">Background Stat Modifications</Text>
              }
            />
            <Card.Content>
              {selectedBackground.PermStatModifier.map(x => {
                return <Stat stat={x.Stat} modifierValue={x.ModifierValue} />
              })}
              {optionalStatsSelected.map(x => (
                <Stat
                  stat={x.Stat}
                  modifierValue={x.ModifierValue}
                />
              ))}
              <Divider style={{ marginVertical: 8 }} />
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}>
                <Text variant="titleSmall">Select Stat Choices</Text>
                <Text variant="bodySmall">
                  Choices remaining: {optionalStatsSelected.length}/
                  {selectedBackground.MinSelectedModsRequired}
                </Text>
              </View>

              <View
                style={{ flexDirection: 'row', justifyContent: 'space-evenly' }}>
                {selectedBackground.OptionalModifiers.map(x => {
                  const alreadySelected = optionalStatsSelected.find(
                    y => y._id.toHexString() == x._id.toHexString(),
                  );
                  return (
                    <Button
                      mode="outlined"
                      icon={alreadySelected !== undefined ? 'check' : undefined}
                      // disabled={alreadySelected !== undefined}
                      onPress={() =>
                        toggleOptionalStatToCharacter(
                          x,
                          alreadySelected !== undefined,
                        )
                      }>
                      <Stat
                        stat={x.Stat}
                        modifierValue={x.ModifierValue}
                      />
                    </Button>
                  );
                })}
              </View>
            </Card.Content>
          </Card>

          <Card mode="outlined" style={{ marginBottom: 4 }}>
            <StatLine statLine={getValues('StatLine')} />
          </Card>
        </>
      )}
      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
        <View style={{ flex: 0.45 }}>
          <Button mode="outlined" onPress={onResetPress}>
            Reset
          </Button>
        </View>
        <View style={{ flex: 0.45 }}>
          <Button mode="contained" onPress={() => { }}>
            Add Captain
          </Button>
        </View>
      </View>

      {/* <Button onPress={() => navigation.goBack()}>Go Back</Button> */}
    </ScrollView>
  );
};

export default CaptainEdit;

const styles = StyleSheet.create({});
