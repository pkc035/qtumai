import React, { useState } from "react";
import styled from "styled-components";
import { withRouter } from "react-router-dom";
import PreferenceComponents from "./PreferenceComponents";
import Loading from "../Loading";

function SignupPreference(props) {
  const [count, setCount] = useState(1);
  const [data, setData] = useState();
  const [preference, setPreference] = useState([]);
  const [nextButton, setNextButton] = useState(true);
  const [preferenceReset, setPreferenceReset] = useState(true);
  const [isLoadingOn,setIsLoadingOn] = useState(false);

  function goToNext() {
    setPreference(preference => [...preference].concat(data));
    setNextButton(true);
    setPreferenceReset(false);

    if (count === 10) {
      setIsLoadingOn(true);
      setTimeout(() => props.history.push("/"),10000);
    } else setCount(count => count + 1);
  }

  function goToBack() {
    setPreference(preference.slice(0, preference.length - 1));
    if (count === 1) {
      props.history.push("/signup/next");
    } else setCount(count => count - 1);
  }

  const PREFERNCE_ITEM = [
    { id: 1, title: "맛", url: "/images/Preference/1.jpg" },
    { id: 2, title: "서비스", url: "/images/Preference/2.jpg" },
    { id: 3, title: "분위기", url: "/images/Preference/3.jpg" },
    { id: 4, title: "청결", url: "/images/Preference/4.jpg" },
    { id: 5, title: "가성비", url: "/images/Preference/5.jpg" },
  ];

  function combination(arr, num) {
    let result = [];
    if (num === 1) return arr.map(e => [e]);

    arr.forEach((e, i, array) => {
      let rest = array.slice(i + 1);
      let combinations = combination(rest, num - 1);
      let combiArr = combinations.map(x => [e, ...x]);
      result.push(...combiArr);
    });
    return result;
  }


  let preferenceNumber = {
    ...combination([1, 2, 3, 4, 5], 2).splice(count - 1, 1),
  };

  console.log(preference);

  return (
    <Modal>
      <Title>
        <BackButton onClick={goToBack}>
          <ArrowImage src="/images/Social/arrow.png" />
        </BackButton>
        <Subject>선호도 {count}/10 </Subject>
      </Title>
      <PreferenceComponents
        firstTitle={PREFERNCE_ITEM[preferenceNumber[0][0] - 1].title}
        secondTitle={PREFERNCE_ITEM[preferenceNumber[0][1] - 1].title}
        firstImage={PREFERNCE_ITEM[preferenceNumber[0][0] - 1].url}
        secondImage={PREFERNCE_ITEM[preferenceNumber[0][1] - 1].url}
        setData={setData}
        setNextButton={setNextButton}
        preferenceReset={preferenceReset}
        setPreferenceReset={setPreferenceReset}
      />
      <LoginBtn disabled={nextButton} onClick={goToNext}>
        다음
      </LoginBtn>
      {isLoadingOn && <Loading />}
    </Modal>
  );
}

const Modal = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Title = styled.div`
  display: flex;
  width: 100%;
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

const LoginBtn = styled.button`
  position: fixed;
  bottom: 0px;
  width: 100%;
  height: 60px;
  margin-top: 15px;
  background-color: #ff3000;
  font-size: 15px;
  color: #fff;

  &:disabled {
    background-color: #c1c1c1;
    cursor: default;
  }
`;

const ArrowImage = styled.img`
  width: 30px;
  transform: rotate(180deg);
`;

export default withRouter(SignupPreference);
