import { CarouselContainer, CarouselItem } from './styled';
import Carousel from 'react-material-ui-carousel';
import { Paper, Button } from '@mui/material';
const Carousels = () => {
  return (
    <>
      <CarouselContainer>
        <Carousel animation='slide' duration={800} interval={2000}>
          <CarouselItem src='img/mainbanner1.png' />
          <CarouselItem src='img/mainbanner2.png' />
          <CarouselItem src='img/mainbanner3.png' />
          <CarouselItem src='img/mainbanner4.png' />
        </Carousel>
      </CarouselContainer>
    </>
  );
};

export default Carousels;
