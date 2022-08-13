import styled from "styled-components";
import { Colors } from "../../styles/ColorVariable";

export const SearchContainer = styled.div`
  max-width: 960px;
  margin: 0 auto;
  padding: 10px 14px;
`;

export const SearchResultComment = styled.h1`
  margin: 60px 0 30px;
  font-size: 1rem;
  line-height: 20px;
`;
export const SearchKeyword = styled.span`
  font-size: 1.1rem;
  color: ${Colors.primaryColor};
  margin-right: 2px;
`;

export const ResultLength = styled.span`
  color: #bbb;
`;

export const NoResult = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 80px;
  p {
    margin-bottom: 5px;
  }
`;

export const NoResultImg = styled.img`
  width: 400px;
`;

//CommunityList
export const ListContainer = styled.div`
  margin-bottom: 50px;
`;

export const ItemWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

export const ContentWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  cursor: pointer;
  &:hover {
    opacity: 0.5;
    transition: ease-in 0.1s;
  }
`;
export const ContentArea = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;
export const TitleContentWrapper = styled.div``;
export const ContentTitle = styled.h2`
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 10px;
`;

export const Content = styled.div`
  height: 60px;
  font-size: 14px;
  line-height: 1.5;
  margin-bottom: 10px;
  overflow: hidden;
`;

export const Author = styled.span`
  display: inline-block;
  font-weight: bold;
  margin-right: 5px;
`;
export const ContentInfo = styled.div`
  display: flex;
  font-size: 14px;
  margin-bottom: 10px;
`;

export const ContentDetail = styled.span`
  margin-left: 5px;
`;
export const ImageWrapper = styled.div`
  width: 220px;
  height: 180px;
`;
export const ItemImage = styled.img`
  width: 220px;
  height: 180px;
  object-fit: cover;
  border-radius: 5px;
`;

export const KeywordWrapper = styled.div`
  margin-top: 10px;
`;

export const KeywordItem = styled.button`
  padding: 5px 10px;
  margin-right: 5px;
  background-color: #fff;
  border: 1.5px solid ${Colors.primaryColor};
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: bold;
  box-sizing: border-box;

  cursor: pointer;
  span {
    margin-right: 2px;
  }
  &:hover {
    box-shadow: 0 0 7px ${Colors.primaryColor};
    transition: all 0.1s;
  }
`;

export const BtnContainer = styled.div`
  position: relative;
  margin-bottom: 200px;

  span {
    width: 100%;
    border: 0.3px solid #eee;
    position: absolute;
    top: 50%;
  }

  button {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);

    background-color: #eee;
    padding: 10px 20px;
    font-weight: bold;
    font-size: 0.9rem;
    border: none;
    border-radius: 15px;
    cursor: pointer;

    &:hover {
      transition: all 0.3s;
      opacity: 0.6;
    }
  }
`;

export const CommunityList = styled.div`
  div.gmsoph {
    border-top: none;
  }
`;
export const CommunityResultsContainer = styled.div`
  border: 1.5px solid #eee;
  padding: 0 14px;
`;
export const SanchaekList = styled.div``;
export const TitleWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;

  h1 {
    font-size: 0.9rem;
    span {
      font-size: 1rem;
      color: ${Colors.primaryColor};
      margin-left: 5px;
    }
  }
`;
export const MoreButton = styled.span`
  cursor: pointer;
  color: ${Colors.primaryColor};
  font-weight: bold;
  font-size: 1rem;
  &:hover {
    color: ${Colors.profileYellow};
    transition: all 0.2s;
  }
`;
