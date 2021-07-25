import React from "react";
import styled from "styled-components/native";
import Who from "./Who";
import Where from "./Where";
import BusinessApplication from "./ProfileScreens/BusinessApplication";
import BusinessManagement from "./ProfileScreens/BusinessManagement";
import NotificationSetting from "./ProfileScreens/NotificationSetting";
import ProfileEdit from "./ProfileScreens/ProfileEdit";
import ServiceCenter from "./ProfileScreens/ServiceCenter";
import StoreApplication from "./ProfileScreens/StoreApplication";
import StoreHistory from "./ProfileScreens/StoreHistory";
import Subscription from "./ProfileScreens/Subscription";
import ViewMore from "./ProfileScreens/ViewMore";
import BadgeDescription from "./ProfileScreens/ViewMore/BadgeDescription";
import BusinessPartnership from "./ProfileScreens/ViewMore/BusinessPartnership";
import Roadpick from "./ProfileScreens/ViewMore/Roadpick";
import Terms from "./ProfileScreens/ViewMore/Terms";
import BadgeManagement from "./ProfileScreens/BusinessManagement/BadgeManagement";
import BenefitManagement from "./ProfileScreens/BusinessManagement/BenefitManagement";
import CustomerAnalysis from "./ProfileScreens/BusinessManagement/CustomerAnalysis";
import { MainNavigator } from "./TabScreens";
import { createStackNavigator } from "@react-navigation/stack";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { MaterialIcons } from "@expo/vector-icons";

const Stack = createStackNavigator();

const Home = () => {
  const insets = useSafeAreaInsets();
  return (
    <Stack.Navigator
      screenOptions={{
        cardStyle: { backgroundColor: "#ffffff" },
        headerTitleStyle: {
          fontSize: 24,
          color: "black",
        },
        headerTitleAlign: "center",
        headerBackTitleVisible: false,
        headerBackImage: () => {
          return (
            <MaterialIcons
              name="keyboard-backspace"
              size={26}
              style={{ marginLeft: 10 }}
            />
          );
        },
      }}
    >
      <Stack.Screen
        name="MainNavigator"
        component={MainNavigator}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Who"
        component={Who}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Where"
        component={Where}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="BusinessApplication"
        component={BusinessApplication}
        options={{ headerTitle: "비지니스 신청하기" }}
      />
      <Stack.Screen
        name="BusinessManagement"
        component={BusinessManagement}
        options={{ headerTitle: "비지니스 관리" }}
      />
      <Stack.Screen
        name="NotificationSetting"
        component={NotificationSetting}
        options={{ headerTitle: "알림 설정" }}
      />
      <Stack.Screen
        name="ProfileEdit"
        component={ProfileEdit}
        options={{ headerTitle: "프로필 편집" }}
      />
      <Stack.Screen
        name="ServiceCenter"
        component={ServiceCenter}
        options={{ headerTitle: "자주 묻는 질문 (FAQ)" }}
      />
      <Stack.Screen
        name="StoreApplication"
        component={StoreApplication}
        options={{ headerTitle: "맛집신청" }}
      />
      <Stack.Screen
        name="StoreHistory"
        component={StoreHistory}
        options={{ headerTitle: "내 맛집 방문기록" }}
      />
      <Stack.Screen
        name="Subscription"
        component={Subscription}
        options={{ headerTitle: "구독관리" }}
      />
      <Stack.Screen
        name="ViewMore"
        component={ViewMore}
        options={{ headerTitle: "더보기" }}
      />
      <Stack.Screen
        name="BadgeDescription"
        component={BadgeDescription}
        options={{ headerTitle: "배지 설명" }}
      />
      <Stack.Screen
        name="BusinessPartnership"
        component={BusinessPartnership}
        options={{ headerTitle: "사업제휴 문의" }}
      />
      <Stack.Screen
        name="Roadpick"
        component={Roadpick}
        options={{ headerTitle: "로드픽 소개" }}
      />
      <Stack.Screen
        name="Terms"
        component={Terms}
        options={{ headerTitle: "이용약관" }}
      />
      <Stack.Screen
        name="BadgeManagement"
        component={BadgeManagement}
        options={{ headerTitle: "배지 관리" }}
      />
      <Stack.Screen
        name="BenefitManagement"
        component={BenefitManagement}
        options={{ headerTitle: "혜택 관리" }}
      />
      <Stack.Screen
        name="CustomerAnalysis"
        component={CustomerAnalysis}
        options={{ headerTitle: "고객군 분석" }}
      />
    </Stack.Navigator>
  );
};

export default Home;

const Container = styled.View`
  align-items: center;
  padding-top: ${({ insets: { top } }) => top}px;
  padding-bottom: ${({ insets: { bottom } }) => bottom}px;
  padding-right: ${({ insets: { right } }) => right}px;
  padding-left: ${({ insets: { left } }) => left}px;
`;

const StyledText = styled.Text`
  font-size: 30px;
  margin: 10px;
`;
