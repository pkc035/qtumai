import React from "react";
import styled from "styled-components/native";
import { WebView } from "react-native-webview";
import { URI } from "../../../config";

const BenefitManagement = () => {
  return (
    <Container>
      <WebView
        source={{ uri: `${URI}/profile/businessmanagement/benefitmanagement` }}
      />
    </Container>
  );
};

export default BenefitManagement;

const Container = styled.View`
  flex: 1;
`;
