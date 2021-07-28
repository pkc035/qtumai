import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { Login, Home } from '../screens';
import { MaterialIcons } from '@expo/vector-icons';

const Stack = createStackNavigator();

const StackNav = () => {
  return (
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={{
        cardStyle: { backgroundColor: '#ffffff' },
        headerShown: false,
        headerTitleStyle: {
          fontSize: 24,
          color: 'black',
        },
        headerTitle: ({ style }) => {
          return <MaterialIcons name="react" style={style} />;
        },
      }}
    >
      <Stack.Screen name="Login" component={Login}></Stack.Screen>
      <Stack.Screen name="Home" component={Home}></Stack.Screen>
    </Stack.Navigator>
  );
};

export default StackNav;
