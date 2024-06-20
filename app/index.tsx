import { StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { PaperProvider } from 'react-native-paper';

import { ItemProvider } from '../context/itemDataContext';
import Dashboard from './Dashboard';

export default function HomeScreen() {
  return (
    <PaperProvider>
      <SafeAreaView edges={{top: 'maximum'}}>
        <ItemProvider>
          <Dashboard />
        </ItemProvider>
      </SafeAreaView>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  }
});
