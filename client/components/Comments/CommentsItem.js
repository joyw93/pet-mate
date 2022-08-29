import { getElapsedTime } from "../../utils";
import {
  CommentContentInfo,
  CommentHandler,
  CommentItem,
  AuthorProfile,
  AuthorInfo,
} from './styled';
import { useSelector } from "react-redux";

const CommentsItem = ({ comment, onClick }) => {
  const { me } = useSelector((state) => state.user);

  return (
    <CommentItem>
      <CommentHandler>
        <AuthorInfo>
          <AuthorProfile>
            {comment.author?.profile?.imageUrl ? (
              <img src={comment.author.profile.imageUrl} />
            ) : (
              <img src="../img/defaultimgGrey.png" />
            )}
          </AuthorProfile>
          <h3>{comment.author.nickname}</h3>
        </AuthorInfo>
        <CommentContentInfo>
          <span>{getElapsedTime(comment.createdAt)}</span>
          {comment.author?.id === me?.id ? (
            <>
              <span>·</span>
              <span
                id="delete_btn"
                onClick={() => onClick(comment.id)}
              >
                삭제
              </span>
            </>
          ) : null}
        </CommentContentInfo>
      </CommentHandler>
      <p>{comment.content}</p>
    </CommentItem>
  );
}

export default CommentsItem;