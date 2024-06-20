
import { Button, Card, Text } from 'react-native-paper';
import { Link } from 'expo-router';
import { View } from 'react-native';

import { useItem } from '@/context/itemDataContext';


export default function ScanQRComponent() {

  const {phoneNumber} = useItem();
  
  return (
    <>
      <Card mode='outlined'>
        <Card.Content>
          
          <View style={{ 
            flexDirection: 'row', 
            alignItems: 'center',
            justifyContent: 'space-around',
            gap: 10
          }}>
            {
              phoneNumber ?
              <Text variant="headlineSmall">{phoneNumber}</Text>
              :<Text variant="headlineSmall" style={{opacity: 0.2}}>0000000000</Text>
            }
            <Link href="/QRScanner" asChild>
              <Button icon="qrcode-scan" mode="contained" style={{ flex: 1, maxWidth: 150 }}>
                Scan
              </Button>
            </Link>
          </View>

        </Card.Content>
      </Card>
    </>
  )
}

