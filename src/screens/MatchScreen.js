import React, { useState, useEffect } from 'react';
import { View, Text, ActivityIndicator, StyleSheet, ImageBackground, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';

const BACKEND_ENDPOINT = 'https://cb8b-203-125-116-194.ngrok-free.app'; // Replace with your backend endpoint URL

const roomNumber = 'Room 123'; // Replace with your room number or retrieve it from your data

// Function to generate random avatars
const getRandomAvatar = () => {
  const avatarContext = require.context('../../assets/MatchScreen/avatars', false, /\.(png|jpe?g|svg)$/);
  const avatarImages = avatarContext.keys().map(avatarContext);
  const randomIndex = Math.floor(Math.random() * avatarImages.length);
  return avatarImages[randomIndex];
};

// Players
const fakePlayers = [
  { id: '1', name: 'Ashwin', avatar: getRandomAvatar() },
  { id: '2', name: 'Loc', avatar: getRandomAvatar() },
  { id: '3', name: 'Astro', avatar: getRandomAvatar() },
  { id: '4', name: 'Daren', avatar: getRandomAvatar() },
  { id: '5', name: 'Chris', avatar: getRandomAvatar() },
  { id: '6', name: 'Jaren', avatar: getRandomAvatar() },
  { id: '7', name: 'Yong Le', avatar: getRandomAvatar() },
  { id: '8', name: 'Andrew', avatar: getRandomAvatar() },
  { id: '9', name: 'Aik Kai', avatar: getRandomAvatar() },
  { id: '10', name: 'Kenny', avatar: getRandomAvatar() },
  { id: '11', name: 'Andrew', avatar: getRandomAvatar() },
  { id: '12', name: 'Aik Kai', avatar: getRandomAvatar() },
  { id: '13', name: 'Shi Hui', avatar: getRandomAvatar() },
  { id: '14', name: 'Mapel', avatar: getRandomAvatar() },
  { id: '15', name: 'James', avatar: getRandomAvatar() },
  // { id: '16', name: 'Jesus', avatar: getRandomAvatar() },
  // { id: '17', name: 'Buddha', avatar: getRandomAvatar() },
  // { id: '18', name: 'Ah Beng', avatar: getRandomAvatar() },
  // { id: '19', name: 'Ah Meng', avatar: getRandomAvatar() },
  // { id: '20', name: 'Xia Xue', avatar: getRandomAvatar() },
];

const chunkArray = (array, chunkSize) => {
  const chunkedArray = [];
  for (let i = 0; i < array.length; i += chunkSize) {
    chunkedArray.push(array.slice(i, i + chunkSize));
  }
  return chunkedArray;
};

const MatchScreen = () => {
  const [isLoading, setIsLoading] = useState(true);
  const navigation = useNavigation();
  const [roomKey, setRoomKey] = useState(null);

  useEffect(() => {
    // Fetch the room_key from the backend
    axios.get(`${BACKEND_ENDPOINT}/create_room`)
      .then((response) => {
        const { room_key } = response.data;
        setRoomKey(room_key);

        // Simulate a loading screen
        setTimeout(() => {
          setIsLoading(false);
          // Navigate to the GameScreen after loading is complete
          navigation.navigate('GameScreen', { room_key: room_key });
        }, 3000);
      })
      .catch((error) => {
        console.error('Error fetching room_key:', error);
      });
  }, [navigation]);

  if (isLoading) {
    return (
      <View style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <ActivityIndicator size="large" color="blue" />
        <Text>Connecting to server...</Text>
      </View>
    );
  }

  const playerRows = chunkArray(fakePlayers, 4);

  return (
    <ImageBackground source={require('../../assets/background.jpg')} style={styles.backgroundImage}>
      <View style={styles.container}>
        {/* Room Number */}
        <Text style={styles.roomNumber}>{roomNumber}</Text>

        {/* Players Section */}
        <View style={styles.playersContainer}>
          {playerRows.map((row, rowIndex) => (
            <View style={styles.playerRow} key={rowIndex}>
              {row.map((player) => (
                <View style={styles.playerContainer} key={player.id}>
                  <Image source={player.avatar} style={styles.avatar} />
                  <Text style={styles.playerName}>{player.name}</Text>
                </View>
              ))}
            </View>
          ))}
        </View>
      </View>
    </ImageBackground>
  );
};

const renderUserInfo = (user) => {
  return (
    <View style={styles.userInfoContainer}>
      {/* Display User Avatar */}
      <Image source={user.avatar} style={styles.avatar} />
      {/* Display User Name */}
      <Text style={styles.userName}>{user.name}</Text>
    </View>
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
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20
  },
  loadingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  roomNumber: {
    fontSize: 50,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 80,
    backgroundColor: '#480ca8',
    borderRadius: 25,
    padding: 20,
    position: 'absolute', // Position the room number at the top
    top: 80,
    left: 30,
    right: 30,
    textAlign: 'center'
  },
  playersContainer: {
    justifyContent: 'center',
    flexGrow: 1, // Allow the players' section to expand
    paddingTop: '30%', // Adjust this percentage for the desired placement
  },
  playerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20
  },
  playerContainer: {
    alignItems: 'center',
    padding: 10
  },
  avatar: {
    width: 60,
    height: 60
  },
  playerName: {
    fontSize: 16,
    color: 'white',
    marginTop: 5,
    fontWeight: 'bold' 
  },
});

export default MatchScreen;
