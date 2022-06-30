import Link from "next/link";
import { LikedPostContainer } from "./styled";

const LikedPosts = ({ src, link }) => {
  return (
    <LikedPostContainer>
      <Link href={link}>
        <img src={src} />
      </Link>
    </LikedPostContainer>
  );
};

export default LikedPosts;
