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

const CommunityItem = (item) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [author, setAuthor] = useState("");
  const [created_date, setCreatedate] = useState("");
  const [image_src, setImagesrc] = useState("");
  const [tags, setTags] = useState("");
  const [views, setViews] = useState(0);
  const [likeCount, setLikeCount] = useState(0);

  //렌더 문제 있어서 초기화값 설정
  useEffect(() => {
    const { title, content, author, createdAt, images, tags, views, likeCount } = item;
    const convertedTime = getElapsedTime(createdAt);
    setTitle(title);
    setContent(content);
    setAuthor(author.nickname);
    setCreatedate(convertedTime);
    setTags(tags);
    setViews(views);
    setLikeCount(likeCount);

    if (images && images.length !== 0) {
      setImagesrc(images[0]);
    } else {
      setImagesrc(null);
    }
  }, []);

  const itemSelect = () => {
    Router.push(`/community/${item.id}`);
  };

  return (
    <ItemContainer>
      <ItemWrapper>
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
      </ItemWrapper>
    </ItemContainer>
  );
};

export default CommunityItem;
