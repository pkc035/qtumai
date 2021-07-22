import React, { useState } from "react";
import styled from "styled-components";

export default function PlusPicList({ isPicPlusModal, setIsPicPlusModal }) {
  const [picListName, setPicListName] = useState("");
  const changePicList = e => {
    setPicListName(e.target.value);
  };

  console.log(picListName);
  return (
    <Container>
      <Box>
        <Title>Pic List 생성</Title>
        <PlusTitleInput
          onChange={e => setPicListName(e.target.value)}
          type="text"
        />
        <ButtonBox>
          <CloseButton onClick={() => setIsPicPlusModal(false)}>
            취소
          </CloseButton>
          <AcceptButton>확인</AcceptButton>
        </ButtonBox>
      </Box>
    </Container>
  );
}

const Container = styled.div`
  ${({ theme }) => theme.flexSet()};
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background-color: #000000a1;
  z-index: 100;
`;

const Box = styled.div`
  width: 70%;
  padding: 20px;
  border-radius: 5px;
  background-color: white;
`;

const Title = styled.div`
  font-weight: bold;
`;

const PlusTitleInput = styled.input.attrs({
  placeholder: "리스트 이름을 적어주세요.",
})`
  width: 100%;
  border: 0px;
  border-bottom: 1px solid #ff5000;
  margin: 20px 0;
`;
const ButtonBox = styled.div`
  ${({ theme }) => theme.flexSet("flex-end")};
`;
const CloseButton = styled.button`
  color: lightgray;
`;
const AcceptButton = styled.button`
  color: #ff5000;
`;
