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
} from "./styled";
import { getElapsedTime } from "../../utils";
import Router from "next/router";

const CommunityItem = (item) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [author, setAuthor] = useState("");
  const [created_date, setCreatedate] = useState("");
  const [image_src, setImagesrc] = useState("");
  const [tags, setTags] = useState("");

  //렌더 문제 있어서 초기화값 설정
  useEffect(() => {
    const { title, content, author, createdAt, images, tags } = item;
    const convertedTime = getElapsedTime(createdAt);
    setTitle(title);
    setContent(content);
    setAuthor(author.nickname);
    setCreatedate(convertedTime);
    setImagesrc(images[0]);
    setTags(tags);
  }, []);

  const itemSelect = () => {
    Router.push(`community/${item.id}`);
  };

  return (
    <ItemContainer onClick={itemSelect}>
      {
        <ItemWrapper>
          <ContentWrapper>
            <ContentTitle>{title}</ContentTitle>
            <Content>{content}</Content>
            <ContentInfo>
              <Author>{author}</Author>
              <span>{created_date}</span>
            </ContentInfo>
            <KeywordWrapper>
              {tags &&
                tags.map((word, index) => (
                  <KeywordItem key={index}>{word.hashtag.keyword}</KeywordItem>
                ))}
            </KeywordWrapper>
          </ContentWrapper>
          <div>{image_src && <ItemImage src={image_src.url} />}</div>
        </ItemWrapper>
      }
    </ItemContainer>
  );
};

export default CommunityItem;
