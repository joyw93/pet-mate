import { getElapsedTime } from "../../utils";
import {
  CommentContentInfo,
  CommentHandler,
  CommentReplyContainer,
  CommentReplyItem,
  AuthorProfile,
  AuthorInfo,
} from "./styled";
import { useSelector } from "react-redux";
import { useEffect } from "react";

const CommentReply = ({ reply, onClick }) => {
  const { me } = useSelector((state) => state.user);

  return (
    <CommentReplyContainer>
      <div id="reply_icon">
        <img src="../img/reply.png" alt="대댓글아이콘" />
      </div>
      <CommentReplyItem>
        <CommentHandler>
          <AuthorInfo>
            <AuthorProfile>
              {reply.author?.profile?.imageUrl ? (
                <img src={reply.author.profile.imageUrl} alt='프로필 사진' />
              ) : (
                <img src="../img/defaultimgGrey.png" alt='기본 프로필 사진' />
              )}
            </AuthorProfile>
            <h3>{reply.author.nickname}</h3>
          </AuthorInfo>
          <CommentContentInfo>
            <span>{getElapsedTime(reply.createdAt)}</span>
            {reply.author?.id === me?.id ? (
              <>
                <span>·</span>
                <span id="delete_btn" onClick={() => onClick(reply.id)}>
                  삭제
                </span>
              </>
            ) : null}
          </CommentContentInfo>
        </CommentHandler>
        <p>{reply.content}</p>
      </CommentReplyItem>
    </CommentReplyContainer>
  );
};

export default CommentReply;
