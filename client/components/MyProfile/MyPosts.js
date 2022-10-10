import Link from "next/link";
import { useRouter } from "next/router";
import { useLayoutEffect, useState } from "react";

import { MyPostItem } from "./styled";

const MyPosts = ({ id, images, title, content, nav }) => {
  const [randomNum, setRandomNum] = useState(0);
  const defaultImages = [
    "../img/defaultimg1.png",
    "../img/defaultimg2.png",
    "../img/defaultimg3.png",
    "../img/defaultimg4.png",
    "../img/defaultimg5.png",
    "../img/defaultimg6.png",
  ];
  useLayoutEffect(() => {
    setRandomNum(Math.floor(Math.random() * 4) + 1);
  }, []);

  const router = useRouter();

  const goToDetail = () => {
    router.push(`/${nav}/${id}`);
  };

  return (
    <MyPostItem onClick={goToDetail}>
      {images[0] ? (
        <img src={images[0].url} alt='작성 글 이미지' />
      ) : (
        <img src={defaultImages[randomNum]} alt='랜덤 이미지' />
      )}
      <h1>{title.slice(0, 12)}</h1>
      <p>{content.slice(0, 12)}</p>
    </MyPostItem>
  );
};

export default MyPosts;
