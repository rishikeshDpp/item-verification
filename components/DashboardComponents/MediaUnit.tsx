import { Card, Text, IconButton, Badge, Portal, Modal } from 'react-native-paper';
import { View, Image, TouchableOpacity } from 'react-native';
import { Video } from 'expo-av';
import { useState, useEffect } from 'react';
import { Link } from 'expo-router'

import { MediamParamType, MediaUnitType } from '@/app/Dashboard';


export default function MediaUnit({
  title, 
  source, 
  mediaParam
}: {
  title: string,
  source: string, 
  mediaParam: MediamParamType
}) {

  const [unitType, setUnitType] = useState('image' as MediaUnitType);
  const [visible, setVisible] = useState(false);
  
  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);
  const containerStyle = {backgroundColor: 'black', marginTop: 120, marginBottom: 120, marginLeft: 20, marginRight: 20};

  useEffect(() => {
    if(mediaParam === 'image1' || mediaParam === 'image2') {
      setUnitType('image');
    } else if(mediaParam === 'video') {
      setUnitType('video');
    }
  }, [mediaParam])

  return (
    <Card style={{ flex: 1 }}>
        <Card.Content style={{ 
            alignItems: 'center',
            justifyContent: 'space-evenly',
            gap: 15
            }}>

            <Text variant="titleSmall" style={{ marginBottom: 10 }}>{title}</Text>
            <View>
              <Portal>
                <Modal visible={visible} onDismiss={hideModal} contentContainerStyle={containerStyle}>
                  {
                    unitType === 'image' ?
                    <Image source={{ uri: source }} style={{ width: '100%', height: '100%'}} />
                    :
                    <Video source={{ uri: source }} style={{ width: '100%', height: '100%'}} shouldPlay={true} isLooping={true}/>
                  }
                </Modal>
              </Portal>
              {
                source ? 
                <TouchableOpacity onPress={showModal}>
                  <Badge style={{ position: 'absolute', top: -10, right: -10, zIndex: 1, backgroundColor: 'lightgreen' }}>✔</Badge>
                  <Image source={{ uri: source }} style={{ width: 70, height: 100, borderWidth: 1, borderColor: 'white', borderRadius: 10 }} />
                </TouchableOpacity>
                : 
                <>
                  <Badge style={{ position: 'absolute', top: -10, right: -10, zIndex: 1, backgroundColor: 'pink' }}>✕</Badge>
                  <Image style={{ width: 70, height: 100, borderWidth: 1, borderColor: 'white', borderRadius: 10 }} />
                </>
              }
            </View>

            {
              unitType === 'image' ? 
              <Link href={{ pathname: '/Camera', params: { mediaParam: mediaParam }}} asChild>
                <IconButton
                  icon="camera"
                  size={40}
                  mode='contained'
                />
              </Link>
              : 
              <Link href={{ pathname: '/Camera', params: { mediaParam: mediaParam }}} asChild>
                <IconButton
                  icon="video"
                  size={40}
                  mode='contained'
                />
              </Link>
            }
        </Card.Content>
    </Card>
  )
}
