import React, { useState, useEffect } from "react";
// import { customFetch } from "../../utils/customFetch";
import MainStoreList from "../../components/MainStoreList/MainStoreList";
import Slider from "react-slick";
import styled from "styled-components";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function SimpleSlider() {
  const [mainContent, setMainContent] = useState([]);
  const [personalContents, setPersonalContent] = useState([]);

  useEffect(() => {
    fetch("data/mainPageData.json", {
      method: 'GET',
    })
      .then(res => res.json())
      .then(data => {
        const newMainContent = data.filter(({ title }) => title === '오늘의 추천');
        const newPersonalContents = data.filter(({ title }) => title !== '오늘의 추천');

        setMainContent(...newMainContent);
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
        {mainContent.length !== 0 && mainContent.list.map(data => {
          return (
            <div key={data.id}>
              <ImageContainer src={data.shop_info_url}>
                <ImageContext>
                  <ImageTitle>{mainContent.title}</ImageTitle>
                  <ImageSubTitle>{data.shop_name}</ImageSubTitle>
                </ImageContext>
                <BlackGradetion />
              </ImageContainer>
            </div>
          );
        })}
      </MainSlider>
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
