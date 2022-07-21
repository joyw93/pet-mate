import { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CommunityItem from "./CommunityItem";
import { ListContainer, BtnContainer } from "./styled";
import { loadMorePostsAction, loadPostsRequestAction, loadPostDetailResetAction } from "../../reducers/community";

const CommunityList = (filterCond) => {
  const posts = useSelector((state) => state.community.posts);
  const loadPostsDone = useSelector((state) => state.community.loadPostsDone);

  useEffect(() => {
    dispatch(loadPostsRequestAction(filterCond.filterCond));
  }, [filterCond.filterCond]);

  const [list, setList] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadPostDetailResetAction());
  }, []);

  useEffect(() => {
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
          {posts.length >= 10 ? <button onClick={handleMorePosts}>더보기</button> : null}
        </BtnContainer>
      </ListContainer>
    </>
  );
};

export default CommunityList;
