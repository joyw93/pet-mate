import styled from "styled-components";
import { Colors } from "../../../styles/ColorVariable";

export const PostCardContainer = styled.div`
  max-width: 1200px;

  margin: 0 auto;
  /* background-color: #eee; */

  h2 {
    font-size: 24px;
    font-weight: bold;
    text-align: left;
    margin-top: 50px;
    margin-bottom: 40px;
  }
`;
export const Title = styled.h1`
  padding-top: 50px;
  padding-bottom: 5px;
  border-bottom: 3px solid ${Colors.primaryColor};
  display: inline-block;
  font-weight: bold;
  font-size: 28px;
`;

export const PostContainer = styled.div`
  display: flex;
  gap: 2%;
  /* justify-content: space-between; */
  flex-wrap: wrap;
  margin-bottom: 80px;
`;

export const ListItem = styled.div`
  display: flex;
  flex-direction: column;
  cursor: pointer;
  /* max-width: 280px; */
  min-height: 350px;
  flex-basis: 20%;
  flex-shrink: 1;
  flex-grow: 1;

  @media (max-width: 1023px) {
    & {
      flex-basis: 49%;
    }
  }

  @media (max-width: 479px) {
    & {
      flex-basis: 100%;
    }
  }
`;

export const ItemImg = styled.img`
  width: 100%;
  height: 268px;
  object-fit: cover;
  border-radius: 15px;

  &:hover {
    transition: all 0.3s;
    opacity: 0.7;
  }
`;

export const ItemInfo = styled.span`
  margin-top: 10px;
  margin-bottom: 10px;
  font-size: 1rem;
  font-weight: bold;
`;

export const ItemLocation = styled(ItemInfo)`
  font-weight: 300;
`;

export const LocationInfo = styled.div`
  padding-left: 24px;
  line-height: 23px;
  position: relative;
`;

export const LocationImg = styled.img`
  height: 24px;
  position: absolute;
  left: 0;
  top: 0;
`;
