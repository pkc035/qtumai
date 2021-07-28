import React from "react";
import styled from "styled-components";

function BadgeDescription() {
  return (
    <Content>
      <TitleWrap>
        <div>소비자 배지</div>
        <ImageWrap>
          <Imgae alt="roadpick" src="/images/Profile/1.png" />
          <Imgae alt="roadpick" src="/images/Profile/2.png" />
          <Imgae alt="roadpick" src="/images/Profile/3.png" />
          <Imgae alt="roadpick" src="/images/Profile/4.png" />
        </ImageWrap>
      </TitleWrap>
      <TitleWrap>
        <div>가맹점 배지</div>
        <ImageWrap>
          <Imgae alt="roadpick" src="/images/Profile/1.png" />
          <Imgae alt="roadpick" src="/images/Profile/2.png" />
          <Imgae alt="roadpick" src="/images/Profile/3.png" />
          <Imgae alt="roadpick" src="/images/Profile/4.png" />
        </ImageWrap>
      </TitleWrap>
    </Content>
  );
}

export default BadgeDescription;

const Content = styled.div`
  width: 100vw;
  height: 100vh;
`;

const TitleWrap = styled.div`
  position: relative;
  display: flex;
  width: 100%;
  padding: 8% 5%;
  font-weight: 700;
  align-items: flex-start;
  flex-direction: column;
`;

const ImageWrap = styled.div`
  display: flex;
  margin-top: 5%;
  flex-wrap: wrap;
  justify-content: center;
  align-content: center;
  align-items: center;
`;

const Imgae = styled.img`
  width: 35%;
  height: 35%;
  margin: 5%;
`;
