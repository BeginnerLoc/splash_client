import React from 'react';
import { View, Text, StyleSheet, Image, ImageBackground } from 'react-native';

// Use require.context to dynamically import all avatar images from the avatars folder
const avatarContext = require.context('../assets/MatchScreen/avatars', false, /\.(png|jpe?g|svg)$/);
const avatarImages = avatarContext.keys().map(avatarContext);

// Function to randomly select an avatar from the array
const getRandomAvatar = () => {
  const randomIndex = Math.floor(Math.random() * avatarImages.length);
  return avatarImages[randomIndex];
};

// Define some example data (replace with your actual data)
const currentUser = {
  name: 'Loc',
  points: 100,
  avatar: getRandomAvatar(), // Get a random avatar for the current user
};

const opponent = {
  name: 'Ashwin',
  points: 80,
  avatar: getRandomAvatar(), // Get a random avatar for the opponent
};

// Import the background image
import backgroundImage from '../assets/background.jpg'; // Replace with your actual background image path

export default function MatchScreenRoom() {
  return (
    <ImageBackground source={backgroundImage} style={styles.backgroundImage}>
      <View style={styles.container}>
        {/* Opponent Section */}
        {renderUserInfo(opponent)}
        {/* Middle Section - VS Image */}
        <Image source={require('../assets/MatchScreen/versus.png')} style={styles.vsImage} />
        {/* Current User Section */}
        {renderUserInfo(currentUser)}
      </View>
    </ImageBackground>
  );
}

const renderUserInfo = (user) => {
  return (
    <View style={styles.userInfoContainer}>
      {/* Display User Avatar */}
      <Image source={user.avatar} style={styles.avatar} />
      {/* Display User Name */}
      <Text style={styles.userName}>{user.name}</Text>
      {/* Display User Points */}
      <Text style={styles.userPoints}>{user.points} Points</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    width: 440, // Cover the entire screen
    justifyContent: 'center',
  },
  container: {
    flex: 1,
    justifyContent: 'center', // Center the content vertically
    alignItems: 'center',
    padding: 20
  },
  userInfoContainer: {
    alignItems: 'center',
    backgroundColor: '#aeaba4', // Semi-transparent background
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
    color: 'white', // Text color on the background
  },
  userPoints: {
    fontSize: 16,
    color: 'white', // Text color on the background
  },
  vsImage: {
    width: 100,
    height: 100,
    marginTop: 20, // Reduce the margin above the VS image
    marginBottom: 20, // Reduce the margin below the VS image
  },
});
