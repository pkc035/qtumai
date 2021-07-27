import React, { useState, useEffect } from "react";
import styled from "styled-components";
import BottomButton from "../../../components/BottomButton";
import DaumPostcode from "react-daum-postcode";

function BusinessApplication() {
  const [count, setCount] = useState(0);
  const [previewImages, setPreviewImages] = useState([]);
  const [sendImages, setSendImages] = useState([]);
  const [isAdressOn, setIsAdressOn] = useState(false);
  const [adress, setAdress] = useState({
    fullAddress: "",
    latitude: 0,
    longitude: 0,
  });

  const { kakao } = window;

  const uploadPhoto = e => {
    if (previewImages.length < 4) {
      const fileArray = [...e.target.files].map(file =>
        URL.createObjectURL(file)
      );
      if (fileArray.length + previewImages.length < 4) {
        setPreviewImages(previewImages => previewImages.concat(fileArray));
        setSendImages(sendImages => sendImages.concat([...e.target.files]));
      } else alert("사진은 최대 3개까지 업로드 가능합니다");
    } else alert("사진은 최대 3개까지 업로드 가능합니다");
  };

  const Postcode = data => {
    let geocoder = new kakao.maps.services.Geocoder();
    let fullAddress = data.address;
    let extraAddress = "";

    if (data.addressType === "R") {
      if (data.bname !== "") {
        extraAddress += data.bname;
      }
      if (data.buildingName !== "") {
        extraAddress +=
          extraAddress !== "" ? `, ${data.buildingName}` : data.buildingName;
      }
      fullAddress += extraAddress !== "" ? ` (${extraAddress})` : "";
    }
    setIsAdressOn(false);

    geocoder.addressSearch(fullAddress, function (result, status) {
      if (status === kakao.maps.services.Status.OK) {
        let coords = new kakao.maps.LatLng(result[0].y, result[0].x);

        setAdress({
          fullAddress: fullAddress,
          latitude: coords.La,
          longitude: coords.Ma,
        });
      }
    });
  };

  const postCodeStyle = {
    display: "block",
    position: "fixed",
    top: "0px",
    left: "0px",
    zIndex: "100",
  };

  useEffect(() => {
    setCount(previewImages.length);
  }, [previewImages]);

  const removePhoto = idx => {
    setPreviewImages([
      ...previewImages.slice(0, idx),
      ...previewImages.slice(idx + 1, previewImages.length),
    ]);
    setSendImages([
      ...sendImages.slice(0, idx),
      ...sendImages.slice(idx + 1, sendImages.length),
    ]);
    setCount(count - 1);
  };

  return (
    <Content>
      <TitleWrap>
        <Title>상호명</Title>
        <SubTitle placeholder="팟 플레이스 이수점" />
      </TitleWrap>
      <TitleWrap>
        <Title>카테고리</Title>
        <SubTitle placeholder="팟 플레이스 이수점" />
      </TitleWrap>
      <TitleWrap>
        <Title>사업자 등록증</Title>
        <UploadLabel for="Business_Registration">파일 선택</UploadLabel>
        <FileUproad
          type="file"
          id="Business_Registration"
          accept=".jpg, .jpeg, .png"
        />
      </TitleWrap>
      <TitleWrap>
        <Title>매장 위치</Title>
        <SubTitle
          placeholder="서울시 테헤란로 OO길-OO"
          onClick={() => setIsAdressOn(true)}
          value={adress.fullAddress}
        />
        {isAdressOn && (
          <DaumPostcode
            onComplete={Postcode}
            style={postCodeStyle}
            animation={true}
            height={"100%"}
          />
        )}
      </TitleWrap>
      <TitleWrap>
        <Title>매장 전화번호</Title>
        <SubTitle placeholder="02.1234.5678" />
      </TitleWrap>
      <TitleWrap>
        <Title>운영시간</Title>
        <OperatingTimeWrap>
          <OperatingTime>
            월요일 오픈 : <OperatingTimeInput type="time" /> | 마감 :{" "}
            <OperatingTimeInput type="time" />
          </OperatingTime>
          <OperatingTime>
            화요일 오픈 : <OperatingTimeInput type="time" /> | 마감 :{" "}
            <OperatingTimeInput type="time" />
          </OperatingTime>
          <OperatingTime>
            수요일 오픈 : <OperatingTimeInput type="time" /> | 마감 :{" "}
            <OperatingTimeInput type="time" />
          </OperatingTime>
          <OperatingTime>
            목요일 오픈 : <OperatingTimeInput type="time" /> | 마감 :{" "}
            <OperatingTimeInput type="time" />
          </OperatingTime>
          <OperatingTime>
            금요일 오픈 : <OperatingTimeInput type="time" /> | 마감 :{" "}
            <OperatingTimeInput type="time" />
          </OperatingTime>
          <OperatingTime>
            토요일 오픈 : <OperatingTimeInput type="time" /> | 마감 :{" "}
            <OperatingTimeInput type="time" />
          </OperatingTime>
          <OperatingTime>
            일요일 오픈 : <OperatingTimeInput type="time" /> | 마감 :{" "}
            <OperatingTimeInput type="time" />
          </OperatingTime>
        </OperatingTimeWrap>
      </TitleWrap>
      <TitleWrap>
        <Title>기타사항</Title>
        <SubTitle placeholder="매주 일요일 및 공휴일은 휴무입니다." />
      </TitleWrap>
      <TitleWrap>
        <Title>가게 음식 메인사진</Title>
        <UploadLabel for="photo">사진 업로드하기 {count}/3</UploadLabel>
        <FileUproad
          type="file"
          id="photo"
          accept=".jpg, .jpeg, .png"
          onChange={uploadPhoto}
          multiple={true}
        />
      </TitleWrap>
      <PhotoWrap>
        <PhotoImage>
          {previewImages[0] && (
            <React.Fragment>
              <Photo alt="dd" src={previewImages[0]} />
              <DeletePhoto onClick={() => removePhoto(0)}>
                <CloseImage alt="close" src="/images/Profile/close.png" />
              </DeletePhoto>
            </React.Fragment>
          )}
        </PhotoImage>
        <PhotoImage>
          {previewImages[1] && (
            <React.Fragment>
              <Photo alt="dd" src={previewImages[1]} />
              <DeletePhoto onClick={() => removePhoto(1)}>
                <CloseImage alt="close" src="/images/Profile/close.png" />
              </DeletePhoto>
            </React.Fragment>
          )}
        </PhotoImage>
        <PhotoImage>
          {previewImages[2] && (
            <React.Fragment>
              <Photo alt="dd" src={previewImages[2]} />
              <DeletePhoto onClick={() => removePhoto(2)}>
                <CloseImage alt="close" src="/images/Profile/close.png" />
              </DeletePhoto>
            </React.Fragment>
          )}
        </PhotoImage>
      </PhotoWrap>
      <TitleWrap>
        <Title>대표 메뉴</Title>
        <SubTitle placeholder="팟 플레이스 이수점" />
      </TitleWrap>
      <LastTitle>관리자 승인 후 비즈니스 관리 페이지가 오픈됩니다.</LastTitle>
      <BottomButton title={"제출하기"} />
    </Content>
  );
}

