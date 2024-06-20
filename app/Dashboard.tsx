import { View, Image } from 'react-native'
import { useEffect } from 'react'

import ScanQRComponent from '@/components/DashboardComponents/ScanQRComponent'
import PictureVideoComponent from '@/components/DashboardComponents/PictureVideoComponent'
import { useLocalSearchParams } from 'expo-router'
import { useItem } from '../context/itemDataContext'

type SearchParamType = {
    numberParam: string;
    image1Param: string;
  };

export default function Dashboard() {

    const {numberParam, image1Param} = useLocalSearchParams<SearchParamType>();
    const {setPhoneNumber, setImage1, setImage2, setVideo} = useItem();

    useEffect(() => {
        if(numberParam) setPhoneNumber(numberParam)
    }, [numberParam])

    useEffect(() => {
        if(image1Param) setImage1(image1Param)
    }, [image1Param])
    // useEffect(() => {
    //     if(number) setPhoneNumber(number)
    // }, [number])
    // useEffect(() => {
    //     if(number) setPhoneNumber(number)
    // }, [number])


    return (
        <View style={{ 
                margin: 10 ,
                gap: 10
            }}>
            <ScanQRComponent />
            <PictureVideoComponent/>
        </View>
    )
}
