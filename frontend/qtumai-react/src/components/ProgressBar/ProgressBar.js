import React from "react";
import styled from "styled-components";

const ProgressBar = ({ done }) => {
  return (
    <ProgressBarCotainer>
      <ProgressBarDone>{done}%</ProgressBarDone>
    </ProgressBarCotainer>
  );
};

export default ProgressBar;

const ProgressBarCotainer = styled.div`
  width: 120px;
  height: 16px;
  border-radius: 30px;
  border: 2px solid #ff5000;
`;

const ProgressBarDone = styled.div`
  width: 70%;
  height: 100%;
  padding-right: 5px;
  border-radius: 30px 0px 0px 30px;
  background-color: #ff5000;
  text-align: right;
  font-size: 10px;
  font-weight: 500;
  color: white;
  line-height: 1.4;
`;
