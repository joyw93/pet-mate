import Link from "next/link";

const MyPosts = ({ src, link }) => {
  return (
    <div>
      <Link href={link}>
        <img src={src} />
      </Link>
    </div>
  );
};

export default MyPosts;
