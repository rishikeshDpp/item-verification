import { CameraView } from 'expo-camera';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { useState } from 'react';
import { IconButton } from 'react-native-paper';

export type Facing = 'back' | 'front';

export default function PictureViewComponent({
    cameraRef,
    setCameraReady, 
    imageCapture

  }: {
    cameraRef: React.RefObject<CameraView>,
    setCameraReady: any,
    imageCapture: any
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

        <TouchableOpacity style={CameraStyles.cameraButton} onPress={imageCapture}>
            <IconButton
                icon="camera"
                mode='contained-tonal'
                size={50}
            />
        </TouchableOpacity>

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

export const CameraStyles = StyleSheet.create({
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