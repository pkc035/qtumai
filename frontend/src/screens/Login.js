import React from 'react';
import styled from 'styled-components/native';
import Button from '../components/Button';
import { WebView } from 'react-native-webview';


const Login = ({ navigation }) => {
  return (
    <Container>
      <WebView source={{ uri: 'http://192.168.0.69:3000/login' }}
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
