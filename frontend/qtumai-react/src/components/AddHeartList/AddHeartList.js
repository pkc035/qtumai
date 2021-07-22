import React, { useState, useEffect } from "react";
import SlideModalControlButton from "../../components/SlideModalControlButton/SlideModalControlButton";
import PlusPicList from "../PlusPicList/PlusPicList";
import styled, { keyframes } from "styled-components";

export default function AddHeartList({ setIsSlideModal }) {
  const [mylikeList, setMylikeList] = useState({});
  const [style, setStyle] = useState([]);
  const [selectArr, setSelectArr] = useState([]);
  const [isPicPlusModal, setIsPicPlusModal] = useState(false);

  const hadlePicList = (e, idx, id) => {
    let selectStyle = [...style];
    selectStyle[idx] = !selectStyle[idx];
    setStyle(selectStyle);

    if (!selectArr.includes(id)) {
      setSelectArr(selectArr.concat(id));
    } else {
      const removeIndex = selectArr.indexOf(id);
      selectArr.splice(removeIndex, 1);
      setSelectArr([
        ...selectArr.slice(0, removeIndex),
        ...selectArr.slice(removeIndex, selectArr.length),
      ]);
    }
  };

  useEffect(() => {
    fetch("data/mylikeList.json", { method: "GET" })
      .then(res => res.json())
      .then(data => {
        const selectedArr = Array(data.results.length).fill(false);
        setStyle(selectedArr);
        setMylikeList({ ...data });
      });
  }, []);

  const handlePicPlusModal = () => {
    setIsPicPlusModal(true);
  };

  return (
    <div>
      {Object.keys(mylikeList).length !== 0 && (
        <div>
          <Container>
            <Title>내 Piclist</Title>
            <PlusButtonBox>
              <PlusButton onClick={() => handlePicPlusModal()} />
            </PlusButtonBox>

            <ListBox>
              {mylikeList.results.map((list, idx) => {
                return (
                  <List
                    key={list.id}
                    onClick={e => hadlePicList(e, idx, list.id)}
                  >
                    <Text fontStyle={style[idx]}>{list.list_name}</Text>
                    <CheckIcon
                      src={
                        style[idx]
                          ? "/images/fillCheck.svg"
                          : "/images/Check.svg"
                      }
                      alt="checkImage"
                    />
                  </List>
                );
              })}
            </ListBox>
            <SlideModalControlButton setIsSlideModal={setIsSlideModal} />
          </Container>
          {isPicPlusModal && (
            <PlusPicList setIsPicPlusModal={setIsPicPlusModal} />
          )}
        </div>
      )}
    </div>
  );
}

const containerSlide = keyframes`
  0% {
    bottom: -70%;
  }
  50% {
    bottom: -30%;
  }
  100% {
    bottom: 0;
  }
`;

const Container = styled.div`
  ${({ theme }) => theme.flexSet("center", "center", "column")};
  position: fixed;
  bottom: 0;
  animation: ${containerSlide} 0.8s linear;
  right: 0;
  width: 100%;
  border-radius: 5px 5px 0 0;
  background-color: white;
  z-index: 100;
`;

const Title = styled.div`
  margin-bottom: 20px;
  font-size: 16px;
  margin: 14px 0 30px;
`;

const PlusButtonBox = styled.div`
  ${({ theme }) => theme.flexSet("flex-end")};
  width: 90%;
`;

const PlusButton = styled.img.attrs({
  src: "/images/plus.svg",
})`
  position: absolute;
  top: 16px;
  right: 20px;
  width: 26px;
  height: 26px;
  z-index: 1000;
`;

const ListBox = styled.ul`
  width: 90%;
`;

const List = styled.li`
  ${({ theme }) => theme.flexSet("space-between", "center")};
`;

const Text = styled.div`
  font-weight: 500;
  padding: 20px 0;
  color: ${({ fontStyle }) => (fontStyle ? "#ff5000" : "black")};
`;

const CheckIcon = styled.img`
  width: 22px;
  height: 20px;
`;
