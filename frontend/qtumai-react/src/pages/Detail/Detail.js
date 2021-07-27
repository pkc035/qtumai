import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { GET_DETAIL_API, GET_PICLIST_API } from "../../config";
import CommonMainSlider from "../../components/CommonMainSlider/CommonMainSlider";
import CircularProgressBar from "../../components/CirclePercentageBar/CirclePercentageBar";
import SlideModal from "../../components/SlideModal/SlideModal";
import DetailModal from "../../components/DetailModal/DetailModal";
import DetailYesNoModal from "../../components/DetailYesNoModal/DetailYesNoModal";
import ProgressBar from "../../components/ProgressBar/ProgressBar";
import ReactStars from "react-rating-stars-component";
import Review from "../../components/Review/Review";
import styled from "styled-components";

export default function Detail() {
  const { id } = useParams();
  const [detailData, setDetailData] = useState([]);
  const shopId = detailData.id;
  const [isLoading, setIsLoading] = useState(false);
  const [style, setStyle] = useState([]);
  const [mylikeList, setMylikeList] = useState([]);

  const [isReview, setIsReview] = useState(false);
  const [reviewScore, setReviewScore] = useState([]);

  const [isBoss, setIsBoss] = useState(false);
  const [isLike, setIsLike] = useState(false);
  const [isSlideModal, setIsSlideModal] = useState(false);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [isOpenYesNoModal, setIsOpenYesNoModal] = useState(false);

  // const [islike, setIslike] = useState(false);

  useEffect(() => {
    fetch(`/data/detailPageData.json`, {
      method: "GET",
    })
      // fetch(`${GET_DETAIL_API}${id}/`, {
      //   method: "GET",
      // })
      .then(res => res.json())
      .then(data => {
        setDetailData(...data.results);
        setIsLoading(true);
      });
  }, []);

  useEffect(() => {
    fetch(`/data/mylikeList.json`, {
      method: "GET",
    })
      // fetch(`${GET_PICLIST_API}`, { method: "GET" })
      .then(res => res.json())
      .then(data => {
        let styleArr = [];
        for (let i = 0; i < data.results.length; i++) {
          if (shopId) {
            let style = data.results[i].mylikeshop_list.filter(
              data => data.shop_id === shopId
            );
            let preSelect = style.length !== 0 ? true : false;
            styleArr.push(preSelect);
          }
        }
        // const selectedArr = Array(data.results.length).fill(false);
        setMylikeList({ ...data });
        setStyle(styleArr);
      });
  }, [detailData]);
  console.log(style);

  const STARSCORE = {
    // size: 20,
    // value: 2.5,
    // edit: false,
    // isHalf: true,
    // color: "#e4e5e9",
    // activeColor: "#ff3000",
    size: 60,
    isHalf: true,
    char: "⭐",
    value: 3.5,
  };

  const averageReview = (clean, price, service, taste, vibe) => {
    let sumReview = [clean, price, service, taste, vibe];

    let averageRound = Math.round(
      sumReview.reduce((acc, cur) => acc + cur) / sumReview.length
    );
    setReviewScore(averageRound);
    return averageRound;
  };

  const { coupon, is_subscribe, shop_name, shop_description, shop_status } =
    detailData;
  return (
    <div>
      {detailData.length !== 0 && (
        <DetailContainer>
          <Hearbutton
            src={
              shop_status.like_status
                ? "/images/heartFill.svg"
                : "/images/heart.svg"
            }
            onClick={() => {
              setIsSlideModal(true);
              setIsLike(true);
            }}
          />
          {isLoading && (
            <CommonMainSlider isLoading={isLoading} detailSlider={detailData} />
          )}
          <DetailFlex>
            <DetailWrap>
              <LikeButton />
              <RestaurantInfoBox>
                <RestaurantInfo>
                  <Stars {...STARSCORE} />
                  <Name>{shop_name}</Name>
                  <Phrases>{shop_description}</Phrases>
                  <OperatingTime>09:00 - 12:00</OperatingTime>
                  <ShareButton />
                </RestaurantInfo>
                <Discount>
                  <DiscountPercentage>
                    15<span>%</span>
                  </DiscountPercentage>
                </Discount>
              </RestaurantInfoBox>

              <AddressBoxContainer>
                <Title>주소</Title>
                <AddressMap></AddressMap>
              </AddressBoxContainer>

              <FunctionContainer>
                <FunctionBox>
                  <Context>나와의 매칭</Context>
                  <CircularProgressBar percentage={88} />
                </FunctionBox>
                <FunctionBox>
                  <Context>현재 이상권의 붐빔 정도</Context>
                  <ProgressBar done={70} />
                </FunctionBox>
                <ButtonsBox>
                  <ButtonBox
                    onClick={() => {
                      setIsBoss(true);
                      setIsOpenYesNoModal(!isOpenYesNoModal);
                    }}
                  >
                    <CircleIcon />
                    <ButtonTitle>사장님이신가요?</ButtonTitle>
                  </ButtonBox>
                  <ButtonBox>
                    <CircleIcon />
                    <ButtonTitle>추천 받지 않기</ButtonTitle>
                  </ButtonBox>
                  <ButtonBox
                    onClick={() => {
                      setIsSlideModal(!isSlideModal);
                    }}
                  >
                    <CircleIcon />
                    <ButtonTitle>가게 정보 수정</ButtonTitle>
                  </ButtonBox>
                </ButtonsBox>
              </FunctionContainer>

              <ReviewContainer>
                <Title>매장 총점</Title>
                {detailData.review_set.map(
                  ({
                    img_path,
                    username,
                    content,
                    score_cleanliness,
                    score_price,
                    score_service,
                    score_taste,
                    score_vibe,
                  }) => {
                    return (
                      <ReviewBox>
                        <UserDetailBox>
                          <UserPhoto src={img_path} />
                          <div>
                            <Stars
                              score={() =>
                                averageReview(
                                  score_cleanliness,
                                  score_price,
                                  score_service,
                                  score_taste,
                                  score_vibe
                                )
                              }
                              value={reviewScore}
                            />
                            <UserId>{username}</UserId>
                          </div>
                        </UserDetailBox>
                        <ReviewComment>{content}</ReviewComment>
                      </ReviewBox>
                    );
                  }
                )}
              </ReviewContainer>
            </DetailWrap>
          </DetailFlex>
          {coupon ? (
            <VisitButton onClick={() => setIsOpenModal(!isOpenModal)}>
              방문 체크하기
            </VisitButton>
          ) : (
            <BenfitsButton
              onClick={() => {
                if (is_subscribe) {
                  setIsOpenModal(!isOpenModal);
                } else {
                  setIsOpenYesNoModal(!isOpenYesNoModal);
                }
              }}
            >
              혜택 사용하기
            </BenfitsButton>
          )}
          {isOpenModal && (
            <DetailModal
              shop_name={shop_name}
              is_subscribe={is_subscribe}
              setIsReview={setIsReview}
              setIsOpenModal={setIsOpenModal}
            />
          )}
          {isOpenYesNoModal && (
            <DetailYesNoModal
              is_subscribe={is_subscribe}
              isBoss={isBoss}
              setIsOpenYesNoModal={setIsOpenYesNoModal}
              setIsReview={setIsReview}
              setIsBoss={setIsBoss}
            />
          )}
          {isSlideModal && (
            <SlideModal
              isSlideModal={isSlideModal}
              setIsSlideModal={setIsSlideModal}
              isLike={isLike}
              setIsLike={setIsLike}
              setStyle={setStyle}
              style={style}
              mylikeList={mylikeList}
              shopId={detailData.id}
            />
          )}
          {isReview && <Review setIsReview={setIsReview} />}
        </DetailContainer>
      )}
    </div>
  );
}

