import styled from "styled-components";

export const BannerContainer = styled.div`
  width: 100%;
`;

export const BannerItem = styled.div`
  width: 100%;

  & + & {
    background-color: #fff8ec;
  }
  .banner_container {
    max-width: 1200px;
    margin: 0 auto;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-evenly;
    align-content: center;
    padding: 60px 0;
  }
  .banner_item_img,
  .banner_item_box {
    max-width: 600px;
    margin: auto 0;
  }
  .banner_item_box {
    padding: 0 60px;
  }
  .banner_item_img img {
    width: 100%;
  }
  .banner_item_box h1 {
    font-weight: bold;
    font-size: 2rem;
    line-height: 1.5;
    margin-bottom: 30px;
  }
  .banner_item_box p {
    font-size: 1.1rem;
  }
  .banner_item_box span {
    display: inline-block;
    background-color: #fb9b03;
    padding: 11px 14px;
    font-weight: bold;
    color: #fff;
    font-size: 1.1rem;
    cursor: pointer;
    border-radius: 25px;
    margin-top: 60px;
  }
`;
