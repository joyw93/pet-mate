import { useState, useRef, useCallback } from 'react';
import { CommentInput, Button } from './styled';
import { useSelector, useDispatch } from "react-redux";
import { communityActions } from '../../store/reducers/community';


const CommentsInput = ({ postId }) => {
  console.log(postId);
  const { me } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [cmtContent, setCmtContent] = useState("");
  const commentInputRef = useRef();

  const handleCmtContent = useCallback(() => {
    if (!me) {
      router.push("/login");
      return;
    }
    if (!cmtContent.trim()) {
      return alert("내용을 입력하세요");
    }
    const data = {
      postId,
      content: cmtContent,
    };
    onAddComment(postId, cmtContent);
  }, [cmtContent]);

  const keyUp = useCallback(
    (e) => {
      if (e.keyCode === 13) {
        if (!me) {
          router.push("/login");
          return;
        }
        if (!e.target.value.trim()) {
          return alert("내용을 입력하세요");
        }
        onAddComment(postId, cmtContent);
      }
    },
    [cmtContent]
  );

  const onAddComment = (postId, cmtContent) => {
    const data = {
      postId,
      content: cmtContent,
    };
    dispatch(communityActions.addCommentRequest(data));
    setCmtContent("");
    commentInputRef.current.blur();
  }

  return (
    <CommentInput>
      <input
        ref={commentInputRef}
        onKeyUp={keyUp}
        onChange={(e) => setCmtContent(e.target.value)}
        value={cmtContent}
        type="text"
        placeholder="댓글을 남겨보세요."
      />
      <Button onClick={handleCmtContent}>입력</Button>
    </CommentInput>

  );
}

export default CommentsInput;