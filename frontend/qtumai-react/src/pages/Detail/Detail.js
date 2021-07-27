import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { GET_DETAIL_API, GET_PICLIST_API } from "../../config";

import KakaoMap from "../../components/KakaoMap/KakaoMap";
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
        setMylikeList({ ...data });
        setStyle(styleArr);
      });
  }, [detailData]);

  const STARSCORE = {
    size: 18,
    value: detailData.naver_score,
    edit: false,
    isHalf: true,
    color: "#e4e5e9",
    activeColor: "#ff3000",
    emptyIcon: <i className="fa fa-star" />,
    halfIcon: <i className="fas fa-star-half" />,
    filledIcon: <i className="fa fa-star" />,
  };

  const STARBACKGROUND = {
    size: 18,
    value: 5,
    edit: false,
    activeColor: "#e4e5e9",
    emptyIcon: <i className="fa fa-star" />,
    filledIcon: <i className="fa fa-star" />,
  };

  const averageReview = (clean, price, service, taste, vibe) => {
    let sumReview = [clean, price, service, taste, vibe];

    let averageRound = Math.round(
      sumReview.reduce((acc, cur) => acc + cur) / sumReview.length
    );
    setReviewScore(averageRound);
    return averageRound;
  };

  const {
    coupon,
    is_subscribe,
    shop_name,
    shop_description,
    shop_status,
    latitude,
    longitude,
  } = detailData;
  return (
    <div>
      {detailData.length !== 0 && (
        <DetailContainer>
          <IconBox>
            <BackButton />
            <div>
              <ShareButton />
              <Hearbutton
                src={
                  shop_status.like_status
                    ? "/images/picLike_fill.svg"
                    : "/images/picLike.svg"
                }
                onClick={() => {
                  setIsSlideModal(true);
                  setIsLike(true);
                }}
              />
            </div>
          </IconBox>

          {isLoading && (
            <CommonMainSlider isLoading={isLoading} detailSlider={detailData} />
          )}
          <DetailFlex>
            <DetailWrap>
              <LikeButton />
              <RestaurantInfoBox>
                <RestaurantInfo>
                  <StarBox>
                    <Stars {...STARSCORE} />
                  </StarBox>
                  <BackgroundStars {...STARBACKGROUND} />
                  <Name>{shop_name}</Name>
                  <Phrases>{shop_description}</Phrases>
                  <Phrases>대표메뉴: 파스타</Phrases>
                </RestaurantInfo>
                <Discount>
                  <DiscountPercentage>
                    15<span>%</span>
                  </DiscountPercentage>
                </Discount>
              </RestaurantInfoBox>

              <OpeningContainer>
                <BoldText>영업시간</BoldText>
                <Bar />
                <BoldText>09:00 - 12:00</BoldText>
              </OpeningContainer>

              <AddressContainer>
                <AddressBox>
                  <BoldText>주소</BoldText>
                  <Bar />
                  <BoldText>{detailData.shop_address_road}</BoldText>
                </AddressBox>
                <AddressMap>
                  <KakaoMap
                    size={DETAIL_MAPSIZE}
                    lat={latitude && latitude}
                    lng={longitude && longitude}
                  />
                </AddressMap>
              </AddressContainer>

              <FunctionContainer>
                <FunctionBox>
                  <Context>나와의 매칭</Context>
                  <CircularProgressBar
                    percentage={30}
                    size={{ ...DETAIL_CIRCLEBAR }}
                  />
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
                    <CircleIcon photoUrl="/images/boss.svg" />
                    <ButtonTitle>사장님이신가요?</ButtonTitle>
                  </ButtonBox>
                  <ButtonBox>
                    <CircleIcon photoUrl="/images/hate.svg" />
                    <ButtonTitle>추천 받지 않기</ButtonTitle>
                  </ButtonBox>
                  <ButtonBox
                    onClick={() => {
                      setIsSlideModal(!isSlideModal);
                    }}
                  >
                    <CircleIcon photoUrl="/images/modify.svg" />
                    <ButtonTitle>가게 정보 수정</ButtonTitle>
                  </ButtonBox>
                </ButtonsBox>
              </FunctionContainer>

              <ReviewContainer>
                <BoldText>매장 총점</BoldText>
                {detailData.review_set.map(
                  ({
                    id,
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
                      <ReviewBox key={id}>
                        <UserDetailBox>
                          <UserPhoto userPhoto={img_path} />
                          <div>
                            <Stars
                              score={() => {
                                averageReview(
                                  score_cleanliness,
                                  score_price,
                                  score_service,
                                  score_taste,
                                  score_vibe
                                );
                              }}
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

const IconBox = styled.div`
  ${({ theme }) => theme.flexSet("space-between", "center")};
  position: absolute;
  width: 100%;
  top: 50px;
  padding: 0 20px;
  z-index: 1;
`;

const BackButton = styled.img.attrs({
  src: "/images/back.svg",
})`
  width: 20px;
  height: 21px;
`;

const ShareButton = styled.img.attrs({
  src: "/images/share.svg",
})`
  width: 20px;
  height: 23px;
  margin-right: 10px;
`;

const Hearbutton = styled.img`
  width: 24px;
  height: 22px;
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
  top: 300px;
  display: flex;
  width: 90%;
  border: 1px solid #00000026;
  border-radius: 5px;
  box-shadow: 0px 1px 1px 1px #00000014;
`;

const RestaurantInfo = styled.div`
  flex: 3;
  padding: 10px 0 10px 20px;
  background-color: #fffffff9;
  border-radius: 5px 0 0 5px;
`;

const StarBox = styled.div`
  position: absolute;
  top: 10px;
  left: 20px;
  z-index: 2;
`;

const Stars = styled(ReactStars)``;

const BackgroundStars = styled(ReactStars)``;

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

const Discount = styled.div`
  ${({ theme }) => theme.flexSet()};
  ${({ theme }) => theme.imageSet(`url(/images/detailCoupon_background.svg)`)};
  background-color: #fffffff9;
  flex: 1.5;
  border-radius: 0 5px 5px 0;
`;

const DiscountPercentage = styled.div`
  color: white;
  font-size: 30px;
  font-weight: bold;
`;

const OpeningContainer = styled.section`
  ${({ theme }) => theme.flexSet("flex-start", "center")};
  margin: 50px 0 20px;
`;

const AddressContainer = styled.section``;

const AddressBox = styled.div`
  ${({ theme }) => theme.flexSet("flex-start", "center")};
`;

const BoldText = styled.div`
  font-size: 16px;
  font-weight: 600;
  margin: 8px 2px 10px 0;
`;

const Bar = styled.div`
  width: 2px;
  height: 18px;
  margin: 0 8px 5px;
  background-color: ${({ theme }) => theme.black};
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
  font-size: 16px;
  font-weight: 500;
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
  ${({ theme, photoUrl }) => theme.imageSet(`url(${photoUrl})`, "55%")};
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
  padding: 16px;
  margin-bottom: 10px;
  border: 1px solid #00000026;
  border-radius: 3px;
`;

const UserDetailBox = styled.div`
  ${({ theme }) => theme.flexSet("flex-start", "center")};
`;

const UserPhoto = styled.div`
  ${({ theme, userPhoto }) =>
    userPhoto
      ? theme.imageSet(`url(${userPhoto})`)
      : theme.imageSet(`url(/images/basicProfile.svg)`)}
  width: 36px;
  height: 36px;
  margin-right: 5px;
  border-radius: 100%;
`;

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
  width: 100%;
  height: 60px;
  padding-top: 20px;
  font-weight: 500;
  color: white;
  z-index: 10;
  background-color: ${({ theme }) => theme.red};
`;

const VisitButton = styled(BenfitsButton)``;

const DETAIL_MAPSIZE = {
  width: "100%",
  height: "160px",
};

const DETAIL_CIRCLEBAR = {
  circular_w_h: "30px",
  inner_w_h: "24px",
  endPoint_w_h: "6px",
  inner_margin: "-12px 0px 0px -12px",
  bar_clip: "rect(0px, 30px, 30px, 15px)",
  prigress_clip: "rect(0px, 15px, 30px, 0px)",
  numb_size: "12px",
};
