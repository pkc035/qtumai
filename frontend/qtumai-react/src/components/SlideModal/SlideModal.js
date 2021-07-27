import React from "react";
import RestaurantModify from "../RestaurantModifyModal/RestaurantModifyModal";
import AddHeartList from "../AddHeartList/AddHeartList";
import styled from "styled-components";

export default function SlideModal({
  isSlideModal,
  setIsSlideModal,
  shopId,
  isLike,
  setIsLike,
  mylikeList,
  style,
  setStyle,
}) {
  return (
    <BlackBackground>
      {isSlideModal && isLike ? (
        <AddHeartList
          setIsSlideModal={setIsSlideModal}
          setStyle={setStyle}
          style={style}
          mylikeList={mylikeList}
          shopId={shopId}
          setIsLike={setIsLike}
        />
      ) : (
        <RestaurantModify
          isSlideModal={isSlideModal}
          setIsSlideModal={setIsSlideModal}
          setIsLike={setIsLike}
          shopId={shopId}
        />
      )}
    </BlackBackground>
  );
}
const BlackBackground = styled.div`
  ${({ theme }) => theme.flexSet()}
  position: absolute;
  top: 0;
  height: 0;
  width: 100%;
  height: 100%;
  background-color: #000000a1;
  z-index: 100;
`;
