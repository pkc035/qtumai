import React from "react";
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
          <Circular>
            <Inner></Inner>
            <Circle>
              <LeftBar>
                <Progress></Progress>
              </LeftBar>
              <RightBar>
                <Progress></Progress>
              </RightBar>
            </Circle>
          </Circular>
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
  border-top: 1px solid lightgray;
`;

const List = styled.li`
  ${({ theme }) => theme.flexSet("space-between", "center")}
  width: 100%;
  border-bottom: 1px solid lightgray;
  padding: 20px;
  background-color: blueviolet;
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
  color: lightgray;
  margin-top: 5px;
`;

const StarBox = styled.div`
  margin-top: 10px;
`;

const Star = styled.span``;

const Score = styled.span``;

const Circular = styled.div`
  position: relative;
  width: 60px;
  height: 60px;
  background: red;
`;

const Inner = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  width: 44px;
  height: 44px;
  margin: -22px 0 0 -22px;
  background-color: white;
  border-radius: 100%;
`;

const Circle = styled.div``;

const LeftBar = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: #ffffff;
  border-radius: 100%;
  clip: rect(0px, 60px, 60px, 30px);
`;

const RightBar = styled(LeftBar)``;

const Progress = styled.div``;
