import { CameraView, useCameraPermissions } from 'expo-camera';
import { useState, useRef } from 'react';
import { Button, StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Link } from 'expo-router';

type Facing = 'back' | 'front';

export default function Camera() {
  const [permission, requestPermission] = useCameraPermissions();
  const [cameraReady, setCameraReady] = useState(false);
  const [facing, setFacing] = useState('back' as Facing);
  const [torch, setTorch] = useState(false);
  const [photo, setPhoto] = useState('');
  const cameraRef = useRef<CameraView>();

  if (!permission) {
    // Camera permissions are still loading.
    return <View />;
  }

  if (!permission.granted) {
    // Camera permissions are not granted yet.
    return (
      <View style={styles.container}>
        <Text style={{ textAlign: 'center' }}>We need your permission to show the camera</Text>
        <Button onPress={requestPermission} title="grant permission" />
      </View>
    );
  }

  function toggleCameraFacing() {
    setFacing(current => (current === 'back' ? 'front' : 'back'));
  }

  function toggleTorch() {
    setTorch(current => !current);
  }

  async function clickPhoto() {
    if (cameraReady) {
      if (cameraRef.current) {
        const options = { quality: 0.5, base64: true, skipProcessing: true };
        let photo = await cameraRef.current.takePictureAsync(options);
        const source = photo?.base64
        if(source) setPhoto("data:image/jpeg;base64," + source);
        else alert('Failed to get photo');

        toggleTorch();
      }
    } else alert('Camera not ready');
  }

  return (
    <>
      {
        photo ?

        <View style={styles.container}>
          <Image source={{ uri: photo }} style={styles.camera} />
          <View style={styles.cameraButtonContainer}>
            <TouchableOpacity style={styles.cameraButton} onPress={() => setPhoto('')}>
              <MaterialCommunityIcons name="camera" size={50} color="white" />
              <Text style={styles.cameraButtonLabel}>Retake</Text>
            </TouchableOpacity>
            <Link href={{ pathname: '../', params: { image1Param: photo ? photo : ''}}} asChild >
              <TouchableOpacity style={styles.cameraButton} onPress={() => setPhoto('')}>
                <MaterialCommunityIcons name="arrow-right-circle" size={50} color="white" />
                <Text style={styles.cameraButtonLabel}>Save</Text>
              </TouchableOpacity>
            </Link>
          </View>
        </View>

        :

        <View style={styles.container}>
          <CameraView 
          ref={cameraRef as React.RefObject<CameraView>}
          style={styles.camera} 
          enableTorch={torch}
          facing={facing}   
          onCameraReady={() => setCameraReady(true)}
          >
            <View />
          </CameraView>
          <View style={styles.cameraButtonContainer}>
            <TouchableOpacity style={styles.cameraButton} onPress={toggleTorch}>
              {torch?<MaterialCommunityIcons name="flash" size={30} color="white" />:<MaterialCommunityIcons name="flash-off" size={30} color="white" />}
            </TouchableOpacity>
            <TouchableOpacity style={styles.cameraButton} onPress={clickPhoto}>
              <MaterialCommunityIcons name="camera" size={60} color="white" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.cameraButton} onPress={toggleCameraFacing}>
              <MaterialCommunityIcons name="camera-flip" size={30} color={'white'} />
            </TouchableOpacity>
          </View>
        </View>
      }
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  camera: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-end',
    width: '100%',
  },
  cameraButtonContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignContent: 'center',
    height: '20%',
    width: '100%',
    backgroundColor: 'rgba(0,0,0,0.8)',

  },
  cameraButton: {
    justifyContent: 'center',
    alignContent: 'center',
  },
  cameraButtonLabel: {
    color: 'white',
    textAlign: 'center',
  }
});