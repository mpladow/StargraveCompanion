import { Pressable, StyleSheet, Text, View } from 'react-native'
import React, { FC, ReactElement } from 'react'

interface Props {
    onPress: any,
    children: any,
    disabled: boolean
}
const Button = ({onPress, children, disabled}: Props): ReactElement => {
  return (
    <Pressable disabled={disabled} onPress={onPress} style={[styles.button, disabled && styles.disabled]}>
      <Text>{children}</Text>
    </Pressable>
  )
}

export default Button

const styles = StyleSheet.create({
    button: {paddingHorizontal: 4, paddingVertical: 4},
    disabled: {opacity: 0.3}
    

})