import {
  CarouselContainer,
  CarouselItem1,
  CarouselItem2,
  CarouselItem3,
  CarouselItem4,
} from "./styled";

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
const Carousels = () => {
  // const imageUrls = [
  //   "../img/mainbanner1.png",
  //   "../img/mainbanner2.png",
  //   "../img/mainbanner3.png",
  //   "../img/mainbanner4.png",
  // ];

  const bggImageUrls = [
    "../img/mainbanner1.png",
    "../img/mainbanner2.png",
    "../img/mainbanner3.png",
    "../img/mainbanner4.png",
  ];
  const bgImageUrls = [
    "../img/mainbanner1_0.png",
    "../img/mainbanner2_0.png",
    "../img/mainbanner3_0.png",
    "../img/mainbanner4_0.png",
  ];
  const mdImageUrls = [
    "../img/mainbanner1_1.png",
    "../img/mainbanner2_1.png",
    "../img/mainbanner3_1.png",
    "../img/mainbanner4_1.png",
  ];
  const smImageUrls = [
    "../img/mainbanner1_2.png",
    "../img/mainbanner2_2.png",
    "../img/mainbanner3_2.png",
    "../img/mainbanner4_2.png",
  ];

  const smmImageUrls = [
    "../img/mainbanner1_3.png",
    "../img/mainbanner2_3.png",
    "../img/mainbanner3_3.png",
    "../img/mainbanner4_3.png",
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
          {/* {imageUrls.map((imageUrl) => (
            <CarouselItem
              key={imageUrl}
              backgroundImg={imageUrl}
            ></CarouselItem>
          ))} */}
          <CarouselItem1
            bggImageUrls={bggImageUrls[0]}
            bgImageUrls={bgImageUrls[0]}
            mdImageUrls={mdImageUrls[0]}
            smImageUrls={smImageUrls[0]}
            smmImageUrls={smmImageUrls[0]}
          />
          <CarouselItem2
            bggImageUrls={bggImageUrls[1]}
            bgImageUrls={bgImageUrls[1]}
            mdImageUrls={mdImageUrls[1]}
            smImageUrls={smImageUrls[1]}
            smmImageUrls={smmImageUrls[1]}
          />

          <CarouselItem3
            bggImageUrls={bggImageUrls[2]}
            bgImageUrls={bgImageUrls[2]}
            mdImageUrls={mdImageUrls[2]}
            smImageUrls={smImageUrls[2]}
            smmImageUrls={smmImageUrls[2]}
          />

          <CarouselItem4
            bggImageUrls={bggImageUrls[3]}
            bgImageUrls={bgImageUrls[3]}
            mdImageUrls={mdImageUrls[3]}
            smImageUrls={smImageUrls[3]}
            smmImageUrls={smmImageUrls[3]}
          />
        </Slider>
      </CarouselContainer>
    </>
  );
};

export default Carousels;
