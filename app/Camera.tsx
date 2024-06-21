import { CameraView, useCameraPermissions, useMicrophonePermissions } from 'expo-camera';
import { Video } from 'expo-av';
import { useState, useRef, useEffect } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native';
import { IconButton, Button } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Link, useLocalSearchParams } from 'expo-router';
import { SearchParamType, MediaUnitType } from './Dashboard';

import { useItem } from '@/context/itemDataContext';

type Facing = 'back' | 'front';

export default function Camera() {

  const {mediaParam} = useLocalSearchParams<SearchParamType>();
  const {setImage1, setImage2, setVideo} = useItem();

  const [cameraType, setCameraType] = useState('image' as MediaUnitType);
  const [camPermission, requestCamPermission] = useCameraPermissions();
  const [micPermission, requestMicPermission] = useMicrophonePermissions();
  const [cameraReady, setCameraReady] = useState(false);
  const [facing, setFacing] = useState('back' as Facing);
  const [torch, setTorch] = useState(false);
  const [photo, setPhoto] = useState('');
  const [videoTemp, setVideoTemp] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const cameraRef = useRef<CameraView>();

  useEffect(() => {
    if(mediaParam === 'image1' || mediaParam === 'image2') {
      setCameraType('image');
    } else if(mediaParam === 'video') {
      setCameraType('video');
    }
  }, [mediaParam])

  if (!camPermission || !micPermission) {
    // Camera permissions are still loading.
    return <View />;
  }

  if (!camPermission.granted || ( cameraType === 'video' && !micPermission.granted )) {
    //  permissions are not granted yet.
    return (
      <View style={styles.container}>
        <Button onPress={permissions} icon="cellphone-lock" mode="elevated" style={{ margin: 70 }}>
          Allow access
        </Button>
      </View>
    );
  }

  function permissions() {
    if(!camPermission?.granted) requestCamPermission();
    if(cameraType === 'video' && !micPermission?.granted) requestMicPermission();
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
  
  function savePhoto() {
    if(mediaParam === 'image1') setImage1(photo);
    else if(mediaParam === 'image2') setImage2(photo);
    else alert('Invalid image param');
    
    setPhoto('');
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
          if(source) setVideoTemp(source);
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

  function saveVideo() {
    if(mediaParam === 'video') setVideo(videoTemp);
    else alert('Invalid video param');
    
    setVideoTemp('');
  }


  return (
    <>
    {
      cameraType === 'image' ?

        photo ?

        <View style={styles.container}>
          <Image source={{ uri: photo }} style={styles.camera} />
          <View style={styles.cameraButtonContainer}>
            <TouchableOpacity style={styles.cameraButton} >
              <IconButton
                icon="camera"
                mode='contained-tonal'
                size={40}
                onPress={() => setPhoto('')}
              />
              <Text style={styles.cameraButtonLabel}>Retake</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.cameraButton} >
              <Link href="../" asChild >
                <IconButton
                  icon="arrow-right-circle"
                  mode='contained-tonal'
                  size={40}
                  onPress={savePhoto}
                />
              </Link>
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
          >
            <View />
          </CameraView>
          <View style={styles.cameraButtonContainer}>
            <TouchableOpacity style={styles.cameraButton} onPress={toggleTorch}>
              {
                torch ?
                <IconButton
                  icon="flash"
                  mode='contained-tonal'
                  size={30}
                />
                :
                <IconButton
                  icon="flash-off"
                  mode='contained-tonal'
                  size={30}
                />
              }
            </TouchableOpacity>
            <TouchableOpacity style={styles.cameraButton} onPress={clickPhoto}>
              <IconButton
                icon="camera"
                mode='contained-tonal'
                size={50}
              />
            </TouchableOpacity>
            <TouchableOpacity style={styles.cameraButton} onPress={toggleCameraFacing}>
              <IconButton
                icon="camera-flip"
                mode='contained-tonal'
                size={30}
              />
            </TouchableOpacity>
          </View>
        </View>
      
      :

        videoTemp ?

        <View style={styles.container}>
            <Video source={{ uri: videoTemp }} style={styles.camera} shouldPlay={true} isLooping={true}/>
            <View style={styles.cameraButtonContainer}>
                <TouchableOpacity style={styles.cameraButton} onPress={() => setVideoTemp('')}>
                  <IconButton
                    icon="video"
                    mode='contained-tonal'
                    size={40}
                  />
                  <Text style={styles.cameraButtonLabel}>Retake</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.cameraButton} >
                  <Link href="../" asChild >
                    <IconButton
                      icon="arrow-right-circle"
                      mode='contained-tonal'
                      size={40}
                      onPress={saveVideo}
                    />
                  </Link>
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
              {
                torch ?
                <IconButton
                  icon="flash"
                  mode='contained-tonal'
                  size={30}
                />
                :
                <IconButton
                  icon="flash-off"
                  mode='contained-tonal'
                  size={30}
                />
              }
            </TouchableOpacity>
            {
                isRecording ?
                <TouchableOpacity style={styles.cameraButton} onPress={stopVideoRecording}>
                  <IconButton
                    icon="stop-circle-outline"
                    mode='contained-tonal'
                    size={50}
                    containerColor="red"
                  />
                </TouchableOpacity>
                :
                <TouchableOpacity style={styles.cameraButton} onPress={recordVideo}>
                  <IconButton
                    icon="record-circle-outline"
                    mode='contained-tonal'
                    size={50}
                  />
                </TouchableOpacity>
            }
            <TouchableOpacity style={styles.cameraButton} onPress={toggleCameraFacing}>
              <IconButton
                icon="camera-flip"
                mode='contained-tonal'
                size={30}
              />
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