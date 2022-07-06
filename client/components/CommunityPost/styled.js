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
    font-size: 1.2rem;
    outline: none;
    margin-top: 10px;
  }
  textarea::placeholder {
    font-weight: bold;
    color: #ddd;
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
    justify-content: space-between;
    flex-wrap: wrap;
    margin-top: 10px;
  }
  #photos > div {
    width: 172px;
    height: 172px;
  }
  #photo1,
  #photo2,
  #photo3 {
    background-color: #e2ecff;
  }
  #add_photo {
    position: relative;
    background-color: #eee;
  }
  #add_file {
    position: absolute;
    display: none;
  }
  #add_photo label {
    display: block;
    width: 100%;
    height: 100%;
    line-height: 172px;
    text-align: center;
    font-size: 3rem;
    color: #aaa;
    cursor: pointer;
  }
`;

export const KeywordWrapper = styled.div`
  margin: 40px 0;
  h2 {
    font-size: 1.1rem;
    font-weight: bold;
    color: #444;
    margin-bottom: 10px;
  }
  .keyword_item {
    margin-right: 10px;
    padding-right: 10px;
    cursor: pointer;
  }
  .keyword_item span {
    padding: 0 7px 0 2px;
  }
  .keyword_item:hover svg {
    fill: ${Colors.primaryColor};
    transition: all 0.3s;
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
    font-size: 1.3rem;
    font-weight: bold;
    color: #757575;
  }
  #keyword_input input,
  .keyword_item {
    border-radius: 20px;
    height: 32px;
    padding-left: 24px;
    border: none;
    background-color: #f9f9f9;
    font-size: 1.2rem;
    /* font-weight: bold; */
    color: #757575;
  }
`;
