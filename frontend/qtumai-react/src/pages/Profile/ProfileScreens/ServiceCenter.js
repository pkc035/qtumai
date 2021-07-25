import React, { useState } from "react";
import styled from "styled-components";

function ServiceCenter() {
  const [toggleAnswer, setToggleAnswer] = useState(1);

  function handleToggleAnswer(index) {
    if (toggleAnswer === index) {
      setToggleAnswer(null);
    } else setToggleAnswer(index);
  }

  return (
    <Content>
      <QuestionWrap>
        <Question onClick={() => handleToggleAnswer(0)}>
          <Bold>Q.</Bold> 졸려요
          <ArrowButton>
            <Arrow
              alt="arrow"
              src="/images/Profile/arrow.png"
              rotate={toggleAnswer === 0 ? "rotate(180deg)" : ""}
            />
          </ArrowButton>
          <Answers height={toggleAnswer === 0 ? "100px" : "0"}>
            안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요
          </Answers>
        </Question>
        <Question onClick={() => handleToggleAnswer(1)}>
          <Bold>Q.</Bold> 살려줘요
          <ArrowButton onClick={() => handleToggleAnswer(1)}>
            <Arrow
              alt="arrow"
              src="/images/Profile/arrow.png"
              rotate={toggleAnswer === 1 ? "rotate(180deg)" : ""}
            />
          </ArrowButton>
          <Answers height={toggleAnswer === 1 ? "100px" : "0"}>
            안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요
          </Answers>
        </Question>
        <Question onClick={() => handleToggleAnswer(2)}>
          <Bold>Q.</Bold> 하기싫어요
          <ArrowButton onClick={() => handleToggleAnswer(2)}>
            <Arrow
              alt="arrow"
              src="/images/Profile/arrow.png"
              rotate={toggleAnswer === 2 ? "rotate(180deg)" : ""}
            />
          </ArrowButton>
          <Answers height={toggleAnswer === 2 ? "100px" : "0"}>
            안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요
          </Answers>
        </Question>
        <Question onClick={() => handleToggleAnswer(3)}>
          <Bold>Q.</Bold> 할인 어떻게 받나요?
          <ArrowButton onClick={() => handleToggleAnswer(3)}>
            <Arrow
              alt="arrow"
              src="/images/Profile/arrow.png"
              rotate={toggleAnswer === 3 ? "rotate(180deg)" : ""}
            />
          </ArrowButton>
          <Answers height={toggleAnswer === 3 ? "100px" : "0"}>
            안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요
          </Answers>
        </Question>
        <Question onClick={() => handleToggleAnswer(4)}>
          <Bold>Q.</Bold> 돈 어떻게 많이 벌어요?
          <ArrowButton onClick={() => handleToggleAnswer(4)}>
            <Arrow
              alt="arrow"
              src="/images/Profile/arrow.png"
              rotate={toggleAnswer === 4 ? "rotate(180deg)" : ""}
            />
          </ArrowButton>
          <Answers height={toggleAnswer === 4 ? "100px" : "0"}>
            안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요
          </Answers>
        </Question>
        <ChannelTitle>카카오톡 채널'로드픽'</ChannelTitle>
        <Straight />
        <Channel>
          고객 상담을 위한 카카오톡 채널'로드픽'을 추가하고 더 많은 정보를
          얻어보세요!
        </Channel>
      </QuestionWrap>
    </Content>
  );
}

export default ServiceCenter;

const Content = styled.div`
  width: 100vw;
  height: 100vh;
`;

const QuestionWrap = styled.div`
  position: relative;
  display: flex;
  width: 100%;
  padding: 8% 5%;
  flex-direction: column;
  align-items: flex-start;
`;

const Question = styled.div`
  margin-bottom: 5%;
  width: 100%;
`;

const Bold = styled.span`
  font-weight: 700;
`;

const ChannelTitle = styled.div`
  margin-bottom: 2%;
`;

const Channel = styled.div`
  margin-top: 5%;
`;

const Straight = styled.div`
  width: 100%;
  height: 2px;
  background-color: #c1c1c1;
`;

const ArrowButton = styled.button`
  position: absolute;
  right: 0;
  margin-top: -1%;
  margin-right: 5%;
  width: 30px;
  height: 30px;
`;

const Arrow = styled.img`
  width: 100%;
  transform: ${props => props.rotate};
`;

const Answers = styled.div`
  margin-top: 5%;
  height: ${props => props.height};
  overflow: hidden;
  transition: 0.2s all;
`;
