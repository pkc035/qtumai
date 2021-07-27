import React from 'react';
import styled from 'styled-components/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { WebView } from 'react-native-webview';
import Button from '../components/Button';
import FloatingButton from '../components/FloatingButton';

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
    <MainContainer>
      <WebView source={{ uri: 'http://192.168.0.76:3000/' }} />
      {/* <WebView source={{ uri: 'http://10.58.2.159:3000/' }} /> */}
      <FloatingButton
        position={{ bottom: 80, right: 40 }}
        navigation={navigation}
      />
    </MainContainer>
  );
};

const MainContainer = styled.View`
  flex: 1;
`;

export const Map = ({ navigation }) => {
  return (
    <Container>
      <WebView source={{ uri: 'http://192.168.0.76:3000/Map' }} />
      <Button title="Who" onPress={() => navigation.navigate('Who')} />
      <Button title="Where" onPress={() => navigation.navigate('Where')} />
    </Container>
  );
};

export const Like = () => {
  return (
    <Container>
      <WebView source={{ uri: 'http://192.168.0.76:3000/likes' }} />
      {/* <WebView source={{ uri: 'http://10.58.2.159:3000/Detail' }} /> */}
    </Container>
  );
};

export const Favorite = () => {
  return (
    <Container>
      <StyledText>Favorite</StyledText>
    </Container>
  );
};

export const Profile = () => {
  return (
    <Container>
      <StyledText>Profile</StyledText>
    </Container>
  );
};

const Container = styled.View`
  flex: 1;
`;

const StyledText = styled.Text`
  font-size: 30px;
`;
