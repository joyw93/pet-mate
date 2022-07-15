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
  margin-top: 40px;
  margin-bottom: 20px;
  font-size: 18px;
  border: none;
  width: 100px;

  &:focus {
    outline: none;
  }

  option {
    font-size: 1rem;
  }
`;

export const HeadWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
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
  justify-content: space-between;
`;

export const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;
export const TitleContentWrapper = styled.div`
  cursor: pointer;
  &:hover {
    opacity: 0.6;
    transition: ease-in 0.1s;
  }
`;
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

  /* span {
    margin-left: 5px;
  } */
`;

export const ContentDetail = styled.span`
  margin-left: 5px;
`;
export const ImageWrapper = styled.div`
  width: 220px;
  height: 180px;
  cursor: pointer;
  &:hover {
    opacity: 0.6;
    transition: ease-in 0.1s;
  }
`;
export const ItemImage = styled.img`
  width: 220px;
  height: 180px;
  object-fit: cover;
  border-radius: 5px;
  margin-left: 50px;
`;

export const KeywordWrapper = styled.div``;

export const KeywordItem = styled.button`
  padding: 5px 10px;
  margin-right: 5px;
  background-color: #fff;
  border: 1.5px solid ${Colors.primaryColor};
  border-radius: 20px;
  font-size: 12px;
  cursor: pointer;
  span {
    font-size: 14px;
  }
  &:hover {
    opacity: 0.5;
    transition: ease-in 0.1s;
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
