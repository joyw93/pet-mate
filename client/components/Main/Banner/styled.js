import styled from 'styled-components';

export const BannerContainer = styled.div`
  width: 100%;
`;

export const BannerItem = styled.div`
  width: 100%;
  height: 800px;
  & + & {
    background-color: #fff8ec;
  }
  .banner_container {
    max-width: 1200px;
    height: 100%;
    margin: 0 auto;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: space-evenly;
  }
  .banner_item_img,
  .banner_item_box {
    max-width: 600px;
  }
  .banner_item_box {
    padding: 0 80px;
  }
  .banner_item_img img {
    max-width: 600px;
  }
  .banner_item_box h1 {
    font-weight: bold;
    font-size: 2.2vmax;
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
