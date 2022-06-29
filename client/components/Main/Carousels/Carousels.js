import { CarouselContainer, CarouselItem } from "./styled";
import Carousel from "react-material-ui-carousel";
import { Paper, Button } from "@mui/material";
const Carousels = () => {
  return (
    <>
      <CarouselContainer>
        <Carousel>
          <CarouselItem src="img/dog1.jpg" />
          <CarouselItem src="img/dog2.jpg" />
          <CarouselItem src="img/dog3.jpg" />
        </Carousel>
      </CarouselContainer>
    </>
  );
};

export default Carousels;
