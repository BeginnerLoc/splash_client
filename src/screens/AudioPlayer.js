import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Audio } from 'expo-av';
import Slider from '@react-native-community/slider';

export default function MusicPlayer() {
  const [sound, setSound] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [position, setPosition] = useState(0); // Track position in milliseconds
  const [duration, setDuration] = useState(0); // Track duration in milliseconds
  const [hasLoaded, setHasLoaded] = useState(false);

  async function loadAudio() {
    const { sound } = await Audio.Sound.createAsync(
      require('../songs/Fantasize.mp3')
    );
    setSound(sound);
  }

  useEffect(() => {
    loadAudio();

    return () => {
      if (sound) {
        sound.unloadAsync();
      }
    };
  }, []);

  useEffect(() => {
    if (sound) {
      sound.setOnPlaybackStatusUpdate((status) => {
        if (status.isLoaded) {
          setPosition(status.positionMillis);
          setDuration(status.durationMillis);
          setIsPlaying(status.isPlaying);
          if (!hasLoaded) {
            // Auto play the audio when it's first loaded
            togglePlayback();
            setHasLoaded(true);
          }
        }
      });
    }
  }, [sound, hasLoaded]);

  async function togglePlayback() {
    if (sound) {
      if (isPlaying) {
        await sound.pauseAsync();
      } else {
        await sound.playAsync();
      }
      setIsPlaying(!isPlaying);
    }
  }

  function formatTime(milliseconds) {
    const totalSeconds = milliseconds / 1000;
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = Math.floor(totalSeconds % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  }

  function onSliderValueChange(value) {
    // Seek to the specified position
    sound.setPositionAsync(value);
  }

  return (
    <View>
      <TouchableOpacity onPress={togglePlayback}>
        <Text style={styles.playPauseText}>{isPlaying ? 'Pause' : 'Play'}</Text>
      </TouchableOpacity>
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
  slider: {
    width: 300,
  },
  playPauseText: {
    textAlign: 'center',
    fontSize: 18,
    marginBottom: 10,
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
