import Link from "next/link";

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
    <div>
      <Link href={`/community/${id}`}>{images[0] ? <img src={images[0].url} /> : <img src={defaultimages[randomNum]} />}</Link>
    </div>
  );
};

export default MyPosts;
