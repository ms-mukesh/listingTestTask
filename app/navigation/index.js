import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import HomeScreen from '../screen/component/HomeScreen';
import UserPostDetailsScreen from '../screen/component/PostDetails';
import 'react-native-gesture-handler';
const Stack = createStackNavigator();
const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="HomeScreen"
        screenOptions={{headerShown: false}}>
        <Stack.Screen name="HomeScreen" component={HomeScreen} />
        <Stack.Screen
          name="UserPostDetailsScreen"
          component={UserPostDetailsScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
export default App;
