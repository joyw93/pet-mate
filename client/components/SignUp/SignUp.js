import axios from "axios";
import { useEffect } from "react";
import { useState, useRef, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  SignUpContainer,
  InputWrapper,
  ValidBtn,
  SignupBtn,
  FormWrapper,
  CheckInput,
  CheckContainer,
  CheckBoxInput,
  SnackBarContent
} from "./styled";
import { userActions } from '../../store/reducers/user';
import Router from "next/router";
import Snackbar from "@mui/material/Snackbar";

const SignUp = () => {
  const dispatch = useDispatch();
  const serverUrl = "http://api.petmate.kr";
  const { signUpDone } = useSelector((state) => state.user);

  //알림창
  const [snackBar, setSnackBar] = useState(false);

  useEffect(() => {
    if (signUpDone) {
      //회원가입 완료
      dispatch(userActions.signUpReset());
      Router.replace("/");
      setSnackBar(false);
    }
  }, [signUpDone]);

  const [name, setName] = useState("");
  const [nickname, setNickname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");

  //체크박스
  const [entireCheck, setEntireCheck] = useState(false);
  const [restCheck1, setRestCheck1] = useState(false);
  const [restCheck2, setRestCheck2] = useState(false);
  const [checkboxIsValid, setCheckboxIsValid] = useState(true);

  const nameRef = useRef();
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
  }, [nickname, email, password2]);

  const checkNickname = useCallback((e) => {
    setNickname(e.target.value);
    setNicknameIsValid(false);
    setNicknameIsInvalid(false);
  }, [nickname]);

  const checkEmail = (e) => {
    setEmail(e.target.value);
    setEmailIsValid(false);
    setEmailIsInvalid(false);
  };

  const handleValidNickname = useCallback(() => {
    if (nickname.length === 0) setNicknameIsInvalid(true);

    //닉네임 유효성 검사
    const nicknameregExp = /^[가-힣|a-zA-Z|0-9|]{2,10}$/;
    if (nicknameregExp.test(nickname) === false) {
      return setNicknameIsInvalid(true);
    }

    axios
      .post(`${serverUrl}/user/nickname-check`, {
        nickname,
      })
      .then(() => setNicknameIsValid(true))
      .catch(() => setNicknameIsInvalid(true));
  }, [nickname]);

  //이메일 유효성 검사
  const handleValidEmail = () => {
    const emailregExp =
      /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;
    if (emailregExp.test(email) === false) {
      setEmailIsInvalid(true);
      return setGoblin(true);
    }

    axios
      .post(`${serverUrl}/user/email-check`, {
        email,
      })
      .then(() => {
        setEmailIsValid(true);
        setGoblin(false);
      })
      .catch(() => {
        setEmailIsInvalid(true);
        setGoblin(false);
      });
  };

  const handleCheckbox = useCallback((e) => {
    const { name, checked } = e.target;
    if (name === "check1") {
      setEntireCheck(checked);
      setRestCheck1(checked);
      setRestCheck2(checked);
    }
    if (name === "check2") {
      setRestCheck1(checked);
      setEntireCheck(restCheck2 && checked);
    }
    if (name === "check3") {
      setRestCheck2(checked);
      setEntireCheck(restCheck1 && checked);
    }
  }, []);

  const handleSignUpSubmit = useCallback(() => {
    //이름 유효성 검사
    const nameregExp = /^[가-힣|a-zA-Z|]{2,6}$/;
    if (nameregExp.test(name) === false || !name) {
      setName("");
      return nameRef.current.focus();
    }

    // 반려될 때
    if (!nickname) {
      return nicknameRef.current.focus();
    } else {
      handleValidNickname();
    }

    if (!emailRef) {
      return emailRef.current.focus();
    } else {
      handleValidEmail();
    }

    if (!password) {
      return passwordRef.current.focus();
    }

    // 버그 fix
    if (password !== password2) {
      setPassword2("");
      setPwConfirm(true);
      passwordRef.current.focus();
      return;
    } else if (password === password2) {
      //비번 일치할 때
      setPwConfirm(false);
    }

    if (entireCheck && restCheck1 && restCheck2) {
      setCheckboxIsValid(true);
    } else {
      return setCheckboxIsValid(false);
    }

    const user = {
      name,
      nickname,
      email,
      password,
    };

    dispatch(userActions.signUpRequest(user));
  }, [
    name,
    nickname,
    email,
    password,
    password2,
    entireCheck,
    restCheck1,
    restCheck2,
  ]);

  return (
    <SignUpContainer>
      <img src="../img/welcomecat.png" />
      <FormWrapper>
        <InputWrapper>
          <label>이름</label>
          <input
            type="text"
            value={name}
            ref={nameRef}
            onChange={(e) => setName(e.target.value)}
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
          {pwConfirm && (
            <CheckInput color="red">비밀번호가 일치하지 않습니다.</CheckInput>
          )}
        </InputWrapper>
        <CheckContainer>
          <label>
            <CheckBoxInput
              name="check1"
              value={entireCheck}
              type="checkbox"
              onChange={handleCheckbox}
              checked={entireCheck}
            ></CheckBoxInput>
            모든 약관에 동의
          </label>
          <label>
            <CheckBoxInput
              name="check2"
              value={restCheck1}
              onChange={handleCheckbox}
              type="checkbox"
              checked={restCheck1}
            ></CheckBoxInput>
            개인정보처리방침에 동의 (필수)
          </label>
          <label>
            <CheckBoxInput
              name="check3"
              value={restCheck2}
              onChange={handleCheckbox}
              type="checkbox"
              checked={restCheck2}
            ></CheckBoxInput>
            이용약관에 동의 (필수)
          </label>
          {!checkboxIsValid && (
            <CheckInput color="red">약관에 동의해주세요.</CheckInput>
          )}
        </CheckContainer>
        <SignupBtn onClick={handleSignUpSubmit}>회원가입</SignupBtn>
      </FormWrapper>
      {signUpDone ?
        <Snackbar
          anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
          open={snackBar}
          autoHideDuration={2000}
          key={"bottomcenter"}
        >
          <SnackBarContent>회원가입 완료되었습니다!</SnackBarContent>
        </Snackbar>
        : null}
    </SignUpContainer>
  );
};

export default SignUp;
