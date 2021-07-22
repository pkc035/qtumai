import React, { useState, useEffect } from "react";
// import { customFetch } from "../../utils/customFetch";
import CommonMainSlider from "../../components/CommonMainSlider/CommonMainSlider";
import MainStoreList from "../../components/MainStoreList/MainStoreList";
import styled from "styled-components";

export default function Main() {
  const [mainSlider, setMainSlider] = useState([]);
  const [personalContents, setPersonalContent] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  console.log(setIsLoading);

  useEffect(() => {
    fetch("data/mainPageData.json", {
      method: "GET",
    })
      .then(res => res.json())
      .then(data => {
        const newMainContent = data.filter(
          ({ title }) => title === "오늘의 추천"
        );
        const newPersonalContents = data.filter(
          ({ title }) => title !== "오늘의 추천"
        );

        setMainSlider(...newMainContent);
        setPersonalContent(newPersonalContents);
      });
  }, []);

  // useEffect(() => {
  //   const getMainData = () => {
  //     customFetch('', {
  //       method: 'GET',
  //     }, res => {
  //       console.log(res);
  //     })
  //   }

  //   fetch("../../public/data/mainPageData.json", {
  //     method: "GET",
  //   }).then(res => res.json())
  //     .then(data => console.log(data));
  // }, [])

  return (
    <MainContainer>
      {mainSlider.length !== 0 && (
        <CommonMainSlider mainSlider={mainSlider} isLoading={isLoading} />
      )}
      <MainStoreWrap>
        <MainStoreList personalContents={personalContents} />
      </MainStoreWrap>
    </MainContainer>
  );
}

const MainContainer = styled.div`
  position: relative;
  overflow-x: hidden;
`;

const MainStoreWrap = styled.div`
  padding: 40px 0 0 20px;
`;
