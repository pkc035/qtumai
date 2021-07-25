import React from "react";
import styled from "styled-components/native";
import { WebView } from "react-native-webview";
import { URI } from "../../config";

const BusinessApplication = () => {
  return (
    <Container>
      <WebView source={{ uri: `${URI}/profile/businessapplication` }} />
    </Container>
  );
};

export default BusinessApplication;

const Container = styled.View`
  flex: 1;
`;
