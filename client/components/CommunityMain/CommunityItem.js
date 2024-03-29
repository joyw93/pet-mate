import {
  ItemContainer,
  ItemImage,
  ContentWrapper,
  Author,
  Content,
  ContentTitle,
  ContentInfo,
  KeywordWrapper,
  KeywordItem,
  ItemWrapper,
  ContentDetail,
  ImageWrapper,
  TitleContentWrapper,
  ContentArea,
  AuthorProfile,
} from "./styled";
import { getElapsedTime } from "../../utils";
import Router from "next/router";
import Link from "next/link";

const CommunityItem = (post) => {
  const itemSelect = () => {
    Router.push(`/community/${post.id}`);
  };

  return (
    <ItemContainer>
      <ItemWrapper>
        <ContentWrapper onClick={itemSelect}>
          <ContentArea>
            <TitleContentWrapper>
              <ContentTitle>{post.title}</ContentTitle>
              <Content>{post.content}</Content>
            </TitleContentWrapper>
            <ContentInfo>
              <AuthorProfile>
                {post?.author?.profile?.imageUrl ? (
                  <img src={post.author.profile.imageUrl} />
                ) : (
                  <img src={'../img/defaultimgGrey.png'} />
                )}
              </AuthorProfile>
              <Author>{post.author.nickname}</Author>
              <ContentDetail>{getElapsedTime(post.createdAt)}</ContentDetail>
              <ContentDetail>·</ContentDetail>
              <ContentDetail>조회수 {post.views}</ContentDetail>
              <ContentDetail>·</ContentDetail>
              <ContentDetail>좋아요 {post.likeCount}</ContentDetail>
              <ContentDetail>·</ContentDetail>
              <ContentDetail>댓글 {post.commentCount}</ContentDetail>
            </ContentInfo>
          </ContentArea>
          {post?.images && (
            <ImageWrapper onClick={itemSelect}>
              {post?.images?.length === 0 ? null : (
                <ItemImage src={post.images[0].url} />
              )}
            </ImageWrapper>
          )}
        </ContentWrapper>
        <KeywordWrapper>
          {post.tags &&
            post.tags.map((word, index) => (
              <Link
                href={`/search/hashtag?keyword=${word.hashtag.keyword}`}
                key={index}
                passHref
              >
                <KeywordItem>
                  <span>#</span>
                  {word.hashtag.keyword}
                </KeywordItem>
              </Link>
            ))}
        </KeywordWrapper>
      </ItemWrapper>
    </ItemContainer>
  );
};

export default CommunityItem;
