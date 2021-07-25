import React, { useState } from "react";
import styled from "styled-components";

function NotificationSetting() {
  const [toggle, setToggle] = useState("");

  function handletoggle(index) {
    if (toggle === index) {
      setToggle(null);
    } else setToggle(index);
  }

  return (
    <Content>
      <InputWrap>
        <AlarmWrap>
          <Name>추천알림</Name>
          <ItemToggle>
            <ToggleIcon
              onClick={() => handletoggle(0)}
              background={toggle === 0 ? "#ff3000" : "#ededed"}
            >
              <ToggleIconHandle
                transform={toggle === 0 ? "translateX(22px)" : 0}
              />
            </ToggleIcon>
          </ItemToggle>
        </AlarmWrap>
        <AlarmWrap>
          <Name>추천알림</Name>
          <ItemToggle>
            <ToggleIcon
              onClick={() => handletoggle(1)}
              background={toggle === 1 ? "#ff3000" : "#ededed"}
            >
              <ToggleIconHandle
                transform={toggle === 1 ? "translateX(22px)" : 0}
              />
            </ToggleIcon>
          </ItemToggle>
        </AlarmWrap>
        <AlarmWrap>
          <Name>추천알림</Name>
          <ItemToggle>
            <ToggleIcon
              onClick={() => handletoggle(2)}
              background={toggle === 2 ? "#ff3000" : "#ededed"}
            >
              <ToggleIconHandle
                transform={toggle === 2 ? "translateX(22px)" : 0}
              />
            </ToggleIcon>
          </ItemToggle>
        </AlarmWrap>
        <AlarmWrap>
          <Name>추천알림</Name>
          <ItemToggle>
            <ToggleIcon
              onClick={() => handletoggle(3)}
              background={toggle === 3 ? "#ff3000" : "#ededed"}
            >
              <ToggleIconHandle
                transform={toggle === 3 ? "translateX(22px)" : 0}
              />
            </ToggleIcon>
          </ItemToggle>
        </AlarmWrap>
      </InputWrap>
    </Content>
  );
}

export default NotificationSetting;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100vw;
  height: 100vh;
`;

const InputWrap = styled.div`
  width: 100%;
`;

const AlarmWrap = styled.div`
  display: flex;
  margin-top: 5%;
  width: 100%;
  justify-content: space-between;
`;

const Name = styled.div`
  margin-left: 10%;
`;

const ItemToggle = styled.button`
  margin-right: 10%;
  padding: 5px 0;
  background: none;
  font-size: 0;
  line-height: 0;
  transition: opacity 0.1s;
  border: none;
  cursor: pointer;
`;

const ToggleIcon = styled.span`
  position: relative;
  display: inline-block;
  width: 45px;
  height: 23px;
  background-color: ${props => props.background};
  border-radius: 23px;
  transition: background-color 0.2s;
`;

const ToggleIconHandle = styled.span`
  transform: ${props => props.transform};
  position: absolute;
  display: inline-block;
  width: 15px;
  height: 15px;
  top: 50%;
  left: 4px;
  margin-top: -7.5px;
  background-color: #fff;
  border-radius: 15px;
  transition: transform 0.15s ease-in-out;
`;
