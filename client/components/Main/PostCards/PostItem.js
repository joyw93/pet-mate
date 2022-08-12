import { ListItem, ItemImg, ItemInfo, ItemLocation, LocationInfo, LocationImg } from "./styled";
import { useRouter } from "next/router";

export const HotCommunityItem = ({ id, title, images }) => {
  const Router = useRouter();
  const goToDetail = () => {
    Router.push(`/community/${id}`);
  };
  return (
    <ListItem onClick={goToDetail}>
      {images?.length === 0 ? (
        <ItemImg src="../../img/defaultimg1.png" />
      ) : (
        <ItemImg src={images[0].url} />
      )}
      {title.length > 15 ? (
        <ItemInfo>{title.slice(0, 15)}</ItemInfo>
      ) : (
        <ItemInfo>{title}</ItemInfo>
      )}
    </ListItem>
  );
};

export const HotSanchaekItem = ({ id, title, images, mapInfo }) => {
  const Router = useRouter();
  const goToDetail = () => {
    Router.push(`/sanchaek/${id}`);
  };

  return (
    <ListItem onClick={goToDetail}>
      {images?.length === 0 ? (
        <ItemImg src="../../img/defaultimg1.png" />
      ) : (
        <ItemImg src={images[0].url} />
      )}
      {title.length > 15 ? (
        <ItemInfo>{title.slice(0, 20)}</ItemInfo>
      ) : (
        <ItemInfo>{title}</ItemInfo>
      )}
      {mapInfo.location &&
        <LocationInfo>
          <LocationImg src="../../img/locationEmojiBlk.png" />
          <ItemLocation>{mapInfo.location.slice(0, 19)}</ItemLocation>
        </LocationInfo>

      }
    </ListItem>
  );
};
