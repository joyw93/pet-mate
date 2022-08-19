import styled from "styled-components";
import { Colors } from '../../styles/ColorVariable';

export const CommentArea = styled.div`
  width: 100%;
  margin-top: 30px;
  padding-right: 80px;
  display: flex;
  flex-direction: column;
`;

export const CommentContentInfo = styled.div`
  span {
    color: #888;
    font-size: 0.8rem;
    font-weight: bold;
    margin-right: 10px;
  }
  #delete_btn {
    cursor: pointer;
  }
  #delete_btn:hover {
    color: ${Colors.primaryColor};
    transition: all 0.1s;
  }
`;
export const CommentHandler = styled.div`
  display: flex;
  margin-bottom: 12px;
  justify-content: space-between;
  align-items: center;
  h3 {
    font-size: 1rem;
    font-weight: bold;
    margin-right: 24px;
  }
`;

export const CommentItem = styled.div`
  width: 100%;
  margin-bottom: 32px;

  p {
    width: 90%;
    font-size: 1rem;
  }
`;

export const AuthorInfo = styled.div`
  display: flex;
  align-items: center;
`;

export const AuthorProfile = styled.div`
  width: 28px;
  height: 28px;
  margin-right: 5px;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 50%;
  }
`;
