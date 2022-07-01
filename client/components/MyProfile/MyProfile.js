import MyPosts from "./MyPosts/MyPosts";
import MyComments from "./MyComments/MyComments";
import LikedPosts from "./LikedPosts/LikedPosts";

import { ProfileContainer, BackgroundArea, ContentArea, UserContent } from "./styled";
import { useState } from "react";

const MyProfile = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const tabClickeHandler = (index) => {
    setActiveIndex(index);
  };

  const generateKey = (pre) => {
    return `${pre}_${new Date().getTime()}`;
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
    },
    {
      id: 9,
      src: "img/pet2.jpg",
      title: "궁금해요 울집 댕댕이",
      link: "/community",
    },
    {
      id: 10,
      src: "img/pet3.jpg",
      title: "울집 댕댕이랑 산책하실 분 구함",
      link: "/community",
    },
  ];

  const tabContentsArr = [
    {
      tabTitle: (
        <li className={activeIndex === 0 ? "is_active" : ""} onClick={() => tabClickeHandler(0)}>
          내가 쓴 게시글
        </li>
      ),
      tabContent: MyPostItems.map((item) => <MyPosts key={generateKey(item.id)} {...item} />),
    },
    {
      tabTitle: (
        <li className={activeIndex === 1 ? "is_active" : ""} onClick={() => tabClickeHandler(1)}>
          내가 쓴 댓글
        </li>
      ),
      tabContent: MyCommentItems.map((item) => <MyComments key={generateKey(item.id)} {...item} />),
    },
    {
      tabTitle: (
        <li className={activeIndex === 2 ? "is_active" : ""} onClick={() => tabClickeHandler(2)}>
          좋아요
        </li>
      ),
      tabContent: MyLikedItems.map((item) => <LikedPosts key={generateKey(item.id)} {...item} />),
    },
  ];

  return (
    <>
      <ProfileContainer>
        <BackgroundArea />
        <ContentArea>
          <UserContent>
            <div id="profile_info">
              <div id="profile_img">
                <img src="img/son.png" alt="프로필이미지" />
              </div>
              <div id="user_info">
                <h2>YS</h2>
                <p>mdlife94@gmail.com</p>
              </div>
              <div id="user_feed">
                <p>
                  내가 쓴 게시글 <span>{`${MyPostItems.length}개`}</span>
                </p>
                <p>
                  내가 쓴 댓글 <span>{`${MyCommentItems.length}개`}</span>
                </p>
                <p>
                  좋아요 <span>{`${MyLikedItems.length}개`}</span>
                </p>
              </div>
            </div>
            <div id="tab">
              <ul id="tab_lists">
                {tabContentsArr.map((tabBox) => {
                  return tabBox.tabTitle;
                })}
              </ul>
              <div id="tabConBox">{tabContentsArr[activeIndex].tabContent}</div>
            </div>
          </UserContent>
        </ContentArea>
      </ProfileContainer>
    </>
  );
};

export default MyProfile;
