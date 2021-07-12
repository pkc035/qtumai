import React from "react";
import styled from 'styled-components';
import { withRouter } from 'react-router-dom';

function SignupNext(props) {

  function goToNext() {
    props.history.push('/signup/customer');
  }

  return (
    <Modal>
      <Subject>고객</Subject>
      <InputBox>
        <span>휴대폰 번호</span>
        <input placeholder="휴대폰 회원가입" />
        <span>비밀번호</span>
        <input type="password" placeholder="영문소문자/숫자, 6 ~ 20자" />
        <span>비밀번호 재확인</span>
        <input type="password" placeholder="영문소문자/숫자, 6 ~ 20자" />
      </InputBox>

      <SignInputTerms>
        <FullConsent>전체 동의</FullConsent>
        <SignInputTermsAllBox>
          <p>
            <span className="termCheckBox">
              <input
                type="checkbox"
                id="agreeAllCheck"
                // checked={allCheckBox}
                // onChange={changeAll}
                // onClick={handleChange}
              />
            </span>
            <label htmlFor="agreeAllCheck">
              <strong>
                이용약관 및 개인정보수집 및 이용에 모두 동의합니다.
              </strong>
            </label>
          </p>
        </SignInputTermsAllBox>
        <SignInputTermsBox>
          <h3>[필수] 이용약관 동의</h3>
          <p className="check">
            <span>이용약관에 동의하십니까?</span>
            <input
              type="checkbox"
              id="agreeServiceCheck0"
              // onChange={toggleCheckBox}
              // checked={isCheck1}
              name="isCheck1"
            />
            <label htmlFor="agreeServiceCheck0">동의함</label>
          </p>
        </SignInputTermsBox>
        <SignInputTermsBox>
          <h3>[필수] 개인정보 수집 및 이용 동의</h3>
          <p className="check">
            <span>개인정보 수집 및 이용에 동의하십니까?</span>
            <input
              type="checkbox"
              id="agreeServiceCheck1"
              // onChange={toggleCheckBox}
              // checked={isCheck2}
              name="isCheck2"
            />
            <label htmlFor="agreeServiceCheck1">동의함</label>
          </p>
        </SignInputTermsBox>
      </SignInputTerms>
      <LoginBtn onClick={goToNext}>다음</LoginBtn>
    </Modal>
  );
}

const Modal = styled.div`
display:flex;
flex-direction: column;
align-items: center;

  &:before {
    content: '';
    position: absolute;
    top: -1px;
    left: 50%;
    width: 0;
    height: 0;
    border: 16px solid transparent;
    border-bottom-color: #ebebeb;
    border-top: 0;
    margin-left: -16px;
    margin-top: -16px;
  }

  &:after {
    content: '';
    position: absolute;
    top: 0;
    left: 50%;
    width: 0;
    height: 0;
    border: 16px solid transparent;
    border-bottom-color: #fff;
    border-top: 0;
    margin-left: -16px;
    margin-top: -16px;
  }
`;

const Subject = styled.p`
  margin: 25px;
  font-weight: 700;
  font-size: 25px;
  color: #424242;
`;

const InputBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;

  input {
    width: 350px;
    height: 55px;
    margin-bottom: 15px;
    padding-left: 20px;
    border: 1px solid #ededed;
    border-radius: 4px;
    outline: none;
    font-size: 15px;

    &::placeholder {
      color: #dbdbdb;
    }
  }
`;

const SignInputTerms = styled.div`
font-size:13px;
`;

const FullConsent = styled.h3`
  margin-top: 20px;
  font-size: 25px;
  `;

const SignInputTermsAllBox = styled.div`
    margin: 20px 0;
    padding: 20px;
    background: #fafafa;
    color: #404040;
    border: 1px solid #e8e8e8;

    input {
      margin-right: 5px;
      cursor: pointer;
    }
`;

const SignInputTermsBox = styled.div`
    padding: 20px;
    background: #fff;
    border: 1px solid #e8e8e8;
    color: #747474;
    margin-bottom: 20px;

    h3 {
      margin: 0 0 15px;
      color: #353535;
      font-size: 18px;
    }

    .content {
      height: 110px;
      padding: 20px;
      background: #fff;
      border: 1px solid #d5d5d5;
      overflow: auto;
    }

    .check {
      padding: 20px 0 5px 0;
      color: #000;
      font-size: 15px;

      input {
        width: 16px;
        height: 16px;
        margin: -4px 5px 0;
        vertical-align: middle;
      }
    }
`;


const LoginBtn = styled.button`
  width: 350px;
  height: 50px;
  margin-top: 15px;
  background-color: #35c5f0;
  border-radius: 4px;
  font-size: 15px;
  color: #fff;

  &:hover {
    transform: translateY(-1.5px);
  }
`;


export default withRouter(SignupNext);
