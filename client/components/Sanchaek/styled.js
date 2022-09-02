import styled from "styled-components";
import { Colors } from "../../styles/ColorVariable";

export const SanchaekContainer = styled.div`
  margin: 0 auto;
`;

export const SanchaekBanner = styled.div`
  width: 100%;
  height: 520px;
  background-image: url("../../img/sanchaekbanner.png");
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  cursor: pointer;
  &:hover {
    opacity: 0.8;
    transition: all 0.3s;
  }
`;

export const LocationSearch = styled.div`
  max-width: 1200px;
  margin: 40px auto;

  div {
    width: 70%;
    position: relative;
    margin: 0 auto;
    &::after {
      content: "";
      display: block;
      width: 24px;
      height: 24px;
      background-image: url("../img/search.png");
      background-position: center;
      background-size: cover;
      position: absolute;
      left: 14px;
      top: 50%;
      transform: translateY(-50%);
    }
    input {
      font-size: 1.2rem;
      border-radius: 20px;
      border: 2px solid ${Colors.primaryColor};
      height: 40px;
      width: 100%;
      opacity: 0.7;
      text-indent: 40px;
      &:focus {
        box-shadow: 0 0 7px ${Colors.primaryColor};
        transition: all 0.1s;
      }
    }
    .cancel_btn {
      background: none;
      border: none;
      position: absolute;
      right: 7px;
      top: 10px;
      cursor: pointer;
    }
    .cancel_btn > img {
      width: 24px;
      height: 24px;
    }
  }
`;

export const SanchaekContent = styled.div`
  max-width: 1200px;
  margin: 0 auto 100px auto;
  padding: 0 14px;
`;
export const ItemContainer = styled.div`
  /* background-color: #eee; */

  margin: 0 0 80px;
  cursor: pointer;
  border-radius: 10px;

  &:hover {
    transform: scale(1.1);
    transition: all 0.3s;
    opacity: 0.7;
  }
`;

export const ItemImage = styled.img`
  width: 100%;
  height: 270px;
  object-fit: cover;
  border-radius: 10px;
`;

//

export const BtnContainer = styled.div`
  position: relative;
  margin-bottom: 200px;

  div {
    width: 100%;

    p {
      display: block;
      width: 100%;
      text-align: center;
      font-size: 0.9rem;
      font-weight: bold;
      span {
        font-size: 1.5rem;
      }
    }
  }
`;

export const BtnLine = styled.span`
  width: 100%;
  border: 0.3px solid #eee;
  position: absolute;
  top: 50%;
`;

export const MoreButton = styled.button`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

export const MoreBtn = styled(MoreButton)`
  background-color: #eee;
  padding: 10px 20px;
  font-weight: bold;
  font-size: 0.9rem;
  border: none;
  border-radius: 15px;
  cursor: pointer;

  &:hover {
    transition: all 0.3s;
    opacity: 0.6;
  }
`;

export const ItemWrapper = styled.div``;
export const ImageWrapper = styled.div``;
export const ContentArea = styled.div`
  margin: 10px 0;
`;
export const ContentTitle = styled.h2`
  font-size: 1rem;
  font-weight: bold;
  margin-bottom: 10px;
  margin-left: 5px;
`;

export const ContentInfo = styled.div`
  padding-left: 24px;
  line-height: 23px;
  position: relative;
  span {
    font-size: 0.7rem;
  }
`;

export const LocaImg = styled.img`
  height: 24px;
  position: absolute;
  left: 0;
  top: 0;
`;
