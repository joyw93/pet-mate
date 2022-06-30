import { useState, useRef } from "react";
import {
  SignUpContainer,
  InputWrapper,
  ValidBtn,
  SignupBtn,
  FormWrapper,
} from "./styled";

const SignUp = () => {
  //객체로 바꾸기
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");

  const usernameRef = useRef();
  const nicknameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();

  const [nickname, setNickname] = useState("");
  const [nicknameIsValid, setNicknameIsValid] = useState(false);
  const [nicknameIsUnvalid, setNicknameIsUnvalid] = useState(false);

  const checkNickname = (e) => {
    setNickname(e.target.value);
  };

  const handleValidNickname = () => {
    //이미 닉네임이 있을 때
    if (nickname.length !== 0 && nickname === "admin") {
      setNicknameIsUnvalid(true);
    } else {
      //닉네임 없을 때
      if (nickname.length !== 0) {
        setNicknameIsValid(true);
      }
    }
  };

  const handleSignUpSubmit = () => {
    if (!username) {
      return usernameRef.current.focus();
    }
    if (!nickname) {
      return nicknameRef.current.focus();
    }
    if (!emailRef) {
      return emailRef.current.focus();
    }
    if (!password) {
      return passwordRef.current.focus();
    }
    if (password !== password2) {
      console.log("nono");
      setPassword2("");
      passwordRef.current.focus();
    }
  };

  return (
    <SignUpContainer>
      <img src="img/welcomecat.png" />
      <FormWrapper>
        <InputWrapper>
          <label>이름</label>
          <input
            type="text"
            value={username}
            ref={usernameRef}
            onChange={(e) => setUsername(e.target.value)}
          ></input>
        </InputWrapper>
        <InputWrapper>
          <label>닉네임</label>
          <div>
            <input
              type="text"
              value={nickname}
              ref={nicknameRef}
              onChange={checkNickname}
            ></input>
            <ValidBtn onClick={handleValidNickname}>중복확인</ValidBtn>
          </div>
          {nicknameIsUnvalid && !nicknameIsValid ? (
            <p color="red">사용할 수 없는 닉네임입니다.</p>
          ) : !nickname && !nicknameIsUnvalid ? (
            ""
          ) : (
            <p color="green">사용가능한 닉네임입니다.</p>
          )}
        </InputWrapper>
        <InputWrapper>
          <label>이메일</label>
          <div>
            <input type="email"></input>
            <ValidBtn>중복확인</ValidBtn>
          </div>
        </InputWrapper>
        <InputWrapper>
          <label>비밀번호</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          ></input>
        </InputWrapper>
        <InputWrapper>
          <label>비밀번호 확인</label>
          <input
            type="password"
            value={password2}
            ref={passwordRef}
            onChange={(e) => setPassword2(e.target.value)}
          ></input>
        </InputWrapper>
        <SignupBtn onClick={handleSignUpSubmit}>회원가입</SignupBtn>
      </FormWrapper>
    </SignUpContainer>
  );
};

export default SignUp;
