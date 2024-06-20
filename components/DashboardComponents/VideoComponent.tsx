import { Card, Text, IconButton, Badge } from 'react-native-paper';
import { View, Image } from 'react-native';
import { Link } from 'expo-router'

export default function VideoComponent({title}: {title: string}) {
  return (
    <Card style={{ flex: 1 }}>
        <Card.Content style={{ 
          alignItems: 'center',
          justifyContent: 'space-evenly',
          gap: 15
          }}>
          <Text variant="titleSmall" style={{ marginBottom: 10 }}>Video</Text>
          <View>
          <Badge style={{ position: 'absolute', top: -10, right: -10, zIndex: 1, backgroundColor: 'pink' }}>✕</Badge>
          {/* <Badge style={{ position: 'absolute', top: -10, right: -10, zIndex: 1, backgroundColor: 'lightgreen' }}>✔</Badge> */}
          <Image style={{ width: 70, height: 100, borderWidth: 1, borderColor: 'white', borderRadius: 10 }} />
          </View>

          <Link href="/Recorder" asChild>
            <IconButton
              icon="video"
              size={40}
              mode='contained'
              onPress={() => console.log('Pressed')}
              >
            </IconButton>
          </Link>
        </Card.Content>
    </Card>
  )
}
