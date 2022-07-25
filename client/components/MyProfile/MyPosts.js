import Link from "next/link";
import { MyPostItem } from "./styled";

const MyPosts = ({ id, images, title, content }) => {
  const defaultImages = [
    "../img/defaultimg1.png",
    "../img/defaultimg2.png",
    "../img/defaultimg3.png",
    "../img/defaultimg4.png",
    "../img/defaultimg5.png",
    "../img/defaultimg6.png",
  ];
  let randomNum = Math.floor(Math.random() * 4) + 1;

  return (
    <MyPostItem>
      <Link href={`/community/${id}`}>
        {images[0] ? (
          <img src={images[0].url} />
        ) : (
          <img src={defaultImages[randomNum]} />
        )}
      </Link>
      <h1>{title.slice(0, 12)}</h1>
      <p>{content.slice(0, 12)}</p>
    </MyPostItem>
  );
};

export default MyPosts;
