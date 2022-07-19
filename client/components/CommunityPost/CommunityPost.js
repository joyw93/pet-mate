import Link from "next/link";
import Router from "next/router";
import { useEffect, useRef } from "react";
import { useCallback } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { postRequestAction, postResetAction } from "../../reducers/community";
import { CreatePostContainer } from "./styled";

import {
  loadPostDetailRequestAction,
  updatePostRequestAction,
} from "../../reducers/community";
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
  const [singlePost, setSinglePost] = useState("");

  const dispatch = useDispatch();
  const { postDone } = useSelector((state) => state.community);
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

  useEffect(() => {
    dispatch(loadPostDetailRequestAction(id));
  }, []);

  useEffect(() => {
    if (editState) {
      if (selectedPost) {
        setSinglePost(selectedPost);

        setTitle(singlePost.title);
        setContent(singlePost.content);

        let imageFiles = [];

        if (singlePost.images) {
          for (let i = 0; i < singlePost.images.length; i++) {
            // let newImg = {
            //   id: singlePost.images[i].id,
            //   image: singlePost.images[i].url,
            // };
            // imageFiles = imageFiles.concat(newImg);
            let newImg = singlePost.images[i].url;
            imageFiles = imageFiles.concat(newImg);
            setFileImages(imageFiles);
          }
        }
        if (singlePost.tags) {
          for (let i = 0; i < singlePost.tags.length; i++) {
            const keyword = singlePost.tags[i].hashtag.keyword;
            setHashArr([...hashArr, keyword]);
          }
        }
      }
    }
  }, [selectedPost]);

  console.log(selectedPost);
  console.log(fileImages);
  // console.log(hashArr);
  //console.log(fileImages);

  // useEffect(() => {
  //   if (!me) {
  //     Router.push("/login");
  //   }
  // }, []);

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
      const imageLists = event.target.files;
      const imageUrlLists = [...fileImages];

      for (let i = 0; i < imageLists.length; i++) {
        const currentImageUrl = URL.createObjectURL(imageLists[i]);
        imageUrlLists.push(currentImageUrl);
      }

      if (imageUrlLists.length > 3) {
        imageUrlLists = imageUrlLists.slice(0, 3);
        alert("이미지는 3장까지 업로드 할 수 있습니다.");
      }

      const imagesFile = event.target.files[0];
      const imageFileList = [...images];
      imageFileList.push(imagesFile);
      setImages(imageFileList);
      setFileImages(imageUrlLists);
    },
    [fileImages]
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
    [hashTagVal, hashArr]
  );

  const keyUp = useCallback(
    (e) => {
      if ((e.keyCode === 13 || e.keyCode === 32) && e.target.value.trim() !== "") {
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
  const handleDeleteHash = useCallback(
    (idx) => {
      setHashArr(hashArr.filter((_, index) => index !== idx));
    },
    [hashArr]
  );

  const handlePost = () => {
    if (!title) {
      return titleRef.current.focus();
    }
    if (!content) {
      return contentRef.current.focus();
    }

    const post = new FormData();
    post.append("title", title);
    post.append("content", content);

    if (hashArr.length > 0) {
      for (let i = 0; i < hashArr.length; i++) {
        post.append("hashtags", hashArr[i]);
      }
    }

    if (images.length > 0) {
      [].forEach.call(images, (img) => {
        post.append("images", img);
      });
    }

    //수정 모드일 때
    if (editState) {
      dispatch(updatePostRequestAction({ post, id }));
      router.push("/community");
    } else {
      //새로 작성할 때
      dispatch(postRequestAction(post));
    }
  };

  useEffect(() => {
    if (postDone) {
      dispatch(postResetAction());
      Router.replace("/community");
    }
  }, [postDone]);

  console.log(fileImages);

  return (
    <>
      <CreatePostContainer>
        <TitleWrapper>
          <button>테스트버튼</button>
          <h1>커뮤니티 글쓰기</h1>
          {editState ? (
            <div id="buttons">
              <Button onClick={handlePost}>수정완료</Button>
              <Button onClick={() => router.back()}>취소</Button>
            </div>
          ) : (
            <div id="buttons">
              <Button onClick={handlePost}>등록</Button>
              <Button onClick={() => router.back()}>취소</Button>
            </div>
          )}
        </TitleWrapper>

        <TextEditWrapper>
          <input
            ref={titleRef}
            autoFocus
            maxLength="40"
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
                <input type="file" id="add_file" />
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
    </>
  );
};

export default CommunityPost;
