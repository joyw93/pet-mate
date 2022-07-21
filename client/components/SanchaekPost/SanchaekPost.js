import { useState, useEffect } from "react";
import { CreatePostContainer } from "./styled";
import {
  TitleWrapper,
  TextEditWrapper,
  AddPhotoWrapper,
  MapWrapper,
  Button,
} from "./styled";
import Kakaomap from "../Kakaomap/Kakaomap";

const SanchaekPost = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const [fileImages, setFileImages] = useState([]);
  //const [images, setImages] = useState([]);

  const [inputText, setInputText] = useState("");
  const [place, setPlace] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setPlace(inputText);
  };

  //const { me } = useSelector((state) => state.user);

  // useEffect(() => {
  //   if (!me) {
  //     Router.push("/login");
  //   }
  // }, []);

  const handleAddImages = (event) => {
    const imageLists = event.target.files;
    let imageUrlLists = [...fileImages];

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
    setFileImages(fileImages.filter((_, index) => index !== id));
    window.URL.revokeObjectURL(fileImages.filter((_, index) => index === id));
    console.log(fileImages);
  };
  return (
    <CreatePostContainer>
      <TitleWrapper>
        <h1>산책메이트 글쓰기</h1>
        <div id="buttons">
          <Button>등록</Button>
          <Button>취소</Button>
        </div>
      </TitleWrapper>

      <TextEditWrapper>
        <input
          autoFocus
          maxLength="40"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="제목을 입력해 주세요."
        />
        <textarea
          maxLength="350"
          value={content}
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
              <img src="../img/photo.png" alt="이미지 업로드" />
            </label>
          </div>
          {fileImages.map((image, id) => (
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
      <MapWrapper>
        <h2>지도 등록</h2>
        <form id="map_search">
          <input
            id="map_search_input"
            type="search"
            placeholder="주소를 입력해 주세요"
            onChange={(e) => setInputText(e.target.value)}
            value={inputText}
          />
          <button id="map_search_btn" onClick={handleSubmit}>
            검색
          </button>
        </form>
        {/* <div id="map_view"></div> */}
        <Kakaomap id="map_view" place={place} />
      </MapWrapper>
    </CreatePostContainer>
  );
};

export default SanchaekPost;
