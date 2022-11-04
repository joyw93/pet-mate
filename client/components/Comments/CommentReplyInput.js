import { useState, useRef, useCallback } from "react";
import { CommentReplyInput, Button } from "./styled";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/router";
import { communityActions } from "../../store/reducers/community";

const CommentsInput = ({ commentId }) => {
  const { me } = useSelector((state) => state.user);
  const [replyContent, setReplyContent] = useState("");
  const router = useRouter();
  const { id } = router.query;
  const replyInputRef = useRef();
  const dispatch = useDispatch();
  console.log(commentId);
  const handleReplyContent = useCallback(() => {
    if (!me) {
      router.push("/login");
      return;
    }
    if (!replyContent.trim()) {
      return alert("내용을 입력하세요");
    }
    onAddReply(commentId, replyContent);
  }, [replyContent]);

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
        onAddReply(commentId, replyContent);
      }
    },
    [replyContent]
  );

  const onAddReply = (commentId, replyContent) => {
    const data = {
      postId: id,
      commentId,
      content: replyContent,
    };
    console.log("대댓글", data);
    dispatch(communityActions.addReplyRequest(data));
    setReplyContent("");
    replyInputRef.current.blur();
  };

  return (
    <CommentReplyInput>
      <input
        ref={replyInputRef}
        onKeyUp={keyUp}
        onChange={(e) => setReplyContent(e.target.value)}
        value={replyContent}
        type="text"
        placeholder="답글을 남겨보세요."
      />
      <Button onClick={handleReplyContent}>입력</Button>
    </CommentReplyInput>
  );
};

export default CommentsInput;
