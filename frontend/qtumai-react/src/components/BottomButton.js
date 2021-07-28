import React from "react";
import styled from "styled-components";

const BottomButton = ({ disabled, title, onClick, style }) => {
  return (
    <Button disabled={disabled} onClick={onClick} style={style}>
      {title}
    </Button>
  );
};

const Button = styled.button`
  position: fixed;
  bottom: 0px;
  width: 100%;
  height: 60px;
  margin-top: 15px;
  background-color: #ff3000;
  font-size: 15px;
  color: #fff;

  &:disabled {
    background-color: #c1c1c1;
    cursor: default;
  }
`;

export default BottomButton;
