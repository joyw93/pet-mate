import { useEffect, useState, useRef } from "react";
import "react-datepicker/dist/react-datepicker.css";
import {
  Input,
  ConfirmButton,
  ProfileEditArea,
  ValidMessage,
  InvalidMessage,
  NicknameWrapper,
  NicknameValidWrapper,
  InputTitle,
  GoogleLogin,
  NameWrapper,
  EmailWrapper,
  AdditionalInfo,
} from "./styled";
import { useSelector, useDispatch } from "react-redux";
import Router from "next/router";
import { useCallback } from "react";
import { userActions } from '../../store/reducers/user';

const GoogleProfile = () => {
  const dispatch = useDispatch();
  const { userInfo, setProfileError, setProfileDone } = useSelector(
    (state) => state.user
  );
  const [nickname, setNickname] = useState("");
  const [nicknameValid, setNicknameValid] = useState("");


  useEffect(() => {
    if (nickname) {
      setNicknameValid("");
    }
  }, [nickname]);

  useEffect(() => {
    if (setProfileDone) {
      alert("회원가입이 완료되었습니다.");
      Router.push('/');
    }
  }, [setProfileDone]);

  useEffect(() => {
    if (setProfileError) {
      setNicknameValid(setProfileError?.message);
    }
  }, [setProfileError]);

  const onChangeNickname = (e) => {
    setNickname(e.target.value);
  };

  const submit = useCallback(() => {
    if (!nickname) {
      setNicknameValid("닉네임을 입력하세요.");
      return;
    }
    const data = { nickname };
    dispatch(userActions.setProfileRequest(data));
  }, [nickname]);

  return (
    <>
      <ProfileEditArea>
        <GoogleLogin>
          <AdditionalInfo>추가 정보 입력</AdditionalInfo>
          <NameWrapper>
            <InputTitle>
              <span>이름</span>
              <span></span>
            </InputTitle>
            <Input disabled value={userInfo?.name || ""} />
          </NameWrapper>
          <EmailWrapper>
            <InputTitle>
              <span>이메일</span>
              <span></span>
            </InputTitle>
            <Input disabled value={userInfo?.email || ""} />
          </EmailWrapper>
          <NicknameWrapper>
            <InputTitle>
              <span>닉네임</span>
              <span>(10자 이내)</span>
            </InputTitle>
            <Input
              maxLength="10"
              onChange={onChangeNickname}
              value={nickname || ""}
            />
            <NicknameValidWrapper>
              {nicknameValid === "닉네임을 입력하세요." ||
                nicknameValid === "중복된 닉네임입니다." ? (
                <InvalidMessage>{nicknameValid}</InvalidMessage>
              ) : null}
            </NicknameValidWrapper>
          </NicknameWrapper>

          <ConfirmButton onClick={submit}>회원가입 완료</ConfirmButton>
        </GoogleLogin>
      </ProfileEditArea>
    </>
  );
};

export default GoogleProfile;
