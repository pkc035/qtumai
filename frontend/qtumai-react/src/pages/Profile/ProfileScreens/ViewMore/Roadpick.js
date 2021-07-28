import React from "react";
import styled from "styled-components";

function Roadpick() {
  return (
    <Content>
      <TitleWrap>
        <Title>로드픽소개</Title>
        <Introduce>
          로드픽 소개로드픽 소개로드픽 소개로드픽 소개로드픽 소개로드픽
          소개로드픽 소개로드픽 소개로드픽 소개로드픽 소개로드픽 소개로드픽
          소개로드픽 소개로드픽 소개로드픽 소개로드픽 소개로드픽 소개로드픽
          소개로드픽 소개로드픽 소개로드픽 소개로드픽 소개로드픽 소개로드픽
          소개로드픽 소개로드픽 소개로드픽 소개로드픽 소개로드픽 소개로드픽
          소개로드픽 소개로드픽 소개로드픽 소개로드픽 소개로드픽 소개
        </Introduce>
      </TitleWrap>
    </Content>
  );
}

export default Roadpick;

const Content = styled.div`
  width: 100vw;
  height: 100vh;
`;

const TitleWrap = styled.div`
  position: relative;
  display: flex;
  width: 100%;
  padding: 8% 5%;
  align-items: flex-start;
  flex-direction: column;
`;

const Title = styled.div`
  font-weight: 700;
`;

const Introduce = styled.div`
  margin-top: 3%;
`;
