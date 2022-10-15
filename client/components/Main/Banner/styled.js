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
    padding: 40px 60px 15px;
  }
  .banner_item_img img {
    width: 100%;
  }
  .banner_item_box h2 {
    font-weight: bold;
    font-size: 2rem;
    line-height: 1.5;
  }
  .banner_item_box h2:last-of-type {
    margin-bottom: 30px;
  }

  .line_break {
    display: flex;
    flex-wrap: wrap;
  }
  .banner_item_box p {
    font-size: 1.1rem;
  }
  .go_to {
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
  .go_to:hover {
    opacity: 0.8;
    transition: all 0.3s;
  }
`;
