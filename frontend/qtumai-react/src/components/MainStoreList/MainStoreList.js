import React from "react";
import Slider from "react-slick";
import styled from "styled-components";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function MainStoreList() {
  let settings = {
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 2,
  };

  const STORES_LIST_SLIDER = [
    {
      id: 1,
      title: "오늘의 맛집",
      text: "분위기 좋은 파스타 맛집",
      url: "https://i.imgur.com/aylXNh7.png",
    },
    {
      id: 2,
      title: "오늘의 맛집",
      text: "정말 맛있는 족발",
      url: "https://i.imgur.com/zs1GZHb.jpg",
    },
    {
      id: 3,
      title: "오늘의 맛집",
      text: "정말 맛있는 파스타",
      url: "https://i.imgur.com/Nxqdwbs.jpg",
    },
    {
      id: 4,
      title: "오늘의 맛집",
      text: "정말 맛있는 파스타",
      url: "https://i.imgur.com/ERmRCKF.jpg",
    },
    {
      id: 5,
      title: "오늘의 맛집",
      text: "정말 맛있는 파스타",
      url: "https://i.imgur.com/SwiHvRG.png",
    },
  ];

  return (
    <MainStoreListContainer>
      <Title>이번주 주말</Title>
      <StoreListSlider {...settings}>
        {STORES_LIST_SLIDER.map(item => {
          return (
            <div key={item.id}>
              <StoreContainer src={item.url}>
                <StoreCoupon>
                  <StoreDiscount></StoreDiscount>
                </StoreCoupon>
                <StarsContainer>
                  <Star>★</Star>
                  <Star>★</Star>
                  <Star>★</Star>
                  <Star>☆</Star>
                  <Star>☆</Star>
                </StarsContainer>
              </StoreContainer>
              <StoreName>브릭커피</StoreName>
            </div>
          );
        })}
      </StoreListSlider>
    </MainStoreListContainer>
  );
}

const MainStoreListContainer = styled.div``;

const Title = styled.div`
  margin-bottom: 10px;
  font-size: 20px;
  font-weight: bold;
  color: gray;
`;

const StoreListSlider = styled(Slider)`
  height: 200px;

  .slick-list {
    width: 120%;
    height: 100%;
  }

  .slick-slide {
  }

  .slick-track {
    height: 140px;
  }
`;

const StoreContainer = styled.div`
  position: relative;
  width: 140px;
  height: 140px;
  border-radius: 5px;
  background-image: ${({ src }) => `url(${src})`};
  background-size: cover;
  background-position: center;
`;

const StoreCoupon = styled.div`
  position: absolute;
  top: 4px;
  right: 4px;
  width: 22px;
  height: 14px;
  background: white;
`;

const StoreDiscount = styled.div``;

const StarsContainer = styled.div`
  position: absolute;
  bottom: 4px;
  left: 4px;
  font-size: 18px;
  color: lightgray;
`;

const Star = styled.span``;

const StoreName = styled.div`
  margin-top: 5px;
  font-weight: bold;
  color: lightgray;
`;
