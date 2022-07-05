import styled from "styled-components";
import { Colors } from "../../styles/ColorVariable";

//CommunityMain
export const CommunityCon = styled.div`
  max-width: 1200px;
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
`;

export const NoticeBtn = styled.button`
  width: 60px;
  height: 35px;
  background-color: ${Colors.primaryColor};
  font-size: 16px;
  color: #fff;
  border: none;
  border-radius: 20px;
  margin-right: 10px;
`;

export const NoticeWrapper = styled.div`
  padding: 10px 0;
  border-bottom: 1.5px solid #eee;

  span {
    font-size: 16px;
    font-weight: bold;
  }
`;

//CommunityList

//CommunityItem
export const ItemContainer = styled.div`
  display: flex;
  justify-content: space-between;
  height: 260px;

  padding: 40px 0;
  border-bottom: 1px solid #eee;
`;

export const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
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
  margin-right: 10px;
`;
export const ContentInfo = styled.div`
  display: flex;
  font-size: 14px;
  margin-bottom: 10px;
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
  background-color: #ffff;
  border: 1.5px solid ${Colors.primaryColor};
  border-radius: 20px;
  font-size: 12px;
`;
