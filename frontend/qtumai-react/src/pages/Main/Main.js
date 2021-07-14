import React from "react";
import Slider from "react-slick";
import MainStoreList from "../../components/MainStoreList/MainStoreList";
import styled from "styled-components";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function SimpleSlider() {
  const MAIN_STORE_SLIDER = [
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
        {MAIN_STORE_SLIDER.map(item => {
          return (
            <div key={item.id}>
              <ImageContainer src={item.url}>
                <ImageContext>
                  <ImageTitle>{item.title}</ImageTitle>
                  <ImageSubTitle>{item.text}</ImageSubTitle>
                </ImageContext>
                <BlackGradetion />
              </ImageContainer>
            </div>
          );
        })}
      </MainSlider>
      <MainStoreWrap>
        <MainStoreList />
      </MainStoreWrap>
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

const MainStoreWrap = styled.div`
  padding: 40px 0 0 20px;
`;
