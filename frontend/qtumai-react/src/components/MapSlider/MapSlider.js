import React, { useState } from "react";
import Slider from "react-slick";
import CircularProgressBar from "../../components/CirclePercentageBar/CirclePercentageBar";
import styled from "styled-components";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function MapSlider({ mapData }) {
  let settings = {
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 2,
  };

  return (
    <MapListContainer>
      <StoreListSlider {...settings}>
        {/* {mapData &&
          mapData.map((data, idx) => {
            return ( */}
        <StoreListContainer>
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
        </StoreListContainer>
        {/* );
          })} */}
      </StoreListSlider>
    </MapListContainer>
  );
}
const MapListContainer = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 120px;
  background-color: blue;
  z-index: 10;
`;

const StoreListSlider = styled(Slider)``;

const StoreListContainer = styled.div`
  ${({ theme }) => theme.flexSet("")};
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
