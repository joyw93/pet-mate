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
  background-color: #d9d9d9;
  margin-left: 10px;
  transition: all 0.1s;

  &:first-child {
    background-color: ${Colors.primaryColor};
  }

  &:last-child {
    background-color: #000;
    color: #fff;
  }

  &:first-child:hover {
    color: #fff;
    background-color: rgba(0, 0, 0, 0.5);
  }
  &:last-child:hover {
    background-color: rgba(0, 0, 0, 0.5);
  }
`;

export const CreatePostContainer = styled.div`
  max-width: 720px;
  margin: 0 auto;
  padding-top: 70px;
`;

export const TitleWrapper = styled.div`
  display: flex;
  justify-content: space-between;

  h1 {
    font-size: 1.3rem;
    font-weight: bold;
  }
`;

export const TextEditWrapper = styled.form`
  display: flex;
  flex-direction: column;
  margin-top: 20px;

  input {
    width: 100%;
    height: 48px;
    border: none;
    border-bottom: 3px solid #ddd;
    font-size: 1.4rem;
    font-weight: bold;
    outline: none;
  }
  input::placeholder {
    color: #ddd;
  }
  textarea {
    width: 100%;
    height: 350px;
    border: none;
    resize: none;
    font-size: 1.1rem;
    outline: none;
    margin-top: 10px;
    word-break: break-word;
  }
  textarea::placeholder {
    font-weight: bold;
    color: #ddd;
  }
  @media (max-width: 767px) {
    input, textarea {
      width: 97%;
      margin: 0 auto;
    }
  }
`;

export const AddPhotoWrapper = styled.div`
  width: 100%;

  h2 {
    font-size: 1.1rem;
    font-weight: bold;
    color: #444;
  }
  #photos {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    margin-top: 10px;
  }
  #add_photo, .photo_preview {
    flex-basis: 20%;
    flex-shrink: 1;
    flex-grow: 1;
    min-height: 150px;
    max-width: 171px;
    flex-wrap: wrap;
    background-color: #eee;
  }
  #add_file {
    display: none;
  }
  #add_photo label {
    display: flex;
    width: 100%;
    height: 100%;
    align-items: center;
    justify-content: center;
    font-size: 3rem;
    color: #aaa;
    cursor: pointer;
    img {
      width: 30%;
      height: 30%;
    }
  }
  .photo_preview {

    margin-left: 12px;
    position: relative;
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
    button {
      width: 22px;
      height: 22px;
      position: absolute;
      top: -5px;
      right: -5px;
      z-index: 2;
      background: none;
      border: none;
      cursor: pointer;
      svg {
        fill: #fff;
        line-height: 22px;
        text-align: center;
      }
      background-color: rgba(0, 0, 0, 0.5);
      border-radius: 50px;
    }
  }
`;

export const KeywordWrapper = styled.div`
  margin: 40px 0;
  .keyword_area {
  width: 100%;
  display: grid;
  }

  h2 {
    font-size: 1.1rem;
    font-weight: bold;
    color: #444;
    margin-bottom: 10px;
  }
  .keyword_item {
    margin: 10px 10px 10px 0;
    padding-right: 10px;
    cursor: pointer;
  }
  .keyword_item span {
    padding: 0 7px 0 2px;
  }
  .keyword_item:hover svg {
    fill: ${Colors.primaryColor};
    transition: all 0.2s;
  }
  #keyword_input,
  .keyword_item {
    display: inline-block;
    position: relative;
  }
  #keyword_input::after,
  .keyword_item::before {
    content: "#";
    position: absolute;
    left: 12px;
    top: 0;
    line-height: 32px;
    font-size: 1.2rem;
    font-weight: bold;
    color: #757575;
  }
  #keyword_input::after {
    color: ${Colors.primaryColor};
  }
  #keyword_input input,
  .keyword_item {
    border-radius: 20px;
    height: 32px;
    padding-left: 28px;
    border: none;
    font-size: 1rem;
    /* font-weight: bold; */
    color: #757575;
  }
`;
