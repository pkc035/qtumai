import React from "react";
import { TouchableOpacity } from "react-native";
import styled from "styled-components/native";

const Container = styled.View`
  background-color: #fff;
  width: 100%;
  padding: 15px 15px 15px 30px;
`;

const Title = styled.Text`
  font-size: 20px;
  color: #101010;
`;

const Button = ({ title, onPress, style }) => {
  return (
    <TouchableOpacity onPress={onPress} style={{ style }}>
      <Container>
        <Title>{title}</Title>
      </Container>
    </TouchableOpacity>
  );
};

export default Button;
