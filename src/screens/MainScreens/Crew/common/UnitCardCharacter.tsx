import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import { CharacterProps } from '../../../../types/models'
import { Button, Card } from 'react-native-paper'
import StatLine from './StatLine'

interface UnitCardCharacterProps {
    character: CharacterProps
}
const UnitCardCharacter: React.FC<UnitCardCharacterProps> = ({ character }) => {
    useEffect(() => {
        
    })
    const editEquipment = () => {
        // navigate to page that will allow user to add and remove equipment
    }
    return (
        <Card>
            <Card.Title title={<Text>{character.Name} - {character.Level}</Text>} subtitle={character.Background.Name}></Card.Title>
            <Card.Content>
                <StatLine statLine={character.StatLine} />
                {character?.Equipment?.length > 0 ? (
                    // list equipment
                    <View></View>
                ) : (<Button onPress={ () => editEquipment}>Edit Equipment</Button>)}
            </Card.Content>
        </Card>
    )
}

export default UnitCardCharacter

const styles = StyleSheet.create({})