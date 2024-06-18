import { StyleSheet, SafeAreaView, View, Text, Button, Pressable } from 'react-native';
import { Link } from 'expo-router';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import SafeViewAndroid from "@/components/SafeViewAndroid";

export default function HomeScreen() {
  return (
    <SafeAreaView style={SafeViewAndroid.AndroidSafeArea}>
        <View className='flex flex-col items-center justify-center h-full bg-slate-800'>
            <Link href="/QRScan">
                <View className='h-[100px] text-white border border-white p-2 rounded-lg flex justify-center items-center'>
                    <MaterialCommunityIcons name="qrcode-scan" size={40} color="white" /><Text className='text-white text-2xl'>Scan</Text>
                </View>
            </Link>
        </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  }
});
