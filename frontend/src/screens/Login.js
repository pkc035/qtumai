import React, { useState } from 'react';
import styled from 'styled-components/native';
import Button from '../components/Button';
import { WebView } from 'react-native-webview';
import { StatusBar } from "react-native";


const Login = ({ navigation }) => {
  return (
    <Container>
      <StatusBar backgroundColor="#121212" barStyle="light-content" />
      <WebView source={{ uri: 'http://192.168.0.69:3000/login' }}
      onMessage={(event) => event.nativeEvent.data === 'Success!' ? navigation.navigate("Home") : null}
      />
    </Container>
  );
};

export default Login;

const Container = styled.View`
  flex:1;
`;

const NextButton = styled.Button`
  flex:1;
`;
