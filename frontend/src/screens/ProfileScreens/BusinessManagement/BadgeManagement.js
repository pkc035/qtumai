import React from "react";
import styled from "styled-components/native";
import { WebView } from "react-native-webview";
import { URI } from "../../../config";

const BadgeManagement = () => {
  return (
    <Container>
      <WebView
        source={{ uri: `${URI}/profile/businessmanagement/badgemanagement` }}
      />
    </Container>
  );
};

export default BadgeManagement;

const Container = styled.View`
  flex: 1;
`;
