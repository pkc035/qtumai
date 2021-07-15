import React from 'react';
import styled from 'styled-components/native';
import Button from '../components/Button';

const Login = ({ navigation }) => {
  return (
    <Container>
      <StyledText>Login</StyledText>
      <Button title='Sign' onPress={() => navigation.navigate('Sign')} />
    </Container>
  );
};

export default Login;

const Container = styled.View`
  align-items: center;
`;

const StyledText = styled.Text`
  font-size: 30px;
  margin: 10px;
`;
