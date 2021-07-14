import React from 'react';
import { WebView } from 'react-native-webview';
import styled from 'styled-components/native';
import Button from '../components/Button';

const Where = ({ navigation }) => {
  return (
    <Container>
      <WebView source={{ uri: 'http://192.168.0.70:3000/Where' }} />
      <Button
        title='wherePop'
        onPress={() => navigation.pop()}
        style={{ position: 'absoulte', top: 0, right: 0 }}
      />
    </Container>
  );
};

export default Where;

{
}
const Container = styled.View`
  flex: 1;
`;
