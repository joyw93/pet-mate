import { useEffect, useState, useRef } from "react";
import DatePicker, { registerLocale } from "react-datepicker";
import { ko } from "date-fns/locale";
import "react-datepicker/dist/react-datepicker.css";
import {
  Input,
  ConfirmButton,
  ImageHolder,
  ProfileEditArea,
  ValidMessage,
  InvalidMessage,
  ImageInput,
  ImageEditWrapper,
  NicknameWrapper,
  NicknameValidWrapper,
  BirthDateWrapper,
  BioWrapper,
  ImageInputArea,
  InputTitle,
  ImageDeleteBtn,
} from "./styled";
import { useSelector, useDispatch } from "react-redux";
import Router from "next/router";
import { useCallback } from "react";
import {
  editProfileRequestAction,
  loadProfileRequestAction,
  editProfileResetAction,
} from "../../reducers/user";

const ProfileTab = () => {
  const dispatch = useDispatch();
  const [birthday, setBirthday] = useState("");
  const [date, setDate] = useState(null);
  const { me, editProfileError, editProfileDone } = useSelector(
    (state) => state.user
  );
  const [nickname, setNickname] = useState("");
  const [nicknameValid, setNicknameValid] = useState("");
  const [comment, setComment] = useState("");
  const [image, setImage] = useState("");
  const [imageFile, setImageFile] = useState("");

  useEffect(() => {
    if (editProfileDone) {
      dispatch(editProfileResetAction());
      alert("회원정보가 변경되었습니다.");
      Router.back();
    }
    dispatch(loadProfileRequestAction());
  }, [editProfileDone]);

  useEffect(() => {
    if (me) {
      setNickname(me?.nickname);
      setBirthday(me?.profile?.birth);
      setComment(me?.profile?.comment);
      setImage(me?.profile?.imageUrl);
    }
    if (me?.profile?.birth) {
      setDate(new Date(me.profile.birth));
    }
  }, [me]);

  useEffect(() => {
    if (editProfileError) {
      setNicknameValid(editProfileError?.message);
    }
  }, [editProfileError]);

  const onChangeNickname = (e) => {
    setNickname(e.target.value);
  };

  const onChangeComment = (e) => {
    setComment(e.target.value);
  };

  const onChangeImage = (e) => {
    if (e.target.files.length > 0) {
      const imageFile = e.target.files[0];
      const imageUrl = URL.createObjectURL(imageFile);
      setImage(imageUrl);
      setImageFile(imageFile);
    }
  };
  const handleDeleteImage = () => {
    setImage("");
    setImageFile("");
  };

  const onChangeBirthday = (data) => {
    setDate(data);
    if (data) {
      const year = data.getFullYear();
      const month = data.getMonth() + 1;
      const day = data.getDate();
      const fullDate = `${year}-${month}-${day}`;
      setBirthday(fullDate);
    }
  };

  const submit = useCallback(() => {
    if (!nickname) {
      setNicknameValid("닉네임을 입력하세요.");
      return;
    }
    const data = new FormData();
    data.append("nickname", nickname);
    if (birthday) {
      data.append("birthday", birthday);
    }
    if (comment) {
      data.append("comment", comment);
    }
    data.append("image", imageFile);
    dispatch(editProfileRequestAction(data));
  }, [nickname, birthday, comment, imageFile]);

  return (
    <>
      <ProfileEditArea>
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
            ) : (
              <ValidMessage>{nicknameValid}</ValidMessage>
            )}
          </NicknameValidWrapper>
        </NicknameWrapper>
        <BirthDateWrapper>
          <InputTitle>
            <span>생년월일</span>
            <span>(키보드 입력 가능)</span>
          </InputTitle>

          <DatePicker
            showPopperArrow={false}
            selected={date ?? ""}
            placeholderText="YYYY-MM-DD"
            locale={ko}
            dateFormat="yyyy-MM-dd"
            onChange={onChangeBirthday}
            customInput={<Input />}
          />
        </BirthDateWrapper>
        <BioWrapper>
          <InputTitle>
            <span>한줄 소개</span>
            <span>(20자 이내)</span>
          </InputTitle>
          <Input
            maxLength="20"
            onChange={onChangeComment}
            value={comment || ""}
          />
        </BioWrapper>
        <ImageEditWrapper>
          <span>프로필 이미지</span>
          <ImageInputArea onChange={onChangeImage}>
            <ImageInput type="file" />
            {image ? (
              <ImageHolder src={image} alt="이미지 업로드" />
            ) : (
              <ImageHolder
                src="../../img/defaultimgGrey.png"
                alte="이미지없음"
              />
            )}
          </ImageInputArea>
          {image && (
            <ImageDeleteBtn onClick={handleDeleteImage}>
              <svg
                className="delete-icon"
                width="12"
                height="12"
                fill="currentColor"
                viewBox="0 0 12 12"
                preserveAspectRatio="xMidYMid meet"
              >
                <path d="M6.8 6l4.2 4.2-.8.8L6 6.8 1.8 11l-.8-.8L5.2 6 1 1.8l.8-.8L6 5.2 10.2 1l.8.8L6.8 6z"></path>
              </svg>
            </ImageDeleteBtn>
          )}
        </ImageEditWrapper>
        <ConfirmButton onClick={submit}>설정 완료</ConfirmButton>
      </ProfileEditArea>
    </>
  );
};

export default ProfileTab;
