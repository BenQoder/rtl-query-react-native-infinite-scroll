import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import ListItems from './src/screens/ListItems';
import { ApiProvider } from '@reduxjs/toolkit/query/react';
import api from './src/state/api';

export default function App() {
  return (
    <View style={styles.container}>
      <ApiProvider api={api}>
        <ListItems />
      </ApiProvider>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
