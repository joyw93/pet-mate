import { useState, useRef } from "react";
import {
  SignUpContainer,
  InputWrapper,
  ValidBtn,
  SignupBtn,
  FormWrapper,
  CheckInput
} from "./styled";

const SignUp = () => {
  //객체로 바꾸기
  const [username, setUsername] = useState("");
  const [nickname, setNickname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");

  const usernameRef = useRef();
  const nicknameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();

  //닉네임 중복확인
  const [nicknameIsValid, setNicknameIsValid] = useState(false);
  const [nicknameIsUnvalid, setNicknameIsUnvalid] = useState(false);

  //이메일 중복확인
  const [emailIsValid, setEmailIsValid] = useState(false);
  const [emailIsUnvalid, setEmailIsUnvalid] = useState(false);

  const checkNickname = (e) => {
    setNickname(e.target.value);
    console.log(nickname);

    setEmailIsValid(false);
    setEmailIsUnvalid(false);

  };

  const checkEmail = (e) => {
    setEmail(e.target.value);
    setNicknameIsValid(false);
    setNicknameIsUnvalid(false);
  }

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

  const handleValidEmail = () => {
    // if(email.search('@')) {

    // }
    if (email.length !== 0 && email === "test@test.com") {
      setEmailIsUnvalid(true);
    } else {
      //이메일 없을 때
      if (email.length !== 0) {
        setEmailIsValid(true);
      }
    }

  }

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
          {!nicknameIsUnvalid && !nicknameIsValid ? '' : nicknameIsValid && !nicknameIsUnvalid ? <CheckInput color="green">사용가능한 닉네임입니다.</CheckInput> : <CheckInput color="red">사용할 수 없는 닉네임입니다.</CheckInput>}
        </InputWrapper>
        <InputWrapper>
          <label>이메일</label>
          <div>
            <input type="email" value={email} onChange={checkEmail}></input>
            <ValidBtn onClick={handleValidEmail}>중복확인</ValidBtn>
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
