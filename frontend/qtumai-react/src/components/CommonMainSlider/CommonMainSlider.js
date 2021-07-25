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

  const goToDetail = data => {
    history.push(`/shops/detail/${data.id}`);
  };

  return (
    <MainContainer>
      <MainSlider {...settings}>
        {!isLoading
          ? mainSlider.list.map((data, idx) => {
              return (
                <div key={idx}>
                  <ImageContainer
                    onClick={() => goToDetail(data)}
                    src={data.shop_info_url}
                  >
                    <ImageContextBox>
                      <ImageContext>
                        <ImageTitle>{mainSlider.title}</ImageTitle>
                        <ImageSubTitle>{data.shop_name}</ImageSubTitle>
                      </ImageContext>
                    </ImageContextBox>

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
  background-image: linear-gradient(to bottom, #000000f2 0%, #00000000 100%);
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

const ImageContextBox = styled.div`
  position: absolute;
  z-index: 2;
`;

const ImageContext = styled.div`
  position: relative;
  width: 160px !important;
  height: 40px !important;
  margin: 50px 0 0 30px;
  color: white;
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
