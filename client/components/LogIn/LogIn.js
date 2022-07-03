import Link from "next/link";
import Router from "next/router";
import { useEffect, useRef, useCallback } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginRequestAction } from "../../reducers/user";
import {
  LogInContainer,
  FormWrapper,
  InputWrapper,
  UserInput,
  LoginBtn,
  GoogleBtn,
  KakaoBtn,
} from "./styled";

const LogIn = () => {
  const dispatch = useDispatch();
  const { me } = useSelector((state) => state.user);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const emailRef = useRef();
  const passwordRef = useRef();

  const handleLoginSubmit = useCallback(() => {
    if (!email) {
      return emailRef.current.focus();
    }
    if (!password) {
      return passwordRef.current.focus();
    }
    dispatch(loginRequestAction({ email, password }));
  }, [email, password]);

  useEffect(() => {
    if (me) {
      Router.push("/");
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
            onChange={(e) => setEmail(e.target.value)}
          ></UserInput>
        </InputWrapper>
        <InputWrapper>
          <label>비밀번호</label>
          <UserInput
            type="password"
            value={password}
            ref={passwordRef}
            onChange={(e) => setPassword(e.target.value)}
          ></UserInput>
        </InputWrapper>
        <LoginBtn onClick={handleLoginSubmit}>로그인</LoginBtn>
        <GoogleBtn>구글 로그인</GoogleBtn>
        <KakaoBtn>카카오 로그인</KakaoBtn>
      </FormWrapper>
      <p>
        <Link href="/signup">
          <a>아직 아이디가 없으신가요? 회원가입 하러가기</a>
        </Link>
      </p>
    </LogInContainer>
  );
};

export default LogIn;
