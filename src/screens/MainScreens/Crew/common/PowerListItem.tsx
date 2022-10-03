import { StyleSheet, View } from 'react-native'
import React from 'react'
import { PowerProps } from '../../../../types/models';
import { Card, Checkbox, Text } from 'react-native-paper';
import { PowerStatContainer } from './PowerCard';

interface PowerListItemProps {
    power: PowerProps;
}
const PowerListItem: React.FC<PowerListItemProps> = ({ power }) => {
    const getTotalActivation = () => {
        if (power.ActivationModifiers) {
            let totalModCount = power.ActivationModifiers.reduce(
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
    return (
        <Card style={{ margin: 4 }}>
            <Card.Content style={{flexDirection: 'row'}}>
                <View>
                    <Text variant={'bodyMedium'} >{power.Name}</Text>

                    <View style={{ flexDirection: 'row' }}>
                        <PowerStatContainer isLast={false}><Text variant='bodySmall'>Activation: {getTotalActivation()}</Text></PowerStatContainer>
                        <PowerStatContainer isLast={true}><Text variant='bodySmall'>Strain: {power.Stress}</Text></PowerStatContainer>
                    </View>
                    {power.AdditionalInfo && <PowerStatContainer isLast={true}><Text variant='bodySmall'>{power.AdditionalInfo}</Text></PowerStatContainer>}
                </View>
                <View style={{flex: 1, alignItems: 'flex-end', justifyContent: 'center'}}>
                    <Checkbox status={'checked'}/>
                </View>
            </Card.Content>
        </Card>

    )
}

export default PowerListItem

const styles = StyleSheet.create({})