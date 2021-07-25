import React from "react";
import styled from "styled-components";
import BottomButton from "../../../../components/BottomButton";

const DISCOUNT = [
  "5%",
  "10%",
  "15%",
  "20%",
  "25%",
  "30%",
  "35%",
  "40%",
  "45%",
  "50%",
  "55%",
  "60%",
  "65%",
  "70%",
  "75%",
];

function BenefitManagement() {
  return (
    <Content>
      <TitleWrap>
        <Title>할인 기간</Title>
        <LadioButton>00/00/00 ~ 00/00/00</LadioButton>
      </TitleWrap>
      <TitleWrap>
        <Title>할인율 설정</Title>
        <LadioButton>
          <LadioWrap>
            {DISCOUNT.map(item => {
              return (
                <option key={item} value={item}>
                  {item}
                </option>
              );
            })}
          </LadioWrap>
        </LadioButton>
      </TitleWrap>
      <BottomButton title={"설정하기"} />
    </Content>
  );
}

export default BenefitManagement;

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

const LadioButton = styled.div`
  display: flex;
  flex-direction: column;
  margin-right: 5%;
  color: #c1c1c1;
`;

const option = styled.label``;

const LadioWrap = styled.select``;
