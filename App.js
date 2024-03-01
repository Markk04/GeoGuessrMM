import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import MainMenuScreen from './screens/MainMenuScreen';
import GameScreen from './screens/GameScreen';
import FinalResultScreen from './screens/FinalResultScreen';

const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="MainMenu">
        <Stack.Screen name="MainMenu" component={MainMenuScreen} />
        <Stack.Screen name="Game" component={GameScreen} />
        <Stack.Screen name="FinalResult" component={FinalResultScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
