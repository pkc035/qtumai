import React from "react";
import Slider from "react-slick";
import styled from "styled-components";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function CommonMainSlider({
  mainSlider,
  detailSlider,
  isLoading,
}) {
  let settings = {
    dots: true,
    infinite: true,
    fade: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    // autoplay: true,
  };
  return (
    <MainContainer>
      <MainSlider {...settings}>
        {!isLoading
          ? mainSlider.list.map((data, idx) => {
              return (
                <div key={idx}>
                  <ImageContainer src={data.shop_info_url}>
                    <ImageContext>
                      {mainSlider.title && (
                        <ImageTitle>{mainSlider.title}</ImageTitle>
                      )}
                      <ImageSubTitle>{data.shop_name}</ImageSubTitle>
                    </ImageContext>
                    <BlackGradetion />
                  </ImageContainer>
                </div>
              );
            })
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

const MainContainer = styled.div`
  position: relative;
  overflow-x: hidden;
`;

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

  .slick-list {
    width: 100%;
    height: 100%;
  }

  .slick-slide {
    div {
      width: 100%;
      height: 100%;
    }
  }

  .slick-track {
    height: 100%;
  }

  .slick-dots {
    bottom: 10px;
  }
`;

const ImageContainer = styled.div`
  width: 100%;
  height: 100%;
  background-image: ${({ src }) => `url(${src})`};
  background-size: cover;
  background-position: center;
  transition: 0.2s;
  overflow: hidden;
`;

const ImageContext = styled.div`
  position: absolute;
  top: 0;
  height: 40px !important;
  width: 190px !important;
  margin: 50px 0 0 30px;
  color: white;
  z-index: 2;
`;

const ImageTitle = styled.div`
  font-size: 26px;

  &::after {
    content: "";
    position: absolute;
    bottom: 6px;
    left: 0px;
    width: 26px;
    height: 2px;
    background-color: white;
  }
`;

const ImageSubTitle = styled.div`
  font-size: 32px;
  font-weight: bold;
  line-height: 1.2;
  color: white;
`;
