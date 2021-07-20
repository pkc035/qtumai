import React, { useState } from "react";
import SlideModalControlButton from "../SlideModalControlButton/SlideModalControlButton";
import styled, { keyframes } from "styled-components";

export default function FilterModal({ isFilter, setIsFilter }) {
  const [style, setStyle] = useState([false, false]);
  const [selectId, setSelectId] = useState(0);

  const hadleModifyList = (e, idx) => {
    let selectStyle = [...style];
    selectStyle[idx] = !selectStyle[idx];
    setStyle(selectStyle);
  };

  const selectPersentage = (id, persentage) => {
    setSelectId(id);
  };

  const submitList = () => {
    console.log("good");
  };

  return (
    <BlackBackground>
      <Container>
        <Title>필터</Title>
        <ListBox>
          {FILTER_LIST.map((list, idx) => {
            return (
              <List
                key={list.id}
                id={list.id}
                onClick={e => hadleModifyList(e, idx)}
              >
                <Text fontStyle={style[idx]}>{list.title}</Text>
                <CheckIcon
                  src={
                    style[idx] ? "/images/fillCheck.svg" : "/images/Check.svg"
                  }
                  alt="checkImage"
                />
              </List>
            );
          })}
          <MatchingSetting>
            <div>나와의 매칭율 설정</div>
            <MatchingBox>
              {PERSENTAGE_LIST.map(({ persentage, id }) => {
                return (
                  <MatchingScore key={id}>
                    <div>
                      <Circle
                        onClick={() => selectPersentage(id, persentage)}
                        select={selectId === id}
                      />
                      <Persentage select={selectId === id}>
                        {persentage}
                      </Persentage>
                    </div>
                    <PersentageBar id={id} />
                  </MatchingScore>
                );
              })}
            </MatchingBox>
          </MatchingSetting>
        </ListBox>
        <SlideModalControlButton
          setIsFilter={setIsFilter}
          submitList={submitList}
        />
      </Container>
    </BlackBackground>
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

const BlackBackground = styled.div`
  ${({ theme }) => theme.flexSet()}
  position: absolute;
  top: 0;
  height: 0;
  width: 100%;
  height: 100%;
  background-color: #000000a1;
  z-index: 100;
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
  padding: 20px 0;
`;

const Text = styled.div`
  font-weight: 500;
  color: ${({ fontStyle }) => (fontStyle ? "#ff5000" : "black")};
`;

const CheckIcon = styled.img`
  width: 22px;
  height: 20px;
`;

const MatchingSetting = styled(List)`
  ${({ theme }) => theme.flexSet("center", "flex-start", "column")};
`;

const MatchingBox = styled.div`
  ${({ theme }) => theme.flexSet("flex-start", "center")};
`;

const MatchingScore = styled.div`
  ${({ theme }) => theme.flexSet("flex-start")};
`;
const Circle = styled.div`
  position: relative;
  width: 18px;
  height: 18px;
  margin: 10px 0 5px;
  border-radius: 100%;
  border: 2px solid ${({ select }) => (select ? "#ff5000" : "lightgray")};
  background-color: ${({ select }) => (select ? "#ff5000" : "#ffffff")};
`;

const PersentageBar = styled.span`
  width: ${({ id }) => (id !== 4 ? "30px" : "0px")};
  height: 2px;
  background-color: lightgray;
  margin-bottom: 7px;
`;

const Persentage = styled.div`
  font-size: 12px;
  font-weight: 500;
  color: ${({ select }) => (select ? "#ff5000" : "lightgray")};
  margin-left: 2px;
`;

const FILTER_LIST = [
  { id: 1, title: "추천 제외 매장 포함" },
  { id: 2, title: "별점 몇 점 이상만" },
];

const PERSENTAGE_LIST = [
  { id: 1, persentage: 30 },
  { id: 2, persentage: 50 },
  { id: 3, persentage: 70 },
  { id: 4, persentage: 90 },
];
