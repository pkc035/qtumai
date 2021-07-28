import React from 'react';
import { WebView } from 'react-native-webview';
import styled from 'styled-components/native';
import Button from '../components/Button';

const Where = ({ navigation }) => {
  return (
    <Container>
      <WebView
        source={{ uri: 'http://192.168.0.76:3000/where' }}
        onMessage={(event) =>
          event.nativeEvent.data === 'goToMain' ? navigation.pop() : null
        }
      />
    </Container>
  );
};
export default Where;

const Container = styled.View`
  flex: 1;
`;
