import React from "react";
import styled from "styled-components/native";
import { WebView } from "react-native-webview";
import Button from "../components/Button";
import { URI } from "../config";

const Profile = ({ navigation }) => {
  return (
    <Container>
      <Editbutton onPress={() => navigation.navigate("ProfileEdit")}>
        <Title>편집</Title>
      </Editbutton>
      <WebView source={{ uri: `${URI}/profile` }} />
      <Button
        title="내 맛집 방문기록"
        onPress={() => navigation.navigate("StoreHistory")}
      />
      <Button
        title="알림설정"
        onPress={() => navigation.navigate("NotificationSetting")}
      />
      <Button
        title="FAQ"
        onPress={() => navigation.navigate("ServiceCenter")}
      />
      <Button
        title="맛집신청"
        onPress={() => navigation.navigate("StoreApplication")}
      />
      <Button
        title="구독관리"
        onPress={() => navigation.navigate("Subscription")}
      />
      <Button
        title="비지니스 신청하기"
        onPress={() => navigation.navigate("BusinessApplication")}
      />
      <Button
        title="비지니스 관리"
        onPress={() => navigation.navigate("BusinessManagement")}
      />
      <Button title="더보기" onPress={() => navigation.navigate("ViewMore")} />
    </Container>
  );
};

export default Profile;

const Container = styled.View`
  flex: 1;
`;

const Editbutton = styled.TouchableOpacity`
  position: absolute;
  padding: 25px;
  right: 0;
  top: 0;
  z-index: 1000;
`;

const Title = styled.Text`
  font-size: 16px;
  font-weight: 700;
  color: #ff3000;
`;
