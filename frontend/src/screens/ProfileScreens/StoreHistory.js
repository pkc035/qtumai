// 리뷰작성 홈페이지
import React from "react";
import styled from "styled-components/native";
import { WebView } from "react-native-webview";
import { URI } from "../../config";

const StoreHistory = () => {
  return (
    <Container>
      <WebView source={{ uri: `${URI}/profile/storehistory` }} />
    </Container>
  );
};

export default StoreHistory;

const Container = styled.View`
  flex: 1;
`;