export default BusinessApplication;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100vw;
  /* height: 100vh; */
`;

const TitleWrap = styled.div`
  display: flex;
  margin-top: 8%;
  width: 100%;
  justify-content: space-between;
  flex-direction: column;
`;

const Title = styled.div`
  margin-left: 5%;
`;

const SubTitle = styled.input`
  padding: 15px 10px;
  margin: 2% 5% 0;
  color: #c1c1c1;
  border: 1px solid #c1c1c1;
  border-radius: 5px;
`;

const LastTitle = styled.div`
  position: relative;
  margin: 10% 0 40%;
  color: #c1c1c1;
`;

const FileUproad = styled.input`
  position: absolute;
  width: 1px;
  height: 1px;
  overflow: hidden;
`;

const PhotoWrap = styled.div`
  display: flex;
  margin: 8% 5% 0 5%;
  width: 100%;
  justify-content: space-between;
`;

const PhotoImage = styled.div`
  position: relative;
  margin: 0 5%;
  border-radius: 3%;
  width: 100%;
  height: 80px;
  /* overflow: hidden; */
  background-color: #c1c1c1;
`;

const DeletePhoto = styled.button`
  position: absolute;
  right: -5%;
  top: -5%;
  width: 20px;
  height: 20px;
  background-color: #c1c1c1;
  border-radius: 10px;
`;

const Photo = styled.img`
  position: absolute;
  width: 100%;
  height: 100%;
  border-radius: 3%;
  object-fit: cover;
`;

const UploadLabel = styled.label`
  padding: 15px 10px;
  margin: 2% 5% 0;
  color: #c1c1c1;
  border: 1px solid #c1c1c1;
  border-radius: 5px;
`;

const CloseImage = styled.img`
  width: 100%;
`;

const OperatingTimeInput = styled.input`
  width: 100px;
  background-color: #fff;
  border: 1px solid #c1c1c1;
  border-radius: 5px;
`;

const OperatingTimeWrap = styled.div`
  display: flex;
  flex-direction: column;
`;

const OperatingTime = styled.div`
  margin: 3% 5% 0;
`;
