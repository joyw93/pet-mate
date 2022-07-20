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

import {
  loadPostsRequestAction,
  showOldPostAction,
  postResetAction,
} from "../../reducers/community";

const SelectOptions = [
  { id: "latest", name: "최신순" },
  { id: "oldest", name: "오래된 순" },
  { id: "view", name: "조회 순" },
  { id: "like", name: "좋아요 순" },
];

const ListSelection = ({ onChange }) => {
  return (
    <Selection onChange={onChange}>
      {SelectOptions.map((item) => (
        <option key={item.id}>{item.name}</option>
      ))}
    </Selection>
  );
};

const Notice = ({ hotdata }) => {
  const [noticeList, setNoticeList] = useState([]);
  useEffect(() => {
    setNoticeList(hotdata.hotdata.data);
  }, []);

  return (
    <>
      {noticeList &&
        noticeList.map((notice) => (
          <NoticeWrapper
            key={notice.id}
            onClick={() => Router.push(`community/${notice.id}`)}
          >
            <NoticeBtn>인기</NoticeBtn>
            <span>{notice.title}</span>
          </NoticeWrapper>
        ))}
    </>
  );
};

const CommunityMain = (hotdata) => {
  const [filterCond, setFilterCond] = useState("new");
  const { me } = useSelector((state) => state.user);
  const { postDone, posts } = useSelector((state) => state.community);
  const dispatch = useDispatch();

  useEffect(() => {
    if (postDone) {
      dispatch(postResetAction());
      //console.log("글 리셋");
    }
  }, [postDone]);

  // useEffect(() => {
  //   //setFilterCond("new");
  //   dispatch(loadPostsRequestAction(filterCond));
  // }, [filterCond]);

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

  const handleListSelect = (e) => {
    const selectedCond = e.target.value;
    if (selectedCond === "최신순") {
      setFilterCond("new");
    } else if (selectedCond === "오래된 순") {
      setFilterCond("old");
    } else if (selectedCond === "조회 순") {
      setFilterCond("views");
    } else {
      setFilterCond("like");
    }
    console.log(e.target.value);
  };

  return (
    <CommunityCon>
      <Title>커뮤니티</Title>
      <HeadWrapper>
        <ListSelection onChange={handleListSelect} />
        {me ? (
          <PostBtn onClick={goToNew}>
            <span>글쓰기</span>
          </PostBtn>
        ) : null}
      </HeadWrapper>
      <Notice hotdata={hotdata} />
      <CommunityList filterCond={filterCond} />
    </CommunityCon>
  );
};

export default CommunityMain;
