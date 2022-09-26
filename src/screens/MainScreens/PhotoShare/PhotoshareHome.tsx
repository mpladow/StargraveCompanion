import {FlatList, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Section from '../../../common/components/Atoms/Section';
import {Button, IconButton, MD3Colors} from 'react-native-paper';
import Container from '../../../common/components/Atoms/Container';
import PhotoSelector from './components/PhotoSelector.ios';

const PhotoshareHome = () => {
  return (
    <Container>
      <Section title="To Do List">Sync photos up between users live.</Section>
      <View style={styles.allPhotosContainer}>

      </View>
      {/* <FlatList for all components
      
      /> */}
      <View></View>
     <PhotoSelector/>
    </Container>
  );
};

export default PhotoshareHome;

const styles = StyleSheet.create({
  footer: {
    justifyContent: 'center',
    height: 80,
  },
  allPhotosContainer: {
    flex: 1
  },

});
