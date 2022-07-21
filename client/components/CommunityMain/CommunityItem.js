import { useCallback, useState } from "react";
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
} from "./styled";
import { getElapsedTime } from "../../utils";
import Router from "next/router";

const CommunityItem = (post) => {
  const itemSelect = () => {
    Router.push(`community/${post.id}`);
  };

  return (
    <ItemContainer>
      <ItemWrapper>
        <ContentWrapper>
          <TitleContentWrapper onClick={itemSelect}>
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
          <KeywordWrapper>
            {post.tags &&
              post.tags.map((word, index) => (
                <KeywordItem key={index}>
                  <span>#</span>
                  {word.hashtag.keyword}
                </KeywordItem>
              ))}
          </KeywordWrapper>
        </ContentWrapper>
        {post?.images && (
          <ImageWrapper onClick={itemSelect}>
            {post?.images?.length === 0 ? null : (
              <ItemImage src={post.images[0].url} />
            )}
          </ImageWrapper>
        )}
      </ItemWrapper>
    </ItemContainer>
  );
};

export default CommunityItem;
