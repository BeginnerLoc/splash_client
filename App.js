import MatchScreen from './src/screens/MatchScreen';
import HomeScreen from './src/screens/HomeScreen';
import GameScreen from './src/screens/GameScreen';
import LoginScreen from './src/screens/LoginScreen';
import RegistrationScreen from './src/screens/RegistrationScreen';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{
        headerShown: false
      }}>
        <Stack.Screen
          name="LoginScreen"
          component={LoginScreen}
          options={{ title: 'LoginScreen' }}
        />
        <Stack.Screen 
          name="RegistrationScreen"
          component={RegistrationScreen}
          options={{ title: 'RegistrationScreen' }}
        />
        <Stack.Screen
          name="HomeScreen"
          component={HomeScreen}
          options={{ title: 'HomeScreen' }}
        />
      
        <Stack.Screen 
        name="MatchScreen" 
        component={MatchScreen} 
        options={{ title: 'MatchScreen' }}
        />
        
        <Stack.Screen name="GameScreen" component={GameScreen} />

      </Stack.Navigator>
    </NavigationContainer>
  );
}