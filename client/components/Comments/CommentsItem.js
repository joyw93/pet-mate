import { getElapsedTime } from "../../utils";
import {
  CommentContentInfo,
  CommentHandler,
  CommentItem,
  AuthorProfile,
  AuthorInfo,
  CommentReplyWrapper,
  CommentReplyInputWrapper,
} from "./styled";
import { useSelector } from "react-redux";
import CommentReply from "./CommentReply";
import CommentReplyInput from "./CommentReplyInput";
import { useState, useCallback } from "react";

const replyArr = [
  {
    id: 1,
    content: "testtest",
    author: {
      id: 1,
      nickname: "test1",
    },
    createdAt: "2022-08-19T09:50:01.140Z",
  },
  {
    id: 2,
    content: "testtest2",
    author: {
      id: 2,
      nickname: "test2",
    },
    createdAt: "2022-08-23T07:59:36.210Z",
  },
];

const CommentsItem = ({ comment, onClick }) => {
  const [toggleReplyInput, setToggleReplyInput] = useState(false);
  const { me } = useSelector((state) => state.user);

  const openReply = () => {
    setToggleReplyInput(!toggleReplyInput);
  };

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
              <span id="delete_btn" onClick={() => onClick(comment.id)}>
                삭제
              </span>
            </>
          ) : null}
          <span>·</span>
          <span id="open_reply" onClick={openReply}>
            답글 달기
          </span>
        </CommentContentInfo>
      </CommentHandler>
      <p>{comment.content}</p>
      {toggleReplyInput ? (
        <CommentReplyInputWrapper>
          <CommentReplyInput commentId={comment.id} />
        </CommentReplyInputWrapper>
      ) : null}
      <CommentReplyWrapper>
        {replyArr &&
          replyArr
            .slice(0)
            .reverse()
            .map((reply) => (
              <CommentReply key={reply.id} reply={reply} onClick={onClick} />
            ))}
      </CommentReplyWrapper>
    </CommentItem>
  );
};

export default CommentsItem;
//(
// <CommentItem>
//   <CommentHandler>
//     <AuthorInfo>
//       <AuthorProfile>
//         {author?.profile?.imageUrl ? (
//           <img src={author.profile.imageUrl} />
//         ) : (
//           <img src="../img/defaultimgGrey.png" />
//         )}
//       </AuthorProfile>
//       <h3>{author.nickname}</h3>
//     </AuthorInfo>
//     <CommentContentInfo>
//       <span>{getElapsedTime(createdAt)}</span>
//       {author?.id === me?.id ? (
//         <>
//           <span>·</span>
//           <span
//             id="delete_btn"
//             onClick={() => handleDeleteCmt(id)}
//           >
//             삭제
//           </span>
//         </>
//       ) : null}
//     </CommentContentInfo>
//   </CommentHandler>
//   <p>{content}</p>
// </CommentItem>
//)
