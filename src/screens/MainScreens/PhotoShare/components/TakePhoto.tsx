import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import Container from '../../../../common/components/Atoms/Container';
import {
  Camera,
  CameraDevice,
  CameraPermissionStatus,
  useCameraDevices,
} from 'react-native-vision-camera';

const TakePhoto = () => {
  const [cameraPermission, setCameraPermission] =
    useState<CameraPermissionStatus>();
  const [microphonePermission, setMicrophonePermission] =
    useState<CameraPermissionStatus>();
  const devices = useCameraDevices();

  useEffect(() => {
    Camera.getCameraPermissionStatus().then(setCameraPermission);
    Camera.getMicrophonePermissionStatus().then(setMicrophonePermission);
  }, []);

  const showPermissionsPage =
    cameraPermission !== 'authorized' ||
    microphonePermission === 'not-determined';

  if (cameraPermission == null) return null;
  return (
    <Container>
      {/* {showPermissionsPage ? (
        <View>
          <Text>You can't view the camera yet</Text>
        </View>
      ) : ( */}
        <View>
          <Camera device={devices.back} isActive={false} />
        </View>
      
    </Container>
  );
};

export default TakePhoto;

const styles = StyleSheet.create({});
