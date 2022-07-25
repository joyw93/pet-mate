import { PostCardContainer, Title, PostContainer } from "./styled";
import Link from "next/link";
import { HotCommunityItem } from "./PostItem";
import { HotSanchaekItem } from "./PostItem";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { loadPostDetailResetAction } from "../../../reducers/community";
import { sanchaekLoadPostDetailResetAction } from "../../../reducers/sanchaek";

const PostCards = ({ hotCommunity, hotSanchaek }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadPostDetailResetAction());
    dispatch(sanchaekLoadPostDetailResetAction());
  }, []);
  return (
    <>
      <PostCardContainer>
        <Title>인기 게시글</Title>
        <Link href="/sanchaek">
          <a>
            <h2>산책 메이트</h2>
          </a>
        </Link>
        <PostContainer>
          {hotSanchaek.map((item) => (
            <HotSanchaekItem key={item.id} {...item} />
          ))}
        </PostContainer>
        <Link href="/community">
          <a>
            <h2>커뮤니티</h2>
          </a>
        </Link>
        <PostContainer>
          {hotCommunity.map((item) => (
            <HotCommunityItem key={item.id} {...item} />
          ))}
        </PostContainer>
      </PostCardContainer>
    </>
  );
};

export default PostCards;
