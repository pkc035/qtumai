import React from 'react';
import { Alert } from 'react-native';
import { WebView } from 'react-native-webview';
import { createGlobalStyle } from 'styled-components';
import styled from 'styled-components/native';
import Button from '../components/Button';

const Where = ({ navigation }) => {
  return (
    <Container>
<<<<<<< HEAD
      <WebView
        source={{ uri: 'http://192.168.0.69:3000/Where' }}
        onMessage={(event) =>
          event.nativeEvent.data === 'Success!' ? navigation.pop() : null
        }
=======
<<<<<<< HEAD
      <WebView source={{ uri: 'http://192.168.0.69:3000/Where' }}
        onMessage={(event) => event.nativeEvent.data === 'Success!' ? navigation.pop() : null}
=======
      <WebView
        source={{ uri: 'http://192.168.0.76:3000/Where' }}
        // onMessage={(event) =>
        //   event.nativeEvent.data === 'Success!' ? navigation.pop() : null
        // }
>>>>>>> 7a18f46 (Add: back up before pull)
>>>>>>> master
      />
      <Button
        title="wherePop"
        onPress={() => navigation.pop()}
        style={{ position: 'absoulte', top: 0, right: 0 }}
      />
    </Container>
  );
};

export default Where;

const Container = styled.View`
  flex: 1;
`;
