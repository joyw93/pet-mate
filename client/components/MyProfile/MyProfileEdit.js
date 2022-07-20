import MyPosts from "./MyPosts";
import { useEffect, useState, useRef } from "react";
import DatePicker, { registerLocale } from "react-datepicker";
import { ko } from "date-fns/locale";
import "react-datepicker/dist/react-datepicker.css";
import {
  ProfileContainer,
  BackgroundArea,
  ContentArea,
  UserContent,
  ProfileEditContent,
  TabWrapper,
  TabList,
  Input,
  ConfirmButton,
  ImageHolder,
  ProfileEditArea,
  ValidMessage,
  InvalidMessage,
  ImageInput,
  ImageEditWrapper,
} from "./styled";
import { useSelector, useDispatch } from "react-redux";
import Router from "next/router";
import { useCallback } from "react";
import { editProfileRequestAction, loadProfileRequestAction, editProfileResetAction } from "../../reducers/user";

const MyProfile = () => {
  const dispatch = useDispatch();
  const [birthday, setBirthday] = useState("");
  const [date, setDate] = useState(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const { me, editProfileError, user, editProfileDone } = useSelector((state) => state.user);
  const [nickname, setNickname] = useState("");
  const [nicknameValid, setNicknameValid] = useState("");
  const [comment, setComment] = useState("");
  const [image, setImage] = useState("");
  const [imageFile, setImageFile] = useState("");
  const tabClickHandler = useCallback((index) => {
    setActiveIndex(index);
  }, []);

  useEffect(() => {
    if (editProfileDone) {
      dispatch(editProfileResetAction());
      alert("회원정보가 변경되었습니다.");
      Router.back();
    }
    dispatch(loadProfileRequestAction());
  }, [editProfileDone]);

  useEffect(() => {
    if (user) {
      setNickname(user.nickname);
      setBirthday(user.profile.birth);
      setComment(user.profile.comment);
      setImage(user.profile.imageUrl);
    }
    if (user?.profile?.birth) {
      setDate(new Date(user.profile.birth));
    }
  }, [user]);

  useEffect(() => {
    if (editProfileError) {
      setNicknameValid(editProfileError?.message);
    }
  }, [editProfileError]);

  useEffect(() => {
    if (!nickname) {
      setNicknameValid("닉네임을 입력하세요.");
    } else {
      setNicknameValid(null);
    }
  }, [nickname]);

  const onChangeNickname = (e) => {
    setNickname(e.target.value);
  };

  const onChangeComment = (e) => {
    setComment(e.target.value);
  };

  const onChangeImage = (e) => {
    const imageFile = e.target.files[0];
    const imageUrl = URL.createObjectURL(imageFile);
    setImage(imageUrl);
    setImageFile(imageFile);
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
      return;
    }
    const data = new FormData();
    data.append("nickname", nickname);
    data.append("birthday", birthday);
    data.append("comment", comment);
    data.append("image", imageFile);
    dispatch(editProfileRequestAction(data));
  }, [nickname, birthday, comment, imageFile]);

  return (
    <>
      <ProfileContainer>
        <BackgroundArea />
        <ContentArea>
          <UserContent>
            <ProfileEditContent>
              <TabWrapper>
                <TabList>
                  <li className={activeIndex === 0 ? "is_active" : ""} onClick={() => tabClickHandler(0)}>
                    프로필 설정
                  </li>
                  <li className={activeIndex === 1 ? "is_active" : ""} onClick={() => tabClickHandler(1)}>
                    계정 설정
                  </li>
                </TabList>
                <ProfileEditArea>
                  <span>닉네임</span>
                  <Input onChange={onChangeNickname} value={nickname} />
                  {nicknameValid === "닉네임을 입력하세요." || nicknameValid === "중복된 닉네임입니다." ? (
                    <InvalidMessage>{nicknameValid}</InvalidMessage>
                  ) : (
                    <ValidMessage>{nicknameValid}</ValidMessage>
                  )}
                  <span>생년월일</span>
                  <DatePicker
                    showPopperArrow={false}
                    selected={date}
                    placeholderText="YYYY-MM-DD"
                    locale={ko}
                    dateFormat="yyyy-MM-dd"
                    onChange={onChangeBirthday}
                    customInput={<Input />}
                  />
                  <span>한줄 소개</span>
                  <Input onChange={onChangeComment} value={comment} />

                  <span>프로필 이미지</span>
                  <ImageEditWrapper onChange={onChangeImage}>
                    <ImageInput type="file" />
                    {image ? (
                      <ImageHolder src={image} alt="이미지 업로드" />
                    ) : (
                      <ImageHolder src="../../img/default_profile.png" alt="이미지 업로드" />
                    )}
                  </ImageEditWrapper>
                  <div>
                    <ConfirmButton onClick={submit}>설정 완료</ConfirmButton>
                  </div>
                </ProfileEditArea>
              </TabWrapper>
            </ProfileEditContent>
          </UserContent>
        </ContentArea>
      </ProfileContainer>
    </>
  );
};

export default MyProfile;
