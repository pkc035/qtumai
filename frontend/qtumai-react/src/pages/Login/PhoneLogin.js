import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { withRouter } from "react-router-dom";
import BottomButton from "../../components/BottomButton";

function PhoneLogin(props) {
  const [inputValue, setInputValue] = useState("");
  const [minutes, setMinutes] = useState(3);
  const [seconds, setSeconds] = useState(0);
  const [inputColor, setInputColor] = useState("");
  const [authenticationButton, setAuthenticationButton] = useState(true);
  const [timerDisplay, setTimerDisplay] = useState(false);

  function goToNext() {
    alert("로그인 되었습니다.");
    props.history.push("/");
  }

  function goToBack() {
    props.history.push("/login");
  }

  function sendPhoneNumber() {
    alert("문자가 발송 되었습니다");
    setTimerDisplay(true);
    setMinutes(3);
    setSeconds(0);
  }

  const handleChange = e => {
    const regex = /^[0-9\b -]{0,13}$/;
    const phoneNumberRegex = /^01(?:0|1|[6-9])(?:\d{3}|\d{4})\d{4}$/;
    if (regex.test(e.target.value)) {
      setInputValue(e.target.value);
      if (phoneNumberRegex.test(e.target.value.split("-").join(""))) {
        setAuthenticationButton(false);
      } else setAuthenticationButton(true);
    }
  };

  useEffect(() => {
    const countdown = setInterval(() => {
      if (Number(seconds) > 0) {
        setSeconds(Number(seconds) - 1);
      }
      if (Number(seconds) === 0) {
        if (Number(minutes) === 0) {
          clearInterval(countdown);
        } else {
          setMinutes(Number(minutes) - 1);
          setSeconds(59);
        }
      }
    }, 1000);
    return () => clearInterval(countdown);
  }, [minutes, seconds]);

  useEffect(() => {
    if (inputValue.length === 10) {
      setInputValue(inputValue.replace(/(\d{3})(\d{3})(\d{4})/, "$1-$2-$3"));
    }
    if (inputValue.length === 13) {
      setInputValue(
        inputValue
          .replace(/-/g, "")
          .replace(/(\d{3})(\d{4})(\d{4})/, "$1-$2-$3")
      );
    }
  }, [inputValue]);

  return (
    <div>
      <Modal>
        <Title>
          <BackButton onClick={goToBack}>
            <ArrowImage src="/images/Social/arrow.png" />
          </BackButton>
          <Subject>전화번호로 로그인</Subject>
        </Title>
        <InputBox>
          <span>휴대전화</span>
          <SignupWrap>
            <PhoneInput
              type="text"
              inputColor={inputColor === 0 ? true : false}
              onClick={() => setInputColor(0)}
              placeholder="휴대폰 회원가입"
              onChange={handleChange}
              value={inputValue}
            />
            <AuthenticationButton
              disabled={authenticationButton}
              onClick={sendPhoneNumber}
            >
              인증번호 받기
            </AuthenticationButton>
          </SignupWrap>
          <span>인증번호</span>
          <SignupWrap>
            <AuthenticationInput
              type="text"
              placeholder="인증번호를 입력해주세요"
              onClick={() => setInputColor(1)}
              inputColor={inputColor === 1 ? true : false}
            />
            <Timer timerDisplay={timerDisplay}>
              {minutes}:{seconds < 10 ? `0${seconds}` : seconds}
            </Timer>
          </SignupWrap>
        </InputBox>
        <BottomButton title={"다음"} onClick={goToNext} />
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

const Timer = styled.h3`
  display: ${props => (props.timerDisplay ? "block" : "none")};
  position: absolute;
  right: 0;
  top: 20px;
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

const AuthenticationButton = styled.button`
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

const AuthenticationInput = styled.input`
  position: relative;
  width: 100%;
  height: 55px;
  margin-bottom: 15px;
  border: none;
  border-bottom: 1px solid
    ${props => (props.inputColor ? "#c1c1c1" : "#ededed")};
  outline: none;
  font-size: 15px;
`;

export default withRouter(PhoneLogin);
