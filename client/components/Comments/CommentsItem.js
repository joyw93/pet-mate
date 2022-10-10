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
  const likeIcon = "../img/filled_heart2.png";
  const unlikeIcon = "../img/heart2.png";
  const [cmtLike, setCmtLike] = useState(false);

  const [toggleReplyInput, setToggleReplyInput] = useState(false);
  const { me } = useSelector((state) => state.user);

  const openReply = () => {
    setToggleReplyInput(!toggleReplyInput);
  };

  // 내가 좋아요 댓글 표시
  // useEffect(() => {
  //   if (!me) {
  //     setCmtLike(false);
  //     return;
  //   }
  //   if (comment && comment.likes) {
  //     comment.likes.forEach((likers) => {
  //       if (likers.userId === me.id) {
  //         setCmtLike(true);
  //         return;
  //       }
  //     });
  //   }
  // }, [me, comment]);

  const handleLike = useCallback(() => {
    if (!me) {
      alert("로그인이 필요합니다.");
      return router.push("/login");
    }
    setCmtLike(!cmtLike);
    // dispatch(communityActions.likePostRequest(id));
  }, [cmtLike]);

  return (
    <CommentItem>
      <CommentHandler>
        <AuthorInfo>
          <AuthorProfile>
            {comment.author?.profile?.imageUrl ? (
              <img src={comment.author.profile.imageUrl} alt='프로필 사진' />
            ) : (
              <img src="../img/defaultimgGrey.png" alt='기본 프로필 사진' />
            )}
          </AuthorProfile>
          <h3>{comment.author.nickname}</h3>
        </AuthorInfo>
        <CommentContentInfo>
          <span>{getElapsedTime(comment.createdAt)}</span>
          <span>·</span>
          <span id="open_reply" onClick={openReply}>
            답글 달기
          </span>
          <span>·</span>
          <span id="like_comment" onClick={handleLike}>
            0
            {cmtLike ? (
              <img src={likeIcon} alt="좋아요" />
            ) : (
              <img src={unlikeIcon} alt="안좋아요" />
            )}
          </span>
          {comment.author?.id === me?.id ? (
            <>
              <span>·</span>
              <span id="delete_btn" onClick={() => onClick(comment.id)}>
                삭제
              </span>
            </>
          ) : null}
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
