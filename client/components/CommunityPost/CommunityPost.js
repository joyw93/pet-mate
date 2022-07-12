import Router from "next/router";
import { useEffect } from "react";
import { useCallback } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { postRequestAction, postResetAction } from "../../reducers/community";
import { CreatePostContainer } from "./styled";
import { TitleWrapper, TextEditWrapper, AddPhotoWrapper, KeywordWrapper, Button } from "./styled";

const CommunityPost = () => {
  const dispatch = useDispatch();
  const { postDone } = useSelector((state) => state.community);

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const [FileImages, setFileImages] = useState([]);
  const [hashTagVal, setHashTagVal] = useState("");

  const [hashArr, setHashArr] = useState([]);

  useEffect(()=>{
    if(hashArr.length > 5) {
      setHashArr(hashArr.slice(0,5))
      alert('키워드는 5개까지 등록할 수 있습니다.')
    }
  },[hashArr])

  //AddPhotoWrapper
  const handleAddImages = (event) => {
    const imageLists = event.target.files;
    let imageUrlLists = [...FileImages];

    for (let i = 0; i < imageLists.length; i++) {
      const currentImageUrl = URL.createObjectURL(imageLists[i]);
      imageUrlLists.push(currentImageUrl);
    }

    if (imageUrlLists.length > 3) {
      imageUrlLists = imageUrlLists.slice(0, 3);
      alert("이미지는 3장까지 업로드 할 수 있습니다.");
    }
    setFileImages(imageUrlLists);
  };

  const handleDeleteImage = (id) => {
    setFileImages(FileImages.filter((_, index) => index !== id));
    window.URL.revokeObjectURL(FileImages.filter((_, index) => index === id));
  };

  //KeywordWrapper 
  const handleHash = (e) => {
    setHashTagVal(e.target.value);
  };

  const keyUp = (e) => {
    if (e.keyCode === 13 && e.target.value.trim() !== "") {
      setHashArr([...hashArr, { id: new Date().getTime(), content: hashTagVal }]);
      setHashTagVal("");
    }
  };


  const removeHash = (id) => {
    setHashArr(hashArr.filter((it) => it.id !== id));
    console.log(id)
  }

  const post = useCallback(() => {
    dispatch(postRequestAction({ title, content }));
  }, [title, content]);

  useEffect(() => {
    if (postDone) {
      dispatch(postResetAction());
      Router.replace("/community");
    }
  }, [postDone]);

  return (
    <>
      <CreatePostContainer>
        <TitleWrapper>
          <h1>커뮤니티 글쓰기</h1>
          <div id="buttons">
            <Button onClick={post}>등록</Button>
            <Button>취소</Button>
          </div>
        </TitleWrapper>

        <TextEditWrapper>
          <input autoFocus maxLength='40' type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="제목을 입력해 주세요." />
          <textarea maxLength='350' value={content} onChange={(e) => setContent(e.target.value)} placeholder="내용을 입력해 주세요"></textarea>
        </TextEditWrapper>

        <AddPhotoWrapper>
          <h2>사진 추가(최대 3장)</h2>
          <div id="photos">
            <div id="add_photo">
              <label htmlFor="add_file" onChange={handleAddImages}>
                <input type="file" id="add_file" />
                <img src="../img/photo.png" alt="이미지 업로드" />
              </label>
            </div>
      
              {FileImages.map((image, id) => (
                <div key={id} className="photo_preview">
                  <img src={image} alt={`${image}-${id}`} />
                  <button onClick={() => handleDeleteImage(id)}>
                    {/* <img src="../img/close-btn.png" alt="이미지 삭제" /> */}
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
            {hashArr.map((it) => (
              <button key={it.id} className="keyword_item" onClick={()=>removeHash(it.id)}>
                <span>{it.content}</span>
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
              <input onKeyUp={keyUp} value={hashTagVal} size='14' maxLength='10' onChange={handleHash} type="text" placeholder="키워드(10자 이내)" />
            </div>
          </div>
        </KeywordWrapper>
      </CreatePostContainer>
    </>
  );
};

export default CommunityPost;
