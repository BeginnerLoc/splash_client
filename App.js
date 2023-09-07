import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import MatchScreen from './screens/MatchScreen';

export default function App() {
  return (
    <View style={styles.container}>
      <MatchScreen />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
}); 

