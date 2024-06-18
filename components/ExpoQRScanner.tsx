import { CameraView, useCameraPermissions } from 'expo-camera';
import { useState } from 'react';
import { Button, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

type Facing = 'back' | 'front';

export default function ExpoQRScanner() {
  const [permission, requestPermission] = useCameraPermissions();
  const [facing, setFacing] = useState('back' as Facing);
  const [torch, setTorch] = useState(false);
  const [QR, setQR] = useState('');
  const [validQR, setValidQR] = useState(false);

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

  function toggleFlash() {
    setTorch(current => (current === false ? true : false));
  }

  function isValidQR(qr: string) {
    var re = /^(\d{3})[- ]?(\d{3})[- ]?(\d{4})$/
    if(re.test(qr)) {
      setValidQR(true)
      setQR(qr)
    }
  }

  return (
    <View style={styles.container}>
      <CameraView 
        style={styles.camera} 
        enableTorch={torch}
        facing={facing}   
        barcodeScannerSettings={{
          barcodeTypes: ["qr"],
        }}
        onBarcodeScanned={({ data }) => isValidQR(data)}
        >
        <View style={styles.qrFrameContainer}>
          <View style={styles.qrFrame}>
            <View style={styles.qrFrameMarginTop}/>
            <View style={styles.qrFrameMiddle}>
              <View style={styles.qrFrameMarginSide} />
              <View style={styles.qrFrameSquare} />
              <View style={styles.qrFrameMarginSide} />
            </View>
            <View style={styles.qrFrameMarginBottom}>
              <View style={styles.cameraButtonContainer}>
                <TouchableOpacity style={styles.cameraButton} onPress={toggleFlash}>
                  {torch?<MaterialCommunityIcons name="flash-off" size={30} color="white" />:<MaterialCommunityIcons name="flash" size={30} color="white" />}
                </TouchableOpacity>
                <TouchableOpacity style={styles.cameraButton} onPress={toggleCameraFacing}>
                  <MaterialCommunityIcons name="camera-flip" size={30} color={'white'} />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
        <View style={styles.actionContainer}>
          <Text style={styles.text}>{QR}</Text>
          <Button 
            title="Confirm Number" 
            onPress={() => setQR('')}
            disabled={!validQR}
          />
        </View>
      </CameraView>
    </View>
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
  qrFrameContainer: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignContent: 'center',
  },
  qrFrame: {
    flex: 1, 
  },
  qrFrameMarginTop: {
    width: '100%',
    height: '10%',
    backgroundColor: 'rgba(0,0,0,0.8)',
  },
  qrFrameMiddle: {
    display: 'flex',
    flexDirection: 'row',
    height: '60%',
  },
  qrFrameMarginSide: {
    width: '10%',
    backgroundColor: 'rgba(0,0,0,0.8)',
  },
  qrFrameSquare: {
    width: '80%',
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: 'white',
  },
  qrFrameMarginBottom: {
    flex: 1,
    width: '100%',
    backgroundColor: 'rgba(0,0,0,0.8)',
  },
  cameraButtonContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignContent: 'center',
    width: '80%',
    marginLeft: '10%',
    marginTop: '10%',
  },
  cameraButton: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  actionContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    height: '30%',
    backgroundColor: 'rgb(30 41 59)',
    paddingLeft: '10%',
    paddingRight: '10%',
    paddingBottom: '10%',
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
    marginBottom: 10,

  },
});