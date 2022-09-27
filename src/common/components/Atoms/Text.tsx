import { DatePickerIOSComponent, StyleSheet, Text as NativeText, View } from 'react-native'
import React from 'react'
import { useTheme } from 'react-native-paper'

const Text = (props) => {

    const {colors} = useTheme();
  return (
    <View>
      <NativeText style={{color: colors.primary}} {...props}>{props.children}</NativeText>
    </View>
  )
}

export default Text

const styles = StyleSheet.create({})