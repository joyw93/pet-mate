import Link from "next/link";
import { MyPostItem } from "./styled";

const MyPosts = ({ id, images }) => {
  const defaultimages = [
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
      <Link href={`/community/${id}`}>{images[0] ? <img src={images[0].url} /> : <img src={defaultimages[randomNum]} />}</Link>
      {/* <Link href={`/community/${id}`}>{images[0] ? <img src={images[0].url} /> : <img src="../img/defaultimg1.png" />}</Link> */}
      <h1>타이틀타이틀</h1>
    </MyPostItem>
  );
};

export default MyPosts;
