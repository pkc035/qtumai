import React, { useState, useEffect } from "react";
import { GET_PICLIST_API } from "../../config";
import PlusPicList from "../../components/PlusPicList/PlusPicList";
import StoreListSlide from "../../components/StoreListSlide/StoreListSlide";
import styled from "styled-components";

export default function Likes() {
  const [modifyList, setModifyList] = useState([]);
  const [isModifyAll, setIsModifyAll] = useState(false);
  const [isPicPlusModal, setIsPicPlusModal] = useState(false);

  useEffect(() => {
    // fetch(`/data/mylikeList.json`, { method: "GET" })
    fetch(`${GET_PICLIST_API}`, { method: "GET" })
      .then(res => res.json())
      .then(({ results }) => setModifyList(results));
  }, [isModifyAll]);

  return (
    <Container>
      <Section>
        <Title>내 PICK 리스트</Title>
        {!isModifyAll ? (
          <ListModifyButton onClick={() => setIsModifyAll(true)}>
            편집
          </ListModifyButton>
        ) : (
          <ListModifyButton>확인</ListModifyButton>
        )}
      </Section>
      <Section>
        <StoreListSlide myPicList={modifyList} isModifyAll={isModifyAll} />
      </Section>
      <PlusPicButton onClick={() => setIsPicPlusModal(true)} />
      {isPicPlusModal && <PlusPicList setIsPicPlusModal={setIsPicPlusModal} />}
    </Container>
  );
}

const Container = styled.div`
  ${({ theme }) => theme.flexSet("flex-start", "center", "column")};
  position: absolute;
  top: 0;
  width: 100%;
  height: 100%;
  min-height: 100vh;
  background-color: white;
  z-index: 100;
`;
const Section = styled.section`
  width: 100%;
  margin: 10px 0;
`;

const Title = styled.div`
  margin: 20px 0 30px;
  font-size: 18px;
  font-weight: bold;
  text-align: center;
`;

const ListModifyButton = styled.div`
  position: absolute;
  top: 28px;
  right: 20px;
  font-size: 18px;
  font-weight: bold;
  /* color: #ff5000; */
  color: ${({ theme }) => theme.red};
`;

const PlusPicButton = styled.button`
  position: fixed;
  right: 30px;
  bottom: 20px;
  width: 50px;
  height: 50px;
  border-radius: 100%;
  background-color: ${({ theme }) => theme.red};
`;
