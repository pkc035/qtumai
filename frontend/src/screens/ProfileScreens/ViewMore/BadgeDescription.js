import React from "react";
import styled from "styled-components/native";
import { WebView } from "react-native-webview";
import { URI } from "../../../config";

const BadgeDescription = () => {
  return (
    <Container>
      <WebView source={{ uri: `${URI}/profile/viewmore/badgedescription` }} />
    </Container>
  );
};

export default BadgeDescription;

const Container = styled.View`
  flex: 1;
`;
