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
import { useRouter } from "next/router";
import { userActions } from "../../store/reducers/user";
import UserPosts from "./UserPosts";

const myPostsData = {
  communityPosts: [
    {
      id: 33,
      title: "프로필~~~~~~~~~~~~~~~~~해야지",
      content: "^^",
      images: [],
    },
    {
      id: 34,
      title: "예에엥에ㅔ",
      content: "와아아아",
      images: [
        {
          url: "https://yongket.s3.ap-northeast-2.amazonaws.com/petmate/community/images/274135f9-e198-4e32-abff-78fb7e159137.png",
        },
      ],
    },
    {
      id: 38,
      title: "테스트4",
      content: "테스트4",
      images: [],
    },
    {
      id: 39,
      title: "테스트5",
      content: "테스트5",
      images: [],
    },
    {
      id: 40,
      title: "테스트6",
      content: "테스트6",
      images: [],
    },
    {
      id: 41,
      title: "테스트7",
      content: "테스트7",
      images: [],
    },
    {
      id: 42,
      title: "테스트8",
      content: "테스트8",
      images: [],
    },
    {
      id: 44,
      title: "테스트10",
      content: "테스트10",
      images: [],
    },
  ],
  sanchaekPosts: [
    {
      id: 31,
      title: "ㅎㅇ",
      content: "ㅎㅇㅎㅇㅎㅇ",
      createdAt: "2022-08-19T09:42:39.495Z",
      user: {
        nickname: "안녕",
      },
      images: [
        {
          url: "https://yongket.s3.ap-northeast-2.amazonaws.com/petmate/sanchaek/images/d9eec55d-df9e-47c4-a3e2-dc7b9e00c299.jpg",
        },
      ],
      mapInfo: {
        id: 31,
        lat: "37.476703049397265",
        lng: "126.98330411053155",
        location: "탐앤탐스 사당역점",
        address: "서울 서초구 방배동 446-1",
        roadAddress: "서울특별시 서초구 방배천로2길 10",
      },
    },
    {
      id: 32,
      title: "산책하실분~~~~~~~~",
      content: "ㅎㅎ",
      createdAt: "2022-08-19T09:43:36.158Z",
      user: {
        nickname: "안녕",
      },
      images: [],
      mapInfo: {
        id: 32,
        lat: "37.5538333002434",
        lng: "127.047282808199",
        location: "살곶이체육공원 인라인트랙",
        address: "서울 성동구 사근동 104",
        roadAddress: "",
      },
    },
  ],
};

const myCommentsData = {
  communityPosts: [
    {
      id: 27,
      title: "안녕",
      content: "안녕안녕",
      images: [],
    },
    {
      id: 32,
      title: "저는 잘 됩니당",
      content: "왜 그럴까욤......? ㅠㅠ",
      images: [
        {
          url: "https://yongket.s3.ap-northeast-2.amazonaws.com/petmate/community/images/a9cc39d5-eb79-4a15-8dc9-08c1f3e3ef0b.jpg",
        },
      ],
    },
    {
      id: 46,
      title: "안녕하세요",
      content: "첫 게시글입니다.",
      images: [],
    },
    {
      id: 44,
      title: "테스트10",
      content: "테스트10",
      images: [],
    },
  ],
  sanchaekPosts: [
    {
      id: 26,
      title: "ㅎㅇ",
      content: "ㅎㅇ",
      images: [],
    },
    {
      id: 25,
      title: "산책",
      content: "ㅇㅇ",
      images: [
        {
          url: "https://yongket.s3.ap-northeast-2.amazonaws.com/petmate/sanchaek/images/82acb119-c1bf-49dd-a478-bbc4c3469b9c.JPG",
        },
        {
          url: "https://yongket.s3.ap-northeast-2.amazonaws.com/petmate/sanchaek/images/d9a2834c-1bba-4641-897c-cc0c9637ed41.JPG",
        },
      ],
    },
    {
      id: 34,
      title: "테스트",
      content: "테스트",
      images: [],
    },
    {
      id: 28,
      title: "안녕하십니까",
      content: "인사드립니다.",
      images: [],
    },
    {
      id: 37,
      title: "잘되나 확인 중",
      content: "하이욤~!~! 오늘은 사당역 10번 출구 앞 스타벅스 예아~! ",
      images: [
        {
          url: "https://yongket.s3.ap-northeast-2.amazonaws.com/petmate/sanchaek/images/27cf9971-929a-41ad-9335-11db1453a0b1.jpg",
        },
      ],
    },
  ],
};

