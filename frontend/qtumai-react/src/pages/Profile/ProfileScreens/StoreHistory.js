import React, { useEffect } from "react";
import styled from "styled-components";
import BottomButton from "../../../components/BottomButton";

function StoreHistory() {
  useEffect(() => {
    fetch("/data/profileShopVisit.json", {
      method: "get",
      headers: {
        "Content-Type": "application/json; charset=utf8",
      },
    })
      .then(res => res.json())
      .then(data => {
        console.log(data);
      });
  }, []);

  return (
    <Content>
      <TitleWrap>
        <div>내가 받은 이번달 혜택 횟수는?</div>
        <Count>7회</Count>
      </TitleWrap>
      <StoreWrap>
        12월 2일
        <Store>
          <Image />
          <StoreTitleWrap>
            <StoreTitle>팟 플레이스 이수점</StoreTitle>
            <StoreTitleSubTitle>분위기 좋은 파스타 맛집</StoreTitleSubTitle>
          </StoreTitleWrap>
        </Store>
        <Store>
          <Image />
          <StoreTitleWrap>
            <StoreTitle>팟 플레이스 이수점</StoreTitle>
            <StoreTitleSubTitle>분위기 좋은 파스타 맛집</StoreTitleSubTitle>
          </StoreTitleWrap>
        </Store>
      </StoreWrap>
      <StoreWrap>
        12월 2일
        <Store>
          <Image />
          <StoreTitleWrap>
            <StoreTitle>팟 플레이스 이수점</StoreTitle>
            <StoreTitleSubTitle>분위기 좋은 파스타 맛집</StoreTitleSubTitle>
          </StoreTitleWrap>
        </Store>
        <Store>
          <Image />
          <StoreTitleWrap>
            <StoreTitle>팟 플레이스 이수점</StoreTitle>
            <StoreTitleSubTitle>분위기 좋은 파스타 맛집</StoreTitleSubTitle>
          </StoreTitleWrap>
        </Store>
      </StoreWrap>
      <BottomButton title={"편집완료"} />
    </Content>
  );
}

export default StoreHistory;

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
  justify-content: space-between;
  width: 100%;
  padding: 8% 5%;
  border-bottom: 1px solid #c1c1c1;
  font-weight: 700;
`;

const Count = styled.div`
  color: #ff3000;
`;

const StoreWrap = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;
  padding: 7% 5% 0 5%;
`;

const Store = styled.div`
  display: flex;
  position: relative;
  width: 100%;
  border: 1px solid #c1c1c1;
  padding: 3%;
  margin-top: 10px;
`;

const Image = styled.div`
  position: relative;
  width: 30%;
  height: 10vh;
  padding: 10%;
  border-radius: 5%;
  background-color: #c1c1c1;
`;

const StoreTitleWrap = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 5%;
`;

const StoreTitle = styled.div`
  /* font-size: 16px; */
`;

const StoreTitleSubTitle = styled.div`
  margin-top: 5%;
  font-size: 10px;
`;
