import React, { useState } from 'react';
import { ScrollView, View, Text, StyleSheet, TouchableOpacity, ImageBackground, Image, Modal } from 'react-native';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import axios from 'axios';

const lightColors = {
  primary: '#f4effa'
};

const RewardScreen = () => {
  const [isModalVisible, setModalVisible] = useState(false);
  const BACKEND_ENDPOINT = 'https://b491-203-125-116-194.ngrok-free.app';
  const [points, setPoints] = useState(0);
  const [selectedPrice, setSelectedPrice] = useState(0);

  const checkUserData = async () => {
    try {
      const response = await axios.get(`${BACKEND_ENDPOINT}/fetch`);
      const { points } = response.data;
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

  const updateUserPoints = async (newPoints) => {
    try {
      await axios.post(`${BACKEND_ENDPOINT}/update_points`, { points: newPoints });
      console.log('Points updated successfully');
    } catch (error) {
      console.error('Error updating points:', error);
    }
  };

  // Initialize the navigation object
  const navigation = useNavigation();

  // Function to show the modal when the button is pressed
  const handleButtonPress = (price) => {
    if (points >= price) {
      updateUserPoints(-price);
      setSelectedPrice(price);
      setModalVisible(true);
      console.log('Reward redeemed successfully');
    } else {
      setSelectedPrice(price);
      setModalVisible(true);
      console.log('Insufficient points to redeem this reward');
    }
  };

  // Function to hide the modal
  const hideModal = () => {
    setModalVisible(false);
    checkUserData();
  };

  // Function to navigate back to the previous screen
  const navigateBack = () => {
    navigation.goBack();
  };

  return (
    <ImageBackground source={require('../../assets/RewardScreen/background.jpg')} style={styles.backgroundImage}>
      <View style={styles.titleContainer}>
        <Text style={styles.header}>Rewards</Text>
        <Text style={styles.pointsHeader}>Current Points: {points}</Text>
      </View>
      <ScrollView>
        <PricingCard
          color={lightColors.primary}
          image={require('../../assets/RewardScreen/cards/ntuc.png')}
          title="$20 FairPrice eVoucher"
          price={1500}
          button={{ title: 'Redeem', onPress: () => handleButtonPress(1500) }}
        />
        <PricingCard
            color={lightColors.primary}
            image={require('../../assets/RewardScreen/cards/hbp.png')}
            title="$10 HPB eVoucher"
            price={750}
            // info={['10 Users', 'Basic Support', 'All Core Features']}
            button={{ title: 'Redeem', onPress: () => handleButtonPress(750) }}
        />
        <PricingCard
            color={lightColors.primary}
            image={require('../../assets/RewardScreen/cards/liho.png')}
            title="$5 LiHO eVoucher"
            price={300}
            // info={['100 Users', 'One on One Support', 'All Core Features']}
            button={{ title: 'Redeem', onPress: () => handleButtonPress(300) }}
        />
        <PricingCard
            color={lightColors.primary}
            image={require('../../assets/RewardScreen/cards/wwf.png')}
            title="WWF Panda Keychain"
            price={300}
            // info={['100 Users', 'One on One Support', 'All Core Features']}
            button={{ title: 'Redeem', onPress: () => handleButtonPress(300) }}
        />
        {/* <PricingCard
            color={lightColors.primary}
            title="$5 Mr Brean eVoucher"
            price="$49"
            // info={['100 Users', 'One on One Support', 'All Core Features']}
            button={{ title: 'Redeem', onPress: handleButtonPress }}
        /> */}

        {/* Back Button */}
        <TouchableOpacity style={styles.backButton} onPress={navigateBack}>
          <Text style={styles.backButtonText}>Back</Text>
        </TouchableOpacity>

      </ScrollView>

      {/* Modal */}
      <Modal
        animationType="none"
        transparent={true}
        visible={isModalVisible}
        onRequestClose={hideModal}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            {points >= selectedPrice ? (
              <Text style={[styles.modalText, { color: 'green' }]}>Successfully Redeemed!</Text>
            ) : (
              <Text style={[styles.modalText, { color: 'red' }]}>Insufficient points to redeem</Text>
            )}
            <TouchableOpacity style={styles.modalButton} onPress={hideModal}>
              <Text style={styles.modalButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

    </ImageBackground>
  );
};

const PricingCard = ({ color, image, title, price, button }) => {
  const handleButtonPress = () => {
    button.onPress(price); // Pass the price to the handler
  };
  return (
    <View style={[styles.pricingCard, { backgroundColor: color }]}>
      <View style={styles.cardContent}>
        <Image source={image} style={[styles.image, { maxHeight: 60 }]} resizeMode="contain" />
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.price}>{price} Points</Text>
        <TouchableOpacity style={styles.button} onPress={handleButtonPress}>
          <Text style={styles.buttonText}>{button.title}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    width: '100%',
    height: '100%',
    justifyContent: 'center'
  },
  titleContainer: {
    alignItems: 'center',
    marginTop: 60
  },
  pointsContainer: {
    alignItems: 'center',
  },
  title: {
    fontSize: 25,
    fontWeight: 'bold',
    color: 'black',
    marginTop: 10
  },
  pricingCard: {
    margin: 10,
    padding: 20,
    borderRadius: 10
  },
  header: {
    fontSize: 40,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 10
  },
  pointsHeader: {
    fontSize: 25,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 10
  },
  price: {
    fontSize: 30,
    color: 'black',
    marginTop: 15,
    marginBottom: 15
  },
  button: {
    backgroundColor: '#5a189a',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
    alignSelf: 'center',
    color: lightColors.primary
  },
  image: {
    width: 400,
    height: 100,
    marginBottom: 10
  },
  cardContent: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1
  },

  // Modal styles
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
    fontSize: 25,
    // fontWeight: 'bold',
    color: 'black',
    textAlign: 'center',
  },
  modalButton: {
    backgroundColor: '#5a189a',
    marginTop: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5
  },
  modalButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: lightColors.primary
  },
  backButton: {
    backgroundColor: '#007AFF',
    alignSelf: 'center',
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 5,
    marginTop: 20,
    marginBottom: 20
  },
  backButtonText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white'
  }
});

export default RewardScreen;
