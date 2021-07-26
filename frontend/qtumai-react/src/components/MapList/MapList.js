import React from "react";
import CircularProgressBar from "../CirclePercentageBar/CirclePercentageBar";
import styled from "styled-components";

export default function MapList() {
  return (
    <Container>
      <Section>
        <List>
          <ContextBox>
            <Photo />
            <NameBox>
              <div>
                <Name>브릭커피</Name>
                <DetailContext>크로플이 맛있는 감성 카페</DetailContext>
              </div>
              <StarBox>
                <Star />
                <Score>4.5</Score>
              </StarBox>
            </NameBox>
          </ContextBox>
          <CircularProgressBar percentage={50} />
        </List>
      </Section>
    </Container>
  );
}

const Container = styled.div`
  position: absolute;
  top: 73px;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: white;
  z-index: 10;
`;
const Section = styled.ul`
  margin-top: 70px;
  border-top: 1px solid ${({ theme }) => theme.lightGray};
`;

const List = styled.li`
  ${({ theme }) => theme.flexSet("space-between", "center")}
  width: 100%;
  border-bottom: 1px solid ${({ theme }) => theme.lightGray};
  padding: 20px;
`;

const Photo = styled.div`
  ${({ theme }) => theme.imageSet("url(/images/plus.avg)")};
  width: 64px;
  height: 64px;
  margin-right: 10px;
  background-color: black;
  border-radius: 3px;
`;

const ContextBox = styled.div`
  ${({ theme }) => theme.flexSet("space-between", "center")}
`;

const NameBox = styled.div`
  ${({ theme }) => theme.flexSet("center", "flex-start", "column")}
`;

const Name = styled.div`
  font-weight: bold;
`;

const DetailContext = styled.div`
  font-size: 12px;
  color: ${({ theme }) => theme.lightGray};
  margin-top: 5px;
`;

const StarBox = styled.div`
  margin-top: 10px;
`;

const Star = styled.img.attrs({
  src: "/images/scoreStar.svg",
})`
  width: 14px;
  height: 14px;
  margin-right: 5px;
`;

const Score = styled.span`
  font-weight: 500;
`;
