import React from 'react';
import styled from 'styled-components/native';
import Button from '../components/Button';
import Who from './Who';
import Where from './Where';
import { MainNavigator, Map } from './TabScreens';
import { createStackNavigator } from '@react-navigation/stack';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const Stack = createStackNavigator();

const Home = () => {
  const insets = useSafeAreaInsets();
  return (
    <Stack.Navigator
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
      <Stack.Screen
        name='MainNavigator'
        component={MainNavigator}
      ></Stack.Screen>
      <Stack.Screen name='Who' component={Who}></Stack.Screen>
      <Stack.Screen name='Where' component={Where}></Stack.Screen>
      <Stack.Screen name='Map' component={Map}></Stack.Screen>
    </Stack.Navigator>
  );
};

export default Home;

const Container = styled.View`
  align-items: center;
  padding-top: ${({ insets: { top } }) => top}px;
  padding-bottom: ${({ insets: { bottom } }) => bottom}px;
  padding-right: ${({ insets: { right } }) => right}px;
  padding-left: ${({ insets: { left } }) => left}px;
`;

const StyledText = styled.Text`
  font-size: 30px;
  margin: 10px;
`;
