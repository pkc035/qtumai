import React, { useState, useEffect } from "react";
import styled from "styled-components";

function ServiceCenter() {
  const [toggleAnswer, setToggleAnswer] = useState(1);
  const [data, setData] = useState([]);

  function handleToggleAnswer(index) {
    if (toggleAnswer === index) {
      setToggleAnswer(null);
    } else setToggleAnswer(index);
  }

  useEffect(() => {
    fetch("/data/profile/profileServiceCenter.json")
      .then(res => res.json())
      .then(data => {
        setData(data);
      });
  }, []);

  console.log(data.results);
  console.log(data);
  return (
    <Content>
      <QuestionWrap>
        {data.results &&
          data.results.map((item, index) => {
            return (
              <Question key={index} onClick={() => handleToggleAnswer(index)}>
                <Bold>Q.</Bold> {item.title}
                <ArrowButton>
                  <Arrow
                    alt="arrow"
                    src="/images/Profile/arrow.png"
                    rotate={toggleAnswer === index ? "rotate(180deg)" : ""}
                  />
                </ArrowButton>
                <Answers height={toggleAnswer === index ? "100px" : "0"}>
                  {item.content}
                </Answers>
              </Question>
            );
          })}
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
