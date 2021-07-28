import React from "react";
import styled from "styled-components/native";
import { WebView } from "react-native-webview";
import { URI } from "../../../config";

const BusinessPartnership = () => {
  return (
    <Container>
      <WebView
        source={{ uri: `${URI}/profile/viewmore/BusinessPartnership` }}
      />
    </Container>
  );
};

export default BusinessPartnership;

const Container = styled.View`
  flex: 1;
`;
