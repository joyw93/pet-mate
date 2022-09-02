import { useState, useEffect, useRef } from "react";
import { CreatePostContainer } from "./styled";
import {
  TitleWrapper,
  TextEditWrapper,
  AddPhotoWrapper,
  MapWrapper,
  Button,
  PostBtn,
  BackBtn,
  ShowPlaceResult,
  CustomOverlay,
} from "./styled";
import { Map, MapMarker, CustomOverlayMap } from "react-kakao-maps-sdk";
import { sanchaekActions } from "../../store/reducers/sanchaek";

import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";

const SanchaekPost = ({ editState }) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { id } = router.query;

  const { sanchaekAddPostDone, sanchaekUpdatePostDone } = useSelector(
    (state) => state.sanchaek
  );
  const selectedPost = useSelector((state) => state.sanchaek.sanchaekPost);

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const [fileImages, setFileImages] = useState([]);
  const [images, setImages] = useState([]);

  const [inputText, setInputText] = useState("");
  const [place, setPlace] = useState("");
  const [noMatchedPlace, setNoMatchedPlace] = useState(false);
  const [address, setAddress] = useState("");
  const [roadAddress, setRoadAddress] = useState("");

  const titleRef = useRef();
  const contentRef = useRef();
  const imageRef = useRef();

  //맵에서 사용하는 변수
  const [info, setInfo] = useState();
  const [markers, setMarkers] = useState([]);
  const [map, setMap] = useState();
  const [lat, setLat] = useState("");
  const [lng, setLng] = useState("");
  const [placeResult, setPlaceResult] = useState("");

  // useEffect(() => {
  //   if (!me) {
  //     Router.push("/login");
  //   }
  // }, []);

  useEffect(() => {
    if (sanchaekAddPostDone) {
      router.replace("/sanchaek");
      dispatch(sanchaekActions.sanchaekAddPostReset());
    } else if (sanchaekUpdatePostDone) {
      router.replace("/sanchaek");
      dispatch(sanchaekActions.sanchaekUpdatePostReset());
    }
  }, [sanchaekAddPostDone, sanchaekUpdatePostDone]);

  useEffect(() => {
    //수정상태일 때 선택된 게시글값 넣어주기
    if (editState) {
      if (selectedPost) {
        setTitle(selectedPost.title);
        setContent(selectedPost.content);
        setLat(Number(selectedPost.mapInfo.lat));
        setLng(Number(selectedPost.mapInfo.lng));
        setPlace(selectedPost.mapInfo.location);
        setPlaceResult(selectedPost.mapInfo.location);
        setAddress(selectedPost.mapInfo.address);
        setRoadAddress(selectedPost.mapInfo.roadAddress);

        let imageFiles = [];
        if (selectedPost.images) {
          for (let i = 0; i < selectedPost.images.length; i++) {
            let newImg = selectedPost.images[i].url;
            imageFiles = imageFiles.concat(newImg);
            setFileImages(imageFiles);
          }
          setImages(imageFiles);
        }
      }
    }
  }, [editState]);

  const handleAddImages = (event) => {
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
  };

  const handleDeleteImage = (id) => {
    setFileImages(fileImages.filter((_, index) => index !== id));
    setImages(images.filter((_, index) => index !== id));
    window.URL.revokeObjectURL(fileImages.filter((_, index) => index === id));
  };

  const handlePost = () => {
    if (!title) {
      return titleRef.current.focus();
    }
    if (!content) {
      return contentRef.current.focus();
    }

    //데이터 전송
    const post = new FormData();
    post.append("title", title);
    post.append("content", content);
    post.append("mapInfo[lat]", lat);
    post.append("mapInfo[lng]", lng);
    post.append("mapInfo[location]", placeResult);
    post.append("mapInfo[address]", address);
    post.append("mapInfo[roadAddress]", roadAddress);

    if (images.length > 0) {
      [].forEach.call(images, (img) => {
        post.append("images", img);
      });
    }

    //수정 모드일 때
    if (editState) {
      dispatch(sanchaekActions.sanchaekUpdatePostRequest({ post, id }));
    } else {
      //새로 작성할 때
      dispatch(sanchaekActions.sanchaekAddPostRequest(post));
    }
  };

  //맵 관련
  useEffect(() => {
    if (info) {
      setPlaceResult(info.content);
    }
    // if (lat && lng) {
    //   getAddr(lat, lng);
    // }
  }, [info, lat, lng]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setPlace(inputText);
  };

  useEffect(() => {
    if (!map || !place) return;

    const ps = new kakao.maps.services.Places();
    ps.keywordSearch(place, (data, status, _pagination) => {
      //검색 결과 없을 때
      if (status === "ZERO_RESULT") {
        setNoMatchedPlace(true);
        return;
      } else if (status === kakao.maps.services.Status.OK) {
        setNoMatchedPlace(false);
        const bounds = new kakao.maps.LatLngBounds();
        let markers = [];
        for (var i = 0; i < data.length; i++) {
          markers.push({
            position: {
              lat: data[i].y,
              lng: data[i].x,
            },
            content: data[i].place_name,
          });
          bounds.extend(new kakao.maps.LatLng(data[i].y, data[i].x));
        }
        setMarkers(markers);
        map.setBounds(bounds);
      }
    });
  }, [place]);

  const getAddr = (lat, lng) => {
    // 주소-좌표 변환 객체를 생성합니다
    let geocoder = new kakao.maps.services.Geocoder();

    let coord = new kakao.maps.LatLng(lat, lng);
    let callback = function (result, status) {
      if (status === kakao.maps.services.Status.OK) {
        const arr = { ...result };
        console.log(arr[0]);
        if (arr[0].address === null) {
          setAddress("");
        } else {
          setAddress(arr[0].address.address_name);
        }

        if (arr[0].road_address === null) {
          setRoadAddress("");
        } else {
          setRoadAddress(arr[0].road_address.address_name);
        }
      }
    };
    geocoder.coord2Address(coord.getLng(), coord.getLat(), callback);
  };

  useEffect(() => {
    if (!lat) {
      setLat(37.566826);
    }
    if (!lng) {
      setLng(126.9786567);
    }
  }, [lat, lng]);

  return (
    <CreatePostContainer>
      <TitleWrapper>
        <h1>산책메이트 글쓰기</h1>
        {editState ? (
          <div id="buttons">
            <PostBtn onClick={handlePost}>수정완료</PostBtn>
            <BackBtn onClick={() => router.back()}>취소</BackBtn>
          </div>
        ) : (
          <div id="buttons">
            <PostBtn onClick={handlePost}>등록</PostBtn>
            <BackBtn onClick={() => router.push("/sanchaek")}>취소</BackBtn>
          </div>
        )}
      </TitleWrapper>
      <TextEditWrapper>
        <input
          ref={titleRef}
          autoFocus
          maxLength="25"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="제목을 입력해 주세요."
        />
        <textarea
          ref={contentRef}
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
              <input
                type="file"
                id="add_file"
                ref={imageRef}
                accept="image/*"
              />
              <img src="../../img/photo.png" alt="이미지 업로드" />
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
        <div>
          <h2>지도 등록 (만날 장소를 검색하세요!)</h2>
          <ShowPlaceResult>
            {noMatchedPlace ? (
              <span>검색된 결과가 없습니다.</span>
            ) : placeResult !== "" ? (
              <span>{placeResult}이 선택되었습니다!</span>
            ) : null}
          </ShowPlaceResult>
        </div>
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
        <>
          <Map
            center={{
              lat: lat,
              lng: lng,
            }}
            style={{
              width: "100%",
              height: "350px",
            }}
            level={3}
            onCreate={setMap}
          >
            {markers.map((marker) => (
              <div
                key={`marker-${marker.content}-${marker.position.lat},${marker.position.lng}`}
              >
                <MapMarker
                  position={marker.position}
                  image={{
                    src: "../../img/locationEmojiBlk.png",
                    size: {
                      width: 48,
                      height: 48,
                    },
                    options: {
                      offset: {
                        x: 26,
                        y: 52,
                      },
                    },
                  }}
                  onClick={() => {
                    setInfo(marker);
                    setLat(marker.position.lat);
                    setLng(marker.position.lng);
                    getAddr(lat, lng);
                  }}
                />
                {info && info.content === marker.content && (
                  // <SelectedLocation style={{ color: "#000" }}>
                  //   {marker.content}
                  // </SelectedLocation>
                  <CustomOverlayMap
                    position={{ lat: lat, lng: lng }}
                    xAnchor={0.5}
                    yAnchor={2.9}
                  >
                    <CustomOverlay className="customoverlay">
                      <span className="title">{marker.content}</span>
                    </CustomOverlay>
                  </CustomOverlayMap>
                )}
                {/* </MapMarker> */}
              </div>
            ))}
          </Map>
        </>
      </MapWrapper>{" "}
    </CreatePostContainer>
  );
};

export default SanchaekPost;
