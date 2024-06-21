import { CameraView, useCameraPermissions, useMicrophonePermissions } from 'expo-camera';
import { useState, useRef, useEffect, RefObject } from 'react';
import { View } from 'react-native';
import { Button } from 'react-native-paper';
import { useLocalSearchParams } from 'expo-router';

import PictureViewComponent from '@/components/CameraComponents/PictureViewComponent';
import VideoViewComponent from '@/components/CameraComponents/VideoViewComponent';
import CameraPreviewComponent from '@/components/CameraComponents/CameraPreviewComponent';

import { SearchParamType } from './Dashboard';
import { CameraStyles } from '@/components/CameraComponents/PictureViewComponent';

import { useItem } from '@/context/itemDataContext';

export default function Camera() {

  const {mediaParam} = useLocalSearchParams<SearchParamType>();
  const {setImage1, setImage2, setVideo} = useItem();

  const cameraRef = useRef<CameraView>();
  const cameraTypeRef = useRef<string>('picture' as string);

  const [camPermission, requestCamPermission] = useCameraPermissions();
  const [micPermission, requestMicPermission] = useMicrophonePermissions();
  const [cameraReady, setCameraReady] = useState(false);
  const [photo, setPhoto] = useState('');
  const [videoTemp, setVideoTemp] = useState('');
  const [isRecording, setIsRecording] = useState(false);

  useEffect(() => {
    if(mediaParam === 'image1' || mediaParam === 'image2') {
      cameraTypeRef.current = 'picture';
    } else if(mediaParam === 'video') {
      cameraTypeRef.current = 'video';
    }
  }, [mediaParam])

  if (!camPermission || !micPermission) {
    // Camera permissions are still loading.
    return <View />;
  }

  if (!camPermission.granted || ( cameraTypeRef.current === 'video' && !micPermission.granted )) {
    //  permissions are not granted yet.
    return (
      <View style={CameraStyles.container}>
        <Button onPress={permissions} icon="cellphone-lock" mode="elevated" style={{ margin: 70 }}>
          Allow access
        </Button>
      </View>
    );
  }

  function permissions() {
    if(!camPermission?.granted) requestCamPermission();
    if(cameraTypeRef.current === 'video' && !micPermission?.granted) requestMicPermission();
  }

  async function clickPhoto() {
    if (cameraReady) {
      if (cameraRef.current) {
        const options = { quality: 0.5, base64: true, skipProcessing: true };
        let photo = await cameraRef.current.takePictureAsync(options);
        const source = photo?.base64
        if(source) setPhoto("data:image/jpeg;base64," + source);
        else alert('Failed to get photo');
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
      cameraTypeRef.current === 'picture' ?

        photo ?
        <CameraPreviewComponent 
          cameraTypeRef={cameraTypeRef.current} 
          source={photo} 
          setMedia={setPhoto} 
          saveFunc={savePhoto}
        />
        :
        <PictureViewComponent 
          cameraRef={cameraRef as RefObject<CameraView>} 
          setCameraReady={setCameraReady} 
          imageCapture={clickPhoto} 
        />
      
      :

        videoTemp ?
        <CameraPreviewComponent 
          cameraTypeRef={cameraTypeRef.current} 
          source={videoTemp} 
          setMedia={setVideoTemp} 
          saveFunc={saveVideo}
        />
        :

        <VideoViewComponent 
          cameraRef={cameraRef as RefObject<CameraView>} 
          setCameraReady={setCameraReady} 
          isRecording={isRecording} 
          recordVideo={recordVideo} 
          stopVideoRecording={stopVideoRecording} 
        />

      }
    </>
  );
}