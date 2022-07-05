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
} from "./styled";

const CommunityItem = ({
  title,
  content,
  author,
  created_date,
  image_src,
  keyword,
}) => {
  return (
    <ItemContainer>
      <ContentWrapper>
        <ContentTitle>{title}</ContentTitle>
        <Content>{content}</Content>
        <ContentInfo>
          <Author>{author}</Author>
          <span>{created_date}</span>
        </ContentInfo>
        <KeywordWrapper>
          {keyword.map((word) => (
            <KeywordItem>{word}</KeywordItem>
          ))}
        </KeywordWrapper>
      </ContentWrapper>
      <div>{image_src && <ItemImage src={image_src} />}</div>
    </ItemContainer>
  );
};

export default CommunityItem;
