import React, { useState, useEffect, useCallback } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import DetailedMap from "../Kakaomap/DetailedMap";
import {
  PostDetailContainer,
  Images,
  Title,
  PostInfo,
  MapWrapper,
  CommentWrapper,
  Button,
  CommentInput,
  CommentArea,
  CommentContentInfo,
  CommentHandler,
  CommentItem,
} from "./styled";
import { getElapsedTime } from "../../utils";
import {
  sanchaekLoadPostDetailRequestAction,
  sanchaekAddCommentRequestAction,
  sanchaekRemovePostRequestAction,
  sanchaekRemoveCommentRequestAction,
} from "../../store/reducers/sanchaek";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { useRef } from "react";
import Link from "next/link";

const SanchaekPostDetail = () => {
  const [cmtContent, setCmtContent] = useState("");
  const router = useRouter();
  const { id } = router.query;
  const { me } = useSelector((state) => state.user);
  const { sanchaekPost, sanchaekAddCommentDone } = useSelector(
    (state) => state.sanchaek
  );

  const dispatch = useDispatch();
  const commentInputRef = useRef();

  // useEffect(() => {
  //   if (sanchaekAddCommentDone) {
  //   }
  // }, [sanchaekPost]);

  useEffect(() => {
    if (router.isReady && !sanchaekPost) {
      dispatch(sanchaekLoadPostDetailRequestAction(id));
    }
  }, [router.isReady, sanchaekPost]);

  const handleCmtContent = useCallback(() => {
    if (!cmtContent.trim()) {
      return alert("내용을 입력하세요");
    }
    dispatch(sanchaekAddCommentRequestAction({ postId: id, content: cmtContent }));
    setCmtContent("");
    commentInputRef.current.blur();
  }, [cmtContent]);

  const keyUp = useCallback(
    (e) => {
      if (e.keyCode === 13) {
        if (!e.target.value.trim()) {
          return alert("내용을 입력하세요");
        }
        dispatch(
          sanchaekAddCommentRequestAction({ postId: id, content: cmtContent })
        );
        setCmtContent("");
        commentInputRef.current.blur();
      }
    },
    [cmtContent]
  );

  const handleDeleteCmt = (commentId) => {
    if (commentId && window.confirm("댓글을 삭제하시겠습니까?")) {
      dispatch(sanchaekRemoveCommentRequestAction(commentId));
    }
  };

  const settings = {
    arrows: true,
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  const handleDeletePost = () => {
    if (window.confirm("글을 삭제하겠습니까?")) {
      dispatch(sanchaekRemovePostRequestAction(parseInt(id)));
      router.push(`/sanchaek`);
    }
  };

  // console.log("기본 lat", sanchaekPost.mapInfo.lat);
  // console.log("기본 lng", sanchaekPost.mapInfo.lng);
  return (
    <>
      {sanchaekPost && (
        <PostDetailContainer>
          <h1>산책메이트</h1>
          <Title>
            <h2>{sanchaekPost.title}</h2>
            {me && me?.id === sanchaekPost?.user?.id ? (
              <div>
                <Link href={`/sanchaek/${id}/edit`}>
                  <Button>수정</Button>
                </Link>
                <Button onClick={handleDeletePost}>삭제</Button>
              </div>
            ) : null}
          </Title>
          <PostInfo>
            <div>
              <span id="post_author">{sanchaekPost.user.nickname}</span>
              <span id="post_created_time">
                {getElapsedTime(sanchaekPost.createdAt)}
              </span>
              <span id="views">조회수 {sanchaekPost.views}</span>
            </div>
          </PostInfo>
          <div id="content">
            {sanchaekPost.images.length !== 0 && (
              <Images>
                <Slider {...settings}>
                  {sanchaekPost.images.map((img) => (
                    <div key={img}>
                      <img src={img.url} alt="이미지" />
                    </div>
                  ))}
                </Slider>
              </Images>
            )}
            <div id="content_text">
              <p>{sanchaekPost.content}</p>
            </div>
            {sanchaekPost.mapInfo.length !== 0 ? (
              <MapWrapper>
                {Number(sanchaekPost.mapInfo.lat) == 37.566826 &&
                  Number(sanchaekPost.mapInfo.lng) == 126.9786567 ? null : (
                  <>
                    <h2>지도</h2>
                    <DetailedMap
                      lat={sanchaekPost.mapInfo.lat}
                      lng={sanchaekPost.mapInfo.lng}
                      placeResult={sanchaekPost.mapInfo.location}
                    />
                  </>
                )}
              </MapWrapper>
            ) : null}
            <CommentWrapper>
              <h2>
                댓글 <span>{sanchaekPost.comments.length}</span>
              </h2>
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
              <CommentArea>
                {sanchaekPost.comments &&
                  sanchaekPost.comments
                    .slice(0)
                    .reverse()
                    .map((comment) => (
                      <CommentItem key={comment.id}>
                        <CommentHandler>
                          <h3>{comment.author.nickname}</h3>
                          <CommentContentInfo>
                            <span>{getElapsedTime(comment.createdAt)}</span>
                            {comment?.author?.id === me?.id ? (
                              <>
                                <span>·</span>
                                <span
                                  id="delete_btn"
                                  onClick={() => handleDeleteCmt(comment.id)}
                                >
                                  삭제
                                </span>
                              </>
                            ) : null}
                          </CommentContentInfo>
                        </CommentHandler>
                        <p>{comment.content}</p>
                      </CommentItem>
                    ))}
              </CommentArea>
            </CommentWrapper>
          </div>
        </PostDetailContainer>
      )}
    </>
  );
};

export default SanchaekPostDetail;
