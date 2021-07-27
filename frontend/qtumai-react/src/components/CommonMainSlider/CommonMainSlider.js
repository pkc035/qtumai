import React from "react";
import { useHistory } from "react-router";
import Slider from "react-slick";
import styled from "styled-components";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function CommonMainSlider({
  mainSlider,
  detailSlider,
  isLoading,
}) {
  const history = useHistory();

  let settings = {
    dots: true,
    infinite: true,
    fade: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    // autoplay: true,
  };

  const goToDetail = id => {
    history.push(`/shops/detail/${id}`);
  };

  return (
    <MainContainer>
      <MainSlider {...settings}>
        {!isLoading
          ? mainSlider.list.map(
              ({ id, shopimage_set, shop_description, coupon_set }) => {
                return (
                  <div key={id}>
                    <ImageContainer
                      onClick={() => goToDetail(id)}
                      src={shopimage_set}
                    >
                      <ImageContextBox>
                        <ImageContext>
                          <div>
                            <ImageTitle>{mainSlider.title}</ImageTitle>
                            <ImageSubTitle>{shop_description}</ImageSubTitle>
                          </div>
                          <Coupon>{coupon_set[0]}</Coupon>
                        </ImageContext>
                      </ImageContextBox>

                      <BlackGradetion />
                    </ImageContainer>
                  </div>
                );
              }
            )
          : detailSlider.shop_image_list.map((data, idx) => {
              return (
                <div key={idx}>
                  <ImageContainer src={data}>
                    <BlackGradetion />
                  </ImageContainer>
                </div>
              );
            })}
      </MainSlider>
    </MainContainer>
  );
}
const BlackGradetion = styled.span`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 200px;
  background-image: linear-gradient(to bottom, #0000001a 0%, #00000000 100%);
  z-index: 1;
`;

const MainSlider = styled(Slider)`
  height: 400px;
  .slick-dots {
    bottom: 5px;
  }

  .slick-dots li {
    margin: 0px;
  }

  .slick-dots li button:before {
    color: #c2c2c2;
    opacity: 0.5;
  }

  .slick-dots li.slick-active button:before {
    color: #e63d11;
    opacity: 1;
  }
`;

const ImageContainer = styled.div`
  width: 100%;
  height: 400px;
  background-image: ${({ src }) => `url(${src})`};
  background-size: cover;
  background-position: center;
  transition: 0.2s;
  overflow: hidden;
`;

const ImageContextBox = styled.div``;
const MainContainer = styled.div``;

const ImageContext = styled.div`
  ${({ theme }) => theme.flexSet("space-between", "flex-start")}
  position: absolute;
  height: 100%;
  width: 100vw;
  padding: 50px 30px 0 30px;
  color: white;
  z-index: 2;
`;

const ImageTitle = styled.div`
  position: relative;
  font-size: 26px;

  &::after {
    content: "";
    position: absolute;
    bottom: -7px;
    left: 0px;
    width: 24px;
    height: 3px;
    background-color: white;
  }
`;

const ImageSubTitle = styled.div`
  width: 200px;
  margin-top: 14px;
  font-size: 32px;
  font-weight: bold;
  color: white;
`;

const Coupon = styled.div`
  ${({ theme }) => theme.flexSet()};
  ${({ theme }) => theme.imageSet(`url(/images/coupon_background.svg)`)};
  width: 50px;
  height: 28px;
  padding-top: 2px;
  font-weight: bold;
`;
