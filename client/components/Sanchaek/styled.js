import styled from "styled-components";
import { Colors } from "../../styles/ColorVariable";
export const SanchaekContainer = styled.div`
  /* max-width: 1200px;
  margin: 0 auto;
  padding: 0 14px; */
`;

export const SanchaekBanner = styled.div`
  width: 100%;
  height: 520px;
  background-color: ${Colors.primaryColor};
  margin-bottom: 100px;
  div {
    width: 1920px;
    height: 520px;
    margin: 0 auto;
    background-image: url("../img/sanchaekbanner.png");
    background-repeat: no-repeat;
    background-size: contain;
  }
`;

export const SanchaekContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 14px;
`;
export const Item = styled.div`
  background-color: #eee;

  h2 {
    font-size: 20px;
  }

  span {
    font-size: 16px;
  }
`;

export const ItemImage = styled.img`
  width: 100%;
  height: 270px;
  object-fit: cover;
  border-radius: 10px;
`;
