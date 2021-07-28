import React, { useState } from "react";
import styled from "styled-components";
import BottomButton from "../../../components/BottomButton";
import SignupPreference from "../../Signup/SignupNext/SignupPreference";

function ProfileEdit() {
  const [previewImages, setPreviewImages] = useState([
    "/images/Social/kakaotalk_logo.jpg",
  ]);
  const [sendImages, setSendImages] = useState([]);
  const [profileEditModalOn, setProfileEditModalOn] = useState(false);
  const [preference, setPreference] = useState([]);

  const uploadPhoto = e => {
    const fileArray = [...e.target.files].map(file =>
      URL.createObjectURL(file)
    );
    setPreviewImages(fileArray);
    setSendImages(sendImages => sendImages.concat([...e.target.files]));
  };

  console.log(preference);

  function handleModal() {
    setProfileEditModalOn(!profileEditModalOn);
  }

  function goToBack() {
    window.ReactNativeWebView.postMessage("Success!");
  }

  function editProfile() {
    fetch("http://192.168.0.68:8000/accounts/account", {
      method: "POST",
      body: JSON.stringify({
        taste_service: preference[0],
        taste_cleanliness: preference[1],
        taste_vibe: preference[2],
        taste_price: preference[3],
        service_cleanliness: preference[4],
        service_vibe: preference[5],
        service_price: preference[6],
        cleanliness_vibe: preference[7],
        cleanliness_price: preference[8],
        vibe_price: preference[9],
        area_name: "홍은동",
        latitude: 30,
        longitude: 30,
      }),
    })
      .then(res => res.json())
      .then(res => {
        console.log(res);
        // localStorage.setItem("access", res.access);
        // localStorage.setItem("refresh", res.refresh);
      });
  }

  console.log(sendImages, previewImages);
  return (
    <Content>
      <Title>
        <BackButton onClick={goToBack}>
          <ArrowImage src="/images/Social/arrow.png" />
        </BackButton>
        <Subject>프로필 편집 </Subject>
      </Title>
      <ProfileWrap>
        <PhotoImage>
          <Profilesrc alt="profile" src={previewImages[0]} />
        </PhotoImage>
        <PhotoEdit>
          <UploadLabel for="photo">
            <EditProfile alt="profile" src="/images/Profile/photoEdit.png" />
          </UploadLabel>
          <FileUproad
            type="file"
            id="photo"
            accept=".jpg, .jpeg, .png"
            onChange={uploadPhoto}
            multiple={false}
          />
        </PhotoEdit>
      </ProfileWrap>
      <InputWrap>
        <Name>이름</Name>
        <Info>
          <Gender>성별</Gender>
          <Birth>생년월일</Birth>
        </Info>
        <PhoneNumber>휴대폰번호</PhoneNumber>
        <AdressWrap>
          <Adress placeholder="사는곳" />
          <Edit>수정</Edit>
        </AdressWrap>
        <PreferenceWrap>
          <Preference>관심사</Preference>
          <Edit onClick={handleModal}>수정</Edit>
          {profileEditModalOn && (
            <SignupPreference
              setProfileEditModalOn={setProfileEditModalOn}
              profileEditModalOn={profileEditModalOn}
              setPreference={setPreference}
            />
          )}
        </PreferenceWrap>
      </InputWrap>
      <BottomButton onClick={editProfile} title={"편집완료"} />
    </Content>
  );
}

export default ProfileEdit;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100vw;
  height: 100vh;
`;

const Title = styled.div`
  display: flex;
  position: absolute;
  width: 100%;
  z-index: 100;
  background-color: #fff;
`;

const Subject = styled.p`
  margin: 25px auto;
  font-weight: 700;
  font-size: 25px;
  color: #424242;
`;

const BackButton = styled.button`
  position: absolute;
  margin-top: 10px;
  padding: 10px;
`;

const ArrowImage = styled.img`
  width: 30px;
  transform: rotate(180deg);
`;

const ProfileWrap = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 100px;
`;

const InputWrap = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const Profilesrc = styled.img`
  width: 100%;
  height: 100%;
  border-radius: 50%;
  border: 1px solid #ccc;
  object-fit: cover;
`;

const PhotoEdit = styled.button`
  position: absolute;
  width: 40px;
  height: 40px;
  background-color: #fff;
  border-radius: 50%;
  border: 1px solid #c1c1c1;
  transform: translate(90%, 230%);
`;

const EditProfile = styled.img`
  position: absolute;
  left: 50%;
  top: 50%;
  width: 100%;
  padding: 20%;
  transform: translate(-50%, -50%);
`;

const Name = styled.div`
  margin: 5% 5% 0% 5%;
  padding-bottom: 3%;
  border-bottom: 1px solid #ccc;
`;

const Gender = styled.div`
  margin: 5% 5% 5% 5%;
  width: 50%;
  padding-bottom: 3%;
  border-bottom: 1px solid #ccc;
`;

const Birth = styled.div`
  margin: 5% 5% 5% 5%;
  width: 50%;
  padding-bottom: 3%;
  border-bottom: 1px solid #ccc;
`;

const PhoneNumber = styled.div`
  margin: 5% 5% 0% 5%;
  padding-bottom: 3%;
  border-bottom: 1px solid #ccc;
`;

const Adress = styled.input`
  /* position: relative; */
  /* margin: 5% 5% 0% 5%; */
  width: 100%;
  padding-bottom: 3%;
  border: none;
  border-bottom: 1px solid #ccc;
`;

const Info = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Edit = styled.button`
  position: absolute;
  right: 0;
  margin-right: 5%;
  color: #ff3000;
  font-weight: 700;
`;

const UploadLabel = styled.label`
  /* margin-right: 5%;
  color: #c1c1c1;
  border: 1px solid #c1c1c1;
  padding: 5px; */
`;

const FileUproad = styled.input`
  position: absolute;
  width: 1px;
  height: 1px;
  overflow: hidden;
`;

const PhotoImage = styled.div`
  position: relative;
  border-radius: 50%;
  width: 125px;
  height: 125px;
  overflow: hidden;
  background-color: #c1c1c1;
`;

const AdressWrap = styled.div`
  margin: 5% 5% 0% 5%;
`;

const PreferenceWrap = styled.div`
  margin: 5% 5% 0% 5%;
`;

const Preference = styled.h2`
  display: inline-block;
  width: 100%;
  border: none;
`;
