import {
  CommunityCon,
  Title,
  NoticeBtn,
  PostBtn,
  HeadWrapper,
  NoticeWrapper,
  Selection,
} from "./styled";

import { useSelector, useDispatch } from "react-redux";
import CommunityList from "./CommunityList";
import axios from "axios";
import Router from "next/router";
import { useEffect, useState } from "react";

import { loadPostsRequestAction } from "../../reducers/community";

const SelectOptions = [
  { id: "latest", name: "최신 순" },
  { id: "oldest", name: "오래된 순" },
  { id: "view", name: "조회 순" },
  { id: "like", name: "좋아요 순" },
];

const ListSelection = () => {
  return (
    <Selection>
      {SelectOptions.map((item) => (
        <option key={item.id}>{item.name}</option>
      ))}
    </Selection>
  );
};

const NoticeList = [
  {
    id: 1,
    title:
      "공지1 어쩌구 저쩌구 집에 가고싶어여 근데 왜 안 끝나나요 오늘 안 놀았는데;;킹받",
  },
  {
    id: 2,
    title:
      "공지2 어쩌구 저쩌구 집에 가고싶어여 근데 왜 안 끝나나요 오늘 안 놀았는데;;킹받",
  },
];

const Notice = () => {
  return (
    <>
      {NoticeList.map((notice) => (
        <NoticeWrapper key={notice.id}>
          <NoticeBtn>인기</NoticeBtn>
          <span>{notice.title}</span>
        </NoticeWrapper>
      ))}
    </>
  );
};

const CommunityMain = (data) => {
  const { me } = useSelector((state) => state.user);
  const { postDone, posts } = useSelector((state) => state.community);
  const dispatch = useDispatch();

  useEffect(() => {
    if (postDone) {
      dispatch({ type: POST_RESET });
      console.log("글 리셋");
    }
  }, [postDone]);

  //const [posts, setPosts] = useState([]);

  useEffect(() => {
    dispatch(loadPostsRequestAction());
  }, []);

  console.log(posts);

  const goToNew = () => {
    if (!me) {
      Router.replace("/login");
    } else {
      Router.replace("/community/new");
    }
  };

  const loadPosts = async () => {
    const result = await axios.get("http://api.petmate.kr/community?count=100");
    const data = result.data.data;
    console.log(data);
  };

  const handleLoading = () => {
    dispatch(loadPostsRequestAction());
  };

  return (
    <CommunityCon>
      <button onClick={loadPosts}>게시글 불러오기</button>
      <button onClick={handleLoading}>커뮤니티 게시글 보기</button>
      <Title>커뮤니티</Title>
      <HeadWrapper>
        <ListSelection />
        {me ? (
          <PostBtn onClick={goToNew}>
            <span>글쓰기</span>
          </PostBtn>
        ) : null}
      </HeadWrapper>
      <Notice />

      {/* {posts && posts.map((item) => <div key={item.id}>{item.content}</div>)} */}
      <CommunityList posts={posts} />
    </CommunityCon>
  );
};

export default CommunityMain;
