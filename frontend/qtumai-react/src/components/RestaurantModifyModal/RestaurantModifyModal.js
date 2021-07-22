import React, { useState } from "react";
import SlideModalControlButton from "../SlideModalControlButton/SlideModalControlButton";
import styled, { keyframes } from "styled-components";

export default function RestaurantModify({ isSlideModal, setIsSlideModal }) {
  const [etcValue, setEtcValue] = useState("");
  const [close, setClose] = useState(false);
  const [operatingTime, setOperatingTime] = useState(false);
  const [diffrentAddress, setDiffrentAddress] = useState(false);
  const [noBenefit, setNoBenefit] = useState(false);
  const [style, setStyle] = useState([false, false, false, false]);

  console.log(etcValue);

  const hadleModifyList = (e, idx) => {
    let selectStyle = [...style];
    selectStyle[idx] = !selectStyle[idx];
    setStyle(selectStyle);

    if (idx === 0) {
      setClose(!close);
    } else if (idx === 1) {
      setOperatingTime(!operatingTime);
    } else if (idx === 2) {
      setDiffrentAddress(!diffrentAddress);
    } else if (idx === 3) {
      setNoBenefit(!noBenefit);
    }
  };

  const changeEtcText = e => {
    setEtcValue(e.target.value);
  };

  return (
    <Container>
      <Title>가게정보 수정</Title>
      <ListBox>
        {MODIFY_LIST.map((list, idx) => {
          return (
            <List
              key={list.id}
              id={list.id}
              onClick={e => hadleModifyList(e, idx)}
              isSlideModal={isSlideModal}
            >
              <Text fontStyle={style[idx]}>{list.title}</Text>
              <CheckIcon
                src={style[idx] ? "/images/fillCheck.svg" : "/images/Check.svg"}
                alt="checkImage"
              />
            </List>
          );
        })}
        <EtcList>
          <div>기타</div>
          <EtcText onChange={e => changeEtcText(e)} />
        </EtcList>
      </ListBox>
      <SlideModalControlButton setIsSlideModal={setIsSlideModal} />
    </Container>
  );
}

const containerSlide = keyframes`
  0% {
    bottom: -70%;
  }
  50% {
    bottom: -30%;
  }
  100% {
    bottom: 0;
  }
`;

const Container = styled.div`
  ${({ theme }) => theme.flexSet("center", "center", "column")};
  position: fixed;
  bottom: 0;
  animation: ${containerSlide} 0.8s linear;
  right: 0;
  width: 100%;
  border-radius: 5px 5px 0 0;
  background-color: white;
  z-index: 100;
`;

const Title = styled.div`
  margin-bottom: 20px;
  font-size: 16px;
  margin: 14px 0;
`;

const ListBox = styled.ul`
  width: 90%;
`;

const List = styled.li`
  ${({ theme }) => theme.flexSet("space-between", "center")};
`;

const Text = styled.div`
  font-weight: 500;
  padding: 20px 0;
  color: ${({ fontStyle }) => (fontStyle ? "#ff5000" : "black")};
`;

const CheckIcon = styled.img`
  width: 22px;
  height: 20px;
`;

const EtcList = styled(List)`
  ${({ theme }) => theme.flexSet("center", "flex-start", "column")};
`;

const EtcText = styled.input.attrs({
  type: "text",
  placeholder: "내용을 입력해 주세요",
})`
  width: 100%;
  border: 0px;
  padding-top: 10px;
  margin-bottom: 30px;
  border-bottom: 1px solid lightgray;
`;

const MODIFY_LIST = [
  { id: 1, title: "폐업 했음" },
  { id: 2, title: "운영시간 다름" },
  { id: 3, title: "주소 다름" },
  { id: 4, title: "혜택 적용 불가" },
];
