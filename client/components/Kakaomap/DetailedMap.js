import { MapMarker, StaticMap } from "react-kakao-maps-sdk";
import { Map } from "react-kakao-maps-sdk";

const DetailedMap = ({ lat, lng, placeResult }) => {
  console.log(lat);
  return (
    <>
      <div>hi</div>
      <Map // 지도를 표시할 Container
        center={{
          // 지도의 중심좌표
          lat: lat,
          lng: lng,
        }}
        style={{
          // 지도의 크기
          width: "100%",
          height: "450px",
        }}
        level={3} // 지도의 확대 레벨
      >
        <MapMarker
          position={{
            // 지도의 중심좌표
            lat: lat,
            lng: lng,
          }}
        >
          <div style={{ color: "#000" }}>hi{placeResult}</div>
        </MapMarker>
      </Map>
    </>
  );
};
export default DetailedMap;
