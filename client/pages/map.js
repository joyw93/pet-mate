import AppLayout from "../components/AppLayout";
//import Kakaomap from "../components/Kakaomap/Kakaomap";
import { useState } from "react";
import { Map, MapMarker } from "react-kakao-maps-sdk";
import { useEffect } from "react";

const MyMap = () => {
  // const mapKey = process.env.NEXT_PUBLIC_KAKAOMAP_APPKEY;

  const [inputText, setInputText] = useState("");
  const [place, setPlace] = useState("");

  const onChange = (e) => {
    setInputText(e.target.value);
  };

  const handleSubmit = () => {
    setPlace(inputText);
  };

  const [info, setInfo] = useState();
  const [markers, setMarkers] = useState([]);
  const [map, setMap] = useState();
  const [placeSearched, setPlacesSearched] = useState("");
  const [lat, setLat] = useState();
  const [lng, setLng] = useState();

  console.log(place);

  useEffect(() => {
    setPlacesSearched(place);

    if (!map) return;
    const ps = new kakao.maps.services.Places();

    ps.keywordSearch(placeSearched, (data, status, _pagination) => {
      if (status === kakao.maps.services.Status.OK) {
        // 검색된 장소 위치를 기준으로 지도 범위를 재설정하기위해
        // LatLngBounds 객체에 좌표를 추가합니다
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

        // 검색된 장소 위치를 기준으로 지도 범위를 재설정합니다
        map.setBounds(bounds);
      }
    });
  }, [map, placeSearched]);

  const handleMarkerClick = (e) => {
    console.log(e.n);
    setLat(e.n.La);
    setLng(e.n.Ma);
  };

  console.log(lat, lng);

  return (
    <AppLayout>
      <div className="inputForm">
        <input
          placeholder="검색어를 입력하세요"
          onChange={onChange}
          value={inputText}
        />
        <button onClick={handleSubmit}>검색</button>
      </div>
      {/* <Kakaomap place={place} /> */}
      <Map // 로드뷰를 표시할 Container
        center={{
          lat: 37.566826,
          lng: 126.9786567,
        }}
        style={{
          width: "100%",
          height: "350px",
        }}
        level={3}
        onCreate={setMap}
      >
        {markers.map((marker) => (
          <MapMarker
            key={`marker-${marker.content}-${marker.position.lat},${marker.position.lng}`}
            position={marker.position}
            onClick={() => {
              setInfo(marker), handleMarkerClick;
            }}
          >
            {info && info.content === marker.content && (
              <div style={{ color: "#000" }}>{marker.content}</div>
            )}
          </MapMarker>
        ))}
      </Map>
    </AppLayout>
  );
};
export default MyMap;
