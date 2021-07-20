import React from "react";
import { useHistory } from "react-router";
import styled from "styled-components";

export default function DetailYesNoModal({ is_subscribe }) {
  const history = useHistory();
  return (
    <BlackBackground>
      <YesNoModalBox>
        {!is_subscribe ? (
          <Context>
            <div>구독 후 이용 가능한</div>
            <div>서비스 입니다.</div>
          </Context>
        ) : (
          <Context>
            <div>구독 후 이용 가능한</div>
            <div>서비스 입니다.</div>
          </Context>
        )}
        <ButtonBox>
          <ReviewButton
            onClick={() => {
              history.push("/Review");
            }}
          >
            다음에 하기
          </ReviewButton>
          <SubscribeButton
            onClick={() => {
              history.push("/Subscribe");
            }}
          >
            구독하기
          </SubscribeButton>
        </ButtonBox>
      </YesNoModalBox>
    </BlackBackground>
  );
}

const BlackBackground = styled.div`
  ${({ theme }) => theme.flexSet()}
  position: absolute;
  top: -92vh;
  height: 0;
  width: 100%;
  height: 101vh;
  background-color: #000000a1;
  z-index: 2;
`;
const YesNoModalBox = styled.div`
  ${({ theme }) => theme.flexSet("space-between", "flex-start", "column")}
  width: 65%;
  padding: 20px;
  border-radius: 5px;
  background-color: #ffffff;
  z-index: 1000;
`;

const Context = styled.div`
  ${({ theme }) => theme.flexSet("center", "center", "column")}
  width: 100%;
  margin: 0 0 30px 0;

  div {
    font-size: 22px;
    font-weight: 600;
    color: black;
  }
`;

const ButtonBox = styled.div`
  ${({ theme }) => theme.flexSet("space-between")}
  width: 100%;
`;
const ReviewButton = styled.button`
  width: 124px;
  height: 34px;
  color: white;
  font-weight: 500;
  font-size: 18px;
  border-radius: 5px;
  background-color: lightgray;
`;
const SubscribeButton = styled(ReviewButton)`
  background-color: ${({ theme }) => theme.red};
`;
