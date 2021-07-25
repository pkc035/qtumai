import React from "react";
import styled from "styled-components";
import BottomButton from "../../../components/BottomButton";

function ProfileEdit() {
  return (
    <Content>
      <ProfileWrap>
        <ProfileImage alt="profile" src="/images/Social/kakaotalk_logo.jpg" />
        <EditProfile alt="profile" src="/images/Social/facebook_logo.jpg" />
      </ProfileWrap>
      <InputWrap>
        <Name>이름</Name>
        <Info>
          <Gender>성별</Gender>
          <Birth>생년월일</Birth>
        </Info>
        <PhoneNumber>휴대폰번호</PhoneNumber>
        <Adress>
          사는곳<Edit>수정</Edit>
        </Adress>
      </InputWrap>
      <BottomButton title={"편집완료"} />
    </Content>
  );
}

export default ProfileEdit;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100vw;
  height: 100vh;
`;

const ProfileWrap = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 5%;
`;

const InputWrap = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const ProfileImage = styled.img`
  width: 50%;
  border-radius: 50%;
  border: 1px solid #ccc;
`;

const EditProfile = styled.img`
  position: absolute;
  width: 20%;
  border: 1px solid #ccc;
  border-radius: 50%;
  transform: translate(80%, 160%);
`;

const Name = styled.div`
  margin: 5% 5% 0% 5%;
  padding-bottom: 3%;
  border-bottom: 1px solid #ccc;
`;

const Gender = styled.div`
  margin: 5% 5% 5% 5%;
  width: 50%;
  padding-bottom: 3%;
  border-bottom: 1px solid #ccc;
`;

const Birth = styled.div`
  margin: 5% 5% 5% 5%;
  width: 50%;
  padding-bottom: 3%;
  border-bottom: 1px solid #ccc;
`;

const PhoneNumber = styled.div`
  margin: 5% 5% 0% 5%;
  padding-bottom: 3%;
  border-bottom: 1px solid #ccc;
`;

const Adress = styled.div`
  position: relative;
  margin: 5% 5% 0% 5%;
  padding-bottom: 3%;
  border-bottom: 1px solid #ccc;
`;

const Info = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Edit = styled.div`
  position: absolute;
  right: 0;
`;
