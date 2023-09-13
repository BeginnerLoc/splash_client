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

  async function loadAudio() {
    if (audioUrl) {
      try {
        if (sound) {
          await sound.stopAsync(); // Stop the previous sound if it exists
          await sound.unloadAsync(); // Unload the previous sound
        }

        const { sound: newSound } = await Audio.Sound.createAsync({ uri: audioUrl });
        setSound(newSound);
      } catch (error) {
        console.error('Error loading audio:', error);
        // Handle the error, e.g., display an error message to the user.
      }
    }
  }

  useEffect(() => {
    try {
      loadAudio();
    } catch (error) {
      console.error('Error in loadAudio:', error);
      // Handle the error, e.g., display an error message to the user.
    }

    return () => {
      if (sound) {
        try {
          sound.stopAsync(); // Stop the sound when the component unmounts
          sound.unloadAsync(); // Unload the sound when the component unmounts
        } catch (error) {
          console.error('Error stopping/unloading audio:', error);
          // Handle the error, e.g., display an error message to the user.
        }
      }
    };
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

        // Start playing the audio automatically when it's loaded
        sound.playAsync();
      } catch (error) {
        console.error('Error playing audio:', error);
        // Handle the error, e.g., display an error message to the user.
      }
    }
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
    marginBottom: 20,
    padding: 30,
    backgroundColor: '#f7fff7',
    borderRadius: 10,
  },
  slider: {
    width: 300,
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
