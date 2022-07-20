import { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CommunityItem from "./CommunityItem";
import { ListContainer, BtnContainer } from "./styled";
import { loadMorePostsAction, loadPostsRequestAction } from "../../reducers/community";

const CommunityList = (filterCond) => {
  const posts = useSelector((state) => state.community.posts);
  const loadPostsDone = useSelector((state) => state.community.loadPostsDone);

  useEffect(() => {
    //setFilterCond("new");
    dispatch(loadPostsRequestAction(filterCond.filterCond));
  }, [filterCond.filterCond]);

  const [list, setList] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    console.log(posts);
    if (loadPostsDone) {
      setList(posts);
    }
  }, [posts]);

  const handleMorePosts = () => {
    dispatch(loadMorePostsAction(filterCond.filterCond));
  };

  return (
    <>
      <ListContainer>
        {list && list.map((item) => <CommunityItem key={item.id} {...item} />)}
        <BtnContainer>
          <span></span>
          <button onClick={handleMorePosts}>더보기</button>
        </BtnContainer>
      </ListContainer>
    </>
  );
};

export default CommunityList;
