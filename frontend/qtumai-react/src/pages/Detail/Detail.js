import React, { useState, useEffect } from "react";
// import { customFetch } from "../../utils/customFetch";
import CommonMainSlider from "../../components/CommonMainSlider/CommonMainSlider";
import CircularProgressBar from "../../components/CirclePercentageBar/CirclePercentageBar";
import DetailModal from "../../components/DetailModal/DetailModal";
import DetailYesNoModal from "../../components/DetailYesNoModal/DetailYesNoModal";
import ProgressBar from "../../components/ProgressBar/ProgressBar";
import ReactStars from "react-rating-stars-component";
import styled from "styled-components";

export default function Detail() {
  const [detailData, setDetailData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isBoss, setIsBoss] = useState(false);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [isOpenYesNoModal, setIsOpenYesNoModal] = useState(false);

  useEffect(() => {
    fetch("data/detailPageData.json", {
      method: "GET",
    })
      .then(res => res.json())
      .then(data => {
        setDetailData(...data);
        setIsLoading(true);
      });
  }, []);

  const STARSCORE = {
    size: 20,
    value: 2.5,
    edit: false,
    isHalf: true,
    color: "#e4e5e9",
    activeColor: "#ff3000",
  };

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

  console.log(detailData);

  const { coupon, is_subscribe, shop_name, shop_description } = detailData;
  return (
    <div>
      {detailData.length !== 0 && (
        <DetailContainer>
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
                    }}
                  >
                    <CircleIcon />
                    <ButtonTitle>사장님이신가요?</ButtonTitle>
                  </ButtonBox>
                  <ButtonBox>
                    <CircleIcon />
                    <ButtonTitle>추천 받지 않기</ButtonTitle>
                  </ButtonBox>
                  <ButtonBox>
                    <CircleIcon />
                    <ButtonTitle>가게 정보 수정</ButtonTitle>
                  </ButtonBox>
                </ButtonsBox>
              </FunctionContainer>

              <ReviewContainer>
                <Title>매장 총점</Title>
                <ReviewBox>
                  <UserDetailBox>
                    <UserPhoto />
                    <div>
                      <Star>★★★★☆</Star>
                      <UserId>UlongChaS2</UserId>
                    </div>
                  </UserDetailBox>
                  <ReviewComment>너무 맛있어요. 또 갈거</ReviewComment>
                </ReviewBox>
              </ReviewContainer>
            </DetailWrap>
          </DetailFlex>
          {coupon ? (
            <VisitButton onClick={() => setIsOpenModal(!isOpenModal)}>
              방문 체크하기
              {isOpenModal && (
                <DetailModal
                  shop_name={shop_name}
                  is_subscribe={is_subscribe}
                />
              )}
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
              {isOpenModal && (
                <DetailModal
                  shop_name={shop_name}
                  is_subscribe={is_subscribe}
                />
              )}
              {isOpenYesNoModal && <DetailYesNoModal is_subscribe={is_subscribe} />}
            </BenfitsButton>
          )}
        </DetailContainer>
      )}
    </div>
  );
}

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
  border: 1px solid gray;
  border-radius: 5px;
`;

const RestaurantInfo = styled.div`
  flex: 3;
  padding: 20px 0 20px 20px;
  background-color: #fffffff9;
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
  font-weight: 700;
  margin: 5px 0;
`;

const AddressMap = styled.div`
  width: 100%;
  height: 160px;
  border: 1px solid black;
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

const MatchingPercentage = styled.span``;

const CrowdedPercentage = styled.span``;

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
  border: 1px solid black;
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
  border: 1px solid black;
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
