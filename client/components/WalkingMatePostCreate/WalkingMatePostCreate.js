import { CreatePostContainer } from "./styled";
import { TitleWrapper, TextEditWrapper, AddPhotoWrapper, MapWrapper } from "./styled";

const WalkingMatePostCreate = () => {
  return (
    <>
      <CreatePostContainer>
        <TitleWrapper>
          <h1>산책메이트 글쓰기</h1>
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

        <MapWrapper>
          <h2>지도 등록</h2>
          <form id="map_search">
            <input id="map_search_input" type="search" placeholder="주소를 입력해 주세요" />
            <button id="map_search_btn">검색</button>
          </form>
          <div id="map_view"></div>
        </MapWrapper>
      </CreatePostContainer>
    </>
  );
};

export default WalkingMatePostCreate;
