import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { withRouter } from "react-router-dom";
import DaumPostcode from "react-daum-postcode";
import { useAlert } from "react-alert";
import TermMore from "../TermMore/TermMore";

function Signup(props) {
  const [adress, setAdress] = useState("");
  const [isAdressOn, setIsAdressOn] = useState(false);
  const [gender, setGender] = useState("");
  const [inputBirth, setInputBirth] = useState("");
  const [name, setName] = useState("")
  const [selectedArr, setSelectedArr] = useState([false, false, false]);
  const [selectedAll, setSelectedAll] = useState(false);
  const [inputColor, setInputColor] = useState("");
  const [check, setCheck] = useState([true, true, true, true, true]);
  const [dubbleCheckButton, setDubbleCheckButton] = useState(true);
  const [agreedMarketingReceive, setAgreedMarketingReceive] = useState(false);

  const alert = useAlert()

  const handleSelectedAll = () => {
    setSelectedAll(!selectedAll)
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

  useEffect(() => {
    const checkedItems = selectedArr.every(list => list);
    setSelectedAll(checkedItems);
    if (checkedItems) {
      let newCheck = [...check];
      newCheck[4] = false;
      setCheck(newCheck);
    } else {
      let newCheck = [...check];
      newCheck[4] = true;
      setCheck(newCheck);
    }

  }, [selectedArr])

  function handleDubbleCheck() {
    let newCheck = [...check];
    newCheck[0] = false;
    setCheck(newCheck);
    alert.success("중복체크 완료");
  }

  function goToNext() {
    if (check[0]) {
      alert.error("id를 올바른 형식으로 입력해주세요.");
    } else if (check[1]) {
      alert.error("생년월일에 맞게 입력해주세요.");
    } else if (check[2]) {
      alert.error("성별 버튼을 클릭해주세요.");
    } else if (check[3]) {
      alert.error("주소를 입력해주세요");
    } else if (check[4]) {
      alert.error("이용약관 동의 체크해주세요.");
    } else props.history.push("/signup/preference");
  }

  function goToBack() {
    if (
      window.confirm("입력한 정보가 초기화 됩니다 그래도 뒤로 가시겠습니까?")
    ) {
      props.history.push("/signup");
    }
  }

  const handleBirthChange = e => {
    const regex = /^[0-9\b -]{0,10}$/;
    const regexBirth = /^(19[0-9][0-9]|20\d{2})(0[0-9]|1[0-2])(0[1-9]|[1-2][0-9]|3[0-1])$/;
    if (regex.test(e.target.value)) {
      setInputBirth(e.target.value);
      if (regexBirth.test(e.target.value)) {
        let newCheck = [...check];
        newCheck[1] = false;
        setCheck(newCheck);
      } else {
        let newCheck = [...check];
        newCheck[1] = true;
        setCheck(newCheck);
      }
    }
  };

  console.log(check);

  const handleNameChange = e => {
    setName(e.target.value);
    setDubbleCheckButton(false)
  }

  const handlegender = (number) => {
    setGender(number);
    let newCheck = [...check];
    newCheck[2] = false;
    setCheck(newCheck);
  }

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
    let fullAddress = data.address;
    let extraAddress = "";

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
    setAdress(fullAddress);
    setIsAdressOn(false);
    let newCheck = [...check];
    newCheck[3] = false;
    setCheck(newCheck);
  };

  const postCodeStyle = {
    display: "block",
    position: "absolute",
    top: "0px",
    left: "0px",
    zIndex: "100",
  };

  console.log(name);
  console.log(inputBirth.split("-").join(""));
  console.log(gender === 0 ? "여성" : "남성");
  console.log(adress);
  console.log(agreedMarketingReceive ? "1" : "0");

  return (
    <div>
      <Modal>
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
            >중복확인</AuthenticationBtn>
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
              value={adress}
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
                <input type="checkbox"
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
        <LoginBtn onClick={goToNext}>다음</LoginBtn>
      </Modal>
    </div>
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
  border-bottom: 1px solid ${props => (props.inputColor ? "#c1c1c1" : "#ededed")};
  outline: none;
  font-size: 15px;
`;

const GenderInput = styled.input`
  width: 200px;
  height: 55px;
  margin-bottom: 15px;
  border: none;
  border-bottom: 1px solid ${props => (props.inputColor ? "#c1c1c1" : "#ededed")};
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
  position:relative;
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
  position:absolute;
  right:0;
  font-size:12px;
  vertical-align: middle;
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
`;

export default withRouter(Signup);
