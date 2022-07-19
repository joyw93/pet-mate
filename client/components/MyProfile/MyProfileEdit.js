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
  ProfileInfo,
  ProfileImg,
  UserInfo,
  UserFeed,
  TabWrapper,
  TabList,
  Input,
  ConfirmButton,
  ButtonWrapper,
  ProfileEditArea,
  CalendarHeader,
} from "./styled";
import { useSelector, useDispatch } from "react-redux";
import Router from "next/router";
import { useCallback } from "react";
import { signOutRequestAction, signOutResetAction } from "../../reducers/user";

const MyProfile = () => {
  const inputRef = useRef(null);
  const dispatch = useDispatch();
  const [startDate, setStartDate] = useState(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const { me, signOutDone, myPostsData } = useSelector((state) => state.user);
  const tabClickHandler = useCallback((index) => {
    setActiveIndex(index);
  }, []);
  const signOut = () => {
    const isAgreed = confirm("정말로 탈퇴하시겠습니까?");
    if (isAgreed) {
      dispatch(signOutRequestAction());
    }
  };

  useEffect(() => {
    if (signOutDone) {
      dispatch(signOutResetAction());
      Router.push("/");
      alert("회원탈퇴가 완료되었습니다.");
    }
  }, [signOutDone]);

  useEffect(() => {
    console.log(startDate);
  }, [startDate]);

  const myProfile = () => {
    Router.push("/profile");
  };

  return (
    <>
      <ProfileContainer>
        <BackgroundArea />
        <ContentArea>
          <UserContent>
            <ProfileInfo>
              <ProfileImg>
                <img src="../img/son.png" alt="프로필이미지" />
              </ProfileImg>
              <UserInfo>
                <h2>{me?.nickname}</h2>
                <p>{me?.email}</p>
              </UserInfo>
              <UserFeed>
                <div className="list_wrapper">
                  <p>내가 쓴 게시글</p>
                  <p>
                    <span>1</span>개
                  </p>
                </div>{" "}
                <div className="list_wrapper">
                  <p>내가 쓴 댓글</p>
                  <p>
                    <span>2</span>개
                  </p>
                </div>
                <div className="list_wrapper">
                  <p>좋아요</p>
                  <p>
                    <span>3</span>개
                  </p>
                </div>
              </UserFeed>
              <ButtonWrapper>
                <button onClick={myProfile}>내 프로필</button>
                <button onClick={signOut}>회원탈퇴</button>
              </ButtonWrapper>
            </ProfileInfo>
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
                <h1>프로필 설정</h1>
                <label>닉네임</label>
                <Input />
                <label>
                  생년월일
                  <DatePicker
                    showPopperArrow={false}
                    selected={startDate}
                    placeholderText="YYYY-MM-DD"
                    locale={ko}
                    dateFormat="yyyy-MM-dd"
                    onChange={(date) => setStartDate(date)}
                    customInput={<Input />}
                    // renderCustomHeader={({})=>(<CalendarHeader>

                    // </CalendarHeader>)}
                  />
                </label>
                <label>한줄 소개</label>
                <Input />
                <div>
                  <ConfirmButton>설정 완료</ConfirmButton>
                </div>
              </ProfileEditArea>
            </TabWrapper>
          </UserContent>
        </ContentArea>
      </ProfileContainer>
    </>
  );
};

export default MyProfile;
