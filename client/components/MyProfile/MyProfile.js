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
  SubTabList,
  PostsWrapper,
  PostsContainer,
  ButtonWrapper,
} from "./styled";
import { useSelector, useDispatch } from "react-redux";
import Router from "next/router";
import { useCallback } from "react";
import { userActions } from "../../store/reducers/user";
import { communityActions } from "../../store/reducers/community";
import { sanchaekActions } from "../../store/reducers/sanchaek";

const MyProfile = () => {
  const dispatch = useDispatch();
  const [activeIndex, setActiveIndex] = useState(0);
  const [titleIndex, setTitleIndex] = useState(0);
  const { user, me, signOutDone, myPostsData, myCommentsData, myLikedData } =
    useSelector((state) => state.user);

  const tabClickHandler = useCallback((index) => {
    setActiveIndex(index);
  }, []);

  const subTabClickHandler = useCallback((index) => {
    setTitleIndex(index);
  }, []);

  useEffect(() => {
    //dispatch(userActions.loadProfileRequest());
    dispatch(userActions.loadMyProfileRequest());
    dispatch(userActions.loadMyPostsRequest());
    dispatch(userActions.loadMyCommentsRequest());
    dispatch(userActions.loadMyLikedRequest());
  }, []);

  useEffect(() => {
    dispatch(communityActions.loadPostDetailReset());
    dispatch(sanchaekActions.sanchaekLoadPostDetailReset());
  }, []);

  const posts = [myPostsData, myCommentsData, myLikedData];
  // const title = [all, community, sanchaek];
  const signOut = () => {
    const isAgreed = confirm("정말로 탈퇴하시겠습니까?");
    if (isAgreed) {
      dispatch(userActions.signOutRequest());
      //dispatch(signOutRequestAction());
    }
  };

  useEffect(() => {
    if (signOutDone) {
      dispatch(userActions.signOutReset());
      //dispatch(signOutResetAction());
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
                  <img src="img/defaultimgGrey.png" alt="프로필이미지" />
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
                </div>
                <div className="list_wrapper">
                  <p>내가 쓴 댓글</p>
                  <p>
                    <span>{myCommentsData.length}</span>개
                  </p>
                </div>
                <div className="list_wrapper">
                  <p>좋아요</p>
                  <p>
                    <span>{myLikedData.length}</span>개
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

              <PostsContainer>
                <SubTabList>
                  <li
                    className={titleIndex === 0 ? "is_active" : ""}
                    onClick={() => subTabClickHandler(0)}
                  >
                    전체 <span>({posts[activeIndex].length})</span>
                  </li>
                  <li
                    className={titleIndex === 1 ? "is_active" : ""}
                    onClick={() => subTabClickHandler(1)}
                  >
                    커뮤니티 <span>({posts[activeIndex].length})</span>
                  </li>
                  <li
                    className={titleIndex === 2 ? "is_active" : ""}
                    onClick={() => subTabClickHandler(2)}
                  >
                    산책메이트 <span>({posts[activeIndex].length})</span>
                  </li>
                </SubTabList>
                {posts[activeIndex] &&
                  posts[activeIndex].length > 0 &&
                  titleIndex === 0 && (
                    <>
                      <PostsWrapper>
                        {posts[activeIndex] &&
                          posts[activeIndex].map((post) => (
                            <MyPosts key={post.id} {...post} />
                          ))}
                      </PostsWrapper>
                    </>
                  )}
                {posts[activeIndex] &&
                  posts[activeIndex].length > 0 &&
                  titleIndex === 1 && (
                    <>
                      <PostsWrapper>
                        {posts[activeIndex] &&
                          posts[activeIndex].map((post) => (
                            <MyPosts key={post.id} {...post} />
                          ))}
                      </PostsWrapper>
                    </>
                  )}
                {posts[activeIndex] &&
                  posts[activeIndex].length > 0 &&
                  titleIndex === 2 && (
                    <>
                      <PostsWrapper>
                        {posts[activeIndex] &&
                          posts[activeIndex].map((post) => (
                            <MyPosts key={post.id} {...post} />
                          ))}
                      </PostsWrapper>
                    </>
                  )}
              </PostsContainer>
            </TabWrapper>
          </UserContent>
        </ContentArea>
      </ProfileContainer>
    </>
  );
};

export default MyProfile;
