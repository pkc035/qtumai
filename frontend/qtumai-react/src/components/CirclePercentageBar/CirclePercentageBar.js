import React, { useState, useEffect } from "react";
import styled from "styled-components";

const CircularProgressBar = ({ percentage, size }) => {
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

  const {
    circular_w_h,
    inner_w_h,
    endPoint_w_h,
    inner_margin,
    bar_clip,
    prigress_clip,
    numb_size,
  } = size;

  return (
    <Circular size={circular_w_h}>
      <Inner size={inner_w_h} margin={inner_margin} />
      <Numb font={numb_size}>{numb}</Numb>
      <Circle>
        <LeftBar clip={bar_clip}>
          <LeftProgress clip={prigress_clip} left={left} right={right} />
        </LeftBar>
        <RightBar clip={bar_clip}>
          <RightProgress clip={prigress_clip} left={left} right={right} />
        </RightBar>
      </Circle>
      <EndPoint size={endPoint_w_h} style={{ ...position }} />
    </Circular>
  );
};

export default CircularProgressBar;

const Circular = styled.div`
  position: relative;
  width: ${({ size }) => size};
  height: ${({ size }) => size};
`;

const Inner = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  width: ${({ size }) => size};
  height: ${({ size }) => size};
  margin: ${({ margin }) => margin};
  background-color: white;
  border-radius: 100%;
  z-index: 10;
`;

const Numb = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  margin-top: 2px;
  transform: translate(-50%, -50%);
  color: ${({ theme }) => theme.red};
  font-weight: bold;
  font-size: ${({ font }) => font};
  z-index: 10;
`;

const Circle = styled.div`
  z-index: 1;
  box-shadow: none;
`;

const LeftBar = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: ${({ theme }) => theme.redBackground};
  border-radius: 100%;
  clip: ${({ clip }) => clip};
`;

const RightBar = styled(LeftBar)`
  transform: rotate(180deg);
`;

const LeftProgress = styled.div`
  position: absolute;
  height: 100%;
  width: 100%;
  border-radius: 100%;
  clip: ${({ clip }) => clip};
  background-color: ${({ theme }) => theme.red};
  z-index: 1;
  transform: ${({ left }) => `rotate(${left}deg)`};
`;

const RightProgress = styled(LeftProgress)`
  transform: ${({ right }) => `rotate(${right}deg)`};
`;

const EndPoint = styled.div`
  position: absolute;
  width: ${({ size }) => size};
  height: ${({ size }) => size};
  bottom: 4%;
  right: 13%;
  border-radius: 100%;
  background-color: white;
  z-index: 10;
  border: 1px solid ${({ theme }) => theme.red};
`;
