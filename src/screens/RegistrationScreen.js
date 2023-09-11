import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TextInput, TouchableOpacity } from 'react-native';
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
    <View style={styles.container}>
      <Image source={require('../../assets/RegistrationScreen/icon1.png')} style={styles.logo} />

      <Text style={styles.heading}>Create an account!</Text>

      <Input
        placeholder="Username"
        leftIcon={<Icon name="person" type="material" size={24} color="#5E5E5E" />}
        onChangeText={(text) => setUsername(text)}
        value={username}
        inputStyle={styles.input}
        containerStyle={styles.inputContainer}
      />

      <Input
        placeholder="Password"
        leftIcon={<Icon name="lock" type="material" size={24} color="#5E5E5E" />}
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
  );
}

const styles = StyleSheet.create({
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
    color: '#333',
  },
  loginLink: {
    color: '#007AFF',
    fontSize: 16,
    fontWeight: 'bold',
    textDecorationLine: 'underline',
  },
});
