import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { WebView } from 'react-native-webview';
import Button from '../components/Button';
import FloatingButton from '../components/FloatingButton';
import Profile from './Profile';
import { URI } from '../config';
import { Ionicons, Entypo, FontAwesome } from '@expo/vector-icons';
import styled from 'styled-components/native';

const TabIcon = ({ name, size, color }) => {
  if (name === 'home') {
    return <Entypo name={name} size={size} color={color} />;
  } else if (name === 'star') {
    return <FontAwesome name={name} size={size} color={color} />;
  } else {
    return <Ionicons name={name} size={size} color={color} />;
  }
};

const MainTab = createBottomTabNavigator();

export const MainNavigator = () => {
  return (
    <MainTab.Navigator
      initialRouteName="Main"
      tabBarOptions={{
        showLabel: false,
        activeTintColor: '#e63D11',
        inactiveTintColor: '#c2c2c2',
        style: {
          height: 55,
        },
      }}
    >
      <MainTab.Screen
        name="Main"
        component={Main}
        options={{
          tabBarIcon: (props) => {
            return TabIcon({ ...props, name: 'home' });
          },
        }}
      />
      <MainTab.Screen
        name="Map"
        component={Map}
        options={{
          tabBarIcon: (props) => {
            return TabIcon({ ...props, name: 'map' });
          },
        }}
      />
      <MainTab.Screen
        name="Like"
        component={Like}
        options={{
          tabBarIcon: (props) => {
            return TabIcon({ ...props, name: 'star' });
          },
        }}
      />
      <MainTab.Screen
        name="Favorite"
        component={Favorite}
        options={{
          tabBarIcon: (props) => {
            return TabIcon({ ...props, name: 'heart' });
          },
        }}
      />
      <MainTab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarIcon: (props) => {
            return TabIcon({ ...props, name: 'person' });
          },
        }}
      />
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
