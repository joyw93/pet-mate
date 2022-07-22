import { useEffect, useState, useRef } from "react";
import DatePicker, { registerLocale } from "react-datepicker";
import { ko } from "date-fns/locale";
import "react-datepicker/dist/react-datepicker.css";
import {
  Input,
  ConfirmButton,
  ProfileEditArea,
  ValidMessage,
  InvalidMessage,
  NameWrapper,
  PasswordWrapper,
  PasswordCheckWrapper,
  InputTitle,
  EmailWrapper,
  DeleteAccountButton,
} from "./styled";
import { useSelector, useDispatch } from "react-redux";
import Router from "next/router";
import { useCallback } from "react";
import {
  signOutRequestAction,
  signOutResetAction,
  editProfileRequestAction,
  loadProfileRequestAction,
  editProfileResetAction,
  editAccountRequestAction,
  editAccountResetAction,
} from "../../reducers/user";

const AccountTab = () => {
  const dispatch = useDispatch();
  const { me, editProfileDone, signOutDone, editAccountDone, editAccountError } = useSelector((state) => state.user);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [currentPasswordValid, setCurrentPasswordValid] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [newPasswordValid, setNewPasswordValid] = useState("");
  const [newPasswordConfirm, setNewPasswordConfirm] = useState("");
  const [newPasswordConfirmValid, setNewPasswordConfirmValid] = useState("");

  useEffect(() => {
    if (editAccountDone) {
      dispatch(editAccountResetAction());
      alert("계정정보가 변경되었습니다.");
      Router.back();
    }
  }, [editAccountDone]);

  useEffect(() => {
    if (editAccountError?.statusCode === 401) {
      setCurrentPasswordValid("비밀번호가 일치하지 않습니다.");
    }
  }, [editAccountError]);

  useEffect(() => {
    if (editProfileDone) {
      dispatch(editProfileResetAction());
      alert("계정정보가 변경되었습니다.");
      Router.back();
    }
    dispatch(loadProfileRequestAction());
  }, [editProfileDone]);

  useEffect(() => {
    if (me) {
      setName(me?.name);
      setEmail(me?.email);
    }
  }, [me]);

  useEffect(() => {
    if (signOutDone) {
      dispatch(signOutResetAction());
      Router.push("/");
      alert("회원탈퇴가 완료되었습니다.");
    }
  }, [signOutDone]);

  const signOut = () => {
    const isAgreed = confirm("정말로 탈퇴하시겠습니까?");
    if (isAgreed) {
      dispatch(signOutRequestAction());
    }
  };

  const submit = useCallback(() => {
    if (!currentPassword) {
      setCurrentPasswordValid("현재 비밀번호를 입력하세요.");
      return;
    }
    if (!newPassword || !newPasswordConfirm) {
      setNewPasswordValid("새 비밀번호를 입력하세요.");
      return;
    }
    if (newPassword !== newPasswordConfirm) {
      setNewPasswordConfirmValid("비밀번호가 일치하지 않습니다.");
      return;
    } else {
      const data = { currentPassword, newPassword };
      dispatch(editAccountRequestAction(data));
    }
  }, [currentPassword, newPassword, newPasswordConfirm]);

  return (
    <>
      <ProfileEditArea>
        <input type="text" style={{ width: 0, height: 0, border: "none" }} />
        <input type="password" autoComplete="new-password" style={{ width: 0, height: 0, border: "none" }} />
        <DeleteAccountButton onClick={signOut}>회원탈퇴</DeleteAccountButton>
        <NameWrapper>
          <InputTitle>
            <span>이름</span>
            <span></span>
          </InputTitle>
          <Input value={name} disabled />
        </NameWrapper>
        <EmailWrapper>
          <InputTitle>
            <span>이메일</span>
            <span></span>
          </InputTitle>
          <Input value={email} disabled />
        </EmailWrapper>
        <PasswordWrapper>
          <InputTitle>
            <span>현재비밀번호</span>
            <span></span>
          </InputTitle>
          <Input
            type="password"
            onChange={(e) => {
              setCurrentPassword(e.target.value);
            }}
            autoComplete="no"
          />
          {currentPasswordValid === "비밀번호가 일치하지 않습니다." || currentPasswordValid === "현재 비밀번호를 입력하세요." ? (
            <InvalidMessage>{currentPasswordValid}</InvalidMessage>
          ) : (
            <ValidMessage>{currentPasswordValid}</ValidMessage>
          )}
        </PasswordWrapper>
        <PasswordWrapper>
          <InputTitle>
            <span>새 비밀번호</span>
            <span></span>
          </InputTitle>
          <Input
            type="password"
            onChange={(e) => {
              setNewPassword(e.target.value);
            }}
            autoComplete="no"
          />
          {newPasswordValid === "새 비밀번호를 입력하세요." ? (
            <InvalidMessage>{newPasswordValid}</InvalidMessage>
          ) : (
            <ValidMessage>{newPasswordValid}</ValidMessage>
          )}
        </PasswordWrapper>
        <PasswordCheckWrapper>
          <InputTitle>
            <span>새 비밀번호 확인</span>
            <span></span>
          </InputTitle>
          <Input
            type="password"
            onChange={(e) => {
              setNewPasswordConfirm(e.target.value);
            }}
            autoComplete="no"
          />
        </PasswordCheckWrapper>
        <ConfirmButton onClick={submit}>설정 완료</ConfirmButton>
      </ProfileEditArea>
    </>
  );
};

export default AccountTab;
