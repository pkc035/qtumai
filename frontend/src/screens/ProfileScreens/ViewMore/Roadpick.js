import React from "react";
import styled from "styled-components/native";
import { WebView } from "react-native-webview";
import { URI } from "../../../config";

const Roadpick = () => {
  return (
    <Container>
      <WebView source={{ uri: `${URI}/profile/viewmore/roadpick` }} />
    </Container>
  );
};

export default Roadpick;

const Container = styled.View`
  flex: 1;
`;
