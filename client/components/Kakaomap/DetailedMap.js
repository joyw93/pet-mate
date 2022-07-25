import { MapMarker, CustomOverlayMap } from "react-kakao-maps-sdk";
import { Map } from "react-kakao-maps-sdk";
import Link from "next/link";
import { CustomOverlay } from "./styled";

const DetailedMap = ({ lat, lng, placeResult }) => {
  console.log(lat);
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
        {/* <MapMarker
          position={{
            lat: lat,
            lng: lng,
          }}
        >
          <div style={{ color: "#000" }}>{placeResult}</div>
        </MapMarker> */}
        <MapMarker
          position={{ lat: lat, lng: lng }}
          image={{
            src: "../img/locationEmojiYw.png",
            size: {
              width: 60,
              height: 60,
            },
            options: {
              offset: {
                x: 30,
                y: 52,
              },
            },
          }}
        />
        <CustomOverlayMap
          position={{ lat: lat, lng: lng }}
          xAnchor={0.5}
          yAnchor={2.9}
        >
          <CustomOverlay className="customoverlay">
            <Link
              href={`https://map.kakao.com/link/search/${placeResult}`}
              target="_blank"
              rel="noreferrer"
              passHref
            >
              <span className="title">
                {placeResult}
                <img src="../img/rightBtnBk.png" alt="" />
              </span>
            </Link>
          </CustomOverlay>
        </CustomOverlayMap>
      </Map>
    </>
  );
};
export default DetailedMap;
