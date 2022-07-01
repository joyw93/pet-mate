import { CreatePostContainer } from "./styled";
import { TitleWrapper, TextEditWrapper, AddPhotoWrapper, KeywordWrapper } from "./styled";

const CommunityPostCreate = () => {
  return (
    <>
      <CreatePostContainer>
        <TitleWrapper>
          <h1>커뮤니티 글쓰기</h1>
          <div id="buttons">
            <button id="submit_btn">등록</button>
            <button id="cancel_btn">취소</button>
          </div>
        </TitleWrapper>

        <TextEditWrapper>
          <input type="text" placeholder="제목을 입력해 주세요." />
          <textarea placeholder="내용을 입력해 주세요"></textarea>
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
        </KeywordWrapper>
      </CreatePostContainer>
    </>
  );
};

export default CommunityPostCreate;
