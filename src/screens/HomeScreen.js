import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ImageBackground, StyleSheet, Modal, Image } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import axios from 'axios';
import BASE_URL from '../utils/config'

export default HomeScreen = ({ navigation }) => {
  const [username, setUsername] = useState(''); // Add username state
  const [points, setPoints] = useState(0);
  const [isModalVisible, setModalVisible] = useState(false);
  const BACKEND_ENDPOINT = BASE_URL;

  const checkUserData = async () => {
    try {
      const response = await axios.get(`${BACKEND_ENDPOINT}/fetch`);
      const { username, points } = response.data;
      setUsername(username);
      setPoints(points);

    } catch (error) {
      console.error('Error checking user data:', error);
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      checkUserData();
    }, [])
  );

  const checkHasSongs = async () => {
    try {
      const response = await axios.get(`${BACKEND_ENDPOINT}/fetch`);
      const { has_songs } = response.data;

      if (!has_songs) {
        setModalVisible(true);
      } else {
        navigation.push('MatchScreen', { username });
      }
    } catch (error) {
      console.error('Error checking songs:', error);
    }
  };

  const hideModal = () => {
    setModalVisible(false);
  };

  return (
    <ImageBackground
      source={require('../../assets/background.jpg')}
      style={styles.backgroundImage}
    >
      <View style={styles.userInfo}>
      <Image
            source={require('../../assets/HomeScreen/guitar.png')} // Replace with your image source
            style={styles.userImage}
          />
        <Text style={styles.userInfoText}>{username}</Text>
        <Text style={styles.userInfoText}>Points: {points}</Text>
      </View>
      <View style={styles.container}>
        <TouchableOpacity
          onPress={checkHasSongs}
          style={styles.button}
        >
          <Text style={styles.buttonText}>Search Game</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.container}>
        <TouchableOpacity
          onPress={() => navigation.push('UploadScreen')}
          style={styles.button}
        >
          <Text style={styles.buttonText}>Upload Music</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.container}>
        <TouchableOpacity
          onPress={() => navigation.push('InstrumentScreen')}
          style={styles.button}
        >
          <Text style={styles.buttonText}>Instruments</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.container}>
        <TouchableOpacity
          onPress={() => navigation.push('RewardScreen')}
          style={styles.button}
        >
          <Text style={styles.buttonText}>Rewards</Text>
        </TouchableOpacity>
      </View>
      {/* <View style={styles.container}>
        <TouchableOpacity
          onPress={() => navigation.push('PodiumScreen')}
          style={styles.button}
        >
          <Text style={styles.buttonText}>Podium</Text>
        </TouchableOpacity>
      </View> */}
      <Modal
        animationType="none"
        transparent={true}
        visible={isModalVisible}
        onRequestClose={hideModal}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalText}>Please upload music before searching for games</Text>
            <TouchableOpacity style={styles.modalButton} onPress={hideModal}>
              <Text style={styles.modalButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </ImageBackground>
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
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    width: 180,
    height: 90,
    backgroundColor: '#fff',
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#8F00FF',
    elevation: 10,
  },
  buttonText: {
    fontSize: 20,
    color: '#8F00FF',
  },
  userInfo: {
    padding: 20,
    alignSelf: 'center',
    alignItems: 'center',
    backgroundColor: '#f2f7ff',
    borderRadius: 10,
    width: '40%',
    position: 'relative',
  },
  userInfoText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#5a189a',
  },
  userImage: {
    width: 70,
    height: 70,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)'
  },
  modalContent: {
    backgroundColor: '#f9f7f3',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center'
  },
  modalText: {
    fontSize: 20,
    textAlign: 'center',
    // fontWeight: 'bold',
    color: 'black'
  },
  modalButton: {
    backgroundColor: '#8F00FF',
    marginTop: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5
  },
  modalButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#F4EFFA'
  },
});
