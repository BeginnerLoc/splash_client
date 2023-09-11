import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TextInput, TouchableOpacity, ImageBackground } from 'react-native';
import { Button, Input, Icon } from 'react-native-elements';

export default function RegistrationScreen({ navigation }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleRegistration = () => {
    // In a real application, you would perform user registration here.
    // For demonstration purposes, you can add your registration logic.
    // After successful registration, you can navigate to the login page or the home screen.
    // For example:
    // navigation.navigate('Login'); // Navigate to the login page
  };

  return (
    <ImageBackground source={require('../../assets/background.jpg')} style={styles.backgroundImage}>

      <View style={styles.container}>
        <Image source={require('../../assets/RegistrationScreen/icon1.png')} style={styles.logo} />

        <Text style={styles.heading}>Create an account!</Text>

        <Input
          placeholder="Username"
          placeholderTextColor="white"
          leftIcon={<Icon name="person" type="material" size={24} color="white" />}
          onChangeText={(text) => setUsername(text)}
          value={username}
          inputStyle={styles.input}
          containerStyle={styles.inputContainer}
        />

        <Input
          placeholder="Password"
          placeholderTextColor="white"
          leftIcon={<Icon name="lock" type="material" size={24} color="white" />}
          onChangeText={(text) => setPassword(text)}
          value={password}
          secureTextEntry={true}
          inputStyle={styles.input}
          containerStyle={styles.inputContainer}
        />

        <TouchableOpacity onPress={handleRegistration}>
          <View style={styles.registerButton}>
            <Text style={styles.registerText}>Register</Text>
          </View>
        </TouchableOpacity>

        <View style={styles.loginContainer}>
          <Text style={styles.loginText}>Already have an account?</Text>
          <TouchableOpacity onPress={() => navigation.navigate('LoginScreen')}>
            <Text style={styles.loginLink}>Login</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    width: '100%',
    height: '100%', // Cover the entire screen
    justifyContent: 'center',
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    // backgroundColor: '#f2ebfb',
    padding: 20,
  },
  logo: {
    width: 150,
    height: 150,
    marginBottom: 20,
  },
  heading: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    // color: '#333',
    color: 'white'
  },
  inputContainer: {
    width: '100%',
    marginBottom: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 10,
  },
  input: {
    fontSize: 16,
    // color: '#333',
    color: 'white'
  },
  registerButton: {
    backgroundColor: '#a47bf0',
    width: 125,
    padding: 15,
    alignItems: 'center',
    borderRadius: 20,
  },
  registerText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  loginContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  loginText: {
    marginRight: 10,
    fontSize: 16,
    // color: '#333',
    color: 'white'
  },
  loginLink: {
    color: '#56baec',
    fontSize: 16,
    fontWeight: 'bold',
    textDecorationLine: 'underline',
  },
});
