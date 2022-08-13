import Link from "next/link";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import Router from "next/router";
import { useEffect, useRef } from "react";
import { useCallback } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { communityActions } from '../../store/reducers/community';
import { CreatePostContainer } from "./styled";

import {
  TitleWrapper,
  TextEditWrapper,
  AddPhotoWrapper,
  KeywordWrapper,
  Button,
} from "./styled";
import { useRouter } from "next/router";

const CommunityPost = ({ editState }) => {
  const router = useRouter();
  const { id } = router.query;

  const dispatch = useDispatch();
  const { addPostDone, updatePostDone, addPostLoading, updatePostLoading } =
    useSelector((state) => state.community);
  const { me } = useSelector((state) => state.user);
  const selectedPost = useSelector((state) => state.community.post);

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const [fileImages, setFileImages] = useState([]);
  const [images, setImages] = useState([]);

  const [hashTagVal, setHashTagVal] = useState("");
  const [hashArr, setHashArr] = useState([]);

  const titleRef = useRef();
  const contentRef = useRef();
  const imageRef = useRef();

  const [backdrop, setBackdrop] = useState(false);
  const handleClose = () => {
    setBackdrop(false);
  };

  useEffect(() => {
    setBackdrop(addPostLoading || updatePostLoading);
  }, [addPostLoading, updatePostLoading]);

  // useEffect(() => {
  //   if (router.isReady && editState) {
  //     dispatch(loadPostDetailRequestAction(id));
  //   }
  // }, [router.isReady, editState]);

  useEffect(() => {
    //수정상태일 때 선택된 게시글값 넣어주기
    if (editState) {
      if (selectedPost) {
        setTitle(selectedPost.title);
        setContent(selectedPost.content);

        let imageFiles = [];
        if (selectedPost.images) {
          for (let i = 0; i < selectedPost.images.length; i++) {
            let newImg = selectedPost.images[i].url;
            imageFiles = imageFiles.concat(newImg);
            setFileImages(imageFiles);
          }
          setImages(imageFiles);
        }

        let keywords = [];
        if (selectedPost.tags) {
          for (let i = 0; i < selectedPost.tags.length; i++) {
            const keyword = selectedPost.tags[i].hashtag.keyword;
            keywords = keywords.concat(keyword);
          }
          setHashArr(keywords);
        }
      }
    }
  }, [selectedPost, editState]);

  useEffect(() => {
    if (hashArr.length > 5) {
      setHashArr(hashArr.slice(0, 5));
      alert("키워드는 5개까지 등록할 수 있습니다.");
      return;
    }
  }, [hashArr]);

  //AddPhotoWrapper
  const handleAddImages = useCallback(
    (event) => {
      const pathPoint = imageRef.current.value.lastIndexOf(".");
      const filePoint = imageRef.current.value.substring(
        pathPoint + 1,
        imageRef.current.length
      );
      const fileType = filePoint.toLowerCase();

      if (
        fileType == "jpg" ||
        fileType == "gif" ||
        fileType == "png" ||
        fileType == "jpeg" ||
        fileType == "bmp"
      ) {
        //이미지 확장자 파일일 때
        const imageLists = event.target.files;
        let imageUrlLists = [...fileImages];

        for (let i = 0; i < imageLists.length; i++) {
          const currentImageUrl = URL.createObjectURL(imageLists[i]);
          imageUrlLists.push(currentImageUrl);
        }

        if (fileImages.length > 2) {
          imageUrlLists = imageUrlLists.slice(0, 3);
          return alert("이미지는 3장까지 업로드 할 수 있습니다.");
        }

        const imagesFile = event.target.files[0];
        const imageFileList = [...images];
        imageFileList.push(imagesFile);
        setImages(imageFileList);
        setFileImages(imageUrlLists);
      } else {
        // 이미지 확장자 파일이 아닐 때
        return alert("이미지 파일만 업로드할 수 있습니다.");
      }
    },
    [fileImages, images]
  );

  const handleDeleteImage = useCallback(
    (id) => {
      setFileImages(fileImages.filter((_, index) => index !== id));
      setImages(images.filter((_, index) => index !== id));
      window.URL.revokeObjectURL(fileImages.filter((_, index) => index === id));
    },
    [fileImages]
  );

  //KeywordWrapper
  const handleHash = useCallback(
    (e) => {
      setHashTagVal(e.target.value);
    },
    [hashTagVal]
  );

  const keyUp = useCallback(
    (e) => {
      if (
        (e.keyCode === 13 || e.keyCode === 32) &&
        e.target.value.trim() !== ""
      ) {
        if (hashArr.find((it) => it === e.target.value.trim())) {
          alert("같은 키워드를 입력하셨습니다.");
          setHashTagVal("");
          return;
        }
        setHashArr([...hashArr, hashTagVal.trim()]);
        setHashTagVal("");
      }
    },
    [hashTagVal, hashArr]
  );

  const handleDeleteHash = (i) => {
    const deletedArr = hashArr.filter((item, index) => index !== i);
    setHashArr(deletedArr);
  };

  const handlePost = () => {
    if (!title) {
      return titleRef.current.focus();
    }
    if (!content) {
      return contentRef.current.focus();
    }

    //수정모드일 때 중복값 삭제
    let tagsArr = hashArr.filter((v, i) => hashArr.indexOf(v) === i);
    setHashArr(tagsArr);

    //데이터 전송
    const post = new FormData();
    post.append("title", title);
    post.append("content", content);

    if (images.length > 0) {
      [].forEach.call(images, (img) => {
        post.append("images", img);
      });
    }

    if (hashArr.length > 0) {
      hashArr.forEach((hashtag) => {
        post.append("hashtags", hashtag);
      });
    }

    //수정 모드일 때
    if (editState) {
      dispatch(communityActions.updatePostRequest({ post, id }));
    } else {
      //새로 작성할 때
      dispatch(communityActions.addPostRequest(post));
    }
  };

  useEffect(() => {
    if (addPostDone) {
      dispatch(communityActions.addPostReset());
      //dispatch(postResetAction());
      Router.replace("/community");
    } else if (updatePostDone) {
      dispatch(communityActions.updatePostReset());
      //dispatch(updatePostResetAction());
      Router.replace("/community");
    }
  }, [addPostDone, updatePostDone]);

  return (
    <>
      <CreatePostContainer>
        <TitleWrapper>
          <h1>커뮤니티 글쓰기</h1>
          {editState ? (
            <div id="buttons">
              <Button onClick={handlePost}>수정완료</Button>
              <Button onClick={() => router.back()}>취소</Button>
            </div>
          ) : (
            <div id="buttons">
              <Button onClick={handlePost}>등록</Button>
              <Button onClick={() => router.push("/community")}>취소</Button>
            </div>
          )}
        </TitleWrapper>

        <TextEditWrapper>
          <input
            ref={titleRef}
            autoFocus
            maxLength="25"
            type="text"
            value={title || ""}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="제목을 입력해 주세요."
          />
          <textarea
            ref={contentRef}
            maxLength="350"
            value={content || ""}
            onChange={(e) => setContent(e.target.value)}
            placeholder="내용을 입력해 주세요"
          ></textarea>
        </TextEditWrapper>

        <AddPhotoWrapper>
          <h2>사진 추가(최대 3장)</h2>
          <div id="photos">
            <div id="add_photo">
              <label htmlFor="add_file" onChange={handleAddImages}>
                <input
                  ref={imageRef}
                  type="file"
                  id="add_file"
                  accept="image/*"
                />
                <img src="../../img/photo.png" alt="이미지 업로드" />
              </label>
            </div>

            {fileImages &&
              fileImages.map((image, id) => (
                <div key={id} className="photo_preview">
                  <img src={image} alt={`${image}-${id}`} />
                  <button onClick={() => handleDeleteImage(id)}>
                    <svg
                      className="delete-icon"
                      width="12"
                      height="12"
                      fill="currentColor"
                      viewBox="0 0 12 12"
                      preserveAspectRatio="xMidYMid meet"
                    >
                      <path d="M6.8 6l4.2 4.2-.8.8L6 6.8 1.8 11l-.8-.8L5.2 6 1 1.8l.8-.8L6 5.2 10.2 1l.8.8L6.8 6z"></path>
                    </svg>
                  </button>
                </div>
              ))}
          </div>
        </AddPhotoWrapper>
        <KeywordWrapper>
          <h2>키워드 등록(최대 5개)</h2>
          <div id="keyword_area">
            {hashArr &&
              hashArr.map((it, index) => (
                <button
                  key={index}
                  className="keyword_item"
                  onClick={() => handleDeleteHash(index)}
                >
                  <span>{it}</span>
                  <svg
                    className="delete-icon"
                    width="13"
                    height="13"
                    fill="currentColor"
                    viewBox="0 0 13 13"
                    preserveAspectRatio="xMidYMid meet"
                  >
                    <path d="M6.8 6l4.2 4.2-.8.8L6 6.8 1.8 11l-.8-.8L5.2 6 1 1.8l.8-.8L6 5.2 10.2 1l.8.8L6.8 6z"></path>
                  </svg>
                </button>
              ))}
            <div id="keyword_input">
              <input
                onKeyUp={keyUp}
                value={hashTagVal}
                size="14"
                maxLength="10"
                onChange={handleHash}
                type="text"
                placeholder="키워드(10자 이내)"
              />
            </div>
          </div>
        </KeywordWrapper>
      </CreatePostContainer>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={backdrop}
        onClick={handleClose}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </>
  );
};

export default CommunityPost;
