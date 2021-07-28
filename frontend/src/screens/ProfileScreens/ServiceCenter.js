import React from "react";
import styled from "styled-components/native";
import { WebView } from "react-native-webview";
import { URI } from "../../config";

const ServiceCenter = () => {
  return (
    <Container>
      <WebView source={{ uri: `${URI}/profile/servicecenter` }} />
    </Container>
  );
};

export default ServiceCenter;

const Container = styled.View`
  flex: 1;
`;
