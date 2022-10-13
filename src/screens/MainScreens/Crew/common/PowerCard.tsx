import { Dimensions, StyleSheet, View } from 'react-native'
import React from 'react'
import { PowerProps } from '../../../../types/models'
import { Card, Text } from 'react-native-paper';

interface PowerCardProps {
    power: PowerProps;
}

export const PowerStatContainer = ({ isLast, children }) => {
    return <><Text numberOfLines={2}> {children} {!isLast && '|'}</Text></>
}
const PowerCard: React.FC<PowerCardProps> = ({ power }) => {
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
    return (
        <Card>
            <Card.Title title={power.Name} subtitleNumberOfLines={2} subtitle={


                <>
                    <PowerStatContainer isLast={false}><Text>Activation: {getTotalActivation()}</Text></PowerStatContainer>
                    <PowerStatContainer isLast={!power.AdditionalInfo}><Text>Strain: {power.Stress}</Text></PowerStatContainer>
                    {power.AdditionalInfo && <PowerStatContainer isLast={true}><Text>{power.AdditionalInfo}</Text></PowerStatContainer>}
                </>
            } />
            <Card.Content>
                {/* {<View><Text numberOfLines={50}>{power.Description}</Text></View>} */}
            </Card.Content>
        </Card >
    )
}

export default PowerCard

const styles = StyleSheet.create({
    // powerCard: {
    //     minHeight: Dimensions.get("window").height / 3,
    //     width: Dimensions.get("window").width,
    // }
})