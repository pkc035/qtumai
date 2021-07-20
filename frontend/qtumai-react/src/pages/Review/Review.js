import React, { useState, useEffect } from "react";
import { useHistory } from "react-router";
import StarRating from "../../components/StarRating/StarRating";
import styled from "styled-components";

export default function Review() {
  const history = useHistory();
  const [taste, setTaste] = useState(0);
  const [clear, setClear] = useState(0);
  const [services, setServices] = useState(0);
  const [mood, setMood] = useState(0);
  const [price, setPrice] = useState(0);
  const [averageScore, setAverageScore] = useState(0);

  const [oneLineReview, setOneLineReview] = useState("");
  const [previewImage, setPreviewImage] = useState("");
  const [sendImage, setSendImage] = useState("");

  useEffect(() => {
    const scoreArr = [taste, clear, services, mood, price].filter(
      data => data !== 0
    );
    let averageRound;
    if (scoreArr.length !== 0) {
      averageRound = Math.round(
        scoreArr.reduce((acc, cur) => acc + cur) / scoreArr.length
      );
    }

    setAverageScore(averageRound);
  }, [taste, clear, services, mood, price]);

  const uploadPhoto = e => {
    const previewFile = [...e.target.files].map(file =>
      URL.createObjectURL(file)
    );
    console.log(previewFile);

    setPreviewImage(previewFile);
    // setSendImage(e.target.files);
  };

  const removePhoto = e => {
    setPreviewImage("");
  };

  const writeReview = e => {
    setOneLineReview(e.target.value);
  };

  return (
    <div>
      <Container>
        <Section>
          <BackButton
            onClick={() => {
              history.push("/Detail");
            }}
          />
          <Title>리뷰 작성하기</Title>
          <Bar></Bar>
        </Section>
        <Wrap>
          <Section>
            <RestaurantName>카치에페페 이수점</RestaurantName>
            <ScoreWrap>
              {RATING_DATA.map((list, idx) => {
                return (
                  <ScoreBox>
                    <ScoreTitle>{list.title}</ScoreTitle>
                    <StarBox>
                      <StarRating
                        name={list.title}
                        setTaste={setTaste}
                        setClear={setClear}
                        setServices={setServices}
                        setMood={setMood}
                        setPrice={setPrice}
                      ></StarRating>
                    </StarBox>
                  </ScoreBox>
                );
              })}
              <AverageScoreBox>
                <RestaurantName>카치에페페 이수점</RestaurantName>의 별점은
                <AverageScore>{averageScore}</AverageScore>점이에요!
              </AverageScoreBox>
            </ScoreWrap>
          </Section>
          <PhotoSection>
            <PhotoBox>
              <SubTitle>이미지 올리기</SubTitle>
              <Form>
                {!previewImage ? (
                  <UploadLabel>사진올리기</UploadLabel>
                ) : (
                  <RemoveLabel>삭제</RemoveLabel>
                )}
                {!previewImage ? (
                  <UploadInput
                    onChange={e => {
                      uploadPhoto(e);
                    }}
                  />
                ) : (
                  <RemoveInput
                    onClick={e => {
                      removePhoto(e);
                      e.preventDefault();
                    }}
                  />
                )}
              </Form>
            </PhotoBox>
            {previewImage && <PhotoPreviewImage src={previewImage} />}
          </PhotoSection>
          <Section>
            <SubTitle>한줄평가</SubTitle>
            <OneLineReview
              onChange={e => {
                writeReview(e);
              }}
            />
          </Section>
        </Wrap>
      </Container>
      <SubmitReviewButton>리뷰 저장하기</SubmitReviewButton>
    </div>
  );
}

const Container = styled.div`
  ${({ theme }) => theme.flexSet("flex-start", "center", "column")};
  min-height: 100vh;
  height: 100%;
`;
const Wrap = styled.div`
  width: 90%;
`;
const Section = styled.section`
  width: 100%;
  margin: 10px 0;
`;

const BackButton = styled.img.attrs({
  src: "/images/right-arrow (4).png",
})`
  position: absolute;
  top: 20px;
  left: 10px;
  width: 26px;
  height: 26px;
  transform: rotate(180deg);
  cursor: pointer;
`;
const Title = styled.div`
  margin: 20px 0;
  font-size: 16px;
  font-weight: bold;
  text-align: center;
`;
const Bar = styled.div`
  width: 100%;
  height: 1px;
  margin-bottom: 20px;
  background-color: lightgray;
`;
const PhotoSection = styled.section`
  ${({ theme }) => theme.flexSet("center", "center", "column")};
  /* margin: 20px 0; */
`;

const PhotoBox = styled.div`
  ${({ theme }) => theme.flexSet("space-between", "center")};
  width: 100%;
  margin: 20px 0;
`;

const PhotoPreviewImage = styled.img`
  width: 100%;
  height: 300px;
  border-radius: 5px;
`;

const RestaurantName = styled.span`
  font-weight: bold;
  padding: 10px 0px;
`;
const ScoreWrap = styled.div`
  ${({ theme }) => theme.flexSet("center", "center", "column")};
  margin: 10px 0;
`;
const ScoreBox = styled.div`
  ${({ theme }) => theme.flexSet("space-around", "center")};
  width: 90%;
  padding: 1px 0;
`;
const ScoreTitle = styled.div`
  flex: 2;
  text-align: center;
`;
const StarBox = styled.div`
  flex: 3;
  text-align: center;
`;

const AverageScoreBox = styled.div`
  margin: 8px 0 10px;
`;
const AverageScore = styled.span`
  margin: 0 7px;
  font-weight: bold;
  color: ${({ theme }) => theme.red};
`;
const SubTitle = styled.div`
  font-weight: 500;
`;
const Form = styled.form`
  ${({ theme }) => theme.flexSet("space-between", "center")};
`;

const OneLineForm = styled.form`
  float: right;
  margin-top: 10px;
`;

const Label = styled.label`
  ${({ theme }) => theme.flexSet("center", "center")};
  width: 130px;
  height: 28px;
  font-size: 15px;
  color: lightgray;
  border: 1px solid lightgray;
  border-radius: 3px;
  cursor: pointer;
`;

const UploadLabel = styled(Label).attrs({ for: "uploadPhoto" })``;

const RemoveLabel = styled(Label).attrs({ for: "removePhoto" })`
  background-color: ${({ theme }) => theme.red};
  color: white;
`;

const UploadInput = styled.input.attrs({ type: "file", id: "uploadPhoto" })`
  display: none;
`;

const RemoveInput = styled.input.attrs({ type: "file", id: "removePhoto" })`
  display: none;
`;
const OneLineReview = styled.input.attrs({
  placeholder: "평가를 작성해 주세요. (선택)",
})`
  width: 100%;
  padding: 20px 0 5px;
  border: 0px;
  border-bottom: 1px solid black;
`;
const UploadOneLine = styled.button``;
const SubmitReviewButton = styled.button`
  ${({ theme }) => theme.flexSet("center", "flex-start")};
  position: sticky;
  bottom: 0;
  right: 0;
  color: white;
  width: 100%;
  height: 60px;
  padding-top: 20px;
  font-weight: 500;
  z-index: 100;
  cursor: pointer;
  background-color: ${({ theme }) => theme.red};
`;

const RATING_DATA = [
  { id: 1, title: "맛" },
  { id: 2, title: "청결" },
  { id: 3, title: "서비스" },
  { id: 4, title: "분위기" },
  { id: 5, title: "가성비" },
];
