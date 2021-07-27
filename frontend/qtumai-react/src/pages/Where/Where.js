import React from "react";
import styled from "styled-components";
import Address from "../../components/Address/Address";

export default function Where() {
  return (
    <Container>
      <Wrap>
        <Section>
          <CloseButton />
          <Title>지역 편집</Title>
        </Section>
        <Section>
          <SearchInput />
          <SearchButton />
          <AcceptBox>
            <HereIcon />현 위치로 주소 변경
          </AcceptBox>
        </Section>
      </Wrap>
      <Bar />
      <Wrap>
        <ContentsSection>
          <RecentlyTitle>
            <span>최근 지역</span>
          </RecentlyTitle>
          <RecentlyBox>
            <RecentlyList>
              <span>강남 대치동</span>
              <DeleteButton />
            </RecentlyList>
          </RecentlyBox>
        </ContentsSection>
      </Wrap>
    </Container>
  );
}

const Container = styled.div`
  ${({ theme }) => theme.flexSet("center", "center", "column")};
  width: 100%;
  height: 100%;
`;
const Wrap = styled.div`
  width: 90%;
`;
const Section = styled.section`
  ${({ theme }) => theme.flexSet("center", "center", "column")};
  position: relative;
`;
const ContentsSection = styled.section`
  ${({ theme }) => theme.flexSet("center", "flex-start", "column")};
  position: relative;
`;
const CloseButton = styled.button`
  ${({ theme }) => theme.imageSet(`url("/images/plus.svg")`)}
  position: absolute;
  top: 30px;
  left: 0;
  width: 30px;
  height: 30px;
  transform: rotate(45deg);
`;
const Title = styled.h1`
  font-size: 18px;
  font-weight: bold;
  margin: 40px 0;
`;
const SearchInput = styled.input.attrs({
  type: "text",
  placeholder: "동까지 입력해주세요.",
})`
  width: 100%;
  padding-bottom: 10px;
  border: 0px;
  border-bottom: 2px solid lightgray;
  font-size: 18px;
  font-weight: 700;
`;
const SearchButton = styled.button`
  ${({ theme }) => theme.imageSet(`url("/images/search.svg")`)}
  position: absolute;
  top: 0;
  right: 0;
  width: 26px;
  height: 26px;
`;
const AcceptBox = styled.div`
  ${({ theme }) => theme.flexSet("center", "center")};
  width: 100%;
  height: 100%;
  padding: 16px 0;
  margin-top: 16px;
  border: 1px solid lightgray;
  font-size: 18px;
  font-weight: 500;
`;

const HereIcon = styled.img.attrs({
  src: "/images/pin.svg",
})`
  width: 20px;
  height: 20px;
`;

const Bar = styled.div`
  width: 100%;
  height: 10px;
  margin: 30px 0;
  background-color: lightgray;
`;
const RecentlyTitle = styled.div`
  margin-bottom: 10px;
  font-size: 22px;
  font-weight: bold;
`;
const RecentlyBox = styled.ul`
  ${({ theme }) => theme.flexSet("flex-start", "center", "column")};
  width: 100%;
  flex-flow: row wrap;
`;
const RecentlyList = styled.li`
  ${({ theme }) => theme.flexSet("space-between", "center")};
  width: calc((100% - 20px) / 3);
  padding: 8px 5px 8px 5px;
  color: lightgray;
  border: 1px solid lightgray;
  border-radius: 3px;
  margin: 10px 10px 0 0;

  span {
    margin-top: 3px;
  }

  &:nth-child(3n) {
    margin-right: 0px;
  }
`;
const DeleteButton = styled.button`
  ${({ theme }) => theme.imageSet(`url("/images/grayPlus.svg")`)}
  width: 16px;
  height: 16px;
  transform: rotate(45deg);
`;