const myLikedData = {
  communityPosts: [
    {
      id: 33,
      title: "프로필~~~~~~~~~~~~~~~~~해야지",
      content: "^^",
      images: [],
    },
    {
      id: 34,
      title: "예에엥에ㅔ",
      content: "와아아아",
      images: [
        {
          url: "https://yongket.s3.ap-northeast-2.amazonaws.com/petmate/community/images/274135f9-e198-4e32-abff-78fb7e159137.png",
        },
      ],
    },
    {
      id: 38,
      title: "테스트4",
      content: "테스트4",
      images: [],
    },
    {
      id: 39,
      title: "테스트5",
      content: "테스트5",
      images: [],
    },
    {
      id: 40,
      title: "테스트6",
      content: "테스트6",
      images: [],
    },
    {
      id: 41,
      title: "테스트7",
      content: "테스트7",
      images: [],
    },
    {
      id: 42,
      title: "테스트8",
      content: "테스트8",
      images: [],
    },
    {
      id: 44,
      title: "테스트10",
      content: "테스트10",
      images: [],
    },
  ],
  sanchaekPosts: [
    {
      id: 31,
      title: "ㅎㅇ",
      content: "ㅎㅇㅎㅇㅎㅇ",
      createdAt: "2022-08-19T09:42:39.495Z",
      user: {
        nickname: "안녕",
      },
      images: [
        {
          url: "https://yongket.s3.ap-northeast-2.amazonaws.com/petmate/sanchaek/images/d9eec55d-df9e-47c4-a3e2-dc7b9e00c299.jpg",
        },
      ],
      mapInfo: {
        id: 31,
        lat: "37.476703049397265",
        lng: "126.98330411053155",
        location: "탐앤탐스 사당역점",
        address: "서울 서초구 방배동 446-1",
        roadAddress: "서울특별시 서초구 방배천로2길 10",
      },
    },
    {
      id: 32,
      title: "산책하실분~~~~~~~~",
      content: "ㅎㅎ",
      createdAt: "2022-08-19T09:43:36.158Z",
      user: {
        nickname: "안녕",
      },
      images: [],
      mapInfo: {
        id: 32,
        lat: "37.5538333002434",
        lng: "127.047282808199",
        location: "살곶이체육공원 인라인트랙",
        address: "서울 성동구 사근동 104",
        roadAddress: "",
      },
    },
  ],
};

