import { CarouselContainer, CarouselItem } from "./styled";

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
const Carousels = () => {
  const imageUrls = [
    "../../img/mainbanner1.png",
    "../../img/mainbanner2.png",
    "../../img/mainbanner3.png",
    "../../img/mainbanner4.png",
  ];

  const settings = {
    dots: true,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    speed: 1500,
    autoplaySpeed: 3000,
  };
  return (
    <>
      <CarouselContainer>
        <Slider {...settings}>
          {imageUrls.map((imageUrl) => (
            <CarouselItem key={imageUrl} backgroundImg={imageUrl}>
              {/* <img key={imageUrl} src={imageUrl} /> */}
            </CarouselItem>
          ))}
        </Slider>
      </CarouselContainer>
    </>
  );
};

export default Carousels;
