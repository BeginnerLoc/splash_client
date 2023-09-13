import React, { useState, useEffect } from 'react';
import { View, Text, ActivityIndicator, StyleSheet, ImageBackground, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';

const BACKEND_ENDPOINT = 'https://b7e1-203-125-116-194.ngrok-free.app'; // Replace with your backend endpoint URL

// Use require.context to dynamically import all avatar images from the avatars folder
const avatarContext = require.context('../../assets/MatchScreen/avatars', false, /\.(png|jpe?g|svg)$/);
const avatarImages = avatarContext.keys().map(avatarContext);

const getRandomAvatar = () => {
  const randomIndex = Math.floor(Math.random() * avatarImages.length);
  return avatarImages[randomIndex];
};

const currentUser = {
  name: 'Loc',
  // points: 100,
  avatar: getRandomAvatar(), // Get a random avatar for the current user
};

let opponent = {
  name: 'Ashwin',
  // points: 80,
  avatar: getRandomAvatar(), // Get a random avatar for the opponent
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

  // Render your game components or content here
  return (
    <ImageBackground source={require('../../assets/background.jpg')} style={styles.backgroundImage}>
      <View style={styles.container}>
        {/* Opponent Section */}
        {renderUserInfo(opponent)}
        {/* Middle Section - VS Image */}
        <Image source={require('../../assets/MatchScreen/versus.png')} style={styles.vsImage} />
        {/* Current User Section */}
        {renderUserInfo(currentUser)}
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
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    // backgroundColor: '#f2ebfb'
  },
  userInfoContainer: {
    alignItems: 'center',
    backgroundColor: '#826aed',
    borderRadius: 10, // Add some border radius for a rounded look
    padding: 30, // Add some padding for spacing
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40, // To make the avatar circular
  },
  userName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
  },
  userPoints: {
    fontSize: 16,
    color: 'white',
  },
  vsImage: {
    width: 100,
    height: 100,
    marginTop: 20, // Reduce the margin above the VS image
    marginBottom: 20, // Reduce the margin below the VS image
  },
})
export default MatchScreen;
