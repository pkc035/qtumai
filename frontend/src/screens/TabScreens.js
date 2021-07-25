import React from "react";
import styled from "styled-components/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { WebView } from "react-native-webview";
import Button from "../components/Button";
import FloatingButton from "../components/FloatingButton";
import Profile from "./Profile";
import { URI } from "../config";

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
      <WebView source={{ uri: `${URI}/` }} />
      <FloatingBackground>
        <FloatingButton
          position={{ bottom: 80, right: 40 }}
          navigation={navigation}
        />
      </FloatingBackground>
    </MainContainer>
  );
};

const MainContainer = styled.View`
  flex: 1;
`;

const FloatingBackground = styled.View`
  flex: 1;
  position: absolute;
  bottom: 0;
  right: 0;
  z-index: 100;
`;

export const Map = ({ navigation }) => {
  return (
    <Container>
      <WebView source={{ uri: `${URI}/Map` }} />
      <Button title="Who" onPress={() => navigation.navigate("Who")} />
      <Button title="Where" onPress={() => navigation.navigate("Where")} />
    </Container>
  );
};

export const Like = () => {
  return <Container></Container>;
};

export const Favorite = () => {
  return (
    <Container>
      <StyledText>Favorite</StyledText>
    </Container>
  );
};
