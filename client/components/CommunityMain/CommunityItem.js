import { useState } from "react";
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

const CommunityItem = (item, onClick) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [author, setAuthor] = useState("");
  const [created_date, setCreatedate] = useState("");
  const [image_src, setImagesrc] = useState("");
  const [keyword, setKeyword] = useState("");

  //렌더 문제 있어서 초기화값 설정
  useEffect(() => {
    const { title, content, author, created_date, image_src, keyword } = item;
    setTitle(title);
    setContent(content);
    setAuthor(author);
    setCreatedate(created_date);
    setImagesrc(image_src);
    setKeyword(keyword);
  }, []);

  return (
    <ItemContainer>
      <ItemWrapper>
        <ContentWrapper>
          <ContentTitle>{title}</ContentTitle>
          <Content>{content}</Content>
          <ContentInfo>
            <Author>{author}</Author>
            <span>{created_date}</span>
          </ContentInfo>
          <KeywordWrapper>
            {keyword &&
              keyword.map((word, index) => (
                <KeywordItem key={index}>{word}</KeywordItem>
              ))}
          </KeywordWrapper>
        </ContentWrapper>
        <div>{image_src && <ItemImage src={image_src} />}</div>
      </ItemWrapper>
    </ItemContainer>
  );
};

export default CommunityItem;
