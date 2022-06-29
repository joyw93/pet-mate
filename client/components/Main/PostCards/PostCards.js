import { PostCardContainer, Title, RunningMate, Community } from "./styled";

const PostCards = () => {
  return (
    <>
      <PostCardContainer>
        <Title>인기 게시글</Title>
        <RunningMate>
          <span>산책 메이트</span>
        </RunningMate>
        <Community></Community>
      </PostCardContainer>
    </>
  );
};

export default PostCards;
