import {Modal, StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import {Button, MD3Colors} from 'react-native-paper';
import TakePhoto from './TakePhoto';

const PhotoSelector = props => {
  const [showCameraModal, setShowCameraModal] = useState(false);
  const onTakePhotoPress = () => {
    setShowCameraModal(!showCameraModal)
  };
  return (
    <View>
      <View style={[styles.photoSelectorComponent]}>
        <View style={[styles.buttonContainer]}>
          <Button
            icon="camera"
            mode="contained"
            style={[styles.button]}
            onPress={() => onTakePhotoPress()}>
            Take Photos
          </Button>
        </View>
        <View style={[styles.buttonContainer]}>
          <Button
            icon="image-multiple-outline"
            mode="contained"
            style={[styles.button]}
            onPress={() => console.log('Pressed')}>
            Gallery
          </Button>
        </View>
      </View>
      <Modal
        animationType="slide"
        presentationStyle="fullScreen"
        transparent={true}
        visible={showCameraModal}>
        <TakePhoto />
      </Modal>
    </View>
  );
};

export default PhotoSelector;

const styles = StyleSheet.create({
  photoSelectorComponent: {
    borderRadius: 12,
    backgroundColor: '#eaeaea',
    padding: 16,
    // justifyContent: 'space-evenly',
    // alignItems: 'center',

    // flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  buttonContainer: {
    // flex: 1,
    // flexBasis: '45%',
    // justifyContent: 'center',
    // alignContent: 'space-between',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 2,
    flexBasis: '45%',
    minWidth: '45%',
  },
  button: {
    minWidth: '100%',
  },
});
