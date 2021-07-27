import React, { useState, useEffect } from "react";
// import { customFetch } from "../../utils/customFetch";
import CommonMainSlider from "../../components/CommonMainSlider/CommonMainSlider";
import MainStoreList from "../../components/StoreListSlide/StoreListSlide";
import styled from "styled-components";

export default function Main() {
  const [mainSlider, setMainSlider] = useState([]);
  const [personalContents, setPersonalContent] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // fetch(
    //   "http://192.168.0.68:8000/shops/recommend/?top=True&category=True&type=here&latitude=100&longitude=1000",
    //   {
    //     method: "GET",
    //   }
    // )
    fetch("/data/mainPageData.json", {
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
