import {
  PostCardContainer,
  Title,
  MateContainter,
  ComuContainer,
} from "./styled";

import PostItem from "./PostItem";

const PostCards = () => {
  const MateItems = [
    {
      id: 1,
      src: "img/pet1.jpg",
      title: "울집 댕댕이랑  ",
    },
    {
      id: 2,
      src: "img/pet2.jpg",
      title: "울집 댕댕이랑 산책하실 분 구함2",
    },
    {
      id: 3,
      src: "img/pet3.jpg",
      title: "울집 댕댕이랑 산책하실 분 구함3",
    },
    {
      id: 4,
      src: "img/pet3.jpg",
      title: "울집 댕댕이랑 산책하실 분 구함",
    },
  ];

  const CommunityItems = [
    {
      id: 1,
      src: "img/pet1.jpg",
      title: "울집 댕댕이 궁물 타임~!~!~!",
    },
    {
      id: 2,
      src: "img/pet2.jpg",
      title: "궁금해요 울집 댕댕이",
    },
    {
      id: 3,
      src: "img/pet3.jpg",
      title: "울집 댕댕이랑 산책하실 분 구함",
    },
    {
      id: 4,
      src: "img/pet3.jpg",
      title: "울집 댕댕이랑 산책하실 분 구함",
    },
  ];

  return (
    <>
      <PostCardContainer>
        <Title>인기 게시글</Title>
        <h2>산책 메이트</h2>
        <MateContainter>
          {MateItems.map((item) => (
            <PostItem key={item.id} {...item} />
          ))}
        </MateContainter>
        <h2>커뮤니티</h2>
        <ComuContainer>
          {CommunityItems.map((item) => (
            <PostItem key={item.id} {...item} />
          ))}
        </ComuContainer>
      </PostCardContainer>
    </>
  );
};

export default PostCards;
