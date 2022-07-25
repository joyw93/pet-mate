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

  &:hover {
    background-color: rgba(0, 0, 0, 0.5);
  }
`;

export const PostBtn = styled(Button)`
  background-color: ${Colors.primaryColor};
  font-size: 0.7rem;

  &:hover {
    color: #fff;
  }
`;

export const BackBtn = styled(Button)`
  background-color: #000;
  color: #fff;
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
    input,
    textarea {
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
  #add_photo,
  .photo_preview {
    height: 171px;
    width: 171px;
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
    background-color: #fff;
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

export const MapWrapper = styled.div`
  margin: 40px 0;
  position: relative;

  h2 {
    font-size: 1.1rem;
    font-weight: bold;
    color: #444;
    margin-bottom: 38px;
  }
  #map_search {
    display: flex;
    justify-content: space-between;
    margin: 10px 0;
  }
  #map_search_input {
    width: 100%;
    height: 35px;
    border: none;
    border-bottom: 2px solid #ddd;
    padding-left: 10px;
  }
  #map_search_input::placeholder {
    font-weight: bold;
    color: #ddd;
    font-size: 1.2rem;
  }
  #map_search_btn {
    width: 80px;
    height: 35px;
    background-color: #000;
    border: none;
    color: #fff;
    font-weight: bold;
    font-size: 1rem;
    cursor: pointer;
  }
  #map_view {
    width: 100%;
    height: 400px;
    background-color: #eee;
  }
`;

export const ShowPlaceResult = styled.div`
  margin: 10px 0;
  position: absolute;
  top: 18px;
  left: 0;
  height: 20px;
  span {
    color: ${Colors.primaryColor};
    font-weight: bold;
  }
`;

export const CustomOverlay = styled.div`
  height: 32px;
  padding: 0 14px;
  border-radius: 5px;
  /* background: rgba(252, 157, 3, 0.8); */
  background-color: rgba(255, 255, 255, 0.9);
  box-shadow: 0 0 5px ${Colors.primaryColor};
  /* box-shadow: 0 0 5px #333; */
  span {
    font-size: 0.9rem;
    font-weight: bold;
    line-height: 32px;
    color: #000;
  }
`;
