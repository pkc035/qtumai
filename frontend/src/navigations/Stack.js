import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { Login, Home } from '../screens';
import { MaterialIcons } from '@expo/vector-icons';

const Stack = createStackNavigator();

const StackNav = () => {
  return (
    <Stack.Navigator
      initialRouteName="Login"
      screenOptions={{
        cardStyle: { backgroundColor: '#ffffff' },
        headerShown: false,
        headerTitleStyle: {
          fontSize: 24,
          color: 'black',
        },
        // headerTitle: ({ style }) => {
        //   return <MaterialIcons name='react' style={style} />;
        // },
      }}
    >
<<<<<<< HEAD
      <Stack.Screen name='Login' component={Login}></Stack.Screen>
      <Stack.Screen name='Home' component={Home}></Stack.Screen>
=======
      <Stack.Screen name="Login" component={Login}></Stack.Screen>
      <Stack.Screen name="Sign" component={Sign}></Stack.Screen>
      <Stack.Screen name="Home" component={Home}></Stack.Screen>
>>>>>>> feature/JYJ/Detailpage
    </Stack.Navigator>
  );
};

export default StackNav;
