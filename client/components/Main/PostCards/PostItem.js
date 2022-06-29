import { ListItem } from "./styled";

const PostItem = ({ src, title }) => {
  return (
    <ListItem>
      <img src={src} />
      <span>{title}</span>
    </ListItem>
  );
};

export default PostItem;
