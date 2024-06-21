import { View, Image, TouchableOpacity, Text, StyleSheet } from "react-native"
import { Video } from "expo-av"
import { IconButton } from "react-native-paper"
import { Link } from "expo-router"

import { CameraStyles } from "./PictureViewComponent"

export default function CameraPreviewComponent({
  cameraTypeRef,
  source, 
  setMedia, 
  saveFunc
}: {
  cameraTypeRef: string,
  source: string, 
  setMedia: any,
  saveFunc: any
}) {
  return (
    <View style={CameraStyles.container}>
      {
        cameraTypeRef === 'picture' ? 
        <Image source={{ uri: source }} style={CameraStyles.camera} />
        :
        <Video source={{ uri: source }} style={CameraStyles.camera} shouldPlay={true} isLooping={true}/>
      }
      <View style={CameraStyles.cameraButtonContainer}>
        <TouchableOpacity style={CameraStyles.cameraButton} >
          <IconButton
            icon="camera"
            mode='contained-tonal'
            size={40}
            onPress={()=>setMedia('')}
          />
          <Text style={CameraStyles.cameraButtonLabel}>Retake</Text>
        </TouchableOpacity>
        <TouchableOpacity style={CameraStyles.cameraButton} >
          <Link href="../" asChild >
            <IconButton
              icon="arrow-right-circle"
              mode='contained-tonal'
              size={40}
              onPress={saveFunc}
            />
          </Link>
          <Text style={CameraStyles.cameraButtonLabel}>Save</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}
