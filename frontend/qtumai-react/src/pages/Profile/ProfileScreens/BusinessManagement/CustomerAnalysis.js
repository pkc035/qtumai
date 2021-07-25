import React from "react";
import styled from "styled-components";
import BottomButton from "../../../../components/BottomButton";

function CustomerAnalysis() {
  return (
    <Content>
      <TitleWrap>
        <Title>매장 앞 고객</Title>
        <SubTitle>C,A,G + 세그먼트</SubTitle>
      </TitleWrap>
      <TitleWrap>
        <Title>방문 고객</Title>
        <SubTitle>C,A,G + 세그먼트</SubTitle>
      </TitleWrap>
      <TitleWrap>
        <Title>잠재 고객</Title>
        <SubTitle>C,A,G + 세그먼트</SubTitle>
      </TitleWrap>
      <BottomButton title={"설정하기"} />
    </Content>
  );
}

export default CustomerAnalysis;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100vw;
  height: 100vh;
`;

const TitleWrap = styled.div`
  display: flex;
  margin-top: 10%;
  width: 100%;
  justify-content: space-between;
`;

const Title = styled.div`
  margin-left: 5%;
`;

const SubTitle = styled.div`
  margin-right: 5%;
  color: #c1c1c1;
`;
