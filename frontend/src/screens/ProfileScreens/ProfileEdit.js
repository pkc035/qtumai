import React from "react";
import styled from "styled-components/native";
import { WebView } from "react-native-webview";
import { URI } from "../../config";

const ProfileEdit = () => {
  return (
    <Container>
      <WebView source={{ uri: `${URI}/profile/profileedit` }} />
    </Container>
  );
};

export default ProfileEdit;

const Container = styled.View`
  flex: 1;
`;
