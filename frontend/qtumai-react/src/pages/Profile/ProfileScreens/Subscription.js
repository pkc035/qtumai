import React from "react";
import styled from "styled-components";

function Subscription() {
  return (
    <Content>
      <TitleWrap>
        <div>
          <Name>김럭켓</Name>님은 구독기간은 <Month>10월</Month>까지 무료입니다
        </div>
      </TitleWrap>
    </Content>
  );
}

export default Subscription;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100vw;
  height: 100vh;
`;

const TitleWrap = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  padding: 8% 5%;
`;

const Name = styled.span`
  font-weight: 700;
`;

const Month = styled.span`
  color: #ff3000;
  font-weight: 700;
`;
