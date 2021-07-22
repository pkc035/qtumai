import React from "react";
import { useHistory } from "react-router";
import styled from "styled-components";

export default function DetailYesNoModal({
  is_subscribe,
  isBoss,
  setIsOpenYesNoModal,
}) {
  const history = useHistory();

  console.log(is_subscribe, isBoss);
  return (
    <BlackBackground>
      {!is_subscribe && !isBoss ? (
        <YesNoModalBox>
          <Context>
            <div>구독 후 이용 가능한</div>
            <div>서비스 입니다.</div>
          </Context>
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
                history.push("/Business");
              }}
            >
              구독하기
            </SubscribeButton>
          </ButtonBox>
        </YesNoModalBox>
      ) : (
        <YesNoModalBox>
          <Context>
            <div>비즈니스계정을 통해</div>
            <div>다양한 혜택을 누르세요</div>
          </Context>
          <ButtonBox>
            <ReviewButton
              onClick={() => {
                setIsOpenYesNoModal(false);
              }}
            >
              취소
            </ReviewButton>
            <SubscribeButton
              onClick={() => {
                history.push("/Subscribe");
              }}
            >
              확인
            </SubscribeButton>
          </ButtonBox>
        </YesNoModalBox>
      )}
    </BlackBackground>
  );
}

const BlackBackground = styled.div`
  ${({ theme }) => theme.flexSet()}
  position: fixed;
  top: 0;
  height: 0;
  width: 100%;
  height: 100vh;
  background-color: #000000a1;
  z-index: 10;
`;

const YesNoModalBox = styled.div`
  ${({ theme }) => theme.flexSet("space-between", "flex-start", "column")}
  width: 70%;
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
  ${({ theme }) => theme.flexSet("center", "center")};
  width: 114px;
  height: 34px;
  color: white;
  font-weight: 500;
  font-size: 16px;
  border-radius: 5px;
  background-color: lightgray;
`;
const SubscribeButton = styled(ReviewButton)`
  background-color: ${({ theme }) => theme.red};
`;
