
import { Card } from 'react-native-paper';

import MediaUnit from './MediaUnit';
import { useItem } from '@/context/itemDataContext';

export default function MediaComponent() {

  const {image1, image2, video} = useItem();

  return (
    <Card mode='outlined'>
    <Card.Content style={{ flexDirection: 'row', gap: 10 }}>

        <MediaUnit title="Image 1" source={image1} mediaParam={'image1'}/>
        <MediaUnit title="Image 2" source={image2} mediaParam={'image2'}/>
        <MediaUnit title="Video" source={video} mediaParam={'video'}/>

    </Card.Content>
    </Card>
  )
}