const Hearbutton = styled.img`
  position: absolute;
  top: 30px;
  right: 16px;
  width: 22px;
  height: 22px;
  filter: invert(1);
  z-index: 1;
`;

const DetailContainer = styled.div`
  position: relative;
  /* overflow-x: hidden; */
`;

const DetailFlex = styled.div`
  ${({ theme }) => theme.flexSet()};
`;

const DetailWrap = styled.div`
  width: 90%;
`;

const LikeButton = styled.div``;

const RestaurantInfoBox = styled.div`
  position: absolute;
  top: 350px;
  display: flex;
  width: 90%;
  border: 1px solid #00000026;
  border-radius: 5px;
  box-shadow: 0px 1px 1px 1px #00000014;
`;

const RestaurantInfo = styled.div`
  flex: 3;
  padding: 20px 0 20px 20px;
  background-color: #fffffff9;
  border-radius: 5px 0 0 5px;
`;

const Stars = styled(ReactStars)``;

// const StarRating = styled(StarRating)`
//     margin-bottom: 10px;
// `;
const Name = styled.div`
  margin-top: 10px;
  font-size: 26px;
  font-weight: bold;
`;

const Phrases = styled.div`
  font-size: 11px;
  color: gray;
  margin: 2px 0;
`;

const OperatingTime = styled.div`
  margin-top: 10px;
  font-size: 12px;
  font-weight: bold;
`;

