import Link from "next/link";
import React, { useState, useEffect, useCallback, useLayoutEffect } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import {
  PostDetailContainer,
  Images,
  Title,
  PostInfo,
  KeywordWrapper,
  CommentWrapper,
  Button,
  CommentInput,
  CommentArea,
  CommentContentInfo,
  CommentHandler,
  CommentItem,
} from "./styled";
import { getElapsedTime } from "../../utils";
import { loadPostDetailRequestAction, removePostRequestAction, removeCommentRequestAction } from "../../reducers/community";
import { addCommentRequestAction } from "../../reducers/community";
import { likePostRequestAction } from "../../reducers/community";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/router";

const CommunityPostDetail = () => {
  const likeIcon = "../img/filled_heart2.png";
  const unlikeIcon = "../img/heart2.png";
  const [cmtContent, setCmtContent] = useState("");
  const [like, setLike] = useState(false);
  const router = useRouter();
  const { id } = router.query;
  const { post, addCommentDone, removeCommentDone, likePostDone } = useSelector((state) => state.community);
  const dispatch = useDispatch();
  //carousel
  const settings = {
    arrows: true,
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  useLayoutEffect(() => {
    if (post?.isLike === null) {
      setLike(false);
    } else {
      setLike(post?.isLike);
    }
  }, [post]);

  useLayoutEffect(() => {
    if (router.isReady) {
      dispatch(loadPostDetailRequestAction(id));
    }
  }, [router.isReady, addCommentDone, removeCommentDone, likePostDone]);

  const handleLike = useCallback(() => {
    setLike(!like);
    dispatch(likePostRequestAction(id));
    console.log(post);
  }, [like]);

  const handleCmtContent = useCallback(() => {
    if (!cmtContent.trim()) {
      return alert("내용을 입력하세요");
    }
    dispatch(addCommentRequestAction({ postId: id, content: cmtContent }));
    setCmtContent("");
  }, [cmtContent]);

  const keyUp = useCallback(
    (e) => {
      if (e.keyCode === 13) {
        if (!e.target.value.trim()) {
          return alert("내용을 입력하세요");
        }

        dispatch(addCommentRequestAction({ postId: id, content: cmtContent }));

        setCmtContent("");
      }
    },
    [cmtContent]
  );

  const handleDeleteCmt = (commentId) => {
    if (commentId && window.confirm("댓글을 삭제하시겠습니까?")) {
      dispatch(removeCommentRequestAction(commentId));
    }
  };

  const handleDeletePost = () => {
    if (window.confirm("글을 삭제하겠습니까?")) {
      console.log("글 삭제");
      dispatch(removePostRequestAction(parseInt(id)));
      router.push(`/community`);
    }
  };

  const getKeywordValue = (e) => {
    console.log(e.target.value);
  };

  return (
    <>
      {post ? (
        <PostDetailContainer>
          <h1>커뮤니티</h1>
          <Title>
            <h2>{post.title}</h2>
            <div>
              <Link href={`/community/${id}/edit`}>
                <Button>수정</Button>
              </Link>
              <Button onClick={handleDeletePost}>삭제</Button>
            </div>
          </Title>
          <PostInfo>
            <div>
              <span id="post_author">{post.author.nickname}</span>
              <span id="post_created_time">{getElapsedTime(post.createdAt)}</span>
              <span id="views">조회수 {post.views}</span>
            </div>
            <div id="like_wrapper">
              <button onClick={handleLike}>{like ? <img src={likeIcon} alt="좋아요" /> : <img src={unlikeIcon} alt="안좋아요" />}</button>
              <span id="like_count">{post.likeCount}</span>
            </div>
          </PostInfo>
          <div id="content">
            {post.images.length !== 0 ? (
              <Images>
                <Slider {...settings}>
                  {post.images.map((img) => (
                    <div key={img}>
                      <img src={img.url} alt="이미지" />
                    </div>
                  ))}
                </Slider>
              </Images>
            ) : null}
            <div id="content_text">
              <p>{post.content}</p>
            </div>
            <KeywordWrapper>
              <div id="keyword_area">
                {post.tags &&
                  post.tags.map((tag) => (
                    <Link href={`/search?keyword=${tag.hashtag.keyword}`} key={tag.id} passHref>
                      <button onClick={getKeywordValue} className="keyword_item">
                        <span>{tag.hashtag.keyword}</span>
                      </button>
                    </Link>
                  ))}
              </div>
            </KeywordWrapper>
            <CommentWrapper>
              <h2>
                댓글 <span>{post.comments.length}</span>
              </h2>
              <CommentInput>
                <input
                  onKeyUp={keyUp}
                  onChange={(e) => setCmtContent(e.target.value)}
                  value={cmtContent}
                  type="text"
                  placeholder="댓글을 남겨보세요."
                />
                <Button onClick={handleCmtContent}>입력</Button>
              </CommentInput>
              <CommentArea>
                {post.comments &&
                  post.comments
                    .slice(0)
                    .reverse()
                    .map((comment) => (
                      <CommentItem key={comment.id}>
                        <CommentHandler>
                          <h3>{comment.author.nickname}</h3>
                          <CommentContentInfo>
                            <span>{getElapsedTime(comment.createdAt)}</span>
                            <span>·</span>
                            <span id="delete_btn" onClick={() => handleDeleteCmt(comment.id)}>
                              삭제
                            </span>
                          </CommentContentInfo>
                        </CommentHandler>

                        <p>{comment.content}</p>
                      </CommentItem>
                    ))}
              </CommentArea>
            </CommentWrapper>
          </div>
        </PostDetailContainer>
      ) : null}
    </>
  );
};

export default CommunityPostDetail;
