import React from "react";
import styled from "styled-components/native";
import { WebView } from "react-native-webview";
import { URI } from "../../../config";

const CustomerAnalysis = () => {
  return (
    <Container>
      <WebView
        source={{ uri: `${URI}/profile/businessmanagement/customeranalysis` }}
      />
    </Container>
  );
};

export default CustomerAnalysis;

const Container = styled.View`
  flex: 1;
`;
