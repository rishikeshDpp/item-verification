import { StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { PaperProvider } from 'react-native-paper';

import Dashboard from './Dashboard';

export default function HomeScreen() {
  return (
    <PaperProvider>
      <SafeAreaView edges={{top: 'maximum'}}>
        <Dashboard />
      </SafeAreaView>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  }
});
