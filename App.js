
import MatchScreen from './src/screens/MatchScreen';
import HomeScreen from './src/screens/HomeScreen';
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
          name="HomeScreen"
          component={HomeScreen}
          options={{ title: 'HomeScreen' }}
        />
        <Stack.Screen name="MatchScreen" component={MatchScreen} />
        {/* <Stack.Screen name="ResultScreen" component={ResultScreen} /> */}
      </Stack.Navigator>
    </NavigationContainer>);
}
