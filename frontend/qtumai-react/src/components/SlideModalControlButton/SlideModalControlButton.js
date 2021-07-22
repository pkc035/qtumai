import React from "react";
import styled from "styled-components";

export default function SlideModalControlButton({ setIsSlideModal }) {
  const submitModifyList = () => {
    // fetch("", {
    //   method: "POST"
    // },{
    //   body:{}
    // })
    //   .then(res => res.json())
    //   .then(data => console.log(data));
  };

  return (
    <ControlButtonBox>
      <CloseButton
        onClick={() => {
          setIsSlideModal(false);
        }}
      >
        닫기
      </CloseButton>
      <AcceptButton onClick={() => submitModifyList()}>확인</AcceptButton>
    </ControlButtonBox>
  );
}

const ControlButtonBox = styled.button`
  ${({ theme }) => theme.flexSet("space-around")};
  width: 100%;
  font-size: 18px;
  font-weight: 500;
  border-top: 1px solid lightgray;
`;

const CloseButton = styled.button`
  width: 50%;
  height: 100%;
  border-right: 1px solid lightgray;
  padding: 20px 0 26px;
  cursor: pointer;
`;
const AcceptButton = styled(CloseButton)`
  border-right: 0px;
`;
