import styled from "styled-components";

export const CarouselContainer = styled.div`
  width: 100%;
  .slick-arrow {
    z-index: 1;
    color: #aaa;
    width: 34px;
    height: 34px;
  }
  .slick-prev {
    left: 1%;
  }
  .slick-next {
    right: 1%;
  }
  .slick-prev::before,
  .slick-next::before {
    content: "";
    background-repeat: no-repeat;
    background-size: cover;
    display: block;
    width: 100%;
    height: 100%;
    opacity: 0.6;
  }
  .slick-prev::before {
    background-image: url("../img/leftBtn-grey.png");
  }
  .slick-next::before {
    background-image: url("../img/rightBtn-grey.png");
  }
`;

// export const CarouselItem = styled.div`
//   width: 100%;
//   img {
//     width: 100%;
//     object-fit: cover;
//   }
// `;

export const CarouselItem = styled.div`
  width: 100%;
  background-image: url(${(props) => props.backgroundImg});
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  height: 520px;
`;
