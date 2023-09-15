import React, { useState, useEffect, useContext } from 'react';
import { View, Text, ActivityIndicator, StyleSheet, ImageBackground, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import BASE_URL from '../utils/config'
import axios from 'axios';
import socket from '../utils/socket';
import { AudioContext } from '../context/AudioContext';

const BACKEND_ENDPOINT = BASE_URL; // Replace with your backend endpoint URL

const roomNumber = 'Room 123'; // Replace with your room number or retrieve it from your data

// Function to generate random avatars
const getRandomAvatar = (image_index) => {
  const avatarContext = require.context('../../assets/MatchScreen/avatars', false, /\.(png|jpe?g|svg)$/);
  const avatarImages = avatarContext.keys().map(avatarContext);
  return avatarImages[image_index];
};



const chunkArray = (array, chunkSize) => {
  const chunkedArray = [];
  for (let i = 0; i < array.length; i += chunkSize) {
    chunkedArray.push(array.slice(i, i + chunkSize));
  }
  return chunkedArray;
};

const MatchScreen = () => {
  const { username } = useContext(AudioContext);
  const [isLoading, setIsLoading] = useState(true);
  const navigation = useNavigation();
  const [roomKey, setRoomKey] = useState(null);
  const [clients, setClients] = useState([])
  const [countdown, setCountdown] = useState(3);

  useEffect(() => {
    // Fetch the room_key from the backend
    axios.get(`${BACKEND_ENDPOINT}/create_room`)
      .then((response) => {
        const { room_key } = response.data;
        setRoomKey(room_key);
        setIsLoading(false);
        socket.emit('join_room', { room_key, username });
      })
      .catch((error) => {
        console.error('Error fetching room_key:', error);
      });
  }, [navigation]);


  useEffect(() => {
    // Event listener for 'room_joined' event
    const handleRoomJoined = (data) => {
      setClients(data.clients);
    };

    // Add event listener for 'room_joined' event
    socket.on('room_joined', handleRoomJoined);

    // Clean up the 'room_joined' event listener
    return () => {
      socket.off('room_joined', handleRoomJoined);
    };
  }, [socket]);

  useEffect(() => {
    if (clients.length === 2) {
      // Start the countdown timer
      const countdownInterval = setInterval(() => {
        setCountdown((prevCountdown) => prevCountdown - 1);
      }, 1000);
  
      // Stop the countdown after 10 seconds
      setTimeout(() => {
        clearInterval(countdownInterval);
        setCountdown(0); // Reset the countdown value
        navigation.navigate('GameScreen', {username: username, room_key: roomKey});
      }, 3000);
    }
  }, [clients]);

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

  const playerRows = chunkArray(clients, 4);

  return (
    <ImageBackground source={require('../../assets/background.jpg')} style={styles.backgroundImage}>
      <View style={styles.container}>
        {/* Room Number */}
        <Text style={styles.roomNumber}>{roomNumber}</Text>

        {clients.length === 2 && countdown > 0 && (
          <Text style={styles.countdown}>Game starting in {countdown} seconds</Text>
        )}

        {/* Players Section */}
        <View style={styles.playersContainer}>
          {playerRows.map((row, rowIndex) => (
            <View style={styles.playerRow} key={rowIndex}>
              {row.map((player) => (
                <View style={styles.playerContainer} key={player.id}>
                  <Image source={getRandomAvatar(player.image_index)} style={styles.avatar} />
                  <Text style={styles.playerName}>{player.username}</Text>
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
  countdown: {
    position: 'absolute',
    top: 50,
    fontWeight: 'bold',
    fontSize: 24
  }
});

export default MatchScreen;
