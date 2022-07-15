import { useEffect } from "react";
import { useState } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import CommunityItem from "./CommunityItem";
import { ListContainer, BtnContainer } from "./styled";
import { loadMorePostsAction } from "../../reducers/community";
import axios from "axios";

const CommunityList = () => {
  const posts = useSelector((state) => state.community.posts);
  const loadPostsDone = useSelector(
    (state) => state.community.posts,
    shallowEqual
  );

  const [list, setList] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    console.log("??", posts);
    if (loadPostsDone) {
      setList(posts);
    }
  }, [posts]);

  const handleMorePosts = () => {
    // const result = await axios.get(
    //   "http://api.petmate.kr/community?offset=10&count=10"
    // );
    // const data = result.data.data;
    // console.log(data);
    dispatch(loadMorePostsAction());
  };

  // const handleMorePosts = () => {
  //   const community = dispatch(loadPostsRequestAction());
  //   console.log(community.data);
  // };

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
