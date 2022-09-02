import { CommentArea } from "./styled";
import { communityActions } from "../../store/reducers/community";
import CommentsItem from "./CommentsItem";
import { sanchaekActions } from "../../store/reducers/sanchaek";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { useRouter } from "next/router";

const CommentsList = ({ list }) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { post, removeCommentDone } = useSelector((state) => state.community);
  const { sanchaekRemoveCommentDone } = useSelector((state) => state.sanchaek);
  const { id } = router.query;

  useEffect(() => {
    if (removeCommentDone) {
      dispatch(communityActions.loadPostDetailRequest(id));
    }
  }, [removeCommentDone]);

  useEffect(() => {
    if (sanchaekRemoveCommentDone) {
      dispatch(sanchaekActions.sanchaekLoadPostDetailRequest(id));
    }
  }, [sanchaekRemoveCommentDone]);

  const handleDeleteCmt = (commentId) => {
    //커뮤니티일 때 (라우터 검색해서)
    if (location.pathname.includes("/community")) {
      if (commentId && window.confirm("댓글을 삭제하시겠습니까?")) {
        dispatch(communityActions.removeCommentRequest(parseInt(commentId)));
      }
    } else if (location.pathname.includes("/sanchaek")) {
      //산책일 때
      if (commentId && window.confirm("댓글을 삭제하시겠습니까?")) {
        dispatch(
          sanchaekActions.sanchaekRemoveCommentRequest(parseInt(commentId))
        );
      }
    }
  };

  return (
    <CommentArea>
      {list &&
        list
          .slice(0)
          .reverse()
          .map((comment) => (
            <CommentsItem
              key={comment.id}
              comment={comment}
              onClick={handleDeleteCmt}
            />
          ))}
    </CommentArea>
  );
};

export default CommentsList;
