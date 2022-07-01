import MyPosts from "./MyPosts";
import { useState } from "react";
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
} from "./styled";

const MyProfile = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const tabClickeHandler = (index) => {
    setActiveIndex(index);
  };

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
                <h2>YS</h2>
                <p>mdlife94@gmail.com</p>
              </UserInfo>
              <UserFeed>
                <p>
                  내가 쓴 게시글 <span>{`${MyPostItems.length}개`}</span>
                </p>
                <p>
                  내가 쓴 댓글 <span>{`${MyCommentItems.length}개`}</span>
                </p>
                <p>
                  좋아요 <span>{`${MyLikedItems.length}개`}</span>
                </p>
              </UserFeed>
            </ProfileInfo>
            <TabWrapper>
              <TabList>
                <li className={activeIndex === 0 ? "is_active" : ""} onClick={() => tabClickeHandler(0)}>
                  내가 쓴 게시글
                </li>
                <li className={activeIndex === 1 ? "is_active" : ""} onClick={() => tabClickeHandler(1)}>
                  내가 쓴 댓글
                </li>
                <li className={activeIndex === 2 ? "is_active" : ""} onClick={() => tabClickeHandler(2)}>
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
