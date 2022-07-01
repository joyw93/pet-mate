import styled from "styled-components";
import { Colors } from "../../styles/ColorVariable";

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
  #buttons button {
    font-size: 1rem;
    width: 60px;
    height: 35px;
    border-radius: 20px;
    border: none;
    font-weight: bold;
    color: #fff;
    cursor: pointer;
  }
  #submit_btn {
    background-color: ${Colors.primaryColor};
  }
  #cancel_btn {
    background-color: #000;
    margin-left: 10px;
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
  }
`;
