import React from 'react';
import { WebView } from 'react-native-webview';
import styled from 'styled-components/native';
import Button from '../components/Button';

const Who = ({ navigation }) => {
  return (
    <Container>
      <WebView
        source={{ uri: 'http://192.168.0.76:3000/who' }}
        onMessage={(event) =>
          event.nativeEvent.data === 'goToMain' ? navigation.pop() : null
        }
      />
    </Container>
  );
};

export default Who;

const Container = styled.View`
  flex: 1;
`;
