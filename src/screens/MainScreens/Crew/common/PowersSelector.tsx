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
            {powers.map((item) => (<Text>{item.Name}</Text>))}
            {/* <FlatList data={powers} renderItem={(item) => (<PowerCard power={item} />)} /> */}
        </>
    )
}

export default PowersSelector

const styles = StyleSheet.create({})