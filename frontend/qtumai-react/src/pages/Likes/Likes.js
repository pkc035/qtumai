import React, { useState, useEffect } from "react";
import styled from "styled-components";

export default function Likes() {
  const [image, setImage] = useState("");

  useEffect(() => {
    setImage("https://i.imgur.com/ERmRCKF.jpg");
  }, []);

  console.log(`url(${image})`);
  return (
    <Container>
      <Wrap>
        <Title>이거 어때?</Title>

        <FoodImage src={`${image}`} />
        <SelectBox>
          <NoButton />
          <SuperButton />
          <YesButton />
        </SelectBox>
      </Wrap>
    </Container>
  );
}

const Container = styled.div`
  ${({ theme }) => theme.flexSet()};
  padding-top: 70px;
  position: fixed;
  width: 100%;
  height: 100vh;
`;

const Wrap = styled.div`
  ${({ theme }) => theme.flexSet("center", "center", "column")};
  width: 90%;
`;

const Title = styled.div`
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 20px;
  width: 100%;
  float: left;
`;

const FoodImage = styled.img`
  width: 100%;
  height: 80vh;
  border-radius: 5px;
`;

const SelectBox = styled.div`
  ${({ theme }) => theme.flexSet("center", "center")};
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 100px;
  margin-bottom: 10px;
`;

const NoButton = styled.button`
  ${({ theme }) => theme.imageSet(`url("/images/favorite_no.svg")`)};
  width: 70px;
  height: 70px;
`;

const SuperButton = styled.button`
  ${({ theme }) => theme.imageSet(`url("/images/superlike.svg")`)};
  width: 110px;
  height: 70px;
  margin: 0 20px;
`;

const YesButton = styled(NoButton)`
  ${({ theme }) => theme.imageSet(`url("/images/favorite_yes.svg")`)};
`;
