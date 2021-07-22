import React from "react";
import RestaurantModify from "../RestaurantModifyModal/RestaurantModifyModal";
import AddHeartList from "../AddHeartList/AddHeartList";
import styled from "styled-components";

export default function SlideModal({ isSlideModal, setIsSlideModal, isLike }) {
  return (
    <BlackBackground>
      {isSlideModal && isLike ? (
        <RestaurantModify
          isSlideModal={isSlideModal}
          setIsSlideModal={setIsSlideModal}
        />
      ) : (
        <AddHeartList setIsSlideModal={setIsSlideModal} />
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
  z-index: 2;
`;
