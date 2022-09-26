import { StyleSheet, Text, useColorScheme, View } from 'react-native'
import React, { PropsWithChildren } from 'react'
import { Colors } from '../../../themes/Colors';

const Section: React.FC<
  PropsWithChildren<{
    title: string;
  }>
> = ({children, title}) => {
  const isDarkMode = useColorScheme() === 'dark';
  return (
    <View style={styles.sectionContainer}>
      <Text
        style={[
          styles.sectionTitle,
          {
            color: isDarkMode ? Colors.dark.text : Colors.light.text,
          },
        ]}>
        {title}
      </Text>
      <Text
        style={[
          styles.sectionDescription,
          {
            color: isDarkMode ? Colors.dark.text : Colors.light.text,
          },
        ]}>
        {children}
      </Text>
    </View>
  );
};

export default Section

const styles = StyleSheet.create({
    sectionContainer: {
    //   marginTop: 32,
    marginTop: 12,
      paddingHorizontal: 12,
    },
    sectionTitle: {
      fontSize: 24,
      fontWeight: '600',
    },
    sectionDescription: {
      marginTop: 8,
      fontSize: 16,
      fontWeight: '400',
    },
    highlight: {
      fontWeight: '700',
    },
  });
  