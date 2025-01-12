import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { withRouter } from "react-router-dom";
import DaumPostcode from "react-daum-postcode";
import { useAlert } from "react-alert";
// import TermMore from "../TermMore/TermMore";
import BottomButton from "../../../components/BottomButton";

function Signup(props) {
  const [adress, setAdress] = useState({
    fullAddress: "",
    latitude: 0,
    longitude: 0,
  });
  const [isAdressOn, setIsAdressOn] = useState(false);
  const [gender, setGender] = useState("");
  const [inputBirth, setInputBirth] = useState("");
  const [name, setName] = useState("");
  const [selectedArr, setSelectedArr] = useState([false, false, false]);
  const [selectedAll, setSelectedAll] = useState(false);
  const [inputColor, setInputColor] = useState("");
  const [check, setCheck] = useState([true, true, true, true, true, true]);
  const [dubbleCheckButton, setDubbleCheckButton] = useState(true);
  const [agreedMarketingReceive, setAgreedMarketingReceive] = useState(false);

  const alert = useAlert();
  // const { kakao } = window;

  const handleSelectedAll = () => {
    setSelectedAll(!selectedAll);
  };

  const inputAllCheckBox = () => {
    const checkedItems = selectedArr.every(list => list);
    const newChecked = Array(selectedArr.length).fill(!checkedItems);
    setSelectedArr(newChecked);
  };

  const handleSingleBox = id => {
    const newCheck = [...selectedArr];
    newCheck[id] = !newCheck[id];
    setSelectedArr(newCheck);
  };

  console.log(setAdress);

  useEffect(() => {
    const checkedItems = selectedArr.every(list => list);
    setSelectedAll(checkedItems);
    if (checkedItems) {
      let newCheck = [...check];
      newCheck[5] = false;
      setCheck(newCheck);
    } else {
      let newCheck = [...check];
      newCheck[5] = true;
      setCheck(newCheck);
    }
  }, [selectedArr]);

  function handleDubbleCheck() {
    fetch("http://192.168.0.66:8000/accounts/username-check/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json; charset=utf8",
      },
      body: JSON.stringify({
        username: name,
      }),
    })
      .then(res => res.json())
      .then(res => {
        console.log(res.username);
        if (res.username === "중복된 닉네임이 있습니다.") {
          alert.error("중복된 닉네임이 있습니다.");
        } else if (res.username === "닉네임을 2 ~ 15 글자로 해주세요!") {
          alert.error("2자~15자 사이의 한글,영어,숫자로 입력해주세요");
        } else if (res.username === "username에 특수문자를 넣지 말아주세요!") {
          alert.error("특수문자를 넣지 말아주세요");
        } else if (res.username === "success") {
          let newCheck = [...check];
          newCheck[0] = false;
          setCheck(newCheck);
          alert.success("중복체크 완료");
        }
      });
  }

  function goToNext() {
    if (check[0]) {
      alert.error("아이디 중복체크를 해주세요.");
    } else if (check[1]) {
      alert.error("id를 올바른 형식으로 입력해주세요.");
    } else if (check[2]) {
      alert.error("생년월일에 맞게 입력해주세요.");
    } else if (check[3]) {
      alert.error("성별 버튼을 클릭해주세요.");
    } else if (check[4]) {
      alert.error("주소를 입력해주세요.");
    } else if (check[5]) {
      alert.error("이용약관 동의 체크해주세요.");
    } else {
      localStorage.setItem("username", name);
      localStorage.setItem("gender", gender === 0 ? "F" : "M");
      localStorage.setItem("birthday", inputBirth);
      localStorage.setItem(
        "agreed_marketing_receive",
        agreedMarketingReceive ? "1" : "0"
      );
      localStorage.setItem("area_name", "경기도 시흥시 미샌동");
      props.history.push("/signup/preference");
    }
  }

  console.log(localStorage.getItem("phone_number"));

  function goToBack() {
    if (
      window.confirm("입력한 정보가 초기화 됩니다 그래도 뒤로 가시겠습니까?")
    ) {
      props.history.push("/signup");
    }
  }

  const handleBirthChange = e => {
    const regex = /^[0-9\b -]{0,10}$/;
    const regexBirth =
      /^(19[0-9][0-9]|20\d{2})(0[0-9]|1[0-2])(0[1-9]|[1-2][0-9]|3[0-1])$/;
    if (regex.test(e.target.value)) {
      setInputBirth(e.target.value);
      if (regexBirth.test(e.target.value)) {
        let newCheck = [...check];
        newCheck[2] = false;
        setCheck(newCheck);
      } else {
        let newCheck = [...check];
        newCheck[2] = true;
        setCheck(newCheck);
      }
    }
  };

  const handleNameChange = e => {
    const idRegex = /^[ㄱ-ㅎ가-힣a-z0-9]{2,16}/g;
    const regex = /^.{1,20}$/;

    setName(e.target.value);

    if (regex.test(e.target.value)) {
      setDubbleCheckButton(false);
      if (idRegex.test(e.target.value)) {
        let newCheck = [...check];
        newCheck[1] = false;
        setCheck(newCheck);
      } else {
        let newCheck = [...check];
        newCheck[1] = true;
        setCheck(newCheck);
      }
    } else setDubbleCheckButton(true);
  };

  const handlegender = number => {
    setGender(number);
    let newCheck = [...check];
    newCheck[3] = false;
    setCheck(newCheck);
  };

  function handleToggleTerms() {
    setAgreedMarketingReceive(!agreedMarketingReceive);
  }

  useEffect(() => {
    if (inputBirth.length === 8) {
      setInputBirth(inputBirth.replace(/(\d{4})(\d{2})(\d{2})/, "$1-$2-$3"));
    }
    if (inputBirth.length === 9) {
      setInputBirth(
        inputBirth
          .replace(/-/g, "")
          .replace(/(\d{4})(\d{2})(\d{2})/, "$1-$2-$3")
      );
    }
  }, [inputBirth]);

  const Postcode = data => {
    // let geocoder = new kakao.maps.services.Geocoder();
    let fullAddress = data.address;
    let extraAddress = "";
    console.log(fullAddress);

    if (data.addressType === "R") {
      if (data.bname !== "") {
        extraAddress += data.bname;
      }
      if (data.buildingName !== "") {
        extraAddress +=
          extraAddress !== "" ? `, ${data.buildingName}` : data.buildingName;
      }
      fullAddress += extraAddress !== "" ? ` (${extraAddress})` : "";
    }
    setIsAdressOn(false);
    let newCheck = [...check];
    newCheck[4] = false;
    setCheck(newCheck);

    // geocoder.addressSearch(fullAddress, function (result, status) {
    //   if (status === kakao.maps.services.Status.OK) {
    //     let coords = new kakao.maps.LatLng(result[0].y, result[0].x);

    //     setAdress({
    //       fullAddress: fullAddress,
    //       latitude: coords.La,
    //       longitude: coords.Ma,
    //     });
    //   }
    // });
  };

  const postCodeStyle = {
    display: "block",
    position: "absolute",
    top: "0px",
    left: "0px",
    zIndex: "100",
  };

  console.log("이름 :", name);
  console.log("생년월일 :", inputBirth);
  console.log("성별 :", gender === 0 ? "F" : "M");
  console.log("주소 :", adress.fullAddress, adress.latitude, adress.longitude);
  console.log("선택동의 :", agreedMarketingReceive ? "1" : "0");

  return (
    <div>
      <Content>
        <Title>
          <BackButton onClick={goToBack}>
            <ArrowImage src="/images/Social/arrow.png" />
          </BackButton>
          <Subject>좀 더 알고 싶어요</Subject>
        </Title>
        <InputBox>
          <span>닉네임</span>
          <SignupWrap>
            <PhoneInput
              type="text"
              inputColor={inputColor === 0 ? true : false}
              onClick={() => setInputColor(0)}
              placeholder="ID를 입력해주세요"
              onChange={handleNameChange}
              value={name}
            />
            <AuthenticationBtn
              onClick={handleDubbleCheck}
              disabled={dubbleCheckButton}
            >
              중복확인
            </AuthenticationBtn>
          </SignupWrap>
          <span>생년월일/성별</span>
          <SignupWrap>
            <GenderInput
              onChange={handleBirthChange}
              value={inputBirth}
              type="text"
              placeholder="YYYY-MM-DD"
              inputColor={inputColor === 1 ? true : false}
              onClick={() => setInputColor(1)}
            />
            <GenderBtn
              gender={gender === 0 ? true : false}
              onClick={() => handlegender(0)}
            >
              여성
            </GenderBtn>
            <GenderBtn
              gender={gender === 1 ? true : false}
              onClick={() => handlegender(1)}
            >
              남성
            </GenderBtn>
          </SignupWrap>
          <span>어디살아요?</span>
          <SignupWrap>
            <PhoneInput
              type="text"
              value={adress.fullAddress}
              placeholder="읍,면,동까지만 입력해주세요"
              inputColor={inputColor === 2 ? true : false}
              onClick={() => setInputColor(2)}
            />
            <AdressBtn onClick={() => setIsAdressOn(true)}>
              <img alt="serach" src="/images/Social/search.png" />
            </AdressBtn>
          </SignupWrap>
          {isAdressOn && (
            <DaumPostcode
              onComplete={Postcode}
              style={postCodeStyle}
              animation={true}
              height={"100%"}
            />
          )}
          <SignInputTerms>
            <SignInputTermsAllBox>
              <p>
                <input
                  type="checkbox"
                  id="agreeAllCheck"
                  checked={selectedAll}
                  onChange={inputAllCheckBox}
                  onClick={handleSelectedAll}
                />
                <label htmlFor="agreeAllCheck">
                  <strong>
                    이용약관 및 개인정보수집 및 이용에 모두 동의합니다.
                  </strong>
                </label>
              </p>
            </SignInputTermsAllBox>
            <SignInputTermsBox>
              <CheckWrap>
                <input
                  type="checkbox"
                  id="agreeServiceCheck0"
                  onClick={() => handleSingleBox(0)}
                  checked={selectedArr[0]}
                />
                <label htmlFor="agreeServiceCheck0">
                  [필수]서비스 이용 약관 동의
                </label>
                <ViewMore>더보기</ViewMore>
              </CheckWrap>
            </SignInputTermsBox>
            <SignInputTermsBox>
              <CheckWrap>
                <input
                  type="checkbox"
                  id="agreeServiceCheck1"
                  onClick={() => handleSingleBox(1)}
                  checked={selectedArr[1]}
                />
                <label htmlFor="agreeServiceCheck1">
                  [필수] 개인정보 취급방침
                </label>
                <ViewMore>더보기</ViewMore>
              </CheckWrap>
            </SignInputTermsBox>
            <SignInputTermsBox>
              <CheckWrap>
                <input
                  type="checkbox"
                  id="agreeServiceCheck2"
                  onClick={() => handleSingleBox(2)}
                  checked={selectedArr[2]}
                />
                <label htmlFor="agreeServiceCheck2">
                  [필수] 위치정보 이용 약관
                </label>
                <ViewMore>더보기</ViewMore>
              </CheckWrap>
            </SignInputTermsBox>
            <SignInputTermsBox>
              <CheckWrap>
                <input
                  type="checkbox"
                  id="agreeServiceCheck3"
                  onClick={handleToggleTerms}
                />
                <label htmlFor="agreeServiceCheck3">
                  [선택] 마케팅정보 SNS 수신동의
                </label>
                <ViewMore>더보기</ViewMore>
              </CheckWrap>
            </SignInputTermsBox>
          </SignInputTerms>
        </InputBox>
        <BottomButton title={"다음"} onClick={goToNext} />
      </Content>
    </div>
  );
}

