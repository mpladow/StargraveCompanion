import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Section from '../../../common/components/Atoms/Section';

const NotesHome = () => {
  return (
    <View style={styles.container}>
      <View style={styles.contentContainer}>
      <Section title="Notes"></Section>
      </View>
    </View>
  );
};

export default NotesHome;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    flex: 1,
  },
  contentContainer: {
    flex: 1,
    flexDirection: 'column',
  },
});
