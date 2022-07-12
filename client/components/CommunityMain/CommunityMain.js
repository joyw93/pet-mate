import {
  CommunityCon,
  Title,
  NoticeBtn,
  PostBtn,
  HeadWrapper,
  NoticeWrapper,
  Selection,
} from "./styled";
import CommunityList from "./CommunityList";
import Link from "next/link";

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

const CommunityMain = () => {
  return (
    <CommunityCon>
      <Title>커뮤니티</Title>
      <HeadWrapper>
        <ListSelection />
        <PostBtn>
          <Link href="/community/post">
            <a>글쓰기</a>
          </Link>
        </PostBtn>
      </HeadWrapper>
      <Notice />
      <CommunityList />
    </CommunityCon>
  );
};

export default CommunityMain;
