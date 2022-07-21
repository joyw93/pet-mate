import styled from "styled-components";
import { Colors } from "../../styles/ColorVariable";

//CommunityMain
export const CommunityCon = styled.div`
  max-width: 960px;
  margin: 0 auto;
  padding: 0 14px;
`;

export const Title = styled.h1`
  font-size: 22px;
  font-weight: bold;
  margin-top: 30px;
`;

export const Selection = styled.select`
  font-size: 1rem;
  border: 1px solid #fff;
  width: 100px;
  padding: 3px 0;

  &:focus {
    outline: none;
  }
  &:hover {
    border: 1px solid #eee;
  }
  option {
    font-size: 1rem;
  }
`;

export const HeadWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 48px;
  margin-bottom: 10px;
`;

export const Btn = styled.button`
  font-size: 16px;
  font-weight: bold;
  border: none;
  border-radius: 20px;
`;

export const PostBtn = styled(Btn)`
  width: 85px;
  height: 35px;
  background-color: ${Colors.btnGray};
  color: #000;
  cursor: pointer;
  &:hover {
    opacity: 0.7;
    transition: all 0.2s;
  }
`;

export const NoticeBtn = styled(Btn)`
  width: 60px;
  height: 35px;
  background-color: ${Colors.primaryColor};
  color: #fff;
  margin-right: 10px;
`;

export const NoticeWrapper = styled.div`
  padding: 10px 0;
  border-bottom: 1.5px solid #eee;

  cursor: pointer;
  span {
    font-size: 16px;
    font-weight: bold;
  }
`;

//CommunityList
export const ListContainer = styled.div`
  margin-bottom: 50px;
`;

//CommunityItem
export const ItemContainer = styled.div`
  padding: 40px 0;
  border-top: 1px solid #eee;

  &:first-child {
    border-top: none;
  }
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

  div {
    width: 100%;

    p {
      display: block;
      width: 100%;
      text-align: center;
      font-size: 0.9rem;
      font-weight: bold;
      span {
        font-size: 1.5rem;
      }
    }
  }
`;

export const BtnLine = styled.span`
  width: 100%;
  border: 0.3px solid #eee;
  position: absolute;
  top: 50%;
`;

export const MoreButton = styled.button`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

export const MoreBtn = styled(MoreButton)`
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
`;
