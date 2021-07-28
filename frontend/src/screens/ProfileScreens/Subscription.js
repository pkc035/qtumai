import React from "react";
import styled from "styled-components/native";
import { WebView } from "react-native-webview";
import { URI } from "../../config";

const Subscription = () => {
  return (
    <Container>
      <WebView source={{ uri: `${URI}/profile/subscription` }} />
    </Container>
  );
};

export default Subscription;

const Container = styled.View`
  flex: 1;
`;
