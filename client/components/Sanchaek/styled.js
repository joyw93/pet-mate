import styled from "styled-components";

export const SanchaekContainer = styled.div`
  margin: 0 auto;
`;

export const SanchaekBanner = styled.div`
  width: 100%;
  margin-bottom: 100px;
  cursor: pointer;

  img {
    width: 100%;
  }
`;

export const SanchaekContent = styled.div`
  max-width: 1200px;
  margin: 0 auto 100px auto;
  padding: 0 14px;
`;
export const ItemContainer = styled.div`
  /* background-color: #eee; */

  margin: 0 10px 80px;
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

export const BtnContainer = styled.div`
  position: relative;

  span {
    width: 100%;
    border: 0.3px solid #eee;
    position: absolute;
    top: 50%;
  }

  button {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);

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
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  span {
    font-size: 0.7rem;
  }
`;

export const LocaImg = styled.img`
  width: 24px;
`;
