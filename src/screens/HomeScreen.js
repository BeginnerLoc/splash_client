import React from 'react';
import { View, Text, TouchableOpacity, ImageBackground, StyleSheet } from 'react-native';

export default HomeScreen = ({ navigation }) => {
  return (
    <ImageBackground
      source={require('../../assets/background.jpg')}
      style={styles.backgroundImage}
    >
      <View style={styles.container}>
        <TouchableOpacity
          onPress={() => navigation.push('MatchScreen')}
          style={styles.button}
        >
          <Text style={styles.buttonText}>Search Game</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.container}>
        <TouchableOpacity
          onPress={() => navigation.push('RewardScreen')}
          style={styles.button}
        >
          <Text style={styles.buttonText}>Rewards</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    width: '100%',
    height: '100%',
    justifyContent: 'center',
  },
  container: {
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    width: 200,
    height: 100,
    backgroundColor: '#fff',
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#8F00FF',
    elevation: 10,
  },
  buttonText: {
    fontSize: 20,
    color: '#8F00FF',
  },
});
