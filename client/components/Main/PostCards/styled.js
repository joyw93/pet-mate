import styled from "styled-components";

export const PostCardContainer = styled.div`
  max-width: 1200px;
  height: 1200px;
  margin: 0 auto;
  /* background-color: #eee; */
  text-align: center;

  h2 {
    font-size: 18px;
    font-weight: bold;
    text-align: left;
    margin-top: 140px;
  }
`;

export const Title = styled.h1`
  padding-top: 100px;
  padding-bottom: 5px;
  border-bottom: 3px solid #fb9b03;
  display: inline-block;
  font-weight: bold;
  font-size: 24px;
`;

export const MateContainter = styled.div`
  margin-top: 20px;
  display: flex;
  justify-content: space-between;
  /* margin-bottom: 100px; */
`;

export const ListItem = styled.div`
  display: flex;
  flex-direction: column;
  cursor: pointer;
  width: 368px;
  height: 400px;

  & img {
    width: 100%;
    height: 273px;
    object-fit: cover;
    border-radius: 25px;
  }

  span {
    margin-top: 10px;
    font-size: 16px;
    font-weight: bold;
  }
`;

export const ComuContainer = styled.div`
  margin-top: 20px;
  display: flex;
  justify-content: space-between;
`;
