import { ListItem } from "./styled";
import { useRouter } from "next/router";

export const HotCommunityItem = ({ id, title, images }) => {
  const Router = useRouter();
  const goToDetail = () => {
    Router.push(`/community/${id}`);
  };
  return (
    <ListItem onClick={goToDetail}>
      {images?.length === 0 ? (
        <img src="../../img/defaultimg1.png" />
      ) : (
        <img src={images[0].url} />
      )}
      {title.length > 15 ? (
        <span>{title.slice(0, 15)}</span>
      ) : (
        <span>{title}</span>
      )}
    </ListItem>
  );
};

export const HotSanchaekItem = ({ id, title, images }) => {
  const Router = useRouter();
  const goToDetail = () => {
    Router.push(`/sanchaek/${id}`);
  };

  return (
    <ListItem onClick={goToDetail}>
      {images?.length === 0 ? (
        <img src="../../img/defaultimg1.png" />
      ) : (
        <img src={images[0].url} />
      )}
      {title.length > 15 ? (
        <span>{title.slice(0, 15)}</span>
      ) : (
        <span>{title}</span>
      )}
    </ListItem>
  );
};
