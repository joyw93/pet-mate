import { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CommunityItem from "./CommunityItem";
import { ListContainer, BtnContainer } from "./styled";
import { loadPostsRequestAction } from "../../reducers/community";

const CommunityList = (posts) => {
  // console.log(posts.posts);
  const [list, setList] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    setList(posts.posts);
  }, [posts]);

  console.log(list);

  const handleMorePosts = () => {
    const community = dispatch(loadPostsRequestAction());
    console.log(community.data);
  };
  return (
    <>
      <ListContainer>
        {list &&
          list.map((item, index) => <CommunityItem key={index} {...item} />)}
        <BtnContainer>
          <span></span>
          <button onClick={handleMorePosts}>더보기</button>
        </BtnContainer>
      </ListContainer>
    </>
  );
};

export default CommunityList;
