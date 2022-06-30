import Link from "next/link";
import { PostContainer } from "./styled";

const MyPosts = ({ src, link }) => {
  return (
    <PostContainer>
      <Link href={link}>
        <img src={src} />
      </Link>
    </PostContainer>
  );
};

export default MyPosts;
