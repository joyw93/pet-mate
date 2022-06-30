import { CarouselContainer, CarouselItem } from './styled';
import Carousel from 'react-material-ui-carousel';
import { Paper, Button } from '@mui/material';
const Carousels = () => {
  const imageUrls = ['img/mainbanner1.png', 'img/mainbanner2.png', 'img/mainbanner3.png', 'img/mainbanner4.png'];
  return (
    <>
      <CarouselContainer>
        <Carousel animation='slide' duration={800} interval={2000}>
          {imageUrls.map((imageUrl) => (
            <CarouselItem src={imageUrl} />
          ))}
        </Carousel>
      </CarouselContainer>
    </>
  );
};

export default Carousels;