const ShareButton = styled.div``;

const Discount = styled.div`
  ${({ theme }) => theme.flexSet()};
  flex: 1.2;
  border-radius: 0 5px 5px 0;
  background-color: ${({ theme }) => theme.red};
`;

const DiscountPercentage = styled.div`
  color: white;
  font-size: 30px;
  font-weight: bold;
`;

const AddressBoxContainer = styled.section`
  margin-top: 100px;
`;

const Title = styled.div`
  font-size: 16px;
  font-weight: 600;
  margin: 5px 0;
`;

const AddressMap = styled.div`
  width: 100%;
  height: 160px;
  border: 1px solid #00000026;
  border-radius: 5px;
`;

const FunctionContainer = styled.section`
  margin: 20px 0;
`;
const FunctionBox = styled.div`
  ${({ theme }) => theme.flexSet("space-between")};
  padding: 2px 0;
`;

const Context = styled.span`
  font-size: 14px;
`;

// const MatchingPercentage = styled.span``;

// const CrowdedPercentage = styled.span``;

const ButtonsBox = styled.span`
  ${({ theme }) => theme.flexSet()};
  margin: 20px 0;
`;

const ButtonBox = styled.span`
  ${({ theme }) => theme.flexSet("center", "center", "column")};
  padding: 0 10px;
`;

const CircleIcon = styled.span`
  width: 54px;
  height: 54px;
  border: 1px solid #00000026;
  border-radius: 100px;
`;

const ButtonTitle = styled.span`
  font-size: 12px;
  margin-top: 10px;
`;

const ReviewContainer = styled.section``;

const ReviewBox = styled.div`
  ${({ theme }) => theme.flexSet("center", "flex-start", "column")};
  width: 100%;
  height: 90px;
  border: 1px solid #00000026;
  border-radius: 3px;
  padding: 16px;
`;

const UserDetailBox = styled.div`
  ${({ theme }) => theme.flexSet("flex-start", "center")};
`;

const UserPhoto = styled.div`
  width: 36px;
  height: 36px;
  margin-right: 5px;
  border-radius: 100%;
  background-color: black;
`;

const Star = styled.div``;

const UserId = styled.div`
  font-size: 10px;
  font-weight: bold;
`;

const ReviewComment = styled.div`
  font-size: 14px;
  margin-top: 5px;
`;

const BenfitsButton = styled.button`
  ${({ theme }) => theme.flexSet("center", "flex-start")};
  position: sticky;
  bottom: 0;
  right: 0;
  color: white;
  width: 100%;
  height: 60px;
  padding-top: 20px;
  font-weight: 500;
  cursor: pointer;
  background-color: ${({ theme }) => theme.red};
`;

const VisitButton = styled(BenfitsButton)``;
