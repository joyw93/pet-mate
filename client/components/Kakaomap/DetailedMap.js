import { MapMarker, StaticMap } from "react-kakao-maps-sdk";
import { Map } from "react-kakao-maps-sdk";

const DetailedMap = ({ lat, lng, placeResult }) => {
  console.log(lat);
  console.log(lng);
  console.log(placeResult);
  return (
    <>
      <Map
        center={{
          // 지도의 중심좌표
          lat: lat,
          lng: lng,
        }}
        style={{
          width: "100%",
          height: "450px",
        }}
        level={2}
      >
        <MapMarker
          position={{
            lat: lat,
            lng: lng,
          }}
        >
          <div style={{ color: "#000" }}>{placeResult}</div>
        </MapMarker>
      </Map>
    </>
  );
};
export default DetailedMap;
