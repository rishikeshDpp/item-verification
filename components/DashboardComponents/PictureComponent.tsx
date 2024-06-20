import { Card, Text, IconButton, Badge, Portal, Modal } from 'react-native-paper';
import { View, Image } from 'react-native';
import { useState } from 'react';
import { Link } from 'expo-router'

export default function PictureComponent({title, image}: {title: string, image: string}) {

  const [visible, setVisible] = useState(false);

  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);
  const containerStyle = {backgroundColor: 'black', padding: 10};


  return (
    <Card style={{ flex: 1 }}>
        <Card.Content style={{ 
            alignItems: 'center',
            justifyContent: 'space-evenly',
            gap: 15
            }}>

            <Text variant="titleSmall" style={{ marginBottom: 10 }}>{title}</Text>
            <View>
              <Badge style={{ position: 'absolute', top: -10, right: -10, zIndex: 1, backgroundColor: 'pink' }}>✕</Badge>
              {/* <Badge style={{ position: 'absolute', top: -10, right: -10, zIndex: 1, backgroundColor: 'lightgreen' }}>✔</Badge> */}
              {image? <Image source={{ uri: image }} style={{ width: 70, height: 100, borderWidth: 1, borderColor: 'white', borderRadius: 10 }} />: <Image style={{ width: 70, height: 100, borderWidth: 1, borderColor: 'white', borderRadius: 10 }} />}
            </View>

            <Link href="/Camera" asChild>
              <IconButton
                icon="camera"
                size={40}
                mode='contained'
                onPress={() => console.log('Pressed')}
              />
            </Link>
        </Card.Content>
    </Card>
  )
}
