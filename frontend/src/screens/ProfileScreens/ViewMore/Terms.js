import React from "react";
import styled from "styled-components/native";
import { WebView } from "react-native-webview";
import { URI } from "../../../config";

const Terms = () => {
  return (
    <Container>
      <WebView source={{ uri: `${URI}/profile/viewmore/terms` }} />
    </Container>
  );
};

export default Terms;

const Container = styled.View`
  flex: 1;
`;
