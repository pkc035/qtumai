import React from "react";
import styled from "styled-components";

function Terms() {
  return (
    <Content>
      <TitleWrap>
        <Title>서비스 이용약관</Title>
        <TermsContents>
          로드픽 소개로드픽 소개로드픽 소개로드픽 소개로드픽 소개로드픽
          소개로드픽 소개로드픽 소개로드픽 소개로드픽 소개로드픽 소개로드픽
          소개로드픽 소개로드픽 소개로드픽 소개로드픽 소개로드픽 소개로드픽
          소개로드픽 소개로드픽 소개로드픽 소개로드픽 소개로드픽 소개로드픽
          소개로드픽 소개로드픽 소개로드픽 소개로드픽 소개로드픽 소개로드픽
          소개로드픽 소개로드픽 소개로드픽 소개로드픽 소개로드픽 소개
        </TermsContents>
        <Title>개인정보 취급 방침</Title>
        <TermsContents>
          로드픽 소개로드픽 소개로드픽 소개로드픽 소개로드픽 소개로드픽
          소개로드픽 소개로드픽 소개로드픽 소개로드픽 소개로드픽 소개로드픽
          소개로드픽 소개로드픽 소개로드픽 소개로드픽 소개로드픽 소개로드픽
          소개로드픽 소개로드픽 소개로드픽 소개로드픽 소개로드픽 소개로드픽
          소개로드픽 소개로드픽 소개로드픽 소개로드픽 소개로드픽 소개로드픽
          소개로드픽 소개로드픽 소개로드픽 소개로드픽 소개로드픽 소개
        </TermsContents>
        <Title>위치정보 이용약관</Title>
        <TermsContents>
          로드픽 소개로드픽 소개로드픽 소개로드픽 소개로드픽 소개로드픽
          소개로드픽 소개로드픽 소개로드픽 소개로드픽 소개로드픽 소개로드픽
          소개로드픽 소개로드픽 소개로드픽 소개로드픽 소개로드픽 소개로드픽
          소개로드픽 소개로드픽 소개로드픽 소개로드픽 소개로드픽 소개로드픽
          소개로드픽 소개로드픽 소개로드픽 소개로드픽 소개로드픽 소개로드픽
          소개로드픽 소개로드픽 소개로드픽 소개로드픽 소개로드픽 소개
        </TermsContents>
      </TitleWrap>
    </Content>
  );
}

export default Terms;

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
  font-size: 20px;
  font-weight: 700;
`;

const TermsContents = styled.div`
  margin: 3% 0% 10%;
  color: #c1c1c1;
`;
