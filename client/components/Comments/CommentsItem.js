import { getElapsedTime } from "../../utils";
import {
  CommentContentInfo,
  CommentHandler,
  CommentItem,
  AuthorProfile,
  AuthorInfo,
} from './styled';
import { communityActions } from '../../store/reducers/community';
import { useSelector, useDispatch } from "react-redux";

const CommentsItem = ({ author, createdAt, id, content }) => {
  const { me } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const handleDeleteCmt = (id) => {
    if (id && window.confirm("댓글을 삭제하시겠습니까?")) {
      dispatch(communityActions.removeCommentRequest(id));
    }
  };

  return (
    <CommentItem>
      <CommentHandler>
        <AuthorInfo>
          <AuthorProfile>
            {author?.profile?.imageUrl ? (
              <img src={author.profile.imageUrl} />
            ) : (
              <img src="../img/defaultimgGrey.png" />
            )}
          </AuthorProfile>
          <h3>{author.nickname}</h3>
        </AuthorInfo>
        <CommentContentInfo>
          <span>{getElapsedTime(createdAt)}</span>
          {author?.id === me?.id ? (
            <>
              <span>·</span>
              <span
                id="delete_btn"
                onClick={() => handleDeleteCmt(id)}
              >
                삭제
              </span>
            </>
          ) : null}
        </CommentContentInfo>
      </CommentHandler>
      <p>{content}</p>
    </CommentItem>
  )
}

export default CommentsItem;