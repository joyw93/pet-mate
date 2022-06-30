import { useRef } from "react";
import { useState } from "react";
import {
  LogInContainer,
  FormWrapper,
  InputWrapper,
  SignupBtn,
  GoogleBtn,
  KakaoBtn,
} from "./styled";

const LogIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const emailRef = useRef();
  const passwordRef = useRef();

  const handleLoginSubmit = () => {
    if (!email) {
      return emailRef.current.focus();
    }
    if (!password) {
      return passwordRef.current.focus();
    }
  };
  return (
    <LogInContainer>
      <h1>로그인</h1>
      <FormWrapper>
        <InputWrapper>
          <label>이메일</label>
          <input
            type="email"
            value={email}
            ref={emailRef}
            onChange={(e) => setEmail(e.target.value)}
          ></input>
        </InputWrapper>
        <InputWrapper>
          <label>비밀번호</label>
          <input
            type="password"
            value={password}
            ref={passwordRef}
            onChange={(e) => setPassword(e.target.value)}
          ></input>
        </InputWrapper>
        <SignupBtn onClick={handleLoginSubmit}>로그인</SignupBtn>
        <GoogleBtn>구글 로그인</GoogleBtn>
        <KakaoBtn>카카오 로그인</KakaoBtn>
      </FormWrapper>
      <p>아직 아이디가 없으신가요? 회원가입 하러가기</p>
    </LogInContainer>
  );
};

export default LogIn;
