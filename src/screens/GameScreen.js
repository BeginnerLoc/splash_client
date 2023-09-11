import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ImageBackground  } from 'react-native';
import backgroundImage from '../../assets/background.jpg';
import AudioPlayer from './AudioPlayer';

const options = [
  { text: 'Option 1', color: '#e63946' },
  { text: 'Option 2', color: '#0096c7' },
  { text: 'Option 3', color: '#2a9d8f' },
  { text: 'Option 4', color: '#ffb703'},
];

export default function GameScreen() {
    const [selectedOption, setSelectedOption] = useState(null);
  
    const handleOptionSelect = (option) => {
      setSelectedOption(option);
      // Add your logic here to check if the selected option is correct
    };
  
    return (
    <ImageBackground source={backgroundImage} style={styles.backgroundImage}>
      <View style={styles.container}>
        {/* Question */}
        <View style={styles.questionContainer}>
          <Text style={styles.questionText}>Guess the song!</Text>
        </View>

        <AudioPlayer />
  
        {/* Options */}
        <View style={styles.optionsContainer}>
          <View style={styles.row}>
            {options.slice(0, 2).map((option, index) => (
              <TouchableOpacity
                key={index}
                style={[
                  styles.option,
                  selectedOption === option.text && styles.selectedOption,
                  { backgroundColor: option.color },
                  index === 1 && { marginLeft: 10 },
                ]}
                onPress={() => handleOptionSelect(option.text)}
              >
                <Text style={styles.optionText}>{option.text}</Text>
              </TouchableOpacity>
            ))}
          </View>
  
          <View style={styles.row}>
            {options.slice(2, 4).map((option, index) => (
              <TouchableOpacity
                key={index}
                style={[
                  styles.option,
                  selectedOption === option.text && styles.selectedOption,
                  { backgroundColor: option.color },
                  index === 1 && { marginLeft: 10 },
                ]}
                onPress={() => handleOptionSelect(option.text)}
              >
                <Text style={styles.optionText}>{option.text}</Text>
              </TouchableOpacity>
            ))}
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
        height: '100%',
        justifyContent: 'center',
      },
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      padding: 20,
      marginTop: 60
    },
    questionContainer: {
      flex: 1,
      justifyContent: 'center',
      width: '100%',
    },
    questionText: {
      fontSize: 24,
      fontWeight: 'bold',
      textAlign: 'center',
      backgroundColor: '#480ca8',
      padding: 10,
      borderRadius: 10,
      color: 'white',
    },
    optionsContainer: {
      flex: 2,
      alignItems: 'center',
      marginTop: 40
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
  });
  