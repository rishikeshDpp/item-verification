
import { Card } from 'react-native-paper';

import PictureComponent from './PictureComponent';
import VideoComponent from './VideoComponent';
import { useItem } from '@/context/itemDataContext';

export default function PictureVideoComponent() {

  const {image1, image2, video} = useItem();

  return (
    <Card mode='outlined'>
    <Card.Content style={{ flexDirection: 'row', gap: 10 }}>

        <PictureComponent title="Image 1" image={image1}/>
        <PictureComponent title="Image 2" image={image2}/>
        <VideoComponent title="Video"/>

    </Card.Content>
    </Card>
  )
}

