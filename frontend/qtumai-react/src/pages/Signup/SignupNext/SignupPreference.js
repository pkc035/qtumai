import React, { useState } from "react";
import styled from "styled-components";
import { withRouter } from "react-router-dom";
import PreferenceComponents from "./PreferenceComponents";
import Loading from "../Loading";
import BottomButton from "../../../components/BottomButton";

function SignupPreference(props) {
  const [count, setCount] = useState(1);
  const [data, setData] = useState();
  const [preference, setPreference] = useState([]);
  const [nextButton, setNextButton] = useState(true);
  const [preferenceReset, setPreferenceReset] = useState(true);
  const [isLoadingOn, setIsLoadingOn] = useState(false);

  function goToNext(number) {
    setPreference(preference => [...preference].concat(data));
    setNextButton(true);
    setPreferenceReset(false);

    if (count === 10) {
      fetch("http://192.168.0.66:8000/accounts/preference", {
        method: "POST",
        headers: {
          "Content-Type": "application/json; charset=utf8",
        },
        body: JSON.stringify({
          normal_data: {
            username: localStorage.getItem("username"),
            gender: localStorage.getItem("gender"),
            birthday: localStorage.getItem("birthday"),
            agreed_marketing_receive: localStorage.getItem(
              "agreed_marketing_receive"
            ),
            // phone_number: localStorage.getItem("phone_number"),
            google_number: localStorage.getItem("google_number"),
          },
          area_data: {
            area_name: "갱기도 시흥시 미샨동",
          },
          pref_data: {
            taste_service: preference[0],
            taste_cleanliness: preference[1],
            taste_vibe: preference[2],
            taste_price: preference[3],
            service_cleanliness: preference[4],
            service_vibe: preference[5],
            service_price: preference[6],
            cleanliness_vibe: preference[7],
            cleanliness_price: preference[8],
            vibe_price: 1,
          },
        }),
      })
        .then(res => res.json())
        .then(res => {
          localStorage.setItem("access", res.access);
          localStorage.setItem("refresh", res.refresh);
        });
      setPreferenceReset(true);
      setPreference(number);
      setData(number);
      setNextButton(false);
      setIsLoadingOn(true);
      setTimeout(() => window.ReactNativeWebView.postMessage("Success!"), 1000);
    } else setCount(count => count + 1);
  }

  console.log(
    localStorage.getItem("username"),
    localStorage.getItem("gender"),
    localStorage.getItem("birthday"),
    localStorage.getItem("agreed_marketing_receive"),
    localStorage.getItem("google_number")
    // phone_number: localStorage.getItem("phone_number"),
  );

  // useEffect(() => {
  //   setPreference(preference => [...preference].concat(data));
  // }, [count]);

  function goToBack() {
    setPreference(preference.slice(0, preference.length - 1));
    if (count === 1) {
      props.history.push("/signup/next");
    } else setCount(count => count - 1);
  }

  const PREFERNCE_ITEM = [
    { id: 1, title: "맛", url: "/images/Preference/1.jpg" },
    { id: 2, title: "서비스", url: "/images/Preference/5.jpg" },
    { id: 3, title: "청결", url: "/images/Preference/2.jpg" },
    { id: 4, title: "분위기", url: "/images/Preference/3.jpg" },
    { id: 5, title: "가성비", url: "/images/Preference/4.jpg" },
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
      <BottomButton disabled={nextButton} title={"다음"} onClick={goToNext} />
      {isLoadingOn && <Loading />}
    </Modal>
  );
}

const Modal = styled.div`
  position: relative;
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

export default withRouter(SignupPreference);
