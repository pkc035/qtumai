import React, { useEffect } from "react";
import styled from "styled-components";
import { withRouter } from "react-router-dom";
import GoogleLogin from "react-google-login";

function Login(props) {
  function goToSignup() {
    props.history.push("/signup");
  }

  function goToLogin() {
    props.history.push("/phonelogin");
  }

  const { naver } = window;

  const Login = () => {
    Naver();
    UserProfile();
  };

  useEffect(Login, []);

  const Naver = () => {
    const login = new naver.LoginWithNaverId({
      clientId: "r4u4RDrPMClvHnoyBojj",
      callbackUrl: "http://localhost:3000/login",
      isPopup: false,
      loginButton: {
        color: "green",
        type: 1,
        height: 50,
      },
      callbackHandle: true,
    });
    login.init();
  };

  const handleNaverLogin = () => {
    if (
      document &&
      document.querySelector("#naverIdLogin").firstChild &&
      window !== undefined
    ) {
      const loginBtn = document.getElementById("naverIdLogin").firstChild;
      loginBtn.click();
    }
  };

  const UserProfile = () => {
    console.log("123");
    window.location.href.includes("access_token") && GetUser();
    function GetUser() {
      const location = window.location.href.split("=")[1];
      const token = location.split("&")[0];
      console.log("token: ", token);
      fetch("http://192.168.0.66:8000/accounts/naver-login/", {
        method: "GET",
        headers: {
          Authorization: token,
        },
      })
        .then(res => res.json())
        .then(res => {
          console.log(res);
          props.history.push("/signup/next");
        })
        .catch(err => console.log("err : ", err));
    }
  };

  const onSuccessGoogleLogin = response => {
    fetch(`http://192.168.0.66:8000/accounts/google-login`, {
      method: "get",
      headers: {
        Authorization: response.mc.id_token,
      },
    })
      .then(res => res.json())
      .then(res => {
        console.log(res);
        if (res.message === "USER_DOES_NOT_EXIST") {
          localStorage.setItem("access_token", res.acess_token);
          props.history.push("/signup/next");
        }
      });
  };

  if (!window.Kakao.isInitialized()) {
    window.Kakao.init("78259a641c668b5f7dd328c8c976b21e");
  }

  const loginWithKakao = () => {
    window.Kakao.Auth.login({
      success: auth => {
        console.log(auth.access_token);
        fetch("http://192.168.0.66:8000/accounts/kakao-login", {
          method: "get",
          headers: {
            Authorization: auth.access_token,
          },
        })
          .then(res => res.json())
          .then(res => {
            if (res.message === "USER_DOES_NOT_EXIST") {
              localStorage.setItem("access_token", auth.access_token);
              props.history.push("/signup/next");
            }
          });
      },
      fail: err => {
        console.error(err);
      },
    });
  };

  const onFailureGoogleLogin = error => {
    console.log(error);
  };

  return (
    <Modal>
      <Logo src="/images/Social/facebook_logo.jpg" />
      <Social>
        <LoginButtons>
          <div
            id="naverIdLogin"
            style={{ position: "absolute", top: "-10000px" }}
          />
          <SocialLogin onClick={handleNaverLogin}>
            <img
              alt="네이버로고"
              src="https://static.nid.naver.com/oauth/button_g.PNG?version=js-2.0.0"
            />
            <span>Naver로 로그인</span>
          </SocialLogin>
          <SocialLogin onClick={loginWithKakao}>
            <img alt="카카오로고" src="/images/Social/kakaotalk_logo.jpg" />
            <span>Kakao로 로그인</span>
          </SocialLogin>
          <GoogleLogin
            clientId="682659671170-3l3k6f2ihb3aplmo4n8u43dncpdcbc9f.apps.googleusercontent.com"
            onSuccess={onSuccessGoogleLogin}
            render={renderProps => (
              <SocialLogin
                onClick={renderProps.onClick}
                disabled={renderProps.disabled}
              >
                <img alt="구글로고" src="/images/Social/google_logo.jpeg" />
                <span>Google로 로그인</span>
              </SocialLogin>
            )}
            onFailure={onFailureGoogleLogin}
            cookiePolicy={"single_host_origin"}
            uxMode="redirect"
            isSignedIn={true}
          />
          <SocialLogin onClick={goToLogin}>
            <img alt="카카오로고" src="/images/Social/phone.png" />
            <span>전화번호로 로그인</span>
          </SocialLogin>
          <SignupBtn onClick={goToSignup}>회원가입</SignupBtn>
        </LoginButtons>
      </Social>
    </Modal>
  );
}

const Modal = styled.div`
  display: flex;
  height: 100vh;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Logo = styled.img`
  margin-bottom: 20px;
  width: 100px;
`;

const SignupBtn = styled.button`
  width: 350px;
  height: 50px;
  margin-top: 15px;
  background-color: #ff3000;
  border-radius: 4px;
  font-size: 15px;
  color: #fff;
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

const LoginButtons = styled.div`
  display: flex;
  justify-content: space-between;
  align-content: center;
  flex-direction: column;
  margin-top: 15px;
`;

const SocialLogin = styled.button`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  width: 350px;
  height: 50px;
  margin-top: 15px;
  padding-left: 30px;
  border: 1px solid #ededed;
  border-radius: 4px;
  font-size: 15px;
  color: #fff;

  img {
    width: 30px;
    margin-right: 70px;
  }

  span {
    font-size: 14px;
  }
`;

export default withRouter(Login);
