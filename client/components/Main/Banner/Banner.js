import Link from "next/link";
import { BannerContainer, BannerItem } from "./styled";

const Banner = () => {
  return (
    <>
      <BannerContainer>
        <BannerItem>
          <div className="banner_container">
            <div className="banner_item_box">
              <h2>
                집 근처에서 찾는
                <br />
                우리 강아지 동네 친구
              </h2>
              <p>강아지 동네 친구와 함께 즐거운 산책 시간을 즐겨보세요.</p>
              <Link href="/sanchaek">
                <span>둘러보기</span>
              </Link>
            </div>
            <div className="banner_item_img">
              <img src="../img/walkingmate-banner-img.png" alt="집 근처에서 찾는 우리 강아지 동네 친구" />
            </div>
          </div>
        </BannerItem>
        <BannerItem>
          <div className="banner_container">
            <div className="banner_item_img">
              <img src="../img/community-banner-img.png" alt="이웃 반려인과 함께 하는 즐거운 반려생활" />
            </div>
            <div className="banner_item_box">
              <h2>
                이웃 반려인과 함께 하는
                <br />
                즐거운 반려생활
              </h2>
              <p>궁금한 점이 있을 땐 이웃 반려인에게 물어보세요.</p>
              <Link href="/community">
                <span>둘러보기</span>
              </Link>
            </div>
          </div>
        </BannerItem>
      </BannerContainer>
    </>
  );
};

export default Banner;
