import React from "react";
import styled from "styled-components";

function Profile() {
  return (
    <Content>
      <TitleWrap>
        <Title>프로필</Title>
      </TitleWrap>
      <ProfileWrap>
        <ProfileImage alt="profile" src="/images/Social/kakaotalk_logo.jpg" />
      </ProfileWrap>
      <Name>안녕안녕</Name>
    </Content>
  );
}

const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100vh;
  background-color: #fbfbfb;
`;

const TitleWrap = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
`;

const Title = styled.div`
  margin: 25px;
  font-weight: 700;
  font-size: 16px;
  color: #424242;
`;

const ProfileWrap = styled.div`
  position: relative;
  border-radius: 50%;
  width: 125px;
  height: 125px;
  overflow: hidden;
  background-color: #c1c1c1;
  /* display: flex;
  flex-direction: column;
  align-items: center; */
`;

const ProfileImage = styled.img`
  width: 100%;
  height: 100%;
  border-radius: 50%;
  border: 1px solid #ccc;
  object-fit: cover;
  /* width: 50%;
  border-radius: 50%; */
`;

const Name = styled.div`
  margin-top: 5%;
  font-weight: 700;
`;

export default Profile;
