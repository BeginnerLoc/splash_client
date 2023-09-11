import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TextInput, TouchableOpacity, ImageBackground } from 'react-native';
import { Button, Input, Icon } from 'react-native-elements';


export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    // In a real application, you would perform authentication here.
    // For demonstration purposes, let's assume the username is "loc".
    if (email.toLowerCase() === 'loc' && password === 'password') {
      // Authentication successful, navigate to the next screen.
      navigation.navigate('HomeScreen'); // Go to the HomeScreen page
    } else {
      // Authentication failed, display an error message or take appropriate action.
      alert('Invalid username or password. Please try again.');
    }
  };

  return (
    // <ImageBackground source={require('../../assets/background.jpg')} style={styles.backgroundImage}>
      <View style={styles.container}>

        <Image source={require('../../assets/LoginScreen/resonate.png')} style={styles.logo} />

        <Text style={styles.heading}>Welcome!</Text>

        <Input
          placeholder="Username"
        //   placeholderTextColor="white"
          leftIcon={<Icon name="person" type="material" size={24} color="#5E5E5E" />}
          onChangeText={(text) => setEmail(text)}
          value={email}
          inputStyle={styles.input}
          containerStyle={styles.inputContainer}
        />

        <Input
          placeholder="Password"
        //   placeholderTextColor="white"
          leftIcon={<Icon name="lock" type="material" size={24} color="#5E5E5E" />}
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
    // </ImageBackground>
  );
}

const styles = StyleSheet.create({
//   backgroundImage: {
//     flex: 1,
//     width: '100%',
//     height: '100%', // Cover the entire screen
//     justifyContent: 'center',
//   },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f2ebfb',
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
    color: '#333',
  },
  inputContainer: {
    width: '100%',
    marginBottom: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
    borderRadius: 10,
  },
  input: {
    fontSize: 16,
    color: '#333',
  },
  loginButton: {
    borderRadius: 20,
    backgroundColor: '#a47bf0',
    width: 120,
    padding: 15,
    alignItems: 'center',
  },
  loginText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
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
    alignItems: 'center',
  },
  signupText: {
    marginRight: 10,
    marginTop: 20,
    fontSize: 16,
    color: '#333',
  },
  signupLink: {
    color: '#56baec',
    marginTop: 20,
    fontSize: 16,
    fontWeight: 'bold',
    textDecorationLine: 'underline',
  },
});
