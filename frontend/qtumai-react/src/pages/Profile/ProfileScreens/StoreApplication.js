import React from "react";
import styled from "styled-components";
import BottomButton from "../../../components/BottomButton";

function StoreApplication() {
  return (
    <Content>
      <TitleWrap>
        <div>매장 혜택 신청하기</div>
      </TitleWrap>
      <InputWrap>
        <Name>
          상호명
          <Input type="text" placeholder="팟 플레이스 이수점" />
        </Name>
        <Adress>
          주소
          <Input type="text" placeholder="팟 플레이스 이수점" />
        </Adress>
        <ContentInput type="text" placeholder="150자 내외로 입력해주세요" />
      </InputWrap>
      <BottomButton title={"신청하기"} />
    </Content>
  );
}

export default StoreApplication;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100vw;
  height: 100vh;
`;

const TitleWrap = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  width: 100%;
  padding: 8% 5%;
  font-weight: 700;
`;

const InputWrap = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 0% 8%;
`;

const Name = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 5%;
`;

const Adress = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 5%;
`;

const Input = styled.input`
  width: 70%;
  border: none;
  border-bottom: 1px solid #c1c1c1;

  &::placeholder {
    text-align: center;
  }
`;

const ContentInput = styled.textarea`
  margin-top: 5%;
  height: 30vh;
  border: 1px solid #c1c1c1;

  &::placeholder {
    padding: 10px;
  }
`;
