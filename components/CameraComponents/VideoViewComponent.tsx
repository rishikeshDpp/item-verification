import { CameraView } from 'expo-camera';
import { View, TouchableOpacity } from 'react-native';
import { useState } from 'react';
import { IconButton } from 'react-native-paper';
import { CameraStyles } from './PictureViewComponent';
import { Facing } from './PictureViewComponent';

export default function VideoViewComponent({
    cameraRef,
    setCameraReady, 
    isRecording,
    recordVideo,
    stopVideoRecording

  }: {
    cameraRef: React.RefObject<CameraView>,
    setCameraReady: any,
    isRecording: boolean,
    recordVideo: any,
    stopVideoRecording: any
  }) {

    const [facing, setFacing] = useState('back' as Facing);
    const [torch, setTorch] = useState(false);

    function toggleCameraFacing() {
        setFacing(current => (current === 'back' ? 'front' : 'back'));
    }

    function toggleTorch() {
        setTorch(current => !current);
    }

  return (
    <View style={CameraStyles.container}>
        <CameraView 
            ref={cameraRef as React.RefObject<CameraView>}
            style={CameraStyles.camera} 
            enableTorch={torch}
            facing={facing}   
            onCameraReady={() => setCameraReady(true)}
            mode='video'
            >
            <View />
        </CameraView>
        <View style={CameraStyles.cameraButtonContainer}>
        <TouchableOpacity style={CameraStyles.cameraButton} onPress={toggleTorch}>
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
            <TouchableOpacity style={CameraStyles.cameraButton} onPress={stopVideoRecording}>
                <IconButton
                icon="stop-circle-outline"
                mode='contained-tonal'
                size={50}
                containerColor="red"
                />
            </TouchableOpacity>
            :
            <TouchableOpacity style={CameraStyles.cameraButton} onPress={recordVideo}>
                <IconButton
                icon="record-circle-outline"
                mode='contained-tonal'
                size={50}
                />
            </TouchableOpacity>
        }
        <TouchableOpacity style={CameraStyles.cameraButton} onPress={toggleCameraFacing}>
            <IconButton
            icon="camera-flip"
            mode='contained-tonal'
            size={30}
            />
        </TouchableOpacity>
        </View>
    </View>
  )
}