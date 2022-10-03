import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { CharacterProps } from '../../../types/models'

interface CaptainPowersEditProps {
    captain: CharacterProps
}
const CaptainPowersEdit: React.FC<CaptainPowersEditProps> = ({ captain: CharacterFormProps }) => {
    return (
        <View>
            <Text>CaptainPowersEdit</Text>
{/* list all current powers             */}
        </View>
    )
}

export default CaptainPowersEdit

const styles = StyleSheet.create({})