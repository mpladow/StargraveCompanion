import { Dimensions, StyleSheet, View } from 'react-native';
import React, { useEffect, useMemo, useState } from 'react';
import {
  Button,
  Card,
  Chip,
  Divider,
  Modal,
  Portal,
  Text,
  useTheme,
} from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import Field from '../../../common/components/Atoms/Field';
import { useFieldArray, useForm } from 'react-hook-form';
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
  CharacterProps,
} from '../../../types/models';
import PowerListItem from './common/PowerListItem';
import { usePowersContext } from '../../../context/PowersProvider';

type CharacterFormProps = {
  Name: string;
  Background: string;
  Level: number;
  GearSlots: number;
  Equipment: EquipmentProps[];
  StatLine: StatlineProps;
  Powers: PowerProps[];
};

const generateCaptDefaultStatline = () => {
  let statLine: StatlineProps = {
    _id: new Realm.BSON.ObjectId(),
    Stats: [
      {
        _id: new Realm.BSON.ObjectID(),
        Order: 1,
        Name: Stats.Move,
        Value: 6
      } as StatProps,
      {
        _id: new Realm.BSON.ObjectID(),
        Order: 1,
        Name: Stats.Fight,
        Value: 3,
      } as StatProps,
      {
        _id: new Realm.BSON.ObjectID(),
        Order: 2,
        Name: Stats.Shoot,
        Value: 2,
      } as StatProps,
      {
        _id: new Realm.BSON.ObjectID(),
        Order: 3,
        Name: Stats.Armour,
        Value: 9,
      } as StatProps,
      {
        _id: new Realm.BSON.ObjectID(),
        Order: 4,
        Name: Stats.Will, Value: 3
      } as StatProps,
      {
        _id: new Realm.BSON.ObjectID(),
        Order: 5,
        Name: Stats.Health,
        Value: 17,
      } as StatProps,
    ],
    StatModifiers: [],

  };
  return statLine;
};
const CaptainCreate = () => {
  const navigation = useNavigation();
  const [editMode, setEditMode] = useState(true);
  const [showPowersModal, setShowPowersModal] = useState(false)
  const { backgrounds, createCaptain, currentTeam } = useCrewCreator();
  const {powers, corePowers, optionalPowers, setBackgroundInContext} = usePowersContext();
  const [newCharacter, setNewCharacter] = useState(currentTeam?.Captain?._id ? true : true)
  const [showCorePowersList, setShowCorePowersList] = useState(true)
  const [showOptionalPowersList, setShowOptionalPowersList] = useState(false)

  const theme = useTheme();
  const [optionalStatsSelected, setOptionalStatsSelected] = useState<
    StatModifierProps[]
  >([]);
  const [dropdownBackgrounds, setDropdownBackgrounds] = useState<
    DropdownItem[]
  >([]);

  const [selectedBackground, setSelectedBackground] =
    useState<BackgroundProps>();

  // setup form
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
      Name: '',
      Background: currentTeam?.Captain?.Background ? currentTeam.Captain.Background.Name : '',
      StatLine: currentTeam?.Captain?.StatLine
        ? currentTeam.Captain.StatLine
        : generateCaptDefaultStatline(),
      Powers: new Array as PowerProps[]
    },
  });

  //@ts-ignore
  const powersArray = useFieldArray({
    control,
    name: "Powers"
  });


  const [showConfirmAddModal, setShowConfirmAddModal] = useState(false)

  // setup Dropdown values
  useEffect(() => {
    const _bg = backgrounds.map(
      x => ({ label: x.Name, value: x._id.toHexString() } as DropdownItem),
    );
    setDropdownBackgrounds(_bg);
  }, [backgrounds]);

  // Reset Form
  const onResetPress = () => {
    reset();

  };
  const bgWatch = watch('Background');
  const powersWatch = watch('Powers');

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

  const selectPowers = () => {
    setShowPowersModal(true)
  }
  useEffect(() => {



  }, [powersWatch])


  const onSaveCaptain = () => {
    const newCaptain: CharacterProps = {
      ...getValues(),
      _id: new Realm.BSON.ObjectID(),
      Background: selectedBackground ? selectedBackground : backgrounds[0],
      IsCaptain: true,
      Powers: powersArray.fields
    };
    console.log(newCaptain);
    newCaptain.Powers.forEach(x => x.ActivationModifiers = [])
    createCaptain(newCaptain);
    navigation.navigate('Crew')
  }

  // get all default powers for background


  // get all remaining powers after backgroundpowers have been set



  // get background details and modifiers when background changes
  useEffect(() => {
    const foundBG: BackgroundProps | undefined = backgrounds.find(
      x => x._id.toHexString() == bgWatch,
    );
    if (foundBG) {
      reset();
      setSelectedBackground(foundBG);

      setBackgroundInContext(foundBG);

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
      if (foundBG?.PermStatModifiers?.length > 0) {
        updatedModifiers = [
          ...updatedModifiers,
          ...foundBG?.PermStatModifiers,
        ];
        setValue('StatLine.StatModifiers', updatedModifiers);

      }
    }
  }, [bgWatch]);

  // add or remove this power from the form
  const toggleCharacterPower = (powerId: number) => {

    const powerToAdd = powers.find(x => x.PowerId == powerId);


    const powerExists = powersArray.fields.find(x => x.PowerId === powerId);

    if (powerToAdd) {
      if (powerExists) {
        const index = powersArray.fields.indexOf(powerExists)
        console.log(index, 'index');
        // setValue('Powers', newArray);
        powersArray.remove(index)
      } else {
        powersArray.append(powerToAdd);

      }
    }

    // do checks to make sure no more powers than are allowed are added
  }
  const getIsPowerSelected = (powerId: number) => {
    const powerToCheck = getValues('Powers').find(x => x.PowerId == powerId);
    if (powerToCheck) {
      return true;
    }
    else {
      return false;
    }

  }
  const togglePowersDisplayed = () => {
    if (showCorePowersList) {
      setShowCorePowersList(false);
      setShowOptionalPowersList(true);
    } else {
      setShowCorePowersList(true);
      setShowOptionalPowersList(false);
    }
  }
  return (
    <>
      <ScrollView style={{ marginHorizontal: 4 }}>
        <Text style={{ fontSize: 30 }}>Create Captain</Text>
        <Card mode="outlined" style={{ marginBottom: 4 }}>
          <Card.Content>
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
              disabled={!editMode && newCharacter}
              values={dropdownBackgrounds}
            />
          </Card.Content>
        </Card>


        {selectedBackground && (
          <>
            <Card mode="outlined" style={{ marginBottom: 4 }}>
              <Card.Title
                title={
                  <Text variant="titleSmall">Background Stat Modifications</Text>
                }
              />
              <Card.Content>
                {newCharacter && (
                  <>
                    {selectedBackground.PermStatModifiers.map((x, index) => {
                      return <Stat key={index} stat={x.Stat} modifierValue={x.ModifierValue} />
                    })}
                    {optionalStatsSelected.map((x, index) => (
                      <Stat key={index}
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
                  </>
                )}

              </Card.Content>
            </Card>

            <Card mode="outlined" style={{ marginBottom: 4 }}>
              <Card.Title title={<Text variant='titleSmall'>Stat Line</Text>} />
              <Card.Content>
                <StatLine statLine={getValues('StatLine')} />
              </Card.Content>
            </Card>
            <Card mode="outlined" style={{ marginBottom: 4 }}>
              <Card.Title title={<Text variant='titleSmall'>Powers</Text>} />
              <Card.Content>
                {powersArray.fields.map(x => {
                  return <View><Text selectionColor={'blue'}>{x.Name}</Text></View>
                })}
                <Button onPress={selectPowers}>Select Powers</Button>

              </Card.Content>
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
            <Button mode="contained" onPress={() => { setShowConfirmAddModal(true) }}>
              Add Captain
            </Button>
          </View>
        </View>

        {/* <Button onPress={() => navigation.goBack()}>Go Back</Button> */}
      </ScrollView>
      <Portal>
        <Modal visible={showConfirmAddModal} onDismiss={() => setShowConfirmAddModal(false)} contentContainerStyle={styles.modalContainer}>
          <View>
            <Text>Create Captain?</Text>
            <Text>Do you want to create this captain? You cannot change your background, stats or powers after saving!</Text>

            <Button mode={'contained'} onPress={() => onSaveCaptain()}>Create Captain</Button>
          </View>
        </Modal>
        <Modal visible={showPowersModal} onDismiss={() => setShowPowersModal(false)} contentContainerStyle={styles.modalContainer} style={{ paddingVertical: 16 }}>
          <View style={{ flexDirection: 'column', marginVertical: 32, height: Dimensions.get('screen').height }}>
            <View style={{ flex: 1, justifyContent: 'space-evenly' }}>
              <Text>Total selected</Text>
              <View style={{ height: Dimensions.get('screen').height / 6, flexGrow: 0, flexDirection: 'row', justifyContent: 'flex-start', flexWrap: 'wrap' }}>
                {powersArray.fields.map((item, index) => (
                  <Chip icon="information" onClose={() => toggleCharacterPower(item.PowerId)}>{item.Name}</Chip>
                ))}
              </View>
              <View>
                <Button mode='outlined' onPress={togglePowersDisplayed}>{showCorePowersList ? 'Show Optional Powers' : 'Show Core Powers'}</Button>

              </View>
            </View>
            <View style={{ flex: 1 }}>
              <Text>{showCorePowersList ? 'Core Powers' : 'Optional Powers'}</Text>
              {showCorePowersList && selectedBackground ? (
                <FlatList data={corePowers} renderItem={({ item }) => <PowerListItem power={item} isCorePower={false} onCheckPress={() => toggleCharacterPower(item.PowerId)} isChecked={getIsPowerSelected(item.PowerId)} />} />
              )

                : (
                  <FlatList data={optionalPowers} renderItem={({ item }) => <PowerListItem power={item} isCorePower={false} onCheckPress={() => toggleCharacterPower(item.PowerId)} isChecked={getIsPowerSelected(item.PowerId)} />} />
                )
              }
            </View>
            <View style={{ flex: .4, flexDirection: 'row', justifyContent: 'space-evenly', paddingTop: 20 }}>
              <Button mode={'contained'} onPress={() => setShowPowersModal(false)}>Save</Button>
              <Button mode={'outlined'} onPress={() => setShowPowersModal(false)}>Back</Button>
            </View>
          </View>
        </Modal>
      </Portal>
    </>
  );
};


export default CaptainCreate;

const styles = StyleSheet.create({
  modalContainer: {
    backgroundColor: 'white',
    padding: 20
  }
});
