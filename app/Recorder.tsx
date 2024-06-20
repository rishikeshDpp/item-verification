import { CameraView, useCameraPermissions, useMicrophonePermissions } from 'expo-camera';
import { useState, useRef } from 'react';
import { Button, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Video } from 'expo-av';
import { MaterialCommunityIcons } from '@expo/vector-icons';

type Facing = 'back' | 'front';

export default function Recorder() {
  const [camPermission, requestCamPermission] = useCameraPermissions();
  const [micPermission, requestMicPermission] = useMicrophonePermissions();
  const [cameraReady, setCameraReady] = useState(false);
  const [facing, setFacing] = useState('back' as Facing);
  const [torch, setTorch] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [video, setVideo] = useState('');
  const cameraRef = useRef<CameraView>();

  if (!camPermission || !micPermission) {
    // Permissions are still loading.
    return <View />;
  }

  if (!camPermission.granted) {
    // Camera permissions are not granted yet.
    return (
      <View style={styles.permissionContainer}>
        <Text style={{ textAlign: 'center' }}>We need your permission to access the camera</Text>
        <Button onPress={requestCamPermission} title="grant permission" />
      </View>
    );
  }
  
  if (!micPermission.granted) {
    // Camera permissions are not granted yet.
    return (
      <View style={styles.permissionContainer}>
        <Text style={styles.permissionText}>We need your permission to access the microphone</Text>
        <TouchableOpacity style={styles.permissionButton} onPress={requestMicPermission} >
            <Text>Grant permission</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const toggleCameraFacing = () => {
    setFacing(current => (current === 'back' ? 'front' : 'back'));
  }

  const toggleTorch = () => {
    setTorch(current => !current);
  }

  async function recordVideo() {
    if(cameraReady) {
      if(cameraRef.current) {
        let videoPromise = cameraRef.current.recordAsync();
        setIsRecording(true);
        setTimeout(()=>stopVideoRecording(), 10000);
        videoPromise.then((video) => {
          setIsRecording(false);
          const source = video?.uri
          if(source) setVideo(source);
        }).catch((error) => {
            console.warn(error);
            setIsRecording(false);
        });
      }
    } else alert('Camera not ready');
  }

  const stopVideoRecording = () => {
    if(cameraRef.current) {
      cameraRef.current.stopRecording();
      setIsRecording(false);
    }
  }

  return (
    <>
      {
        video ?

        <View style={styles.container}>
            <Video source={{ uri: video }} style={styles.camera} shouldPlay={true} isLooping={true}/>
            <View style={styles.cameraButtonContainer}>
                <TouchableOpacity style={styles.cameraButton} onPress={() => setVideo('')}>
                    <MaterialCommunityIcons name="video" size={50} color="white" />
                    <Text style={styles.cameraButtonLabel}>Retake</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.cameraButton} onPress={() => setVideo('')}>
                    <MaterialCommunityIcons name="arrow-right-circle" size={50} color="white" />
                    <Text style={styles.cameraButtonLabel}>Save</Text>
                </TouchableOpacity>
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
          mode='video'
          >
            <View/>
          </CameraView>
          <View style={styles.cameraButtonContainer}>
            <TouchableOpacity style={styles.cameraButton} onPress={toggleTorch}>
              {torch?<MaterialCommunityIcons name="flash" size={30} color="white" />:<MaterialCommunityIcons name="flash-off" size={30} color="white" />}
            </TouchableOpacity>
            {
                isRecording ?
                <TouchableOpacity style={styles.cameraButton} onPress={stopVideoRecording}>
                    <MaterialCommunityIcons name="stop-circle-outline" size={60} color="red" /> 
                </TouchableOpacity>
                :
                <TouchableOpacity style={styles.cameraButton} onPress={recordVideo}>
                    <MaterialCommunityIcons name="record-circle-outline" size={60} color="white" /> 
                </TouchableOpacity>
            }
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
    // borderWidth: 1,
    // borderColor: 'white',
  },
  cameraButton: {
    justifyContent: 'center',
    alignContent: 'center',
  },
  cameraButtonLabel: {
    color: 'white',
    textAlign: 'center',
  },
  permissionContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 20,
  },
  permissionText: {
    color: 'white',
    width: '80%',
    textAlign: 'center',
  },
  permissionButton: {
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 5,
  },
});