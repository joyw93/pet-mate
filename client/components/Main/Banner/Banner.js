import { BannerContainer, BannerItem } from './styled';

const Banner = () => {
  return (
    <>
      <BannerContainer>
        <BannerItem url='img/banner1.png'>
          <button>둘러보기</button>
        </BannerItem>
        <BannerItem url='img/banner2.png'>
          <button>둘러보기</button>
        </BannerItem>
      </BannerContainer>
    </>
  );
};

export default Banner;
