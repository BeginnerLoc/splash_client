import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TextInput, TouchableOpacity, ImageBackground } from 'react-native';
import { Button, Input, Icon } from 'react-native-elements';
import axios from 'axios';


export default function LoginScreen({ navigation }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const BACKEND_ENDPOINT = 'https://845f-203-125-116-194.ngrok-free.app'; // Replace with your backend endpoint URL

  axios.get(`${BACKEND_ENDPOINT}/create_room`)
  const handleLogin = async () => {
    try {
      const response = await axios.post(`${BACKEND_ENDPOINT}/login`, {
        username: username, // Use the "username" state variable
        password: password,
      });
  
      if (response.status === 200) {
        // Authentication successful, navigate to the next screen.
        navigation.navigate('HomeScreen'); // Go to the HomeScreen page
      } else {
        // Authentication failed, display an error message or take appropriate action.
        alert('Invalid username or password. Please try again.');
      }
    } catch (error) {
      // Handle any errors from the API request, e.g., network error
      console.error('Error:', error);
      alert('An error occurred. Please try again later.');
    }
  };
  
  

  return (
    <ImageBackground source={require('../../assets/background.jpg')} style={styles.backgroundImage}>
      <View style={styles.container}>

        <Image source={require('../../assets/LoginScreen/resonate.png')} style={styles.logo} />

        <Text style={styles.heading}>Welcome Back!</Text>

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

        <TouchableOpacity onPress={handleLogin}>
          <View style={styles.loginButton}>
          <Text style={styles.loginText}>Login</Text>
          </View>
        </TouchableOpacity>

        {/* <Text style={styles.forgotPassword}>Forgot Password?</Text> */}

        <View style={styles.signupContainer}>
          <Text style={styles.signupText}>Don't have an account?</Text>
          <TouchableOpacity onPress={() => navigation.navigate('RegistrationScreen')}>
          <Text style={styles.signupLink}>Sign Up</Text>
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
    justifyContent: 'center'
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    // backgroundColor: '#f2ebfb',
    padding: 20
  },
  logo: {
    width: 150,
    height: 150,
    marginBottom: 15,
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
    borderRadius: 10
  },
  input: {
    fontSize: 16,
    // color: '#333',
    color: 'white'
  },
  loginButton: {
    borderRadius: 20,
    backgroundColor: '#a47bf0',
    width: 120,
    padding: 15,
    alignItems: 'center'
  },
  loginText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold'
  },
//   forgotPassword: {
//     color: '#007AFF',
//     fontSize: 16,
//     textDecorationLine: 'underline',
//     marginBottom: 20,
//   },
  signupContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  signupText: {
    marginRight: 10,
    marginTop: 20,
    fontSize: 16,
    // color: '#333',
    color: 'white'
  },
  signupLink: {
    color: '#56baec',
    marginTop: 20,
    fontSize: 16,
    fontWeight: 'bold',
    textDecorationLine: 'underline'
  },
});
