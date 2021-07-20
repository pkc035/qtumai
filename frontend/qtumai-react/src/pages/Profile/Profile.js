import React from "react";
import styled from 'styled-components';

function Profile() {

  return (
    <Modal>
      <Subject>프로필</Subject>
      <InputBox>
        <input placeholder="아이디" />
        <input placeholder="비밀번호" />
      </InputBox>
      <LoginBtn>로그인</LoginBtn>
      <Social>
        <span>SNS계정으로 간편 로그인/회원가입</span>
        <Logo>
          <button>
            <img alt="페이스북로고" src="/images/Social/facebook_logo.jpg" />
          </button>
          <button>
            <img alt="카카오로고" src="/images/Social/kakaotalk_logo.jpg" />
          </button>
          <button>
            <img alt="라인로고" src="/images/Social/Line_logo.jpg" />
          </button>
        </Logo>
      </Social>
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
  align-items: center;

  input {
    width: 350px;
    height: 55px;
    margin-top: 15px;
    padding-left: 20px;
    border: 1px solid #ededed;
    border-radius: 4px;
    outline: none;
    font-size: 15px;

    &::placeholder {
      color: #dbdbdb;
    }

    &:focus {
      box-shadow: 5px 5px 5px 2px #dbdbdb;
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

const Social = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 20px;

  span {
    font-size: 12px;
    color: #757575;
  }
`;

const Logo = styled.div`
  display: flex;
  justify-content: space-between;
  align-content: center;
  margin-top: 15px;

  img {
    width: 63px;

    &:hover {
      cursor: pointer;
    }
  }
`;

export default Profile;
