import {
  CommentArea,
} from './styled';
import CommentsItem from './CommentsItem';
import { communityActions } from '../../store/reducers/community';
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from 'react';
import { useRouter } from "next/router";

const CommentsList = ({ list }) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { post, removeCommentDone } = useSelector((state) => state.community);
  const { id } = router.query;

  useEffect(() => {
    if (removeCommentDone) {
      dispatch(communityActions.loadPostDetailRequest(id));
    }
  }, [removeCommentDone]);

  const handleDeleteCmt = (commentId) => {
    console.log(commentId);
    if (commentId && window.confirm("댓글을 삭제하시겠습니까?")) {
      dispatch(communityActions.removeCommentRequest(parseInt(commentId)));
    }
  };

  return (
    <CommentArea>
      {list &&
        list
          .slice(0)
          .reverse()
          .map((comment) => (
            <CommentsItem key={comment.id} comment={comment} onClick={handleDeleteCmt} />
          ))}
    </CommentArea>
  );
}

export default CommentsList;