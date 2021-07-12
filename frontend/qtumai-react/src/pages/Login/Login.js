import React from "react";
import styled from 'styled-components';
import { withRouter } from 'react-router-dom';
import GoogleLogin, {GoogleLogout} from 'react-google-login';

function Login(props) {
  
  function goToSignup() {
    props.history.push('/signup');
  }

  function logout(res) {
    console.log(res);
    localStorage.clear();
    sessionStorage.clear();
  }

  const onSuccessGoogleLogin = (response) => {
    fetch(`http://192.168.0.66:8000/accounts/google-login`, {
      method: 'get',
      headers: {
        Authorization: response.mc.id_token,
      },
    })
      .then(res => res.json())
      .then(res => {
        console.log(res);
        if(res.message === 'USER_DOES_NOT_EXIST') {
          localStorage.setItem('access_token', res.acess_token);
          props.history.push('/signup');
        }
      });
  }

  if (!window.Kakao.isInitialized()) {
    window.Kakao.init('78259a641c668b5f7dd328c8c976b21e');
  }

  const loginWithKakao = () => {
    window.Kakao.Auth.login({
      success: auth => {
        console.log(auth.access_token)
        fetch('http://192.168.0.66:8000/accounts/kakao-login', {
          method: 'get',
          headers: {
            Authorization: auth.access_token,
          },
        })
          .then(res => res.json())
          .then(res => {
            if(res.message === 'USER_DOES_NOT_EXIST') {
              localStorage.setItem('access_token', auth.access_token);
              props.history.push('/signup');
            }
          });
      },
      fail: err => {
        console.error(err);
      },
    });
  };

  const onFailureGoogleLogin = (error) => {
    console.log(error);
  }

  return (
    <Modal>
      <Subject>로그인</Subject>
      <InputBox>
        <input placeholder="아이디" />
        <input placeholder="비밀번호" />
      </InputBox>
      <LoginBtn>로그인</LoginBtn>
      <LoginBtn onClick={goToSignup}>회원가입</LoginBtn>
      <Social>
        <span>SNS계정으로 간편 로그인/회원가입</span>
        <Logo>
          <button>
            <img alt="페이스북로고" src="/images/Social/facebook_logo.jpg" />
          </button>
          <button onClick={loginWithKakao}>
            <img alt="카카오로고" src="/images/Social/kakaotalk_logo.jpg" />
          </button>
          <GoogleLogin
            clientId="682659671170-3l3k6f2ihb3aplmo4n8u43dncpdcbc9f.apps.googleusercontent.com"
            buttonText="Login"
            onSuccess={onSuccessGoogleLogin}
            onFailure={onFailureGoogleLogin}
            cookiePolicy={'single_host_origin'}
            uxMode='redirect'
            isSignedIn={true}
          />
          <GoogleLogout
            clientId="682659671170-3l3k6f2ihb3aplmo4n8u43dncpdcbc9f.apps.googleusercontent.com"
            buttonText="Logout"
            onLogoutSuccess={logout}
          >
          </GoogleLogout>
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

export default withRouter(Login);
