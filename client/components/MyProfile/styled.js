import styled from "styled-components";
import { Colors } from "../../styles/ColorVariable";

export const ProfileContainer = styled.div`
  width: 100%;
  position: relative;
`;

export const BackgroundArea = styled.div`
  width: 100%;
  height: 598px;
  background-color: ${Colors.profileYellow};
  position: absolute;
  top: 0;
  left: 0;
  z-index: 0;
`;

export const ContentArea = styled.div`
  width: 100%;
  position: relative;
  z-index: 1;
  padding-top: 60px;
`;
export const UserContent = styled.div`
  max-width: 1200px;
  min-height: 600px;
  margin: 0 auto;
  display: flex;
  background-color: #fff;
`;
export const ProfileInfo = styled.div`
  width: 280px;
  height: 480px;
  padding: 60px 30px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const ProfileImg = styled.div`
  width: 160px;
  height: 160px;
  margin: 0 auto;

  img {
    width: 100%;
    height: 100%;
    border-radius: 50%;
    border: 3px solid ${Colors.primaryColor};
  }
`;
export const UserInfo = styled.div`
  h2 {
    text-align: center;
    margin: 14px 0;
    font-size: 1.4rem;
    font-weight: bold;
  }
  p {
    text-align: center;
    margin: 14px 0;
  }
`;
export const UserFeed = styled.div`
  width: 77%;
  margin-top: 20px;

  .list_wrapper {
    width: 100%;
    display: flex;
    justify-content: space-between;
    p {
      font-size: 1rem;
      margin: 14px 0;
      span {
        margin-right: 5px;
      }
    }
  }
`;

export const ButtonWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 15px;
  width: 80%;
  button {
    margin-top: 15px;
    display: block;
    padding: 7px 0;
    width: 100%;
    border-radius: 50px;
    border: none;
    cursor: pointer;
    background-color: #eee;
    &:hover {
      background-color: #ccc;
      transition: ease-in 0.2s;
    }
  }
`;

export const TabWrapper = styled.div`
  width: 100%;
  padding-top: 30px;
`;

export const TabList = styled.ul`
  display: flex;

  li {
    font-size: 1.1rem;
    font-weight: bold;
    margin-right: 15px;
    padding-bottom: 5px;
    cursor: pointer;
  }
  li.is_active {
    color: ${Colors.primaryColor};
    border-bottom: 2.5px solid ${Colors.primaryColor};
  }
`;

export const ImageWrapper = styled.div`
  width: 100%;
  padding-top: 28px;
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
  div {
    width: 210px;
    height: 210px;
    cursor: pointer;
    margin-bottom: 20px;
    margin-right: 20px;
  }

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 5px;
  }
`;

export const ProfileEditArea = styled.div`
  width: 80%;
  height: 80%;
  margin-top: 30px;
  padding-top: 50px;
  padding-left: 28px;
  justify-content: flex-start;
  flex-wrap: wrap;
  border: 2px solid #e0e0e0;

  label {
    margin-top: 50px;
    display: inline-block;
    width: 300px;
    color: #424242;
    font-size: 1.1rem;
  }
`;

export const Input = styled.input`
  margin-top: 10px;
  font-size: 15px;
  border-radius: 5px;
  border: 1px solid #e0e0e0;
  line-height: 35px;
  text-indent: 12px;
  width: 400px;
  &:focus {
    border: 1px solid #ffa726;
    box-shadow: 0 0 5px ${Colors.primaryColor};
  }
`;

export const ConfirmButton = styled.button`
  margin-left: 100px;
  margin-top: 200px;
  margin-bottom: 150px;
  width: 300px;
  height: 50px;
  border-radius: 5px;
  font-weight: bold;
  font-size: 16px;
  color: white;
  background-color: #ffb74d;
  border: none;
  &:hover {
    background-color: ${Colors.primaryColor};
  }
`;
