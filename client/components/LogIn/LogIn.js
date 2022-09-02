import Link from "next/link";
import Router from "next/router";
import Snackbar from "@mui/material/Snackbar";
import { useEffect, useRef, useCallback } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  LogInContainer,
  FormWrapper,
  InputWrapper,
  UserInput,
  LoginBtn,
  SnsLogin,
  SnsLoginBtns,
  GoogleBtn,
  KakaoBtn,
  CheckInput,
  SnackBarContent,
  GotoSignup,
} from "./styled";
import { userActions } from '../../store/reducers/user';


const LogIn = () => {
  const dispatch = useDispatch();
  const { me, logInError } = useSelector((state) => state.user);

  //input값 설정
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailIsValid, setEmailIsValid] = useState(true);

  const emailRef = useRef();
  const passwordRef = useRef();

  //알림창
  const [snackBar, setSnackBar] = useState(false);

  const handleClose = () => {
    setSnackBar(false);
  };

  useEffect(() => {
    dispatch(userActions.logInReset());
    setSnackBar(false);
  }, []);

  useEffect(() => {
    if (logInError) {
      setSnackBar(true);
    }
  }, [logInError]);

  const handleLoginSubmit = useCallback(() => {
    const emailregExp =
      /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;
    if (emailregExp.test(email) === false || !email) {
      setEmail("");
      emailRef.current.focus();
      return setEmailIsValid(false);
    }
    if (!password) {
      return passwordRef.current.focus();
    }

    const logInUser = {
      email,
      password,
    };
    dispatch(userActions.logInRequest(logInUser));
  }, [email, password]);

  const handleLoginEmail = useCallback((e) => {
    setEmail(e.target.value);
    setEmailIsValid(true);
  }, [email]);

  const handleGoogleLoginSubmit = useCallback(() => {
    Router.push(`${serverUrl}/user/google`);
  }, []);

  const handleKakaoLoginSubmit = useCallback(() => {
    Router.push(`${serverUrl}/user/kakao`);
  }, []);

  useEffect(() => {
    //로그인 완료 됐을 때
    if (me) {
      Router.push("/");
      setSnackBar(true);
    }
  }, [me]);

  return (
    <LogInContainer>
      <h1>로그인</h1>
      <FormWrapper>
        <InputWrapper>
          <label>이메일</label>
          <UserInput
            type="email"
            value={email}
            ref={emailRef}
            onChange={handleLoginEmail}
          ></UserInput>
          {!emailIsValid && (
            <CheckInput color="red">유효하지 않은 이메일입니다.</CheckInput>
          )}
        </InputWrapper>
        <InputWrapper>
          <label>비밀번호</label>
          <UserInput
            type="password"
            value={password}
            ref={passwordRef}
            onChange={(e) => setPassword(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") handleLoginSubmit();
            }}
          ></UserInput>
        </InputWrapper>
        <LoginBtn onClick={handleLoginSubmit}>로그인</LoginBtn>
        <GotoSignup>
          <Link href="/signup">
            <a>
              아직 아이디가 없으신가요? <span>회원가입</span> 하러가기
            </a>
          </Link>
        </GotoSignup>

        <SnsLogin>SNS계정으로 간편 로그인/회원가입</SnsLogin>
        <SnsLoginBtns>
          <GoogleBtn onClick={handleGoogleLoginSubmit}>
            <img src="../img/googleLogin.png" alt="" />
          </GoogleBtn>
          <KakaoBtn onClick={handleKakaoLoginSubmit}>
            <img src="../img/kakaoLogin.png" alt="" />
          </KakaoBtn>
        </SnsLoginBtns>
      </FormWrapper>
      {/* <Snackbar
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        open={snackBar}
        autoHideDuration={2000}
        onClose={handleClose}
        key={"bottomcenter"}
      >
        <SnackBarContent></SnackBarContent>
      </Snackbar> */}
      {logInError ? (
        <>
          <Snackbar
            anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
            open={snackBar}
            autoHideDuration={2000}
            onClose={handleClose}
            key={"bottomcenter"}
          >
            <SnackBarContent>{logInError?.message}</SnackBarContent>
          </Snackbar>
        </>
      ) : null}
    </LogInContainer>
  );
};

export default LogIn;
