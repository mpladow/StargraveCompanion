import { FlatList, StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import { BackgroundProps, PowerProps } from '../../../../types/models'
import PowerCard from './PowerCard';
import { useCrewCreator } from '../../../../context/CrewCreatorProvider';

interface PowersSelectorProps {
    selectedBackground: BackgroundProps;
    characterPowerIds: number[]// array of all powerids character owns
}
const PowersSelector: React.FC<PowersSelectorProps> = ({ selectedBackground, characterPowerIds }) => {
    const { powers, backgrounds } = useCrewCreator();

    return (
        <>
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
                <FlatList data={backgroundPowers} renderItem={({ item }) => <PowerListItem power={item} isCorePower={false} onCheckPress={() => toggleCharacterPower(item.PowerId)} isChecked={getIsPowerSelected(item.PowerId)} />} />
              )

                : (
                  <FlatList data={nonBackgroundPowers} renderItem={({ item }) => <PowerListItem power={item} isCorePower={false} onCheckPress={() => toggleCharacterPower(item.PowerId)} isChecked={getIsPowerSelected(item.PowerId)} />} />
                )
              }
            </View>
            <View style={{ flex: .4, flexDirection: 'row', justifyContent: 'space-evenly', paddingTop: 20 }}>
              <Button mode={'contained'} onPress={() => setShowPowersModal(false)}>Save</Button>
              <Button mode={'outlined'} onPress={() => setShowPowersModal(false)}>Back</Button>
            </View>
        </>
    )
}

export default PowersSelector

const styles = StyleSheet.create({})