// 혜택 관리(할인율 설정)
// 고객군 분석
// 배지 관리

import React from "react";
import styled from "styled-components/native";
import { WebView } from "react-native-webview";
import Button from "../../components/Button";
import { URI } from "../../config";

const BusinessManagement = ({ navigation }) => {
  return (
    <Container>
      <Button
        title="배지 관리"
        onPress={() => navigation.navigate("BadgeManagement")}
      />
      <Button
        title="혜택 관리"
        onPress={() => navigation.navigate("BenefitManagement")}
      />
      <Button
        title="고객군 분석"
        onPress={() => navigation.navigate("CustomerAnalysis")}
      />
      <Button
        title="비즈니스 수정"
        onPress={() => navigation.navigate("BusinessEdit")}
      />
      <WebView source={{ uri: `${URI}/profile/businessmanagement` }} />
    </Container>
  );
};

export default BusinessManagement;

const Container = styled.View`
  flex: 1;
`;

const StyledText = styled.Text`
  font-size: 30px;
  margin: 10px;
`;
