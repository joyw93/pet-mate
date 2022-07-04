import Router from "next/router";
import { useEffect } from "react";
import { useCallback } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { postRequestAction, postResetAction } from "../../reducers/community";
import { CreatePostContainer } from "./styled";
import {
  TitleWrapper,
  TextEditWrapper,
  AddPhotoWrapper,
  KeywordWrapper,
} from "./styled";

const CommunityPost = () => {
  const dispatch = useDispatch();
  const { postDone } = useSelector((state) => state.community);

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

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
            <button id="submit_btn" onClick={post}>
              등록
            </button>
            <button id="cancel_btn">취소</button>
          </div>
        </TitleWrapper>

        <TextEditWrapper>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="제목을 입력해 주세요."
          />
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="내용을 입력해 주세요"
          ></textarea>
        </TextEditWrapper>

        <AddPhotoWrapper>
          <h2>사진 추가(최대 3장)</h2>
          <div id="photos">
            <div id="add_photo">
              <input type="file" id="add_file" />
              <label htmlFor="add_file"> + </label>
            </div>
            <div id="photo1"></div>
            <div id="photo2"></div>
            <div id="photo3"></div>
          </div>
        </AddPhotoWrapper>

        <KeywordWrapper>
          <h2>키워드 등록</h2>
          <div id="keyword_area">
            <button className="keyword_item">
              <span>hi</span>
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

            <div id="keyword_input">
              <input type="text" placeholder="키워드" />
            </div>
          </div>
        </KeywordWrapper>
      </CreatePostContainer>
    </>
  );
};

export default CommunityPost;