const UserProfile = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { id } = router.query;
  const { user } = useSelector((state) => state.user);

  const [activeIndex, setActiveIndex] = useState(0);
  const [subTabActiveIndex, setSubTabActiveIndex] = useState(0);

  const posts = [myPostsData, myCommentsData, myLikedData];

  useEffect(() => {
    if (router.isReady) {
      dispatch(userActions.loadProfileRequest(id));
      //dispatch(loadProfileRequestAction(id));
    }
  }, [router.isReady]);

  useEffect(() => {}, [user]);

  /** 프로필 */
  const tabClickHandler = useCallback((index) => {
    setActiveIndex(index);
    setSubTabActiveIndex(0);
  }, []);

  const subTabClickHandler = useCallback((index) => {
    setSubTabActiveIndex(index);
  }, []);

  return (
    <>
      <ProfileContainer>
        <BackgroundArea />
        <ContentArea>
          <UserContent>
            <ProfileInfo>
              <ProfileImg>
                {user?.profile?.imageUrl ? (
                  <img src={user.profile.imageUrl} alt="프로필이미지" />
                ) : (
                  <img src="../img/defaultimgGrey.png" alt="프로필이미지" />
                )}
              </ProfileImg>
              <UserInfo>
                <h2>{user?.nickname}</h2>
                <p>{user?.comment}</p>
              </UserInfo>
              <UserFeed>
                <div className="list_wrapper">
                  <p>게시글</p>
                  <p>
                    <span>
                      {myPostsData?.communityPosts?.length +
                        myPostsData?.sanchaekPosts?.length}
                    </span>
                    개
                  </p>
                </div>
                <div className="list_wrapper">
                  <p>댓글</p>
                  <p>
                    <span>
                      {myCommentsData?.communityPosts?.length +
                        myCommentsData?.sanchaekPosts?.length}
                    </span>
                    개
                  </p>
                </div>
                <div className="list_wrapper">
                  <p>좋아요</p>
                  <p>
                    <span>
                      {myLikedData?.communityPosts?.length +
                        myLikedData?.sanchaekPosts?.length}
                    </span>
                    개
                  </p>
                </div>
              </UserFeed>
              <ButtonWrapper>
                <button>팔로우</button>
              </ButtonWrapper>
            </ProfileInfo>
            <TabWrapper>
              <TabList>
                <li
                  className={activeIndex === 0 ? "is_active" : ""}
                  onClick={() => tabClickHandler(0)}
                >
                  게시글
                </li>
                <li
                  className={activeIndex === 1 ? "is_active" : ""}
                  onClick={() => tabClickHandler(1)}
                >
                  댓글
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
                    className={subTabActiveIndex === 0 ? "is_active" : ""}
                    onClick={() => subTabClickHandler(0)}
                  >
                    전체
                    <span>
                      (
                      {posts[activeIndex].communityPosts &&
                        posts[activeIndex].sanchaekPosts &&
                        posts[activeIndex].communityPosts?.length +
                          posts[activeIndex].sanchaekPosts?.length}
                      )
                    </span>
                  </li>
                  <li
                    className={subTabActiveIndex === 1 ? "is_active" : ""}
                    onClick={() => subTabClickHandler(1)}
                  >
                    커뮤니티
                    <span>({posts[activeIndex].communityPosts?.length})</span>
                  </li>
                  <li
                    className={subTabActiveIndex === 2 ? "is_active" : ""}
                    onClick={() => subTabClickHandler(2)}
                  >
                    산책메이트
                    <span>({posts[activeIndex].sanchaekPosts?.length})</span>
                  </li>
                </SubTabList>
                {posts[activeIndex] &&
                  (posts[activeIndex].communityPosts?.length > 0 ||
                    posts[activeIndex].sanchaekPosts?.length > 0) &&
                  subTabActiveIndex === 0 && (
                    <>
                      <PostsWrapper>
                        {posts[activeIndex] &&
                          posts[activeIndex].communityPosts?.map((post) => (
                            <UserPosts
                              key={post.id}
                              nav="community"
                              {...post}
                            />
                          ))}
                        {posts[activeIndex] &&
                          posts[activeIndex].sanchaekPosts?.map((post) => (
                            <UserPosts key={post.id} nav="sanchaek" {...post} />
                          ))}
                      </PostsWrapper>
                    </>
                  )}
                {posts[activeIndex] &&
                  posts[activeIndex].communityPosts?.length > 0 &&
                  subTabActiveIndex === 1 && (
                    <>
                      <PostsWrapper>
                        {posts[activeIndex] &&
                          posts[activeIndex].communityPosts?.map((post) => (
                            <UserPosts
                              key={post.id}
                              nav="community"
                              {...post}
                            />
                          ))}
                      </PostsWrapper>
                    </>
                  )}
                {posts[activeIndex] &&
                  posts[activeIndex].sanchaekPosts?.length > 0 &&
                  subTabActiveIndex === 2 && (
                    <>
                      <PostsWrapper>
                        {posts[activeIndex] &&
                          posts[activeIndex].sanchaekPosts?.map((post) => (
                            <UserPosts key={post.id} nav="sanchaek" {...post} />
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

export default UserProfile;
