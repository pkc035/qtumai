import React, { useState, useEffect } from "react";
import styled from "styled-components";

function PreferenceComponents(props) {
  const [preference, setPreference] = useState("");

  function onCreate(number) {
    props.setPreferenceReset(true);
    setPreference(number);
    props.setData(number);
    props.setNextButton(false);
  }

  useEffect(() => {
    props.setPreferenceReset(true);
    setPreference(props.preferenceReset);
  }, [props.preferenceReset]);

  return (
    <React.Fragment>
      <Title>
        <span>{props.firstTitle}</span>과<span>{props.secondTitle}</span>중 선호
        하는것을 골라주세요
      </Title>
      <InputBox>
        <PreferenceBtn
          preference={preference === 0 ? true : false}
          onClick={() => onCreate(0)}
        >
          {props.firstTitle}
        </PreferenceBtn>
        <Versus>VS</Versus>
        <PreferenceBtn
          preference={preference === 1 ? true : false}
          onClick={() => onCreate(1)}
        >
          {props.secondTitle}
        </PreferenceBtn>
      </InputBox>
    </React.Fragment>
  );
}

const Title = styled.h2`
  margin-top: 10vh;
  span {
    font-size: 20px;
    font-weight: 600;
    color: #ff3000;
  }
`;

const PreferenceBtn = styled.button`
  border: 1px solid ${props => (props.preference ? "none" : "#ededed")};
  background-color: ${props => (props.preference ? "#ff3000" : "#fff")};
  color: ${props => (props.preference ? "#fff" : "#c1c1c1")};
  border-radius: 4px;
  padding: 10px 0;
  width: 50%;
`;

const InputBox = styled.div`
  display: flex;
  width: 80%;
  height: 50vh;
  align-items: center;
`;

const Versus = styled.div`
  font-size: 30px;
  margin: 0 20px;
`;

export default PreferenceComponents;
