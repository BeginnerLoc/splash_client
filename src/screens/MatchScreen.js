import React, { useState, useEffect } from 'react';
import { View, Text, ActivityIndicator, StyleSheet, ImageBackground, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import socket from '../utils/socket'; // Import the socket utility

// Use require.context to dynamically import all avatar images from the avatars folder
const avatarContext = require.context('../../assets/MatchScreen/avatars', false, /\.(png|jpe?g|svg)$/);
const avatarImages = avatarContext.keys().map(avatarContext);

// Function to randomly select an avatar from the array
const getRandomAvatar = () => {
  const randomIndex = Math.floor(Math.random() * avatarImages.length);
  return avatarImages[randomIndex];
};

// Define some example data (replace with your actual data)
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

while (opponent.avatar === currentUser.avatar) {
  opponent = {
    ...opponent,
    avatar: getRandomAvatar(),
  };
}

const MatchScreen = () => {
  const [isLoading, setIsLoading] = useState(true);
  const navigation = useNavigation();

  useEffect(() => {
    // Simulate a 5-second loading period
    const loadingTimeout = setTimeout(() => {
      setIsLoading(false); // Hide the loading screen after 5 seconds
    }, 3000);

    // Clean up the timeout when the component unmounts
    return () => {
      clearTimeout(loadingTimeout);
    };
  }, []);

  useEffect(() => {
    // Simulate a 5-second loading period
    const loadingTimeout = setTimeout(() => {
      setIsLoading(false); // Hide the loading screen after 5 seconds
      // Navigate to the GameScreen after loading is complete
      navigation.navigate('GameScreen');
    }, 6000);

    // Clean up the timeout when the component unmounts
    return () => {
      clearTimeout(loadingTimeout);
    };
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
      {/* Display User Points */}
      {/* <Text style={styles.userPoints}>{user.points} Points</Text> */}
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
