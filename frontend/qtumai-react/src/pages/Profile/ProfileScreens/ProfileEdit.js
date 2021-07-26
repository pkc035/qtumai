import React, { useState } from "react";
import styled from "styled-components";
import BottomButton from "../../../components/BottomButton";

function ProfileEdit() {
  const [previewImages, setPreviewImages] = useState([
    "/images/Social/kakaotalk_logo.jpg",
  ]);
  const [sendImages, setSendImages] = useState([]);

  const uploadPhoto = e => {
    const fileArray = [...e.target.files].map(file =>
      URL.createObjectURL(file)
    );
    setPreviewImages(fileArray);
    setSendImages(sendImages => sendImages.concat([...e.target.files]));
  };

  console.log(sendImages, previewImages);
  return (
    <Content>
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
        <Adress>
          사는곳<Edit>수정</Edit>
        </Adress>
      </InputWrap>
      <BottomButton title={"편집완료"} />
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

const ProfileWrap = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 5%;
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

const Adress = styled.div`
  position: relative;
  margin: 5% 5% 0% 5%;
  padding-bottom: 3%;
  border-bottom: 1px solid #ccc;
`;

const Info = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Edit = styled.div`
  position: absolute;
  margin-top: -5%;
  right: 0;
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
