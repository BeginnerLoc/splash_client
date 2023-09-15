import React, { useState, useEffect, useContext } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Audio } from 'expo-av';
import Slider from '@react-native-community/slider';
import { AudioContext } from '../context/AudioContext';

export default function MusicPlayer() {
  const { audioUrl } = useContext(AudioContext);

  const [position, setPosition] = useState(0); // Track position in milliseconds
  const [duration, setDuration] = useState(0); // Track duration in milliseconds
  const [sound, setSound] = useState(null);

  useEffect(() => {
    async function loadAudio() {
      try {
        if (sound) {
          // Unload the previous sound if it exists
          await sound.unloadAsync();
        }

        if (audioUrl) {
          const { sound: newSound } = await Audio.Sound.createAsync(
            { uri: audioUrl },
            { shouldPlay: true }
          );

          setSound(newSound);
        }
      } catch (error) {
        console.error('Error loading audio:', error);
        // Handle the error, e.g., display an error message to the user.
      }
    }

    loadAudio();
  }, [audioUrl]);

  useEffect(() => {
    if (sound) {
      try {
        sound.setOnPlaybackStatusUpdate((status) => {
          if (status.isLoaded) {
            setPosition(status.positionMillis);
            setDuration(status.durationMillis);
          }
        });
      } catch (error) {
        console.error('Error setting playback status update:', error);
        // Handle the error, e.g., display an error message to the user.
      }
    }

    // Clean up when the component unmounts
    return () => {
      if (sound) {
        sound.unloadAsync();
      }
    };
  }, [sound]);

  function formatTime(milliseconds) {
    const totalSeconds = milliseconds / 1000;
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = Math.floor(totalSeconds % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  }

  function onSliderValueChange(value) {
    if (sound) {
      try {
        sound.setPositionAsync(value);
      } catch (error) {
        console.error('Error setting audio position:', error);
        // Handle the error, e.g., display an error message to the user.
      }
    }
  }

  return (
    <View style={styles.playContainer}>
      <Slider
        style={styles.slider}
        minimumValue={0}
        maximumValue={duration}
        value={position}
        onValueChange={onSliderValueChange}
        minimumTrackTintColor="#c770f0"
        thumbTintColor="#9D29D3"
      />
      <View style={styles.timeContainer}>
        <Text style={styles.timeText}>{formatTime(position)}</Text>
        <Text style={styles.timeText}> / </Text>
        <Text style={styles.timeText}>{formatTime(duration)}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  playContainer: {
    position: 'absolute', // Position the room number at the top	
    top: 160,	
    left: 30,	
    right: 30,
    padding: 30,
    backgroundColor: '#f7fff7',
    borderRadius: 20,	
    alignItems: 'center'
  },
  slider: {
    width: 250,
  },
  timeContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  timeText: {
    fontSize: 16,
    marginTop: 10,
  },
});