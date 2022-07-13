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
import { useSelector } from "react-redux";
import Router from "next/router";
import { useCallback } from "react";

const MyProfile = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const { me } = useSelector((state) => state.user);

  const tabClickHandler = useCallback((index) => {
    setActiveIndex(index);
  }, []);

  const MyPostItems = [
    {
      id: 1,
      src: "img/pet1.jpg",
      title: "울집 댕댕이랑  ",
      link: "/community",
    },
    {
      id: 2,
      src: "img/pet2.jpg",
      title: "울집 댕댕이랑 산책하실 분 구함2",
      link: "/community",
    },
    {
      id: 3,
      src: "img/pet3.jpg",
      title: "울집 댕댕이랑 산책하실 분 구함3",
      link: "/community",
    },
    {
      id: 4,
      src: "img/pet3.jpg",
      title: "울집 댕댕이랑 산책하실 분 구함",
      link: "/community",
    },
    {
      id: 5,
      src: "img/pet2.jpg",
      title: "울집 댕댕이랑 산책하실 분 구함2",
      link: "/community",
    },
  ];

  const MyCommentItems = [
    {
      id: 6,
      src: "img/pet1.jpg",
      con: "울집 댕댕이 궁물 타임~!~!~!",
      link: "/community",
    },
    {
      id: 7,
      src: "img/pet2.jpg",
      title: "궁금해요 울집 댕댕이",
      link: "/community",
    },
  ];

  const MyLikedItems = [
    {
      id: 8,
      src: "img/pet1.jpg",
      con: "울집 댕댕이 궁물 타임~!~!~!",
      link: "/community",
      tag: "like",
    },
    {
      id: 9,
      src: "img/pet2.jpg",
      title: "궁금해요 울집 댕댕이",
      link: "/community",
      tag: "mypost",
    },
    {
      id: 10,
      src: "img/pet3.jpg",
      title: "울집 댕댕이랑 산책하실 분 구함",
      link: "/community",
    },
  ];

  const titles = [MyPostItems, MyCommentItems, MyLikedItems];

  return (
    <>
      <ProfileContainer>
        <BackgroundArea />
        <ContentArea>
          <UserContent>
            <ProfileInfo>
              <ProfileImg>
                <img src="img/son.png" alt="프로필이미지" />
              </ProfileImg>
              <UserInfo>
                <h2>{me?.nickname}</h2>
                <p>{me?.email}</p>
              </UserInfo>
              <UserFeed>
                <div class="list_wrapper">
                  <p>내가 쓴 게시글</p>
                  <p>
                    <span>{MyPostItems.length}</span>개
                  </p>
                </div>{" "}
                <div class="list_wrapper">
                  <p>내가 쓴 댓글</p>
                  <p>
                    <span>{MyCommentItems.length}</span>개
                  </p>
                </div>
                <div class="list_wrapper">
                  <p>좋아요</p>
                  <p>
                    <span>{MyLikedItems.length}</span>개
                  </p>
                </div>
              </UserFeed>
              <ButtonWrapper>
                <button>프로필 수정</button>
                <button>회원탈퇴</button>
              </ButtonWrapper>
            </ProfileInfo>
            <TabWrapper>
              <TabList>
                <li className={activeIndex === 0 ? "is_active" : ""} onClick={() => tabClickHandler(0)}>
                  내가 쓴 게시글
                </li>
                <li className={activeIndex === 1 ? "is_active" : ""} onClick={() => tabClickHandler(1)}>
                  내가 쓴 댓글
                </li>
                <li className={activeIndex === 2 ? "is_active" : ""} onClick={() => tabClickHandler(2)}>
                  좋아요
                </li>
              </TabList>

              <ImageWrapper>
                {titles[activeIndex].map((item) => (
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
