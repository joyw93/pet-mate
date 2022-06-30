import Link from "next/link";
import { CommentContainer } from "./styled";

const MyComments = ({ src, link }) => {
  return (
    <CommentContainer>
      <Link href={link}>
        <img src={src} />
      </Link>
    </CommentContainer>
  );
};

export default MyComments;
