import React from "react";
import Slider from "react-slick";
import styled from "styled-components";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function MainStoreList({ personalContents }) {
  let settings = {
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 2,
  };


  return (
    <div>
      {personalContents.length !== 0 && personalContents.map((data, idx) => {
        return (
          < MainStoreListContainer key={idx}>
            <Title>{data.title}</Title>
            <StoreListSlider {...settings}>
              {personalContents[idx].list.map(item => {
                return (
                  <div key={item.id}>
                    <StoreContainer src={item.shop_info_url}>
                      <StoreCoupon>
                        <StoreDiscount>35%</StoreDiscount>
                      </StoreCoupon>
                      <StarsContainer>
                        <Star>★</Star>
                        <Star>★</Star>
                        <Star>★</Star>
                        <Star>☆</Star>
                        <Star>☆</Star>
                      </StarsContainer>
                    </StoreContainer>
                    <StoreName>{item.shop_name}</StoreName>
                  </div>
                );
              })}
            </StoreListSlider>
          </MainStoreListContainer >
        );
      })}
    </div>

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
    height: 160px;
  }

  .slick-slide {
  }

  .slick-track {
    height: 160px;
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
  background-repeat: no-repeat;
`;

const StoreCoupon = styled.div`
  ${({ theme }) => theme.flexSet()};
  position: absolute;
  top: 4px;
  right: 4px;
  width: 22px;
  height: 14px;
  background: white;
`;

const StoreDiscount = styled.div`
font-size: 10px;
`;

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
