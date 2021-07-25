import React from "react";
import styled from "styled-components/native";
import { WebView } from "react-native-webview";
import { URI } from "../../config";

const NotificationSetting = () => {
  return (
    <Container>
      <WebView source={{ uri: `${URI}/profile/notificationsetting` }} />
    </Container>
  );
};

export default NotificationSetting;

const Container = styled.View`
  flex: 1;
`;
