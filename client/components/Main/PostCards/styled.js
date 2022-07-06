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
    margin-top: 30px;
  }
`;
export const Title = styled.h1`
  padding-top: 50px;
  padding-bottom: 5px;
  border-bottom: 3px solid ${Colors.primaryColor};
  display: inline-block;
  font-weight: bold;
  font-size: 28px;
  margin-bottom: 30px;
`;

export const MateContainter = styled.div`
  margin-top: 20px;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  /* margin-bottom: 100px; */
`;

export const ListItem = styled.div`
  display: flex;
  flex-direction: column;
  cursor: pointer;
  width: 280px;
  height: 350px;

  & img {
    width: 100%;
    height: 268px;
    object-fit: cover;
    border-radius: 15px;
  }

  span {
    margin-top: 10px;
    font-size: 20px;
  }
`;

export const ComuContainer = styled.div`
  margin-top: 20px;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
`;
