import React from 'react';
import { View, Text, StyleSheet, ImageBackground } from 'react-native';

export default function PodiumScreen() {
  return (
    <ImageBackground source={require('../../assets/background.jpg')} style={styles.backgroundImage}>
      <View style={styles.container}>
        <View style={styles.podium}>
          {/* Rank 2 */}
          <View style={styles.secondPlace}>
          <Text style={styles.rankText}>2</Text>
          {/* Place the content for the 3rd rank here */}
          <Text style={styles.rankContent}>Silver</Text>
        </View>

            {/* Rank 1 */}
            <View style={styles.firstPlace}>
            <Text style={styles.rankText}>1</Text>
            {/* Place the content for the 1st rank here */}
            <Text style={styles.rankContent}>Gold</Text>
            </View>

            {/* Rank 3 */}
            <View style={styles.thirdPlace}>
            <Text style={styles.rankText}>3</Text>
            {/* Place the content for the 2nd rank here */}
            <Text style={styles.rankContent}>Bronze</Text>
            </View>
        </View>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    width: '100%',
    height: '100%', // Cover the entire screen
    justifyContent: 'center'
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  podium: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  firstPlace: {
    backgroundColor: 'gold',
    padding: 16,
    alignItems: 'center',
    borderRadius: 8,
  },
  secondPlace: {
    backgroundColor: 'silver',
    padding: 16,
    alignItems: 'center',
    borderRadius: 8,
  },
  thirdPlace: {
    backgroundColor: 'peru',
    padding: 16,
    alignItems: 'center',
    borderRadius: 8,
  },
  rankText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
  rankContent: {
    fontSize: 18,
    color: 'white',
  },
});
