import { useEffect } from "react";
import { useState, useRef } from "react";
import {
  SignUpContainer,
  InputWrapper,
  ValidBtn,
  SignupBtn,
  FormWrapper,
  CheckInput,
  CheckContainer,
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
  const [nicknameIsInvalid, setNicknameIsInvalid] = useState(false);

  //이메일 중복확인
  const [emailIsValid, setEmailIsValid] = useState(false);
  const [emailIsInvalid, setEmailIsInvalid] = useState(false);
  const [goblin, setGoblin] = useState(false);

  //비밀번호 일치 확인
  const [pwConfirm, setPwConfirm] = useState(false);

  useEffect(() => {
    if (nickname.length < 2) {
      setNicknameIsValid(false);
      setNicknameIsInvalid(false);
    }
    if (email.length < 6) {
      setEmailIsValid(false);
      setEmailIsInvalid(false);
    }
    if (password2.length < 5) {
      setPwConfirm(false);
    }
  }, [nickname, email]);

  const checkNickname = (e) => {
    setNickname(e.target.value);
    setNicknameIsValid(false);
    setNicknameIsInvalid(false);
  };

  const checkEmail = (e) => {
    setEmail(e.target.value);
    setEmailIsValid(false);
    setEmailIsInvalid(false);
  };

  const handleValidNickname = () => {
    //이미 닉네임이 있을 때
    if (nickname.length !== 0 && nickname === "admin") {
      setNicknameIsInvalid(true);
    } else {
      //닉네임 없을 때
      if (nickname.length !== 0) {
        setNicknameIsValid(true);
      }
    }
  };

  const handleValidEmail = () => {
    //이메일 양식 안 맞을 때
    if (email.search("@") === -1) {
      return setGoblin(true);
    }
    //기존에 있는 이메일일 때
    if (email.length !== 0 && email === "test@test.com") {
      setGoblin(false);
      setEmailIsInvalid(true);
    } else {
      //이메일 없을 때
      if (email.length !== 0) {
        setGoblin(false);
        setEmailIsValid(true);
      }
    }
  };

  const handleSignUpSubmit = () => {
    //반려될 때
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
      passwordRef.current.focus();
      setPassword2("");
      setPwConfirm(true);
    } else if (password === password2) {
      //비번 일치할 때
      setPwConfirm(false);
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
          {!nicknameIsInvalid && !nicknameIsValid ? (
            ""
          ) : nicknameIsValid && !nicknameIsInvalid ? (
            <CheckInput color="#44bd32">사용가능한 닉네임입니다.</CheckInput>
          ) : (
            <CheckInput color="red">사용할 수 없는 닉네임입니다.</CheckInput>
          )}
        </InputWrapper>
        <InputWrapper>
          <label>이메일</label>
          <div>
            <input type="email" value={email} onChange={checkEmail}></input>
            <ValidBtn onClick={handleValidEmail}>중복확인</ValidBtn>
          </div>
          {!emailIsInvalid && !emailIsValid ? (
            ""
          ) : emailIsValid && !emailIsInvalid ? (
            <CheckInput color="#44bd32">사용가능한 이메일입니다.</CheckInput>
          ) : (
            <CheckInput color="red">사용할 수 없는 이메일입니다.</CheckInput>
          )}
          {goblin && (
            <CheckInput color="red">
              유효하지 않은 이메일 양식입니다.
            </CheckInput>
          )}
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
          {pwConfirm && <CheckInput>비밀번호가 일치하지 않습니다.</CheckInput>}
        </InputWrapper>
        <CheckContainer>
          <label>
            <input type="checkbox" onClick={(e) => console.log(e)}></input>
            모든 약관에 동의
          </label>
          <label>
            <input type="checkbox"></input>
            개인정보처리방침에 동의 (필수)
          </label>
          <label>
            <input type="checkbox"></input>
            이용약관에 동의 (필수)
          </label>
        </CheckContainer>
        <SignupBtn onClick={handleSignUpSubmit}>회원가입</SignupBtn>
      </FormWrapper>
    </SignUpContainer>
  );
};

export default SignUp;
