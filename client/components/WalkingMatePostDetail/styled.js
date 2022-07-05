import styled from "styled-components";
import { Colors } from "../../styles/ColorVariable";

import LoadingButton from "@mui/lab/LoadingButton";

export const Button = styled(LoadingButton)`
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
    margin-right: 10px;
  }
  button {
    width: 32px;
    height: 32px;
    cursor: pointer;
    background: none;
    border: none;

    img {
      width: 28px;
      height: 26px;
    }
  }
`;
export const MapWrapper = styled.div`
  margin-top: 40px;
  h2 {
    font-size: 1.1rem;
    font-weight: bold;
    margin-bottom: 18px;
  }

  #map {
    width: 100%;
    height: 380px;
    background-color: #eee;
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

  #cmt_input {
    width: 100%;
    display: flex;
    justify-content: space-between;

    input {
      width: 100%;
      height: 35px;
      border: 1px solid #ddd;
    }

    button {
      background-color: ${Colors.primaryColor};
      color: #fff;
    }
  }

  #cmts_area {
    margin-top: 30px;
    padding-right: 80px;

    .cmts {
      margin-bottom: 32px;
      h3 {
        font-size: 0.9rem;
        font-weight: bold;
        margin-bottom: 18px;
      }
      p {
        font-size: 0.9rem;
      }
    }
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
