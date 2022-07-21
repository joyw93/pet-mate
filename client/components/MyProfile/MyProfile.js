import MyPosts from "./MyPosts";
import { useEffect, useState } from "react";
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
  ImageWrapper,
  ButtonWrapper,
} from "./styled";
import { useSelector, useDispatch } from "react-redux";
import Router from "next/router";
import { useCallback } from "react";
import {
  signOutRequestAction,
  signOutResetAction,
  loadMyPostsAction,
  loadMyCommentsAction,
  loadMyLikedAction,
  loadProfileRequestAction,
} from "../../reducers/user";

const MyProfile = () => {
  const dispatch = useDispatch();
  const [activeIndex, setActiveIndex] = useState(0);
  const {
    user,
    me,
    signOutDone,
    myPostsData,
    myCommentsData,
    myLikedData,
    loadMyPostsDone,
    loadMyCommentsDone,
    loadMyLikedDone,
  } = useSelector((state) => state.user);
  const tabClickHandler = useCallback((index) => {
    setActiveIndex(index);
  }, []);

  const [myPostItems, setMyPostItems] = useState([]);
  const [myCommentItems, setMyCommentItems] = useState([]);
  const [myLikedItems, setMyLikedItems] = useState([]);

  useEffect(() => {
    dispatch(loadProfileRequestAction());
    dispatch(loadMyPostsAction());
    dispatch(loadMyCommentsAction());
    dispatch(loadMyLikedAction());
  }, []);

  useEffect(() => {
    if (loadMyPostsDone) {
      setMyPostItems(myPostsData);
    }
  }, [myPostsData]);

  useEffect(() => {
    if (loadMyCommentsDone) {
      setMyCommentItems(myCommentsData);
    }
  }, [myCommentsData]);

  useEffect(() => {
    if (loadMyLikedDone) {
      setMyLikedItems(myLikedData);
    }
  }, [myLikedData]);

  const titles = [myPostItems, myCommentsData, myLikedItems];
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

  const profileEdit = () => {
    Router.push("/profile/edit");
  };

  return (
    <>
      <ProfileContainer>
        <BackgroundArea />
        <ContentArea>
          <UserContent>
            <ProfileInfo>
              <ProfileImg>
                {me?.profile?.imageUrl ? (
                  <img src={me?.profile?.imageUrl} alt="프로필이미지" />
                ) : (
                  <img src="img/default_profile.png" alt="프로필이미지" />
                )}
              </ProfileImg>
              <UserInfo>
                <h2>{me?.nickname}</h2>
                <p>{me?.email}</p>
              </UserInfo>
              <UserFeed>
                <div className="list_wrapper">
                  <p>내가 쓴 게시글</p>
                  <p>
                    <span>{myPostsData.length}</span>개
                  </p>
                </div>{" "}
                <div className="list_wrapper">
                  <p>내가 쓴 댓글</p>
                  <p>
                    <span>{myCommentsData.length}</span>개
                  </p>
                </div>
                <div className="list_wrapper">
                  <p>좋아요</p>
                  <p>
                    <span>{myLikedItems.length}</span>개
                  </p>
                </div>
              </UserFeed>
              <ButtonWrapper>
                <button onClick={profileEdit}>프로필 수정</button>
                <button onClick={signOut}>회원탈퇴</button>
              </ButtonWrapper>
            </ProfileInfo>
            <TabWrapper>
              <TabList>
                <li
                  className={activeIndex === 0 ? "is_active" : ""}
                  onClick={() => tabClickHandler(0)}
                >
                  내가 쓴 게시글
                </li>
                <li
                  className={activeIndex === 1 ? "is_active" : ""}
                  onClick={() => tabClickHandler(1)}
                >
                  내가 쓴 댓글
                </li>
                <li
                  className={activeIndex === 2 ? "is_active" : ""}
                  onClick={() => tabClickHandler(2)}
                >
                  좋아요
                </li>
              </TabList>

              <ImageWrapper>
                {titles[activeIndex] &&
                  titles[activeIndex].map((item) => (
                    <MyPosts key={item.id} {...item} />
                  ))}
              </ImageWrapper>
            </TabWrapper>
          </UserContent>
        </ContentArea>
      </ProfileContainer>
    </>
  );
};

export default MyProfile;
