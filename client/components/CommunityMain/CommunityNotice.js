import { useState, useEffect } from 'react';
import {
  NoticeBtn,
  NoticeWrapper,
} from "./styled";
import Router from "next/router";

const CommunityNotice = ({ hotPosts }) => {
  const [noticeList, setNoticeList] = useState([]);
  useEffect(() => {
    setNoticeList(hotPosts.data.slice(0, 2));
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

export default CommunityNotice;