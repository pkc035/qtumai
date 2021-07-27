import React, { useState } from "react";
import Slider from "react-slick";
import styled from "styled-components";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function MainStoreList({
  personalContents,
  myPicList,
  isModifyAll,
}) {
  let settings = {
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 2,
  };
  console.log(personalContents);
  return (
    <div>
      {personalContents
        ? personalContents.map((data, idx) => {
            return (
              <MainStoreListContainer key={idx}>
                <Title>{data.title}</Title>
                <StoreListSlider {...settings}>
                  {personalContents[idx].list.map(
                    ({ id, shopimage_set, coupon_set, shop_name }) => {
                      return (
                        <div key={id}>
                          <StoreContainer src={shopimage_set}>
                            <StoreCoupon>
                              <StoreDiscount>{coupon_set[0]}</StoreDiscount>
                            </StoreCoupon>
                            <StarsContainer>
                              <Star>★</Star>
                              <Star>★</Star>
                              <Star>★</Star>
                              <Star>☆</Star>
                              <Star>☆</Star>
                            </StarsContainer>
                          </StoreContainer>
                          <StoreName>{shop_name}</StoreName>
                        </div>
                      );
                    }
                  )}
                </StoreListSlider>
              </MainStoreListContainer>
            );
          })
        : myPicList.map((data, idx) => {
            return (
              <MyPicListContainer key={idx}>
                <Title>{data.list_name}</Title>
                {isModifyAll && <DeleteListButton />}
                <StoreListSlider {...settings}>
                  {myPicList[idx].mylikeshop_list.map(item => {
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
                          {isModifyAll && (
                            <DeletStoreButton>
                              <DeletIcon />
                            </DeletStoreButton>
                          )}
                        </StoreContainer>
                        <StoreName>{item.shop_name}</StoreName>
                      </div>
                    );
                  })}
                </StoreListSlider>
              </MyPicListContainer>
            );
          })}
    </div>
  );
}
const MainStoreListContainer = styled.div``;

const DeleteListButton = styled.button`
  position: absolute;
  top: -16px;
  right: 20px;
  width: 30px;
  height: 30px;
  border-radius: 100%;
  background-color: #ff5000;
`;

const MyPicListContainer = styled.div`
  position: relative;
  padding: 20px 0 0 20px;
  margin-bottom: 20px;
  border-top: 1px solid lightgray;
  border-bottom: 1px solid lightgray;
`;

const Title = styled.div`
  margin-bottom: 10px;
  font-size: 18px;
  font-weight: bold;
  color: ${({ theme }) => theme.blacks};
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

const DeletStoreButton = styled.div`
  ${({ theme }) => theme.flexSet()};
  position: absolute;
  width: 100%;
  height: 100%;
  border-radius: 5px;
  background-color: #000000a0;
  z-index: 100;
`;

const DeletIcon = styled.img.attrs({
  src: "/images/plus.svg",
})`
  width: 50px;
  height: 50px;
  transform: rotate(45deg);
`;

const StoreCoupon = styled.div`
  ${({ theme }) => theme.imageSet(`url(/images/coupon_background.svg)`)};
  ${({ theme }) => theme.flexSet()};
  position: absolute;
  top: 4px;
  right: 4px;
  width: 30px;
  height: 16px;
`;

const StoreDiscount = styled.div`
  font-size: 10px;
  font-weight: 700;
  color: white;
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
  font-size: 14px;
  color: ${({ theme }) => theme.black};
`;
