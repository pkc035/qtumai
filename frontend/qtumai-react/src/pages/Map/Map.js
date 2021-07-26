import React, { useState } from "react";
import KakaoMap from "../../components/KakaoMap/KakaoMap";
import MapList from "../../components/MapList/MapList";
import styled from "styled-components";
import FilterModal from "../../components/FilterModal/FilterModal";

export default function Map() {
  const [isFilter, setIsFilter] = useState(false);
  const [isList, setIsList] = useState(true);

  return (
    <Container>
      <SearchBox>
        <SearchInput />
        <SearchButton />
      </SearchBox>
      <Section>
        <MapMenu>
          <AddressLocationBox>
            <AddressPin>주소지</AddressPin>
            <PresentPin>현위치</PresentPin>
          </AddressLocationBox>
          <ListFilterBox>
            <List onClick={() => setIsList(true)}>
              <MenuIcon />
              목록
            </List>
            <Filter onClick={() => setIsFilter(true)}>
              <FilterIcon />
              필터
            </Filter>
          </ListFilterBox>
        </MapMenu>
      </Section>
      <KakaoMap size={SIZE} />
      {isList && <MapList />}
      {isFilter && (
        <FilterModal isFilter={isFilter} setIsFilter={setIsFilter} />
      )}
    </Container>
  );
}

const Container = styled.div``;

const SearchBox = styled.div`
  width: 100%;
  margin-top: 30px;
  position: relative;
`;

const SearchInput = styled.input.attrs({
  type: "text",
  placeholder: "지역, 가게명, 메뉴 검색하기",
})`
  width: 100%;
  padding: 10px 0px 10px 20px;
  font-size: 18px;
  font-weight: bold;
  border: 0px;
  border-bottom: 2px solid ${({ theme }) => theme.black};
`;

const SearchButton = styled.button`
  ${({ theme }) => theme.imageSet(`url("/images/search.svg")`)};
  position: absolute;
  bottom: 10px;
  right: 20px;
  width: 26px;
  height: 26px;
`;

const Section = styled.section`
  position: absolute;
  width: 100%;
  z-index: 100;
`;

const MapMenu = styled.ul`
  ${({ theme }) => theme.flexSet("space-between", "center")}
  padding: 20px;
`;

const AddressLocationBox = styled.li``;

const AddressPin = styled.span`
  padding: 5px 10px;
  border: 1px solid lightgray;
  border-radius: 20px 0 0 20px;
  font-weight: 500;
  background-color: white;
`;

const PresentPin = styled(AddressPin)`
  border-radius: 0 20px 20px 0;
  border-left: 0px;
`;

const ListFilterBox = styled.li`
  ${({ theme }) => theme.flexSet()};
  font-weight: 500;
`;

const List = styled.span`
  display: flex;
  padding: 5px 10px;
  border: 1px solid ${({ theme }) => theme.lightGray};
  border-radius: 20px;
  background-color: white;
`;

const MenuIcon = styled.div`
  position: relative;
  width: 12px;
  height: 2px;
  margin-right: 5px;
  background-color: black;

  &::before {
    content: "";
    font-size: 0;
    position: absolute;
    top: 6px;
    left: 0;
    width: 100%;
    height: 2px;
    background-color: black;
  }
  &::after {
    content: "";
    font-size: 0;
    position: absolute;
    top: 12px;
    left: 0;
    width: 100%;
    height: 2px;
    background-color: black;
  }
`;
const FilterIcon = styled.img.attrs({
  src: "/images/filter.svg",
})`
  width: 14px;
  height: 14px;
  margin-right: 5px;
`;

const Filter = styled(List)`
  margin-left: 10px;
`;

const SIZE = {
  width: "100%",
  height: "100vh",
};
