// 로드픽 소개
// 이용약관
// 사업제휴 문의
// 배지 설명

import React from "react";
import styled from "styled-components/native";
import Button from "../../components/Button";
import { WebView } from "react-native-webview";
import { URI } from "../../config";

const ViewMore = ({ navigation }) => {
  return (
    <Container>
      <Button
        title="로드픽 소개"
        onPress={() => navigation.navigate("Roadpick")}
      />
      <Button
        title="로드픽 서비스 이용약관"
        onPress={() => navigation.navigate("Terms")}
      />
      <Button
        title="배지설명"
        onPress={() => navigation.navigate("BadgeDescription")}
      />
      <Button
        title="사업제휴 문의"
        onPress={() => navigation.navigate("BusinessPartnership")}
      />
      <Button title="로그아웃" />
      <Button title="탈퇴하기" />
      <WebView source={{ uri: `${URI}/profile/viewmore` }} />
    </Container>
  );
};

export default ViewMore;

const Container = styled.View`
  flex: 1;
`;
