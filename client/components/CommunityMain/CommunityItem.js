import { useCallback, useState } from "react";
import { useSelector } from "react-redux";
import Skeleton from "@mui/material/Skeleton";
import { useEffect } from "react";

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
} from "./styled";
import { getElapsedTime } from "../../utils";
import Router from "next/router";
import Link from "next/link";

const CommunityItem = (post) => {
  const { loadPostsLoading } = useSelector((state) => state.community);
  const itemSelect = () => {
    Router.push(`/community/${post.id}`);
  };

  useEffect(() => {
    if (post.id === 50) {
      console.log("post", post);
      console.log("postImages", post.images);
    }
  }, []);

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
              <Author>{post.author.nickname}</Author>
              <ContentDetail>{getElapsedTime(post.createdAt)}</ContentDetail>
              <ContentDetail>·</ContentDetail>
              <ContentDetail>조회수 {post.views}</ContentDetail>
              <ContentDetail>·</ContentDetail>
              <ContentDetail>좋아요 {post.likeCount}</ContentDetail>
            </ContentInfo>
          </ContentArea>
          {post?.images && (
            <ImageWrapper onClick={itemSelect}>{post?.images?.length === 0 ? null : <ItemImage src={post.images[0].url} />}</ImageWrapper>
          )}
        </ContentWrapper>
        <KeywordWrapper>
          {post.tags &&
            post.tags.map((word, index) => (
              <Link href={`/search/hashtag?keyword=${word.hashtag.keyword}`} key={index} passHref>
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
