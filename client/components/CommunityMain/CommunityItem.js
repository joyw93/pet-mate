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
  ContentArea,
} from "./styled";
import { getElapsedTime } from "../../utils";
import Router from "next/router";
import Link from "next/link";

const CommunityItem = (post) => {
  const itemSelect = () => {
<<<<<<< HEAD
    Router.push(`/community/${item.id}`);
=======
    Router.push(`community/${post.id}`);
>>>>>>> 7c12712fd77160f03939349293f377d848e79c57
  };

  return (
    <ItemContainer>
      <ItemWrapper>
<<<<<<< HEAD
        <ContentWrapper onClick={itemSelect}>
          <ContentArea>
            <TitleContentWrapper>
              <ContentTitle>{title}</ContentTitle>
              <Content>{content}</Content>
            </TitleContentWrapper>
            <ContentInfo>
              <Author>{author}</Author>
              <ContentDetail>{created_date}</ContentDetail>
              <ContentDetail>·</ContentDetail>
              <ContentDetail>조회수 {views}</ContentDetail>
              <ContentDetail>·</ContentDetail>
              <ContentDetail>좋아요 {likeCount}</ContentDetail>
            </ContentInfo>
          </ContentArea>
          {image_src && (
            <ImageWrapper>
              <ItemImage src={image_src.url} />
            </ImageWrapper>
          )}
        </ContentWrapper>
        <KeywordWrapper>
          {tags &&
            tags.map((word, index) => (
              <Link href={`/search/hashtag?keyword=${word.hashtag.keyword}`} key={index} passHref>
                <KeywordItem>
                  <span>#</span>
                  {word.hashtag.keyword}
                </KeywordItem>
              </Link>
            ))}
        </KeywordWrapper>
=======
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
>>>>>>> 7c12712fd77160f03939349293f377d848e79c57
      </ItemWrapper>
    </ItemContainer>
  );
};

export default CommunityItem;
