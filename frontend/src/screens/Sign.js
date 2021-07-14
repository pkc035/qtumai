import React from 'react';
import styled from 'styled-components/native';
import Button from '../components/Button';

const Sign = ({ navigation }) => {
  return (
    <Container>
      <StyledText>Sign</StyledText>
      <Button title='Home' onPress={() => navigation.navigate('Home')} />
    </Container>
  );
};

export default Sign;

const Container = styled.View`
  align-items: center;
`;

const StyledText = styled.Text`
  font-size: 30px;
  margin: 10px;
`;
