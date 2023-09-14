import React, { useState, useEffect, useContext } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ImageBackground, BackHandler } from 'react-native';
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
    navigation.navigate('HomeScreen'); // Replace 'HomeScreen' with the actual name of your Home screen
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
      console.log("end game");
      // socket.emit('summit_result', point);
      handleSetAudioUrl(null);
      setIsGameOver(true);
      setOptions(null);
      setIsAudioPlayerMounted(false); // Unmount the audio player

      // Navigate back to the home screen after 5 seconds
      setTimeout(() => {
        navigation.navigate('HomeScreen'); // Replace 'HomeScreen' with the actual name of your Home screen
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
    if (option == correctAnswer) {
      setPoint(point + 100);
    }
  };

  return (
    <ImageBackground source={backgroundImage} style={styles.backgroundImage}>
      <View style={styles.container}>

        <Text style={[styles.gameOverContainer, {  marginVertical: 20, color: '#5a189a', fontWeight: 'bold' }]}>Point: {point}</Text>
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
                    { backgroundColor: index === 0 ? '#e63946' : '#0096c7' },
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
                      backgroundColor: 
                        index === 0 ? '#2a9d8f' : '#ffb703',
                    },
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

        {/* Display game over message */}
        {isGameOver && (
          <Text style={styles.gameOverContainer}>
            Game Over!
          </Text>
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
    alignItems: 'center',
    marginTop: 40,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  option: {
    flex: 1, // Equal width for each option in a row
    borderRadius: 10,
    padding: 15,
    paddingHorizontal: 20,
    marginBottom: 10,
    elevation: 2, // Shadow for Android
    borderWidth: 2,
    borderColor: 'transparent',
  },
  selectedOption: {
    borderWidth: 2,
    borderColor: '#7CFC00',
  },
  optionText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
    textAlign: 'center',
  },
  gameOverText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 20,
    color: 'white',
  },
  gameOverContainer: {
    fontWeight: 'bold',
    color: '#5a189a',
    justifyContent: 'center',
    fontSize: 30,
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
    elevation: 2, // Shadow for Android
    backgroundColor: 'white',
  },
});
