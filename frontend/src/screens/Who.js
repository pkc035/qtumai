import React from 'react';
import styled from 'styled-components/native';
import Button from '../components/Button';

const Who = ({ navigation }) => {
  return (
    <Container>
      <StyledText>Who</StyledText>
      <Button title='whoPop' onPress={() => navigation.pop()} />
    </Container>
  );
};

export default Who;

const Container = styled.View`
  align-items: center;
`;

const StyledText = styled.Text`
  font-size: 30px;
  margin: 10px;
`;
