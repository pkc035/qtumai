import React from "react";
import { useHistory } from "react-router";
import styled from "styled-components";

export default function DetailModal({ is_subscribe, shop_name }) {
  console.log(is_subscribe, shop_name);
  const history = useHistory();
  return (
    <BlackBackground>
      <ModalBox>
        <Context>
          <RestaurantName>{shop_name}</RestaurantName>
          {is_subscribe && (
            <div>
              <Discount>전체 금액의 % 할인</Discount>
              <DiscountDetail>- 1일 1회 사용 가능합니다.</DiscountDetail>
              <DiscountDetail>- 매일 오전 6시 리셋됩니다.</DiscountDetail>
              <DiscountDetail>
                - 방문 시 해당 가맹점인지 확인해 주세요.
              </DiscountDetail>
              <DiscountDetail>
                - 해당 가맹점 직원분이 확인 후 눌려야 혜택이 적용됩니다.
              </DiscountDetail>
              <DiscountDetail>
                - 혜택이 상이하니 계산 시 꼭 확인해 주세요
              </DiscountDetail>
              <DiscountDetail>- 사용 즉시 매장에 알림이 갑니다.</DiscountDetail>
            </div>
          )}
        </Context>
        <SubmitButton onClick={() => history.push("/Review")}>
          {is_subscribe ? "직원분이 눌러주세요" : "방문체크하기"}
        </SubmitButton>
      </ModalBox>
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

const ModalBox = styled.div`
  ${({ theme }) => theme.flexSet("space-between", "flex-start", "column")}
  width: 90%;
  /* height: 100%; */
  border-radius: 5px;
  background-color: #ffffff;
  z-index: 1000;
`;
const RestaurantName = styled.div`
  margin: 20px 14px;
  font-size: 24px;
  font-weight: bold;
  color: black;
`;
const Context = styled.div`
  ${({ theme }) => theme.flexSet("flex-start", "flex-start", "column")}
  font-size: 14px;
  color: black;
  margin-bottom: 20px;
`;
const DiscountDetail = styled.div`
  text-align: left;
  padding: 2px 0px 2px 20px;
`;
const Discount = styled(DiscountDetail)`
  font-size: 20px;
  font-weight: 700;
`;
const SubmitButton = styled.button`
  width: 100%;
  padding: 20px 0 16px;
  border-radius: 0px 0px 5px 5px;
  font-size: 18px;
  color: white;
  background-color: ${({ theme }) => theme.red};
`;
