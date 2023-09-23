import React, { useState } from 'react';
import { View, Text, StyleSheet, ImageBackground, TouchableOpacity, Image } from 'react-native'; // Import Image
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import BASE_URL from '../utils/config'
import axios from 'axios';

export default function PodiumScreen() {
  const navigation = useNavigation();
  const [podiumData, setPodiumData] = useState([]);
  const BACKEND_ENDPOINT = BASE_URL;

  // // Fake data for players and their points
  // const playersData = [
  //   { username: 'Ashwin', points: 400 },
  //   { username: 'Tien Loc', points: 300 },
  //   { username: 'Chris', points: 200 },
  // ];

  useFocusEffect(
    React.useCallback(() => {
      axios.get(`${BACKEND_ENDPOINT}/podium`)
        .then((response) => {
          setPodiumData(response.data);
        })
        .catch((error) => {
          console.error('Error fetching podium data:', error);
        });
    }, [])
  );

  // Sort players by points in descending order
  const sortedPlayers = podiumData.sort((a, b) => b.points - a.points);

  return (
    <ImageBackground source={require('../../assets/background.jpg')} style={styles.backgroundImage}>
      
      <View style={styles.container}>
        <Image source={require('../../assets/PodiumScreen/icon.png')} style={styles.logo} />
        <View style={styles.podium}>

          {/* Rank 2 */}
          {sortedPlayers.length >= 2 && (
            <View style={[styles.secondPlace, { height: 145 }]}>
              <Text style={styles.rankText}>2nd</Text>
              <Text style={styles.rankUser}>{sortedPlayers[1].username}</Text>
              <Text style={styles.rankPoint}>{sortedPlayers[1].points} Points</Text>
            </View>
          )}

          {/* Rank 1 */}
          {sortedPlayers.length >= 1 && (
            <View style={[styles.firstPlace, { height: 190 }]}>
              <Text style={styles.rankText}>1st</Text>
              <Text style={styles.rankUser}>{sortedPlayers[0].username}</Text>
              <Text style={styles.rankPoint}>{sortedPlayers[0].points} Points</Text>
            </View>
          )}

          {/* Rank 3 */}
          {sortedPlayers.length >= 3 && (
            <View style={[styles.thirdPlace, { height: 110 }]}>
              <Text style={styles.rankText}>3rd</Text>
              <Text style={styles.rankUser}>{sortedPlayers[2].username}</Text>
              <Text style={styles.rankPoint}>{sortedPlayers[2].points} Points</Text>
            </View>
          )}
        </View>
        
        {/* Navigation button */}
        <TouchableOpacity onPress={() => navigation.navigate('HomeScreen')}>
          <View style={styles.backButton}>
            <Text style={styles.backButtonText}>Back to Home</Text>
          </View>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    width: '100%',
    height: '100%',
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
    alignItems: 'flex-end',
    marginBottom: 20,
    marginTop: 60,
  },
  firstPlace: {
    backgroundColor: '#fdc500',
    padding: 20,
    width: '26%',
    alignItems: 'center',
    borderTopRightRadius: 8,
    borderTopLeftRadius: 8,
  },
  secondPlace: {
    backgroundColor: '#adb5bd',
    padding: 20,
    width: '26%',
    alignItems: 'center',
    borderTopRightRadius: 8,
    borderTopLeftRadius: 8,
    borderBottomLeftRadius: 5
  },
  thirdPlace: {
    backgroundColor: '#9c6644',
    padding: 20,
    width: '26%',
    alignItems: 'center',
    borderTopRightRadius: 8,
    borderTopLeftRadius: 8,
    borderBottomRightRadius: 5
  },
  rankText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
  rankUser: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
  },
  rankPoint: {
    fontSize: 12,
    fontWeight: 'bold',
    color: 'white',
  },
  backButton: {
    backgroundColor: '#007AFF',
    padding: 12,
    marginTop: 20,
    borderRadius: 8,
  },
  backButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
  },
  logo: {
    position: 'absolute',
    top: 105,
    width: 150,
    height: 150,
    zIndex: 1,
  },
  
});
