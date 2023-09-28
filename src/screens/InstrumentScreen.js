import React, { useState } from 'react';
import { ScrollView, View, Text, StyleSheet, TouchableOpacity, ImageBackground, Image, Modal } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const lightColors = {
  primary: '#f4effa'
};

const InstrumentScreen = () => {
  const [isModalVisible, setModalVisible] = useState(false);

  // Initialize the navigation object
  const navigation = useNavigation();

  // Function to show the modal when the button is pressed
  const handleButtonPress = () => {
    setModalVisible(true);
  };

  // Function to hide the modal
  const hideModal = () => {
    setModalVisible(false);
  };

  // Function to navigate back to the previous screen
  const navigateBack = () => {
    navigation.goBack();
  };

  return (
    <ImageBackground source={require('../../assets/RewardScreen/background.jpg')} style={styles.backgroundImage}>
      <View style={styles.titleContainer}>
        <Text style={styles.header}>Instruments</Text>
      </View>
      <ScrollView>
        <PricingCard
          color={lightColors.primary}
          image={require('../../assets/GameScreen/instruments/Guzheng.png')}
          title="Guzheng"
          price="The Guzheng, a Chinese zither with thousands of years of history, is known for its delicate melodies. Played with plucked strings, it's integral to traditional Chinese music, used in solos and ensembles."
          button={{ title: 'View', onPress: handleButtonPress }}
        />
        <PricingCard
            color={lightColors.primary}
            image={require('../../assets/GameScreen/instruments/Dizi.jpg')}
            title="Dizi"
            price="The Dizi, a Chinese bamboo flute, has been played for centuries. Crafted from a single bamboo piece, it's famous for its expressive tones and is used in classical, folk, and contemporary Chinese music."
            // info={['10 Users', 'Basic Support', 'All Core Features']}
            button={{ title: 'View', onPress: handleButtonPress }}
        />
        <PricingCard
            color={lightColors.primary}
            image={require('../../assets/GameScreen/instruments/Tabla.jpg')}
            title="Tabla"
            price="Originating in India, the Tabla is a hand-played drum duo. It provides complex rhythms with finger and palm techniques. It's essential in classical Indian music and popular genres."
            // info={['100 Users', 'One on One Support', 'All Core Features']}
            button={{ title: 'View', onPress: handleButtonPress }}
        />
        <PricingCard
            color={lightColors.primary}
            image={require('../../assets/GameScreen/instruments/Sitar.jpg')}
            title="Sitar"
            price = "The Sitar, is an iconic Indian instrument. It features movable frets, sympathetic strings, and a long neck. The sitar is renowned for its rich, melodic, and mesmerizing sound."
            // info={['100 Users', 'One on One Support', 'All Core Features']}
            button={{ title: 'View', onPress: handleButtonPress }}
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
            <Text style={styles.modalText}>Successfully Redeemed!</Text>
            <TouchableOpacity style={styles.modalButton} onPress={hideModal}>
              <Text style={styles.modalButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>


    </ImageBackground>
  );
};

const PricingCard = ({ color, image, title, price }) => {
  return (
    <View style={[styles.pricingCard, { backgroundColor: color }]}>
      <View style={styles.cardContent}>
        <Image source={image} style={[styles.image]} resizeMode="contain" />
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.price}>{price}</Text>
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
  price: {
    fontSize: 20,
    color: 'black',
    marginTop: 15,
    marginBottom: 15,
    textAlign: 'center'
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
    width: 360,
    height: 360,
    marginVertical: -40
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

export default InstrumentScreen;