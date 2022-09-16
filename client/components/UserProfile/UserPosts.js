import Link from "next/link";
import { useRouter } from "next/router";
import { useLayoutEffect, useState } from "react";

import { UserPostItem } from "./styled";

const UserPosts = ({ id, images, title, content, nav }) => {
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
    <UserPostItem onClick={goToDetail}>
      {images[0] ? (
        <img src={images[0].url} />
      ) : (
        <img src={defaultImages[randomNum]} />
      )}
      <h1>{title.slice(0, 12)}</h1>
      <p>{content.slice(0, 12)}</p>
    </UserPostItem>
  );
};

export default UserPosts;