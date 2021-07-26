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
      <InputBox>
        <PreferenceBtn
          preference={preference === 0 ? true : false}
          onClick={() => onCreate(0)}
        >
          {props.firstTitle}
        </PreferenceBtn>
        <Versus>
          <Title>VS</Title>
        </Versus>
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

const PreferenceBtn = styled.button`
  /* border: 1px solid ${props => (props.preference ? "none" : "#ededed")}; */
  background-color: ${props => (props.preference ? "#ff3000" : "#fff")};
  color: ${props => (props.preference ? "#fff" : "#c1c1c1")};
  /* border-radius: 4px; */
  padding: 10px 0;
  width: 100%;
  height: 100%;
`;

const InputBox = styled.div`
  display: flex;
  position: absolute;
  width: 100%;
  height: 100%;
  align-items: center;
`;

const Versus = styled.div`
  position: absolute;
  left: 50%;
  width: 60px;
  height: 60px;
  font-size: 30px;
  border-radius: 50%;
  border: 1px solid #c1c1c1;
  background-color: #fff;
  transform: translateX(-50%);
`;

const Title = styled.h2`
  text-align: center;
  margin-top: 15px;
`;

export default PreferenceComponents;