const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Title = styled.div`
  display: flex;
  width: 100%;
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

const PhoneInput = styled.input`
  width: 300px;
  height: 55px;
  margin-bottom: 15px;
  border: none;
  border-bottom: 1px solid
    ${props => (props.inputColor ? "#c1c1c1" : "#ededed")};
  outline: none;
  font-size: 15px;
`;

const GenderInput = styled.input`
  width: 200px;
  height: 55px;
  margin-bottom: 15px;
  border: none;
  border-bottom: 1px solid
    ${props => (props.inputColor ? "#c1c1c1" : "#ededed")};
  outline: none;
  font-size: 15px;
`;

const AuthenticationBtn = styled.button`
  background-color: #ff3000;
  color: #fff;
  border-radius: 4px;
  padding: 10px 0;
  margin-left: 20px;
  width: 100%;

  &:disabled {
    background-color: #c1c1c1;
    cursor: default;
  }
`;

const AdressBtn = styled.button`
  background-color: #393939;
  color: #fff;
  border-radius: 4px;
  padding: 7px 0 3px 0;
  margin-left: 20px;
  width: 100%;

  img {
    width: 26px;
  }
`;

const GenderBtn = styled.button`
  border: 1px solide #ededed;
  background-color: ${props => (props.gender ? "#ff3000" : "#c1c1c1")};
  color: #fff;
  border-radius: 4px;
  padding: 10px 0;
  margin-left: 5px;
  width: 100%;
`;

const SignupWrap = styled.div`
  position: relative;
  width: 350px;
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const Subject = styled.p`
  margin: 25px auto;
  font-weight: 700;
  font-size: 25px;
  color: #424242;
`;

const InputBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

const SignInputTerms = styled.div`
  font-size: 13px;
  width: 100%;
`;

const SignInputTermsAllBox = styled.div`
  margin: 20px 0;
  padding: 10px 0;
  color: #404040;
  border-bottom: 1px solid #ededed;

  input {
    margin-right: 5px;
    cursor: pointer;
  }
`;

const CheckWrap = styled.p`
  position: relative;
`;

const SignInputTermsBox = styled.div`
  background: #fff;
  margin-bottom: 30px;
  color: #747474;
  font-size: 16px;

  input {
    width: 16px;
    height: 16px;
    margin: -4px 5px 0;
    vertical-align: middle;
  }
`;

const ViewMore = styled.button`
  position: absolute;
  right: 0;
  font-size: 12px;
  vertical-align: middle;
`;

export default withRouter(Signup);
