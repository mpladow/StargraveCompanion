import { StyleSheet, Text, View } from 'react-native'
import React, { ReactElement, ReactNode } from 'react'
import useCustomTheme from '../../../hooks/Theme/useCustomTheme'
import { Props } from 'react-native-paper'

const Container = ({children, props}: {children: ReactNode, props?: Props}): ReactElement  => {


  return (
    <View {...props} style={[styles.container]}>
      {children}
    </View>
  )
}

export default Container

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 4,
    flex: 1,
    flexDirection: 'column',
  }
})