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
  padding: 60px;
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
  margin-top: 40px;

  p {
    font-size: 1.2rem;
    margin: 18px 0;
  }
  span {
    float: right;
  }
`;

export const TabWrapper = styled.div`
  width: 100%;
  padding-top: 30px;
`;

export const TabList = styled.ul`
  display: flex;

  li {
    font-size: 1.2rem;
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
