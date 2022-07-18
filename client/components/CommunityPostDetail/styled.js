import styled from "styled-components";
import { Colors } from "../../styles/ColorVariable";

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

export const PostDetailContainer = styled.div`
  max-width: 720px;
  margin: 0 auto;

  h1 {
    font-size: 1rem;
    margin-top: 40px;
  }

  #content_text {
    margin-top: 60px;
    font-size: 0.9rem;
    letter-spacing: 1.2;
    line-height: 1.7;
  }
`;

export const Title = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 20px;

  h2 {
    font-size: 1.5rem;
    font-weight: bold;
    line-height: 35px;
  }
`;
export const PostInfo = styled.div`
  margin: 10px 0 30px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  line-height: 32px;
  font-size: 0.8rem;

  #post_author {
    display: inline-block;
    height: 32px;
    background-color: ${Colors.primaryColor};
    /* font-weight: bold; */
    color: #fff;
    padding: 0 15px;
    border-radius: 20px;
  }
  #post_created_time,
  #views {
    margin-left: 10px;
  }
  #like_wrapper {
    display: flex;

    #like_count {
      margin-left: 5px;
      font-size: 1rem;
      font-weight: bold;
      color: ${Colors.primaryColor};
    }
  }
  button {
    display: block;
    width: 28px;
    height: 32px;
    cursor: pointer;
    background: none;
    border: none;

    img {
      display: block;
      width: 28px;
      height: 26px;
      margin: auto;
    }
  }
`;
export const KeywordWrapper = styled.div`
  margin: 40px 0;

  .keyword_item {
    margin-right: 10px;
    padding-right: 10px;
    cursor: pointer;
  }
  .keyword_item span {
    padding: 0 7px 0 2px;
  }

  .keyword_item {
    display: inline-block;
    position: relative;
  }
  .keyword_item::before {
    content: "#";
    position: absolute;
    left: 12px;
    top: 0;
    line-height: 32px;
    font-size: 1rem;
    font-weight: bold;
  }
  .keyword_item {
    border-radius: 20px;
    height: 32px;
    padding-left: 24px;
    border: 1px solid ${Colors.primaryColor};
    background-color: #fff;
    font-size: 0.9rem;
    font-weight: bold;
  }
`;

export const CommentWrapper = styled.div`
  margin: 20px 0;
  padding-top: 30px;
  border-top: 2px solid #eee;

  h2 {
    font-size: 1.1rem;
    font-weight: bold;
    margin-bottom: 18px;
    span {
      color: ${Colors.primaryColor};
    }
  }
`;

export const CommentInput = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;

  input {
    width: 100%;
    height: 35px;
    border: 1px solid #ddd;
    padding-left: 10px;
  }

  button {
    background-color: ${Colors.primaryColor};
    color: #fff;
  }
`;
export const CommentArea = styled.div`
  width: 100%;
  margin-top: 30px;
  padding-right: 80px;
  display: flex;
  flex-direction: column;
`;
export const CommentItem = styled.div`
  width: 100%;
  margin-bottom: 32px;

  p {
    width: 90%;
    font-size: 1rem;
  }
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

export const Images = styled.div`
  max-width: 720px;
  height: 420px;
  div {
    width: 100%;
    height: 100%;
  }
  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }

  .slick-prev {
    left: -32px;
    width: 32px;
    height: 32px;
  }
  .slick-next {
    right: -32px;
    width: 32px;
    height: 32px;
  }
  .slick-prev::before,
  .slick-next::before {
    content: "";
    background-repeat: no-repeat;
    background-size: cover;
    display: block;
    width: 32px;
    height: 32px;
  }
  .slick-prev::before {
    background-image: url("../img/leftBtn.png");
  }
  .slick-next::before {
    background-image: url("../img/rightBtn.png");
  }
`;
