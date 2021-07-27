import React, { useState } from "react";
import styled from "styled-components";
import BottomButton from "../../../../components/BottomButton";

function BusinessPartnership() {
  const [shopName, setShopName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [name, setName] = useState("");
  const [content, setContent] = useState("");

  function contactStore() {
    fetch("http://192.168.0.68:8000/propose/business/", {
      method: "POST",
      body: JSON.stringify({
        shop_name: shopName,
        phone_number: phoneNumber,
        manager_name: name,
        content: content,
      }),
    })
      .then(res => res.json())
      .then(res => {
        console.log(res);
        // localStorage.setItem("access", res.access);
        // localStorage.setItem("refresh", res.refresh);
      });
  }

  return (
    <Content>
      <TitleWrap>
        <div>매장 혜택 신청하기</div>
      </TitleWrap>
      <InputWrap>
        <Name>
          상호명
          <Input
            type="text"
            placeholder="팟 플레이스 이수점"
            onChange={e => setShopName(e.target.value)}
          />
        </Name>
        <PhoneNumber>
          연락처
          <Input
            type="text"
            placeholder="010.0000.0000"
            onChange={e => setPhoneNumber(e.target.value)}
          />
        </PhoneNumber>
        <PhoneNumber>
          담당자
          <Input
            type="text"
            placeholder="홍길동"
            onChange={e => setName(e.target.value)}
          />
        </PhoneNumber>
        <ContentInput
          type="text"
          placeholder="150자 내외로 입력해주세요"
          onChange={e => setContent(e.target.value)}
        />
      </InputWrap>
      <BottomButton onClick={contactStore} title={"문의하기"} />
    </Content>
  );
}

export default BusinessPartnership;

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

const PhoneNumber = styled.div`
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
