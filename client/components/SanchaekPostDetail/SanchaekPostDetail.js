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
import { sanchaekActions } from "../../store/reducers/sanchaek";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { useRef } from "react";
import Link from "next/link";
import CommentsList from '../Comments/CommentsList';

const SanchaekPostDetail = () => {
  const likeIcon = "../img/filled_heart2.png";
  const unlikeIcon = "../img/heart2.png";
  const [like, setLike] = useState(false);
  const [cmtContent, setCmtContent] = useState("");
  const router = useRouter();
  const { id } = router.query;
  const { me } = useSelector((state) => state.user);
  const { sanchaekPost, sanchaekAddCommentDone } = useSelector(
    (state) => state.sanchaek
  );

  const dispatch = useDispatch();
  const commentInputRef = useRef();

  useEffect(() => {
    if (router.isReady && !sanchaekPost) {
      dispatch(sanchaekActions.sanchaekLoadPostDetailRequest(id));
    }
  }, [router.isReady, sanchaekPost]);

  const handleCmtContent = useCallback(() => {
    if (!me) {
      router.push("/login");
      return;
    }
    if (!cmtContent.trim()) {
      return alert("내용을 입력하세요");
    }
    dispatch(
      sanchaekActions.sanchaekAddCommentRequest({
        postId: id,
        content: cmtContent,
      })
    );
    setCmtContent("");
    commentInputRef.current.blur();
    console.log(cmtContent);
  }, [cmtContent]);

  const handleLike = useCallback(() => {
    if (!me) {
      alert("로그인이 필요합니다.");
      return router.push("/login");
    }
    setLike(!like);
    dispatch(sanchaekActions.likePostRequest(id));
  }, [like]);

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
        dispatch(
          sanchaekActions.sanchaekAddCommentRequest({
            postId: id,
            content: cmtContent,
          })
        );
        setCmtContent("");
        commentInputRef.current.blur();
      }
    },
    [cmtContent]
  );

  const handleDeleteCmt = (commentId) => {
    if (commentId && window.confirm("댓글을 삭제하시겠습니까?")) {
      dispatch(sanchaekActions.sanchaekRemoveCommentRequest(commentId));
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
      dispatch(sanchaekActions.sanchaekRemovePostRequest(parseInt(id)));
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
            <div id="like_wrapper">
              <button onClick={handleLike}>
                {like ? (
                  <img src={likeIcon} alt="좋아요" />
                ) : (
                  <img src={unlikeIcon} alt="안좋아요" />
                )}
              </button>
              <span id="like_count">{sanchaekPost.likeCount}</span>
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
              {sanchaekPost.comments ? <CommentsList list={sanchaekPost.comments} /> : null}
            </CommentWrapper>
          </div>
        </PostDetailContainer>
      )}
    </>
  );
};

export default SanchaekPostDetail;
