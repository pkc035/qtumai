import React from "react";
import styled from "styled-components/native";
import { WebView } from "react-native-webview";
import { URI } from "../../../config";

const BusinessEdit = ({ navigation }) => {
  return (
    <Container>
      <WebView
        source={{ uri: `${URI}/profile/businessmanagement/businessedit` }}
        onMessage={(event) =>
          event.nativeEvent.data === "Success!"
            ? navigation.navigate("Profile")
            : null
        }
      />
    </Container>
  );
};

export default BusinessEdit;

const Container = styled.View`
  flex: 1;
`;
