import React, { useState, useEffect, useContext } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ImageBackground, BackHandler, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native'; // Import useNavigation from react-navigation/native
import backgroundImage from '../../assets/background.jpg';
import AudioPlayer from './AudioPlayer';
import socket from '../utils/socket';
import { AudioContext } from '../context/AudioContext';

export default function GameScreen({ route }) {
  const { handleSetAudioUrl } = useContext(AudioContext);
  const { room_key } = route.params;
  const navigation = useNavigation(); // Initialize navigation
  const [selectedOption, setSelectedOption] = useState(null);
  const [options, setOptions] = useState([]);
  const [question, setQuestion] = useState(null);
  const [isGameOver, setIsGameOver] = useState(false);
  const [isAudioPlayerMounted, setIsAudioPlayerMounted] = useState(true); // Track audio player mount state

  const [correctAnswer, setCorrectAnswer] = useState('');
  const [point, setPoint] = useState(0);

  const [isButtonDisabled, setIsButtonDisabled] = useState(false);

  // Define a state to keep track of option border colors
  const [optionColors, setOptionColors] = useState({
    // Initialize with default colors for all options
    // Modify these as needed to match your actual options
    option1: 'transparent',
    option2: 'transparent',
    option3: 'transparent',
    option4: 'transparent',
  });

  useEffect(() => {
    // Emit 'join_room' event to the server
    socket.emit('join_room', room_key);

    // Event listener for 'room_joined' event
    const handleRoomJoined = () => {
      console.log('joined');
    };

    // Add event listener for 'room_joined' event
    socket.on('room_joined', handleRoomJoined);

    // Clean up the 'room_joined' event listener
    return () => {
      socket.off('room_joined', handleRoomJoined);
    };
  }, [socket]);

  useEffect(() => {
    // Function to handle 'next_question' event
    const handleNextQuestion = (data) => {
      setIsButtonDisabled(false);
      handleSetAudioUrl(data.question);
      setQuestion(data.question);
      setOptions(data.option);
      setSelectedOption(null);
      setCorrectAnswer(data.answer); // Reset selected option for the new question
      // Reset option border colors
      setOptionColors({
        option1: 'transparent',
        option2: 'transparent',
        option3: 'transparent',
        option4: 'transparent',
      });
    };

    // Add event listener for 'next_question' event
    socket.on('next_question', handleNextQuestion);

    // Clean up the 'next_question' event listener
    return () => {
      socket.off('next_question', handleNextQuestion);
    };
  }, [socket]);

  const handleBackButtonPress = () => {
    setIsAudioPlayerMounted(false);
    setQuestion(null);
    navigation.navigate('PodiumScreen');
    return true; // Return true to prevent the default back action
  };

  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', handleBackButtonPress);

    // Clean up the event listener when the component unmounts
    return () => {
      BackHandler.removeEventListener('hardwareBackPress', handleBackButtonPress);
    };
  }, []);

  useEffect(() => {
    // Function to handle 'end_game' event
    const handleEndGame = (data) => {
      // Handle end game logic here, e.g., display final scores
      console.log('end game');
      // socket.emit('summit_result', point);
      handleSetAudioUrl(null);
      setIsGameOver(true);
      setOptions(null);
      setIsAudioPlayerMounted(false); // Unmount the audio player

      // Navigate back to the home screen after 5 seconds
      setTimeout(() => {
        navigation.navigate('PodiumScreen'); // Replace 'HomeScreen' with the actual name of your Home screen
      }, 5000); // 5000 milliseconds = 5 seconds
    };

    // Add event listener for 'end_game' event
    socket.on('end_game', handleEndGame);

    // Clean up the 'end_game' event listener
    return () => {
      socket.off('end_game', handleEndGame);
    };
  }, [socket, navigation]);

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
    setIsButtonDisabled(true);

    // Check if the selected option is correct
    if (option === correctAnswer) {
      setPoint(point + 100);
      // Set a border color to indicate a correct answer (green)
      setOptionColors({
        ...optionColors,
        [option]: '#7CFC00',
      });
    } else {
      // Set a border color to indicate a wrong answer (red)
      setOptionColors({
        ...optionColors,
        [option]: '#d00000',
      });
    }
  };

  return (
    <ImageBackground source={backgroundImage} style={styles.backgroundImage}>
      <View style={styles.container}>
        {/* Conditionally render the points */}
        {!isGameOver && (
          <Text style={[styles.points1, { marginVertical: 20, color: '#5a189a', fontWeight: 'bold' }]}>
            Points: {point}
          </Text>
        )}
        {/* Conditionally render the AudioPlayer */}
        {isAudioPlayerMounted && question != null && <AudioPlayer />}

        {/* Conditionally render the Options if 'options' is not null */}
        {options != null && (
          <View style={styles.optionsContainer}>
            <View style={styles.row}>
              {options.slice(0, 2).map((option, index) => (
                <TouchableOpacity
                  disabled={isButtonDisabled}
                  key={index}
                  style={[
                    styles.option,
                    selectedOption === option && styles.selectedOption,
                    {
                      borderColor: optionColors[option], // Set border color based on optionColors state
                    },
                    index === 0 ? { backgroundColor: '#e63946' } : { backgroundColor: '#0096c7' },
                    index === 1 && { marginLeft: 10 },
                  ]}
                  onPress={() => handleOptionSelect(option)}
                >
                  <Text style={styles.optionText}>{option}</Text>
                </TouchableOpacity>
              ))}
            </View>

            <View style={styles.row}>
              {options.slice(2, 4).map((option, index) => (
                <TouchableOpacity
                  disabled={isButtonDisabled}
                  key={index}
                  style={[
                    styles.option,
                    selectedOption === option && styles.selectedOption,
                    {
                      borderColor: optionColors[option], // Set border color based on optionColors state
                    },
                    index === 0 ? { backgroundColor: '#2a9d8f' } : { backgroundColor: '#ffb703' },
                    index === 1 && { marginLeft: 10 },
                  ]}
                  onPress={() => handleOptionSelect(option)}
                >
                  <Text style={styles.optionText}>{option}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        )}

        {/* Display game over image */}
        {isGameOver && (
          <>
            <Image
              source={require('../../assets/GameScreen/game-over.png')} // Replace with the path to your game over image
              style={styles.gameOverImage} // Define the styles for the game over image
            />
            <Text style={styles.points2}>You have earned a total of {point} points!</Text>
          </>
        )}
      </View>
    </ImageBackground>
  );
}

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
    marginTop: 60,
  },
  optionsContainer: {
    flex: 2,
    justifyContent: 'center',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  option: {
    flex: 1, // Equal width for each option in a row
    borderRadius: 10,
    marginBottom: 10,
    elevation: 8, // Shadow for Android
    borderWidth: 2,
    borderColor: 'transparent',
    position: 'relative',
    top: 55,
    padding: 30,
    backgroundColor: '#f7fff7',
    borderRadius: 20,
    height: 120,
    justifyContent: 'center',
  },
  selectedOption: {
    borderWidth: 3,
    borderColor: '#7CFC00',
  },
  optionText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 15,
    textAlign: 'center',
  },
  gameOverImage: {
    width: 200, // Set the width of the game over image
    height: 200, // Set the height of the game over image
  },
  points1: {
    fontWeight: 'bold',
    color: '#5a189a',
    justifyContent: 'center',
    fontSize: 30,
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
    elevation: 2, // Shadow for Android
    backgroundColor: '#f7fff7',
  },
  points2: {
    fontWeight: 'bold',
    color: '#5a189a',
    justifyContent: 'center',
    fontSize: 15,
    borderRadius: 10,
    padding: 15,
    marginTop: 25,
    elevation: 2, // Shadow for Android
    backgroundColor: '#f7fff7',
  },
});
