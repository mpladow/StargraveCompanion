import { StyleSheet, View } from 'react-native'
import React, { useEffect, useMemo, useState } from 'react'
import { PowerProps } from '../../../../types/models';
import { Card, Checkbox, Text } from 'react-native-paper';
import { PowerStatContainer } from './PowerCard';

interface PowerListItemProps {
    power: PowerProps;
    onCheckPress: (powerId: number) => void;
    onPress?: () => void;
    isChecked: boolean;
    isCorePower: boolean;
}
const PowerListItem: React.FC<PowerListItemProps> = ({ power, onCheckPress, onPress, isChecked, isCorePower }) => {
    const [powerChecked, setPowerChecked] = useState(isChecked)
    useMemo(() => {
        if (powerChecked !== isChecked)
        console.log('checked changed');
        setPowerChecked(isChecked)
    }, [isChecked])

    const getTotalActivation = () => {
        if (power.ActivationModifiers) {
            let copy = power.ActivationModifiers;
            let totalModCount = copy.reduce(
                (partial, a) => partial + a.ModifierValue,
                0,
            );
            power.ActivationModifiers
            return totalModCount + power.Activation;
        }

        else {
            return power.Activation;
        }
    }
    const onListItemPress = () => {
        setPowerChecked(!powerChecked)
        onCheckPress(power.PowerId);
    }
    return (
        <Card style={{ margin: 4 }}>
            <Card.Content style={{ flexDirection: 'row' }}>
                <View>
                    <Text variant={'bodyMedium'} >{power.Name}</Text>

                    <View style={{ flexDirection: 'row' }}>
                        <PowerStatContainer isLast={false}><Text variant='bodySmall'>Activation: {getTotalActivation()}</Text></PowerStatContainer>
                        <PowerStatContainer isLast={true}><Text variant='bodySmall'>Strain: {power.Stress}</Text></PowerStatContainer>
                    </View>
                    {power.AdditionalInfo && <PowerStatContainer isLast={true}><Text variant='bodySmall'>{power.AdditionalInfo}</Text></PowerStatContainer>}
                </View>
                <View style={{ flex: 1, alignItems: 'flex-end', justifyContent: 'center' }}>
                    <Checkbox onPress={() => onListItemPress()} status={powerChecked ? 'checked' : 'unchecked'} />
                </View>
            </Card.Content>
        </Card>

    )
}

export default PowerListItem

const styles = StyleSheet.create({})