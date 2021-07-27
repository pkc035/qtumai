import React, { useState, useEffect } from "react";
import styled from "styled-components";

const CircularProgressBar = ({ percentage }) => {
  const [position, setPosition] = useState({});
  const [numb, setNumb] = useState(0);
  const [left, setLeft] = useState(0);
  const [right, setRight] = useState(0);

  useEffect(() => {
    setNumb(percentage);

    if (numb <= 50) {
      if (numb < 20) {
        setLeft(36);
        setPosition({
          top: "0%",
          left: "60%",
        });
      } else if (numb < 30) {
        setLeft(72);
        setPosition({
          top: "23%",
          left: "81%",
        });
      } else if (numb < 40) {
        setLeft(108);
        setPosition({
          top: "50%",
          left: "83%",
        });
      } else if (numb < 50) {
        setLeft(144);
        setPosition({
          bottom: "4%",
          right: "13%",
        });
      } else {
        setLeft(180);
        setPosition({
          bottom: "-3%",
          right: "40%",
        });
      }
    } else if (51 <= numb) {
      setLeft(180);
      if (numb < 70) {
        setRight(36);
        setPosition({
          bottom: "0%",
          right: "60%",
        });
      } else if (numb < 80) {
        setRight(72);
        setPosition({
          bottom: "23%",
          right: "81%",
        });
      } else if (numb < 90) {
        setRight(108);
        setPosition({
          bottom: "50%",
          right: "85%",
        });
      } else if (numb < 100) {
        setRight(144);
        setPosition({
          top: "4%",
          left: "13%",
        });
      } else {
        setRight(180);
      }
    }
  }, [numb]);

  return (
    <Circular>
      <Inner />
      <Numb>{numb}</Numb>
      <Circle>
        <LeftBar>
          <LeftProgress left={left} right={right} />
        </LeftBar>
        <RightBar>
          <RightProgress left={left} right={right} />
        </RightBar>
      </Circle>
      <EndPoint style={{ ...position }} />
    </Circular>
  );
};

export default CircularProgressBar;

const Circular = styled.div`
  position: relative;
  width: 50px;
  height: 50px;
`;

const Inner = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  width: 40px;
  height: 40px;
  margin: -20px 0 0 -20px;
  background-color: white;
  border-radius: 100%;
  z-index: 10;
`;

const Numb = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  margin-top: 2 px;
  transform: translate(-50%, -50%);
  color: ${({ theme }) => theme.red};
  font-weight: bold;
  font-size: 18px;
  z-index: 10;
`;

const Circle = styled.div`
  z-index: 1;
  box-shadow: none;
`;

const Bar = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: ${({ theme }) => theme.redBackground};
  border-radius: 100%;
  clip: rect(0px, 50px, 50px, 25px);
`;

const LeftBar = styled(Bar)``;

const RightBar = styled(Bar)`
  transform: rotate(180deg);
`;

const Progress = styled.div`
  position: absolute;
  height: 100%;
  width: 100%;
  border-radius: 100%;
  clip: rect(0px, 25px, 50px, 0px);
  background-color: ${({ theme }) => theme.red};
`;

const LeftProgress = styled(Progress)`
  z-index: 1;
  transform: ${({ left }) => `rotate(${left}deg)`};
`;

const RightProgress = styled(Progress)`
  transform: ${({ right }) => `rotate(${right}deg)`};
`;

const EndPoint = styled.div`
  position: absolute;
  width: 10px;
  height: 10px;
  bottom: 4%;
  right: 13%;
  border-radius: 100%;
  background-color: white;
  z-index: 10;
  border: 1px solid ${({ theme }) => theme.red};
`;
