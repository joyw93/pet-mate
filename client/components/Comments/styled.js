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


//CommentsInput
export const Button = styled.button`
  font-size: 0.9rem;
  width: 60px;
  height: 35px;
  line-height: 35px;
  border-radius: 20px;
  border: none;
  font-weight: bold;
  color: #000;
  cursor: pointer;
  background-color: #e9e9e9;
  margin-left: 10px;
  transition: all 0.1s;

  &:hover {
    background-color: rgba(0, 0, 0, 0.5);
    color: #fff;
  }
`;


export const CommentInput = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  input {
    width: 100%;
    height: 43px;
    border: 1px solid #ddd;
    border-radius: 8px;
    padding-left: 10px;
    &:hover {
      background-color: #FAFAFA;
    }
    &:focus {
      border: 1px solid ${Colors.primaryColor};
    }
  }

  button {
    width: 70px;
    height: 43px;
    background-color: ${Colors.primaryColor};
    color: #fff;
  }
`;