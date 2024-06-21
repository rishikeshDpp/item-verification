import { View } from 'react-native'

import QRComponent from '@/components/DashboardComponents/QRComponent'
import MediaComponent from '@/components/DashboardComponents/MediaComponent'

export type SearchParamType = {
    numberParam: string;
    mediaParam: MediamParamType;
  };

export type MediamParamType = 'image1' | 'image2' | 'video';

export type MediaUnitType = 'image' | 'video';

export default function Dashboard() {

    return (
        <View style={{ 
                margin: 10 ,
                gap: 10
            }}>
            <QRComponent />
            <MediaComponent/>
        </View>
    )
}
