import React from 'react';
import styled from 'styled-components/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { WebView } from 'react-native-webview';
import Button from '../components/Button';
import FloatingButton from '../components/FloatingButton';
import Profile from './Profile';
import { URI } from '../config';
const MainTab = createBottomTabNavigator();
export const MainNavigator = () => {
  return (
    <MainTab.Navigator
      initialRouteName="Main"
      // tabBarOptions={{ showLabel: false }}
    >
      <MainTab.Screen name="Main" component={Main} />
      <MainTab.Screen name="Map" component={Map} />
      <MainTab.Screen name="Like" component={Like} />
      <MainTab.Screen name="Favorite" component={Favorite} />
      <MainTab.Screen name="Profile" component={Profile} />
    </MainTab.Navigator>
  );
};
export const Main = ({ navigation }) => {
  return (
    <Container>
      <WebView source={{ uri: 'http://192.168.0.76:3000/' }} />
      <FloatingButton
        position={{ bottom: 80, right: 40 }}
        navigation={navigation}
      />
    </Container>
  );
};

export const Map = ({ navigation }) => {
  return (
    <Container>
      <WebView source={{ uri: `${URI}/Map` }} />
      <FloatingButton
        position={{ bottom: 80, right: 40 }}
        navigation={navigation}
      />
    </Container>
  );
};

export const Like = () => {
  return (
    <Container>
      <WebView source={{ uri: 'http://192.168.0.76:3000/likes' }} />
    </Container>
  );
};

export const Favorite = () => {
  return (
    <Container>
      <WebView source={{ uri: 'http://192.168.0.76:3000/heart' }} />
    </Container>
  );
};

const Container = styled.View`
  flex: 1;
`;

const StyledText = styled.Text``;
