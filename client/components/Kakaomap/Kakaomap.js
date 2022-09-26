import { useEffect, useState } from "react";
import { Map, MapMarker } from "react-kakao-maps-sdk";
import DetailedMap from "../Kakaomap/DetailedMap";

const Kakaomap = ({ place }) => {
  const [info, setInfo] = useState();
  const [markers, setMarkers] = useState([]);
  const [map, setMap] = useState();
  const [lat, setLat] = useState("");
  const [lng, setLng] = useState("");
  const [placeResult, setPlaceResult] = useState("");

  console.log(place);
  useEffect(() => {
    if (!map || !place) return;

    const ps = new kakao.maps.services.Places();

    ps.keywordSearch(place, (data, status, _pagination) => {
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
  }, [place]);

  console.log(lat, lng);
  useEffect(() => {
    if (info) {
      setPlaceResult(info.content);
    }
  }, [info]);

  function getAddr(lat, lng) {
    // 주소-좌표 변환 객체를 생성합니다
    let geocoder = new kakao.maps.services.Geocoder();

    let coord = new kakao.maps.LatLng(lat, lng);
    let callback = function (result, status) {
      if (status === kakao.maps.services.Status.OK) {
        const arr = { ...result };
        console.log(arr);
        // const _arr1 = arr[0].address.region_1depth_name;
        // const _arr2 = arr[0].address.region_2depth_name;
        // const _arr3 = arr[0].address.region_3depth_name;
        // console.log(_arr1, _arr2, _arr3);
      }
    };
    geocoder.coord2Address(coord.getLng(), coord.getLat(), callback);
  }

  return (
    <>
      <Map
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
              setInfo(marker);
              setLat(marker.position.lat), setLng(marker.position.lng);
              getAddr(lat, lng);
            }}
          >
            {info && info.content === marker.content && (
              <div style={{ color: "#000" }}>{marker.content}</div>
            )}
          </MapMarker>
        ))}
      </Map>
      <div>
        {placeResult !== "" ? (
          <span>{placeResult}이 선택되었습니다!</span>
        ) : null}
      </div>
      <DetailedMap
        lat={Number(lat)}
        lng={Number(lng)}
        placeResult={placeResult}
      />
    </>
  );
};

export default Kakaomap;
