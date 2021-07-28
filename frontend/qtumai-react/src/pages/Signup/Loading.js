import React from "react";
import styled, { keyframes } from "styled-components";

function Loading() {
  return (
    <LoadingWrap>
      <LoadingCircle>
        <CirCle cx="50%" cy="50%" r="25"></CirCle>
      </LoadingCircle>
      <TitleWrap>분석중입니다.</TitleWrap>
      <TitleWrap>10분정도 소요 됩니다!</TitleWrap>
      <TitleWrap>알림으로 알려드릴게요.</TitleWrap>
    </LoadingWrap>
  );
}

export default Loading;

const loadingSpin = keyframes`
  100% { transform: rotate(360deg);}
`;

const loadingCircleAni = keyframes`
  0% { stroke-dashoffset: 157; }
  75% { stroke-dashoffset: -147; }
  100% { stroke-dashoffset: -157; }
`;

const LoadingWrap = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 100;
  background: #ff3000;
  transition: 0.5s;
  opacity: 1;
`;

const LoadingCircle = styled.svg`
  width: 54px;
  height: 54px;
  animation: ${loadingSpin} 1s infinite;
  margin-bottom: 20px;
`;

const CirCle = styled.circle`
  stroke: #fff;
  stroke-width: 4;
  stroke-dasharray: 157;
  stroke-dashoffset: 0;
  fill: transparent;
  animation: ${loadingCircleAni} 1s infinite;
`;

const TitleWrap = styled.div`
  position: relative;
  margin-top: 15px;
  color: #fff;
  font-size: 18px;
`;
